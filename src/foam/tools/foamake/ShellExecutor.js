const { spawn } = require('child_process');
const uuid = require('uuid');

foam.CLASS({
  package: 'foam.tools.foamake',
  name: 'Shell',
  properties: [
    { name: 'name', class: 'String' },
    { name: 'path', class: 'String' },
  ]
});

foam.CLASS({
  package: 'foam.tools.foamake',
  name: 'ShellExecutor',

  documentation: `
    ShellExecutor executes a script in a shell by passing each line to
    the shell's standard input stream. Like systemd, ShellExecutor can
    track the currently running line of code.

    If the first line is blank, ShellExecutor will run the script in
    inline-whitespace mode, meaning the amount leading whitespace
    observed on the second line will be removed from each line.
  `,

  requires: [
    'foam.tools.foamake.StreamID'
  ],

  topics: [
    'newScript',
    'streamClosed',
    'output' // (streamId, data)
  ],

  properties: [
    {
      name: 'id',
      factory: () => {
        return uuid();
      }
    },
    // ShellExecutor configuration properties
    {
      name: 'shells',
      class: 'FObjectArray',
      of: 'foam.tools.foamake.Shell',
      factory: function () {
        return [
          foam.tools.foamake.Shell.create({
            name: 'bash', path: '/bin/bash',
          })
        ];
      },
    },
    // Debug information for running script
    'currentLinePosition',
    'currnetLineText',
    // Internal properties
    {
      name: 'shellsMap_',
      expression: function(shells) {
        var v = {};
        for ( var i=0; i < shells.length; i++ ) {
          v[shells[i].name] = shells[i];
        }
        return v;
      }
    },
    ['inlineWhitespace_', ''],
    {
      name: 'debugTag',
      expression: function(id) {
        return 'FOAMAKE:'+id;
      }
    },
  ],

  methods: [
    function run(script, shellSpec) {
      var self = this;

      var shellInfo = this.shellsMap_[shellSpec];
      if ( ! shellInfo ) {
        return new Error("Shell not recognized: " + shellSpec);
      }

      var scrLines = script.split('\n');

      // If the first line is blank, use inline-whitespace mode
      if ( scrLines[0] === '' ) {
        if ( scrLines.length < 2 ) return;
        this.inlineWhitespace_ = scrLines[1].match(/^[\s\t]*/);
      }

      // Create shell environment with PS4 (allows tracking line numbers)
      let shellEnv = {};
      for ( k in process.env ) shellEnv[k] = process.env[k];
      shellEnv.PS4 = 'FOAMAKE:'+this.id+':${LINENO};';

      // Emit newScript event before executing
      this.newScript.pub();

      // Spawn the shell
      var shellProc = this.spawn_(shellInfo.path, ['-x'], {
        env: shellEnv
      });
      shellProc.stdout.on('data', (data) => {
        self.output.pub(this.StreamID.STDOUT, data);
      });

      // Process tagged stderr lines to get file state
      shellProc.stderr.on('data', (data) => {
        let msg = data.toString();

        // If a stderr output starts with the debugTag then process it
        if ( msg.startsWith(this.debugTag) ) {
          debugPart = msg.substring(0, msg.indexOf(';'));
          commandPart = msg.substring(msg.indexOf(';')+1);
          let debugInfo = debugPart.split(':');
          this.currentLinePosition = parseInt(debugInfo[2]);
          this.currentLineText = commandPart;
        } else {
          // Otherwise, publish to stderr as normal
          self.output.pub(this.StreamID.STDERR, msg);
        }
      });

      shellProc.stdout.on('end', () => {
        self.streamClosed.pub(self.StreamID.STDOUT);
      });
      shellProc.stderr.on('end', () => {
        self.streamClosed.pub(self.StreamID.STDERR);
      });

      // Iterate over the script's lines
      for ( let i=0; i < scrLines.length; i++ ) {
        if ( scrLines[i].trim() === '' ) continue;
        let line = this.handleWhitespace_(scrLines[i]);
        if ( ! shellProc.stdin.write(line + "\n") ) {
          // TODO: handle this case, though likely isn't necessary
        }
      }

      shellProc.stdin.end();
    },

    function handleWhitespace_(line) {
      var inlineWS = this.inlineWhitespace_ != '';
      // If in inline-whitespace mode, remove the padding
      if ( inlineWS ) {
        // Recalculate inline-whitespace instead of failing
        if (
          line.substring(0, this.inlineWhitespace_.length).trim()
          !== ''
        ) {
          this.inlineWhitespace_ = line.match(/^[\s\t]*/);
        }
        // Remove leading whitespace of specified amount
        line = line.substring(this.inlineWhitespace_.length);
      }
      return line;
    },

    // Node.js modules wrapped for future refactoring
    function spawn_(path, args, options) {
      return spawn(path, args, options);
    }
  ]
});
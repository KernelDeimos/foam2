const cproc = require('child_process');

foam.CLASS({
  package: 'foam.tools.foamake',
  name: 'Build',

  properties: [
    {
      name: 'env',
      value: process.env,
    },
    {
      name: 'shell',
      factory: () => {
        foam.tools.foamake.ShellExecutor.create();
      }
    }
  ],

  methods: [
    function init() {
      // Really just for testing; subject to change
      var monitor = foam.tools.foamake.ShellExecutorPipingMonitor.create();
      monitor.setExecutor(this.shell);
    },

    function install() {
      process.chdir(this.env['PROJECT_HOME']);

      this.shell.run(`
        git submodule init
        git submodule update
        npm install
      `, 'bash');

      this.setenv();
      this.setup_jce();

      if ( this.flag_('IS_MAC') ) {
        this.shell.run(`
          mkdir -p "$NANOPAY_HOME/journals"
          mkdir -p "$NANOPAY_HOME/logs"
        `, 'bash');
      }
    },

    function backup() {
      this.shell.run(/*vsfoam:bash*/`
  if [[ ! $PROJECT_HOME == "/pkg/stack/stage/NANOPAY" ]]; then
    # Preventing this from running on non AWS
    return
  fi

  BACKUP_HOME="/opt/backup"

  # backup journals in event of file incompatiblity between versions
  if [ "$OSTYPE" == "linux-gnu" ] && [ ! -z "\${BACKUP_HOME+x}" ] && [ -d "$JOURNAL_HOME" ]; then
      printf "backup\n"
      DATE=$(date +%Y%m%d_%H%M%S)
      mkdir -p "$BACKUP_HOME/$DATE"

      cp -r "$JOURNAL_HOME/" "$BACKUP_HOME/$DATE/"
  fi
      `, 'bash')
    },

    function flag_(name) {
      return this.env[name] === 1 ||
        this.env[name] === '1';
    },

    function mkdirp_(path) {
      this.exec_()
    },

    // Node dependancies are wrapped for future refactoring
    function cmd_(str) {
      cproc.execSync(str);
    },
    function exec_(path, args) {
      cproc.execFileSync(path, args);
    }
  ]
});
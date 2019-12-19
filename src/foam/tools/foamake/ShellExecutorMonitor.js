foam.CLASS({
  package: 'foam.tools.foamake',
  name: 'ShellExecutorPipingMonitor',

  requires: [
    'foam.tools.foamake.StreamID'
  ],

  properties: [
    {
      name: 'executor',
      class: 'FObjectProperty',
      of: 'foam.tools.foamake.ShellExecutor',
      postSet: function(_, o) {
        o.output.sub(this.onOutput);
      }
    }
  ],

  listeners: [
    function onOutput(_, _, streamId, data) {
      if (streamId === this.StreamID.STDOUT) {
        process.stdout.write(data);
      } else if (streamId == this.StreamID.STDERR) {
        process.stderr.write(data);
      }
    }
  ]
});
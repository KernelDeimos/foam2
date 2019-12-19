foam.INTERFACE({
  package: 'foam.tools.foamake',
  name: 'Colourizer',

  methods: [
    { name: 'warn', args: [ { name: 'str' } ] }
  ]
});

foam.CLASS({
  name: 'foam.tools.foamake.DefaultColours',

  methods: [
    function warn(str) {
      return '\033[33;1m' + str + '\033[0m';
    },
    function info(str) {
      return '\033[36;1m' + str + '\033[0;0m';
    },
    function error(str) {
      return '\033[31;1m' + str + '\033[0;0m';
    }
  ]
});

foam.CLASS({
  package: 'foam.tools.foamake',
  name: 'FoamakeLogger',
  implements: [ 'foam.log.Logger' ],

  requires: [
    'foam.log.LogLevel',
  ],

  documentation: `
    The FoamakeLogger is an implementation of foam.log.Logger that
    uses the process object in Node rather than the console object
    in standard javascript to output messages.
  `,

  properties: [
    {
      name: 'level',
      class: 'FObjectProperty',
      of: 'foam.log.LogLevel',
    },
    {
      name: 'colourizer',
      class: 'FObjectProperty',
      of: 'foam.tools.foamake.Colourizer',
    }
  ],

  methods: [
    function debug() {},
    function log() {
      if ( this.level.ordinal < this.LogLevel.INFO.ordinal ) return;
      process.stderr.write(this.colourizer.info(
        'INFO :: ' +
        arguments.join(',')));
    },
    function info() {
      if ( this.level.ordinal < this.LogLevel.INFO.ordinal ) return;
      process.stderr.write(this.colourizer.info(
        'INFO :: ' +
        arguments.join(',')));
    },
    function warn() {
      if ( this.level.ordinal < this.LogLevel.WARN.ordinal ) return;
      process.stderr.write(this.colourizer.warn(
        'WARNING :: ' +
        arguments.join(',')));
    },
    function error() {
      if ( this.level.ordinal < this.LogLevel.ERROR.ordinal ) return;
      process.stderr.write(this.colourizer.error(
        'ERROR :: ' +
        arguments.join(',')));
    },
  ]
});

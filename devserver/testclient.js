const PKGNAME = 'net.nanopay.toolsfolder.devclient';

// Load FOAM & projects from configuration
var conf = require('./config.js');
global.NODE_FOAM_CONFIG = conf;
require('./nodefoam.js');

foam.CLASS({
  package: PKGNAME,
  name: 'HelloWorld',

  implements: [
    'foam.mlang.Expressions',
  ],

  requires: [
    'foam.dao.ArraySink'
  ],

  methods: [
    function helloWorld() {
      console.log("Hello, World");

      var modelDAO = foam.dao.RestDAO.create({
        of: foam.core.Model,
        baseURL: 'http://127.0.0.1:3626/dao'
      });

      modelDAO.select(this.COUNT()).then(count => {
        console.log("NUMBER OF MODELS");
        console.log(count.value);
      });

      modelDAO.select().then(a => {
        console.log("Selected some models:");
        for ( i in a.array ) {
          if ( isNaN(i) ) {
            console.log("wtf is "+i); continue;
          }
          let o = a.array[i];
          console.log(o);
        }
      }).catch((e) => {
        console.log(e);
        console.log(e.stack);
      });
    }
  ]
})

net.nanopay.toolsfolder.devclient.HelloWorld.create({})
  .helloWorld();
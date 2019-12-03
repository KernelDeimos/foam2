const PKGNAME = 'net.nanopay.toolsfolder.devserver';

// Load FOAM & projects from configuration
var conf = require('./config.js');
global.NODE_FOAM_CONFIG = conf;
require('./nodefoam.js');

foam.CLASS({
  package: PKGNAME,
  name: 'HelloWorld',
  methods: [
    function helloWorld() {
      console.log("Hello, World");
    }
  ]
})

net.nanopay.toolsfolder.devserver.HelloWorld.create({})
  .helloWorld();

function bootServer() {
  // Create the Javascript builder just to get modelDAO
  var modelDAO = foam.build.Builder.create({
    enabledFeatures: [], // Not applicable
    targetFile: '', // Not applicable
    blacklist: [], // Not applicable
  }).createBareModelDAO(false, false, true);

  server = foam.net.node.Server.create({
    port: conf.server.PORT,
  });

  handler = foam.net.node.RestDAOHandler.create({
    pathnamePrefix: '/dao',
    dao: modelDAO
  }, server);
  handler = foam.net.node.CORSHandler.create({
    allowOrigin: '*',
    allowMethods: ['GET','POST','PUT','DELETE'],
    allowHeaders: ['pragma', 'cache-control', 'content-type'],
    delegate: handler
  });
  server.handler = handler;

  server.start();
}

var classloader = foam.__context__.classloader;
Promise.all([
  'foam.build.Builder'
].map(classloader.load.bind(classloader))).then(bootServer);
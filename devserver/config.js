var conf = {};
conf.PROJECT_HOME = __dirname + '/../../';

// Enable FOAM features
conf.FOAM_FILES = [
  'foam2/src/foam.js',
  'foam2/src/foam/nanos/nanos.js',
  'foam2/src/foam/support/support.js'
];

// Specify classpaths outside of FOAM
conf.CLASSPATHS = [
  'nanopay/src'
];

// Files for classpath: nanopay/src
conf.PROJECT_FILES = [
  'nanopay/src/net/nanopay/files.js',
  'nanopay/src/net/nanopay/iso8583/files.js',
  'nanopay/src/net/nanopay/flinks/utils/files.js'
];

// Configuration for the FOAM development server
conf.server = {
  PORT: 3626,
};

module.exports = conf;
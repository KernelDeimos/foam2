/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/*
  A re-usable Node package to simplify management of
  different FOAM class paths in a Node application.
*/

var path = require('path');
var conf = global.NODE_FOAM_CONFIG;

global.FOAM_FLAGS = {
  js: true,
  web: true,
  node: true,
  java: true,
  swift: true,
};

foamFiles = [
  'foam2/src/foam.js',
  'foam2/src/foam/nanos/nanos.js',
];

// === Load FOAM files from configuration ===
conf.FOAM_FILES.forEach(thisPath => require(conf.PROJECT_HOME + thisPath));
var classloader = foam.__context__.classloader;
conf.CLASSPATHS.map(thisPath => conf.PROJECT_HOME + thisPath)
  .forEach(classloader.addClassPath.bind(classloader));
var old = global.FOAM_FLAGS.src;
var oldRoot = global.FOAM_ROOT;
conf.PROJECT_FILES.forEach(thisPath => {
  conf.CLASSPATHS.forEach(classPath => {
    if ( thisPath.startsWith(classPath) ) {
      global.FOAM_FLAGS.src = path.normalize(
        conf.PROJECT_HOME + classPath) + '/';
    }
  });
  require(conf.PROJECT_HOME + thisPath);
})
global.FOAM_FLAGS.src = old;
global.FOAM_ROOT = oldRoot;
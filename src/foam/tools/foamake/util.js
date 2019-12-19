const fs = require('fs');
const cproc = require('child_process');

foam.LIB({
  name: 'foam.tools.foamake.util',

  methods: [
    function rmdir(path) {
      if ( fs.lstatSync(path).isDirectory() ) {
        cproc.execFileSync('rm', ['-rf', path]);
      }
    },

    function rmfile(path) {
      if ( fs.lstatSync(path).isFile() ) {
        cproc.execFileSync('rm', ['-f', path]);
      }
    }
  ]
});
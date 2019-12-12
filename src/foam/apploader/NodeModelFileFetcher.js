/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.apploader',
  name: 'NodeModelFileFetcher',
  properties: [
    'root',
  ],
  methods: [
    function getFile(id) {
      console.log(">>>" + id);
      var self = this;
      return new Promise(function(ret, err) {
        var sep = require('path').sep;
        var path = self.root + sep + id.replace(/\./g, sep) + '.js';
        if (
          id.includes('genjavatest')
        ) {
          console.log(
            "\033[32;1m" +
            path + " -> " +
            id +
            "\033[0m");
          process.exit(1);
        }
        try {
          var js = require('fs').readFileSync(path, 'utf8');
          ret(js);
        } catch(e) {
          ret(null);
        }
      });
    },
  ]
});

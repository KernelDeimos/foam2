/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.foamlink',
  name: 'FoamlinkNodeModelFileFetcher',
  properties: [
    'root',
    'foamlinkData_'
  ],
  methods: [
    function init() {
      // TODO: error handling in this method
      var dataFile = foam.foamlink.dataFile;
      var dataText = require('fs').readFileSync(dataFile, 'utf8');
      this.foamlinkData_ = JSON.parse(dataText);
    },
    function getFile(id) {
      console.log(">>>foamlink>>>" + id);
      var self = this;
      return new Promise(function(ret, err) {
        var path = self.foamlinkData_.classesToFiles[id];
        if ( path === undefined ) {
          ret(null);
          return;
        }
        try {
          var js = require('fs').readFileSync(path, 'utf8');
          console.log('ye');
          ret(js);
        } catch(e) {
          console.error(e);
          ret(null);
        }
      });
    },
  ]
});

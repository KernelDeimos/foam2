foam.CLASS({
  package: 'foam.foamlink',
  name: 'FoamlinkWebModelFileFetcher',
  requires: [
    'foam.net.HTTPRequest'
  ],
  properties: [
    {
      // TODO: either copy this preSet to each NodeModelFileFetcher or eliminate from each WebModelFileFetcher.
      name: 'root',
      preSet: function(_, a) {
        if ( a.endsWith('/') )
          a = a.substring(0, a.lastIndexOf('/'));
        
        return a;
      }
    },
    'foamlinkData_',
    'foamlinkDataPromise_'
  ],
  methods: [
    function init() {
      console.log('FETCHER INITED');
      // TODO: error handling in this method
      var dataFile = foam.foamlink.dataFile;
      this.foamlinkDataPromise_ = this.HTTPequest.create({
        method: 'GET',
        url: dataFile
      }).send().then(function(payload) {
        return payload.resp.text().then((text) => {
          this.foamlinkData_ = JSON.parse(text);
          // console.log(this.foamlinkData_);
        });
      }).catch((e) => {
        console.error(e);
      });
    },
    function getFile(id) {
      var self = this;
      return this.foamlinkDataPromise_.then(() => {
        self.getFile_(id);
      });
    },
    function getFile_(id) {
      var path = self.foamlinkData_.classesToFiles[id];
      if ( path === undefined ) {
        console.log('REALLY NOT FOUND');
        console.log(id);
        ret(null);
        return;
      }
      return this.HTTPRequest.create({
        method: 'GET',
        url: this.root + '/' + path
      }).send().then(function(payload) {
        return payload.resp.text();
      });
    },
  ]
});
// TODO: DRY init and first part of getFile after merge
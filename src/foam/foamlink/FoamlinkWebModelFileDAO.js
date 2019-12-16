foam.CLASS({
  package: 'foam.foamlink',
  name: 'FoamlinkWebModelFileDAO',
  extends: 'foam.dao.ProxyDAO',
  requires: [
    'foam.apploader.ModelFileDAO',
    'foam.foamlink.FoamlinkWebModelFileFetcher',
  ],
  imports: [
    'window',
  ],
  properties: [
    'root',
    {
      name: 'delegate',
      expression: function(root) {
        return this.ModelFileDAO.create({
          fetcher: this.FoamlinkWebModelFileFetcher.create({root: root}), });
      },
    },
  ],
});


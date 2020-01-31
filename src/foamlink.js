// === Files in this section do not contain FOAM models

IGNORE('lib/dao_test.js');
// TODO: when genJava allows: IGNORE('com/google/foam/demos');
IGNORE('com/google/net/proto_gen.js');
IGNORE('com/google/foam/demos/tabata/main.js');
IGNORE('com/google/foam/experimental/Promise_test.js');

// these files depend on global objects and should not be loaded by foamlink
IGNORE('com/google/foam/demos/u2');

// Tests should not be included by Foamlink
IGNORE('test');

// === Files in this section should be processed by foamlink
//     but cannot be due to code invoked during loading

// foamlink proxy value can't be used as primitive
MANUAL('foam/swift/dao/CachingDAO.js', [
  'foam.swift.dao.CachingDAO'
]);
MANUAL('foam/swift/ui/DAOTableViewSource.js', [
  'foam.swift.ui.DAOTableViewSource'
]);

foam.CLASS({
  package: 'foam.nanos.mrac',
  name: 'OrderMedusaBuffer',
  implements: ['foam.nanos.mrac.MedusaBuffer'],

  javaImports: [
    'java.util.concurrent.ConcurrentHashMap',
    'java.util.HashMap',
    'java.util.Map',
    'java.util.concurrent.atomic.AtomicLong',
  ],

  properties: [
    {
      name: 'delegate',
      class: 'FObjectProperty',
      of: 'foam.nanos.mrac.MedusaBuffer'
    },
    {
      name: 'possibleNextIndices',
      class: 'Map',
      javaType: 'Map<Long,MedusaNodeOutputRecord>',
      javaFactory: `
        return new ConcurrentHashMap<Long,MedusaNodeOutputRecord>();
      `
    },
    {
      name: 'currentIndex',
      class: 'Object',
      javaType: 'AtomicLong',
      javaFactory: `
        return new AtomicLong(-1);
      `
    }
  ],

  methods: [
    {
      name: 'put',
      javaCode: `
        synchronized ( getCurrentIndex() ) {
          long nextIndex = getCurrentIndex().get() + 1;
          if ( nextIndex == record.getGlobalIndex() ) {
            getDelegate().put(record);
            while ( true ) {
              nextIndex++;
              getCurrentIndex().getAndIncrement();
              if ( getPossibleNextIndices().containsKey(nextIndex) ) {
                getDelegate().put(getPossibleNextIndices().get(nextIndex));
              } else {
                break;
              }
            }
          } else {
            getPossibleNextIndices().put(record.getGlobalIndex(), record);
          }
        }
      `
    }
  ]
});

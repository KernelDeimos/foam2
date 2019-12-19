foam.CLASS({
  package: 'foam.nanos.mrac',
  name: 'ThresholdMedusaBuffer',
  implements: ['foam.nanos.mrac.MedusaBuffer'],

  javaImports: [
    'java.util.concurrent.ConcurrentHashMap',
    'java.util.HashMap',
    'java.util.Map',
    'java.util.Set',
    'java.util.Collections',
  ],

  properties: [
    {
      name: 'threshold',
      class: 'Int'
    },
    {
      name: 'delegate',
      class: 'FObjectProperty',
      of: 'foam.nanos.mrac.MedusaBuffer'
    },
    {
      name: 'recordIndexToHashToCount',
      class: 'Map',
      javaType: 'Map<Long,Map<String,Integer>>',
      documentation: `
        This map stores hashes received for a particular global index.
        Key for outer map is global index, key for inner map is a hash that
        was received for it, and the value is the number of times that hash
        was received for this global offset.
      `,
      javaFactory: `
        return new ConcurrentHashMap<Long,Map<String,Integer>>();
      `
    },
    {
      name: 'recordIndexToHashToRecord',
      class: 'Map',
      javaType: 'Map<Long,Map<String,MedusaNodeOutputRecord>>',
      javaFactory: `
        return new ConcurrentHashMap<Long,Map<String,MedusaNodeOutputRecord>>();
      `
    },
    {
      name: 'recordIndexToAlreadyPut',
      class: 'Map',
      javaType: 'Set<Long>',
      javaFactory: `
        return Collections.newSetFromMap(new ConcurrentHashMap<Long,Boolean>());
      `
    },
  ],

  methods: [
    {
      name: 'put',
      javaCode: `
        Map<String,Integer> hashToCount = getRecordIndexToHashToCount().get(
          record.getGlobalIndex());
        
        // If hashToCount doesn't exist, create hashToCount and hashToRecord
        synchronized ( this ) {
          if ( hashToCount == null ) {
            hashToCount = new HashMap<String,Integer>();
            hashToCount.put(record.getHashObject(), 0);
            Map<String,MedusaNodeOutputRecord> hashToRecord =
              new HashMap<String,MedusaNodeOutputRecord>();
            hashToRecord.put(record.getHashObject(), record);
            getRecordIndexToHashToCount().put(record.getGlobalIndex(), hashToCount);
            getRecordIndexToHashToRecord().put(record.getGlobalIndex(), hashToRecord);
          }
        }

        synchronized ( hashToCount ) {
          if ( getRecordIndexToAlreadyPut().contains(record.getGlobalIndex()) ) {
            return;
          }

          Map<String,MedusaNodeOutputRecord> hashToRecord =
            getRecordIndexToHashToRecord().get(record.getGlobalIndex());
          Integer count = hashToCount.get(record.getHashObject());

          // If this hash hasn't been counted yet, add missing map entry
          if ( count == null ) {
            hashToRecord.put(record.getHashObject(), record);
            count = new Integer(0);
          }
          hashToCount.put(record.getHashObject(), count.intValue() + 1);

          int maxCount = 0;
          int totalCount = 0;
          boolean maxIsTied = false;
          MedusaNodeOutputRecord maxRecord = null;
          for ( Map.Entry<String, Integer> entry : hashToCount.entrySet() ) {
            if ( entry.getValue() > maxCount ) {
              maxRecord = hashToRecord.get(entry.getKey());
              maxCount = entry.getValue().intValue();
              maxIsTied = false;
            } else if ( entry.getValue() == maxCount ) {
              maxIsTied = true;
            }
            totalCount += entry.getValue().intValue();
          }

          if ( totalCount < getThreshold() ) {
            return;
          }

          if ( maxIsTied ) {
            // TODO: alert someone; this would be a big problem
            return;
          }

          getRecordIndexToAlreadyPut().add(record.getGlobalIndex());
          getDelegate().put(maxRecord);
        }
      `
    }
  ]
});
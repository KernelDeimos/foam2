/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.mrac.test',
  name: 'MockMedusaBuffer',
  implements: ['foam.nanos.mrac.MedusaBuffer'],

  javaImports: [
    'java.util.Collections',
    'java.util.HashMap',
    'java.util.Set',
    'java.util.List',
    'java.util.ArrayList',

    'foam.nanos.mrac.MedusaNodeOutputRecord'
  ],

  properties: [
    {
      name: 'observedHashObjects',
      class: 'Map',
      javaType: 'Set<String>',
      javaFactory: `
        return Collections.newSetFromMap(new HashMap<String,Boolean>());
      `
    },
    {
      name: 'indexOrder',
      class: 'List',
      javaType: 'List<Long>',
      javaFactory: `
        return new ArrayList<Long>();
      `
    }
  ],

  methods: [
    {
      name: 'put',
      javaCode: `
        getObservedHashObjects().add(record.getHashObject());
        getIndexOrder().add(record.getGlobalIndex());
      `
    }
  ]
});

foam.CLASS({
  package: 'foam.nanos.mrac.test',
  name: 'TestFileGenerator',

  javaImports: [
    'java.io.RandomAccessFile',
    'java.nio.ByteBuffer',
    'java.nio.channels.FileChannel',
    'java.nio.charset.StandardCharsets',
  ],

  methods: [
    {
      name: 'writeTestFile',
      args: [
        { name: 'path', type: 'String' },
        {
          name: 'testRecordIndices',
          type: 'int[]',
          documentation: `
            A parallel array (with testRecords) of the value of globalId to be associated with the record. Duplicates are allowed as medusa is supposed to perform a check that the records are consistent.
          `
        },
        {
          name: 'testRecords',
          type: 'String[][]',
          documentation: `
            The outer array contains a String[] for each record to be stored. The inner array contains two String values; the first one represents the record being stored, and the second represents a hash for the record if provided.
          `
        }
      ],
      javaThrows: ['java.io.IOException'],
      javaCode: `
        RandomAccessFile channelRAF =
          new RandomAccessFile(path, "rw");
        FileChannel channel = channelRAF.getChannel();
        channel.position(0);
        ByteBuffer buf = null;
        buf = ByteBuffer.allocate(8*2);
        buf.putLong(1); // version
        buf.putLong(testRecordIndices.length); // number of records
        buf.flip();
        channel.write(buf);
        long indexes[] = {0,4,2,1,3,5};

        long offsetSoFar = 0;
        long expectedDataOffset = 0;

        for ( int i=0; i < testRecordIndices.length; i++ ) {
          channel.position(8*2 + offsetSoFar);
          buf = ByteBuffer.allocate(8*5);
          buf.putLong(testRecordIndices[i]); // global index
          buf.putLong(expectedDataOffset);
          buf.putLong(testRecords[i][0].length());
          buf.putLong(expectedDataOffset + testRecords[i][0].length());
          buf.putLong(testRecords[i][1].length());
          buf.flip();
          channel.write(buf);
          expectedDataOffset += testRecords[i][0].length() +
            testRecords[i][1].length();
          offsetSoFar += 8*5;
        }

        for ( int i=0; i < testRecordIndices.length; i++ ) {
          channel.position(8*2 + offsetSoFar);
          buf = StandardCharsets.UTF_8.encode(testRecords[i][0]);
          channel.write(buf);
          buf = StandardCharsets.UTF_8.encode(testRecords[i][1]);
          channel.write(buf);
          offsetSoFar += testRecords[i][0].length() +
            testRecords[i][1].length();
        }

        channelRAF.close();
      `
    }
  ]
});
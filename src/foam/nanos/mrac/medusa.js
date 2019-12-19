/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.mrac',
  name: 'MedusaNodeOutputRecord',

  properties: [
    {
      name: 'globalIndex',
      class: 'Long'
    },
    {
      name: 'record',
      class: 'String'
    },
    {
      name: 'hashObject',
      class: 'String'
    }
  ]
})

foam.INTERFACE({
  package: 'foam.nanos.mrac',
  name: 'MedusaBuffer',

  // TODO: maybe this can be a foam.dao.Sink

  methods: [
    {
      name: 'put',
      args: [
        { name: 'record', type: 'MedusaNodeOutputRecord' }
      ]
    }
  ]
});

foam.CLASS({
  package: 'foam.nanos.mrac',
  name: 'MedusaNodeOutputBlock',

  documentation: `
    MedusaNodeOutputBlock stores JSON objects with meta information attached in
    a binary format. The purpose is to allow quick reads of global indexes and
    hash objects before the record's JSON data is processed.
  `,

  javaImports: [
    'java.nio.channels.FileChannel',
    'java.nio.ByteBuffer',
    'java.nio.charset.StandardCharsets',
  ],

  constants: [
    {
      name:'MEDUSA_HEADER_SIZE',
      type: 'int',
      value: 2*8,
    },
    {
      name:'MEDUSA_RECORD_SIZE',
      type: 'int',
      value: 8 + 2*2*8,
    }
  ],

  properties: [
    {
      class: 'Object',
      javaType: `FileChannel`,
      name: 'data'
    },
    {
      class: 'FObjectProperty',
      of: 'foam.nanos.mrac.MedusaBuffer',
      name: 'listener'
    }
  ],

  methods: [
    {
      name: 'parseBlock',
      javaThrows: ['java.io.IOException'],
      javaCode: `
        int readSize = -2;
        ByteBuffer buf = null;
        getData().position(0);

        // Read protocol version and number of records
        buf = ByteBuffer.allocate(MEDUSA_HEADER_SIZE);
        readSize = getData().read(buf);
        if ( readSize != MEDUSA_HEADER_SIZE ) {
          // TODO: handle format error
          System.err.println("TODO: handle format error (MEDUSA_HEADER)");
          System.exit(1);
        }
        buf.flip();
        long version = buf.getLong();
        long numRecords = buf.getLong();

        if ( version != 1 ) {
          // TODO: handle version error
          System.err.println("TODO: handle version error");
          System.exit(1);
        }

        int recordHeaderSectionSize = MEDUSA_RECORD_SIZE * (int)numRecords;
        buf = ByteBuffer.allocate(recordHeaderSectionSize);
        readSize = getData().read(buf);
        if ( readSize != recordHeaderSectionSize ) {
          // TODO: handle format error
          System.err.println("TODO: handle format error (MEDUSA_RECORD_HEADER)");
          System.exit(1);
        }
        buf.flip();

        long dataSectionStart = MEDUSA_HEADER_SIZE + recordHeaderSectionSize;
        // At this point it is safe to use RANDOM ACCESS on this.data!

        for ( int i = 0; i < numRecords; i++ ) {
          long globalIndex = buf.getLong();
          long dataOffset = buf.getLong();
          long dataLength = buf.getLong();
          long hashOffset = buf.getLong();
          long hashLength = buf.getLong();

          ByteBuffer bufLocal = null;

          // Read record data into string
          bufLocal = ByteBuffer.allocate((int) dataLength);
          getData().position(dataSectionStart + dataOffset);
          getData().read(bufLocal);
          bufLocal.flip();
          String recordData = StandardCharsets.UTF_8.decode(bufLocal).toString();

          // Read record hash object into string
          bufLocal = ByteBuffer.allocate((int) hashLength);
          getData().position(dataSectionStart + hashOffset);
          getData().read(bufLocal);
          bufLocal.flip();
          String recordHashObject = StandardCharsets.UTF_8.decode(bufLocal).toString();

          getListener().put(new MedusaNodeOutputRecord.Builder(getX())
            .setGlobalIndex(globalIndex)
            .setRecord(recordData)
            .setHashObject(recordHashObject)
            .build());
        }
      `
    }
  ]
});

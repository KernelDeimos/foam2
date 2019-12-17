/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.nanos.mrac',
  name: 'MedusaNodeOutputBlockListener',

  methods: [
    {
      name: 'onMedusaDataRecord',
      args: [
        { name: 'globalOffset', type: 'Long' },
        { name: 'recordData', type: 'String' }
      ]
    }
  ]
});

foam.CLASS({
  package: 'foam.nanos.mrac',
  name: 'MedusaNodeOutputBlock',

  javaImports: [
    'java.nio.channels.FileChannel',
    'java.nio.ByteBuffer',
    'java.nio.charset.StandardCharsets',
  ],

  constants: {
    'MEDUSA_HEADER_SIZE': 2*8,
    'MEDUSA_RECORD_SIZE': 8 + 2*2*8
  },

  properties: [
    {
      javaType: `FileChannel`,
      name: 'data'
    },
    {
      class: 'FObjectProperty',
      of: 'foam.nanos.mrac.MedusaNodeOutputBlockListener',
      name: 'listener'
    }
  ],

  methods: [
    {
      name: 'parseBlock',
      javaCode: `
        int readSize = -2;
        ByteBuffer buf = null;
        data.position(0);

        // Read protocol version and number of records
        buf = ByteBuffer.allocate(MEDUSA_HEADER_SIZE);
        readSize = data.read(buf, 0, MEDUSA_HEADER_SIZE);
        if ( readSize != MEDUSA_HEADER_SIZE ) {
          // TODO: handle format error
          System.err.println("TODO: handle format error (MEDUSA_HEADER)");
          System.exit(1);
        }
        long version = buf.getLong();
        long numRecords = buf.getLong();

        if ( version !== 0 ) {
          // TODO: handle version error
          System.err.println("TODO: handle version error");
          System.exit(1);
        }

        int recordHeaderSectionSize = MEDUSA_RECORD_SIZE * numRecords;
        buf = ByteBuffer.allocate(recordHeaderSectionSize);
        readSize = data.read(buf, 0, recordHeaderSectionSize);
        if ( readSize != recordHeaderSectionSize ) {
          // TODO: handle format error
          System.err.println("TODO: handle format error (MEDUSA_RECORD_HEADER)");
          System.exit(1);
        }

        long dataSectionStart = MEDUSA_HEADER_SIZE + recordHeaderSectionSize;
        // At this point it is safe to use RANDOM ACCESS on this.data!

        for ( int i = 0; i < numRecords; i++ ) {
          long globalIndex = buf.getLong();
          long dataOffset = buf.getLong();
          long dataLength = buf.getLong();
          long hashOffset = buf.getLong();
          long hashLength = buf.getLong();

          // Read record data into string
          buf = ByteBuffer.allocate((int) dataLength);
          data.position(dataSectionStart + dataOffset);
          buf.read(buf, 0, dataLength);
          String recordData = StandardCharsets.UTF_8.decode(buf).toString();

          // Read record hash object into string
          buf = ByteBuffer.allocate((int) hashLength);
          data.position(dataSectionStart + hashOffset);
          buf.read(buf, 0, hashLength);
          String recordHashObject = StandardCharsets.UTF_8.decode(buf).toString();

          listener.onMedusaDataRecord(globalIndex, recordData);
        }
      `
    }
  ]
});

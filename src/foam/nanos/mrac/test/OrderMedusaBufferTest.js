foam.CLASS({
  package: 'foam.nanos.mrac.test',
  name: 'OrderMedusaBufferTest',
  extends: 'foam.nanos.test.Test',

  javaImports: [
    'java.io.RandomAccessFile',
    'java.nio.channels.FileChannel',
    'java.util.List',

    'foam.nanos.mrac.MedusaBuffer',
    'foam.nanos.mrac.OrderMedusaBuffer',
    'foam.nanos.mrac.MedusaNodeOutputBlock',
    'foam.nanos.mrac.MedusaNodeOutputRecord'
  ],

  methods: [
    {
      name: 'runTest',
      javaCode: `
        try {
          TestFileGenerator testgen = new TestFileGenerator();

          testgen.writeTestFile(
            "/tmp/test_order_buffer.mrac",
            new int[]{0,2,4,3,1,6,5,8,7},
            new String[][]{
              new String[]{"e0","h0"},
              new String[]{"e2","h2"},
              new String[]{"e4","h4"},
              new String[]{"e3","h3"},
              new String[]{"e1","h1"},
              new String[]{"e6","h6"},
              new String[]{"e5","h5"},
              new String[]{"e8","h8"},
              new String[]{"e7","h7"},
            }
          );

          RandomAccessFile channelRAF =
            new RandomAccessFile("/tmp/test_order_buffer.mrac", "r");
          FileChannel channel = channelRAF.getChannel();

          MockMedusaBuffer mockMedusaBuffer = new MockMedusaBuffer();

          String testOutput = "";
          MedusaNodeOutputBlock testOutputBlock =
            new MedusaNodeOutputBlock.Builder(getX())
              .setData(channel)
              .setListener(new OrderMedusaBuffer.Builder(getX())
                .setDelegate((MedusaBuffer) mockMedusaBuffer)
                .build())
              .build();
          testOutputBlock.parseBlock();

          List<Long> indexOrder = mockMedusaBuffer.getIndexOrder();

          long expectedOrder[] = {0,1,2,3,4,5,6,7,8};

          test(
            indexOrder.size() == expectedOrder.length,
            "output has correct number of elements"
          );

          boolean orderOK = true;
          for ( int i=0; i < expectedOrder.length; i++ ) {
            if ( indexOrder.get(i).longValue() != expectedOrder[i] ) {
              orderOK = false;
              break;
            }
          }

          test(orderOK, "output is in correct order");
        } catch (Exception e) {
          throw new RuntimeException(e);
        }
      `
    }
  ]
});
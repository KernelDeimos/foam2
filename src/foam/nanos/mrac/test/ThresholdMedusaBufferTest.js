foam.CLASS({
  package: 'foam.nanos.mrac.test',
  name: 'ThresholdMedusaBufferTest',
  extends: 'foam.nanos.test.Test',

  javaImports: [
    'java.io.RandomAccessFile',
    'java.nio.channels.FileChannel',
    'java.util.Set',

    'foam.nanos.mrac.MedusaBuffer',
    'foam.nanos.mrac.ThresholdMedusaBuffer',
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
            "/tmp/test_threshold_buffer.mrac",
            new int[]{0,0,0,0,1,1,1,2,2,3,3,3},
            new String[][]{
              // Should be added once only
              new String[]{"e0","h0"},
              new String[]{"e0","h0"},
              new String[]{"e0","h0"},
              new String[]{"e0","h0"},
              // Should be added with h1
              new String[]{"e1","h1"},
              new String[]{"e1","h1"},
              new String[]{"e1","hx"},
              // Should be ignored
              new String[]{"e2","h2"},
              new String[]{"e2","h2"},
              // Should be ignored
              new String[]{"e3","hw"},
              new String[]{"e3","hy"},
              new String[]{"e3","hz"},
            }
          );

          RandomAccessFile channelRAF =
            new RandomAccessFile("/tmp/test_threshold_buffer.mrac", "r");
          FileChannel channel = channelRAF.getChannel();

          MockMedusaBuffer mockMedusaBuffer = new MockMedusaBuffer();

          String testOutput = "";
          MedusaNodeOutputBlock testOutputBlock =
            new MedusaNodeOutputBlock.Builder(getX())
              .setData(channel)
              .setListener(new ThresholdMedusaBuffer.Builder(getX())
                .setThreshold(3)
                .setDelegate((MedusaBuffer) mockMedusaBuffer)
                .build())
              .build();
          testOutputBlock.parseBlock();

          Set<String> observedHashObjects = mockMedusaBuffer.getObservedHashObjects();

          // Note: it is intentional that order doesn't matter
          test(
            observedHashObjects.contains("h0") &&
            observedHashObjects.contains("h1") &&
            observedHashObjects.size() == 2,
            "ThresholdMedusaBuffer adds expected entries"
          );
        } catch (Exception e) {
          throw new RuntimeException(e);
        }
      `
    }
  ]
});
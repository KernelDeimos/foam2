/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

var sampleData = {
  'cron': (id) => (`["cronDAO","p",{"class":"foam.nanos.cron.Cron","id":"`+id+`"}]`).replace(/"/g, `\\"`)
};

foam.CLASS({
  package: 'foam.nanos.mrac',
  name: 'ManualTest',

  javaImports: [
    'java.io.RandomAccessFile',
    'java.nio.ByteBuffer',
    'java.nio.channels.FileChannel',
    'java.nio.charset.StandardCharsets',
  ],

  methods: [
    {
      name: 'writeTestFile1',
      javaCode: `
        RandomAccessFile channelRAF =
          new RandomAccessFile("/tmp/testmsg", "w");
        FileChannel channel = channelRAF.getChannel();
        ByteBuffer buf = null;
        buf = ByteBuffer.allocate(8*2);
        buf.putLong(0); // version
        buf.putLong(6); // number of records
        channel.write(buf, 0, 16);
        long indexes[] = {0,4,2,1,3,5};
        String testStrings[] = new String [6];
        testStrings[0] = "`+sampleData['cron']('test1')+`";
        testStrings[1] = "`+sampleData['cron']('test2')+`";
        testStrings[2] = "`+sampleData['cron']('test3')+`";
        testStrings[3] = "`+sampleData['cron']('test4')+`";
        testStrings[4] = "`+sampleData['cron']('test5')+`";
        testStrings[5] = "`+sampleData['cron']('test6')+`";

        long offsetSoFar = 0;

        for ( int i=0; i < 6; i++ ) {
          buf = ByteBuffer.allocate(8*5);
          buf.putLong(indexes[i]); // global index
          buf.putLong(offsetSoFar);
          buf.putLong(testStrings[i].length);
          buf.putLong(0);
          buf.putLong(0);
          offsetSoFar += testStrings[i].length);
          channel.write(buf, 8*5);
        }

        for ( int i=0; i < 6; i++ ) {
          buf = StandardCharsets.UTF_8.encode(testStrings[i]);
          channel.write(buf);
        }
      `
    }
  ]
});
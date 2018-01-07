/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.blob;

import foam.core.X;
import foam.lib.json.JSONParser;
import org.apache.commons.io.IOUtils;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;

public class RestBlobService
    extends AbstractBlobService
{
  public static final int BUFFER_SIZE = 8192;

  protected String address_;
  
  public RestBlobService(foam.core.X x, String address) {
    setX(x);
    this.address_ = address + "/service/httpBlobService";
  }

  public String getAddress() {
    return address_;
  }

  @Override
  public Blob put_(X x, Blob blob) {
    if ( blob instanceof IdentifiedBlob ) {
      return blob;
    }
    HttpURLConnection connection = null;
    OutputStream os = null;
    InputStream is = null;

    try {
      URL url = new URL(address_);
      connection = (HttpURLConnection) url.openConnection();

      //configure HttpURLConnection
      connection.setConnectTimeout(5 * 1000);
      connection.setReadTimeout(5 * 1000);
      connection.setDoOutput(true);
      connection.setUseCaches(false);

      //set request method
      connection.setRequestMethod("PUT");

      //configure http header
      connection.setRequestProperty("Accept", "*/*");
      connection.setRequestProperty("Connection", "keep-alive");
      connection.setRequestProperty("Content-Type", "application/octet-stream");

      //output blob into connection
      long chunk = 0;
      long size = blob.getSize();
      long chunks = (long) Math.ceil((double) size / (double) BUFFER_SIZE);
      Buffer buffer = new Buffer(BUFFER_SIZE, ByteBuffer.allocate(BUFFER_SIZE));
      os = connection.getOutputStream();

      while ( chunk < chunks ) {
        buffer = blob.read(buffer, chunkOffset(chunk));
        byte[] buf = buffer.getData().array();
        os.write(buf, 0, (int) buffer.getLength());
        buffer.getData().clear();
        chunk++;
      }

      os.flush();

      if ( connection.getResponseCode() != HttpURLConnection.HTTP_OK ) {
        throw new RuntimeException("Upload failed");
      }

      is = connection.getInputStream();
      BufferedReader  reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
      CharBuffer cb = CharBuffer.allocate(65535);
      reader.read(cb);
      cb.rewind();

      return (Blob) getX().create(JSONParser.class).parseString(cb.toString(), IdentifiedBlob.class);
    } catch ( Throwable t ) {
      throw new RuntimeException(t);
    } finally {
      closeSource(is, os, connection);
    }
  }

  @Override
  public Blob find_(X x, Object id) {
    InputStream is = null;
    ByteArrayOutputStream os = null;
    HttpURLConnection connection = null;

    try {
      URL url = new URL(this.address_ + "/" + id.toString());
      connection = (HttpURLConnection) url.openConnection();

      connection.setRequestMethod("GET");
      connection.connect();

      if ( connection.getResponseCode() != HttpURLConnection.HTTP_OK ||
          connection.getContentLength() == -1 ) {
        throw new RuntimeException("Failed to find blob");
      }

      is = new BufferedInputStream(connection.getInputStream());
      os = new ByteArrayOutputStream();

      int read = 0;
      byte[] buffer = new byte[BUFFER_SIZE];
      while ( (read = is.read(buffer, 0, BUFFER_SIZE)) != -1 ) {
        os.write(buffer, 0, read);
      }

      return new BlobBlob(os.toByteArray());
    } catch ( Throwable t ) {
      throw new RuntimeException(t);
    } finally {
      closeSource(is, os, connection);
    }
  }

  @Override
  public String urlFor_(X x, Blob blob) {
    if ( ! (blob instanceof IdentifiedBlob) ) {
      return null;
    }
    return this.address_ + "/" + ((IdentifiedBlob) blob).getId();
  }

  private long chunkOffset(long i) {
    return i * BUFFER_SIZE;
  }

  private void closeSource(InputStream is, OutputStream os, HttpURLConnection connection) {
    IOUtils.closeQuietly(os);
    IOUtils.closeQuietly(is);
    IOUtils.close(connection);
  }
}
package foam.nanos.crunch;

import java.util.ArrayList;
import foam.nanos.auth.AuthorizationException;

public class CapabilityRuntimeException extends AuthorizationException {
  private ArrayList<String> capabilities;

  private void init() {
    capabilities = new ArrayList<String>();
  }

  public CapabilityRuntimeException() {
    super();
    init();
  }

  public CapabilityRuntimeException(String message) {
    super(message);
    init();
  }

  public ArrayList<String> getCapabilities() {
    return capabilities;
  }

  public void addCapabilityId(String capabilityId) {
    capabilities.add(capabilityId);
  }
}
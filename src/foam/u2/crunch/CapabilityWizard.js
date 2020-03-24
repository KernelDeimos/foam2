foam.INTERFACE({
  package: 'foam.u2.crunch',
  name: 'CapabilityWizard',
  documentation: `
    This interface defines requirements for a wizard to be understood by
    CrunchController.
  `,

  properties: [
    {
      name: 'capabilityWizardExitPromise',
      class: 'Promised',
      of: 'foam.u2.crunch.CapabilityWizardExitInfo'
    }
  ]
})

// Abstract class for all CapabilityWizardExitInfo
foam.CLASS({
  package: 'foam.u2.crunch',
  name: 'CapabilityWizardExitInfo',
  abstract: true,
  documentation: `
    Information provided by the capability wizard after it closes.
  `
});

foam.CLASS({
  package: 'foam.u2.crunch',
  name: 'CapabilityWizardExitAquired',
  extends: 'foam.u2.crunch.CapabilityWizardExitInfo',
  documentation: `
    Capability was aquired immediately.
  `
});
foam.CLASS({
  package: 'foam.u2.crunch',
  name: 'CapabilityWizardExitPending',
  extends: 'foam.u2.crunch.CapabilityWizardExitInfo',
  documentation: `
    Capability is pending. A message for the user is included.
  `,
  properties: [ { name: 'message', class: 'String' } ]
});
foam.CLASS({
  package: 'foam.u2.crunch',
  name: 'CapabilityWizardExitCancelled',
  extends: 'foam.u2.crunch.CapabilityWizardExitInfo'
});
foam.CLASS({
  package: 'foam.u2.crunch',
  name: 'CapabilityWizardExitError',
  extends: 'foam.u2.crunch.CapabilityWizardExitInfo',
  documentation: `
    Wizard encountered an error and needed to quit. This is
    distinguished from 'Cancelled' because future work could
    allow CrunchController to retry the wizard a limited
    number of times and then redirect the user to assistance.
  `,
  properties: [
    {
      name: 'message',
      class: 'String'
    },
    {
      name: 'retry',
      class: 'Boolean'
    }
  ]
});

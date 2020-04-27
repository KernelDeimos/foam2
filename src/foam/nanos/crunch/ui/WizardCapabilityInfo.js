foam.CLASS({
  package: 'foam.nanos.crunch.ui',
  name: 'WizardCapabilityInfo',

  properties: [
    {
      name: 'of',
      class: 'Class',
    },
    {
      name: 'daoKey',
      class: 'String'
    },
    {
      name: 'arg',
      class: 'String'
    },
    {
      name: 'data',
      class: 'FObjectProperty',
      of: 'foam.core.FObject'
    }
  ]
});
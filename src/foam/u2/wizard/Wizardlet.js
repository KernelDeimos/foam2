foam.INTERFACE({
  package: 'foam.u2.wizard',
  name: 'Wizardlet',

  properties: [
    {
      name: 'of',
      class: 'Class'
    },
    {
      name: 'data'
    }
  ],

  methods: [
    {
      name: 'save'
    },
    {
      name: 'readyToSubmit',
      type: 'boolean'
    }
  ]
});

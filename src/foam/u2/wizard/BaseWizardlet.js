foam.CLASS({
  package: 'foam.u2.wizard',
  name: 'BaseWizardlet',

  implements: [
    'foam.u2.wizard.Wizardlet'
  ],

  methods: [
    {
      name: 'readyToSubmit',
      code: function () {
        if ( ! this.of ) return true;
        if ( ! this.data || this.data.errors_ ) return false;
        return true;
      }
    }
  ]
});

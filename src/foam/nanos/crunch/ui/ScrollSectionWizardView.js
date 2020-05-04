/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.crunch.ui',
  name: 'ScrollSectionWizardView',
  extends: 'foam.u2.detail.MultipleModelSectionedDetailView',

  documentation: `Simply displays "sections" consecutively.`,

  imports: [
    'notify',
    'stack'
  ],

  implements: [
    'foam.mlang.Expressions'
  ],

  css: `
    ^ {
      margin: 30px;
    }
  `,

  requires: [
    'foam.nanos.crunch.Capability',
    'foam.nanos.crunch.UserCapabilityJunction'
  ],

  properties: [
    {
      class: 'String',
      name: 'title'
    },
    {
      class: 'DateTime',
      name: 'lastUpdate'
    },
    {
      class: 'foam.u2.ViewSpec',
      name: 'sectionView',
      value: { class: 'foam.u2.detail.SectionView' }
    },
    {
      class: 'Boolean',
      name: 'isErrorFree',
      expression: function(sectionsList) {
        var check = true;
        sectionsList.forEach((m) => {
          if ( m.data.errors_ ) {
            check = false;
          }
        });
        return check;
      }
    },
    {
      name: 'testProp',
      class: 'FObjectProperty',
      of: 'net.nanopay.crunch.onboardingModels.BusinessInformationData',
      factory: () => {
        var val = net.nanopay.crunch.onboardingModels.BusinessInformationData.create({
          address: foam.nanos.auth.Address.create({
            address1: 'hello',
            address2: 'there',
            businessName: 'Test Name',
            operatingBusinessName: 'Operating As'
          })
        });
        return val;
      }
    }
  ],

  messages: [
    { name: 'SUCCESS_MSG', message: 'Information successfully submitted.' },
    { name: 'ERROR_MSG', message: 'Information was not successfully submitted, please try again later' },
    { name: 'ACTION_LABEL', message: 'Submit' },
  ],

  listeners: [
    {
      name: 'onDataUpdate',
      isFramed: true,
      code: function() {
        this.lastUpdate = new Date();
      }
    }
  ],

  methods: [
    function initE() {
      var self = this;
      this.SUPER();
      this.addClass(this.myClass());
      this.start('h1').add(this.title).end()
        .start()
        .add(this.slot(
          (sectionsList) => {
            return this.E().forEach(sectionsList,
              (dataEntry) => (dataEntry.sections).map(
                (section) => {
                  this.tag(foam.u2.detail.SectionView, {
                    section: section,
                    data$: self.testProp$,
                    debugProp: 'yes'
                  })
                }
              )
            );
          }
        ))
      .end()
      .startContext({ data: this })
        .tag(this.EXIT, { size: 'LARGE' })
        .callIfElse( this.isErrorFree,
          function() {
            self.tag(this.SAVE, { size: 'LARGE', label: this.ACTION_LABEL });
          },
          function() {
            self.tag(this.SAVE, { size: 'LARGE' });
          })
      .endContext();
    }
  ],

  actions: [
    {
      name: 'exit',
      confirmationRequired: true,
      code: function(x) {
        x.stack.back();
      }
    },
    {
      name: 'save',
      code: function(x) {
        var userCapabilityJunctionDAO = x.userCapabilityJunctionDAO;

        this.sectionsList.forEach((m, i) => {
          var ucj = foam.nanos.crunch.UserCapabilityJunction.create({
            sourceId: x.user.id,
            targetId: this.capsList[i],
            data: m.data
          });
          userCapabilityJunctionDAO.put_(x, ucj);
        });
        
        x.ctrl.notify('Your progress has been saved.');
        x.stack.back();
      }
    }
  ]
});

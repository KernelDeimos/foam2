/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.crunch.ui',
  name: 'ScrollSectionWizardView',
  extends: 'foam.u2.View',
  // extends: 'foam.u2.detail.MultipleModelSectionedDetailView',

  documentation: `Simply displays "sections" consecutively.`,

  imports: [
    'notify',
    'stack'
  ],

  implements: [
    'foam.mlang.Expressions'
  ],

  messages: [
    { name: 'ACTION_LABEL', message: 'Submit' },
    { name: 'SAVE_IN_PROGRESS', message: 'Saving...' },
    { name: 'ERROR_MSG', message: 'Information was not successfully submitted, please try again later' },
    { name: 'ERROR_MSG_DRAFT', message: 'An error occured while saving your progress.' },
    { name: 'SUCCESS_MSG', message: 'Information successfully submitted.' },
    { name: 'SUCCESS_MSG_DRAFT', message: 'Your progress has been saved.' },
  ],

  css: `
    ^ {
      margin: 30px;
    }
  `,

  requires: [
    'foam.nanos.crunch.Capability',
    'foam.nanos.crunch.UserCapabilityJunction',
    'foam.u2.detail.VerticalDetailView'
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
      name: 'sectionsList',
      class: 'FObjectArray',
      of: 'foam.nanos.crunch.ui.CapabilityWizardSection'
    },
    {
      class: 'Boolean',
      name: 'isErrorFree',
      expression: function(sectionsList) {
        var check = true;
        sectionsList.forEach((wizardSection) => {
          if ( ! wizardSection.of ) return true;
          if ( ! wizardSection.data || wizardSection.data.errors_ ) {
            check = false;
          }
        });
        return check;
      }
    }
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
      this.addClass(this.myClass());
      this.start('h1').add(this.title).end()
        .start()
        .add(this.slot(
          (sectionsList) => {
            return this.E().forEach(
              sectionsList.filter(section => section.of),
              wizardSection => {
                var subThis = this.startContext({});
                subThis.__subSubContext__.register(
                  this.VerticalDetailView,
                  'foam.u2.detail.SectionedDetailView'
                );
                subThis.tag(this.VerticalDetailView, {
                  data: wizardSection.data
                });
              }
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
        var p = Promise.resolve();

        this.sectionsList.reduce(
          (p, wizardSection) => p.then(() => wizardSection.save()), p
        ).then(() => {
          x.ctrl.notify(this.isErrorFree ? this.SUCCESS_MSG : this.SUCCESS_MSG_DRAFT);
          x.stack.back();
        }).catch(e => {
          x.ctrl.notify(
            (this.isErrorFree ? this.ERROR_MSG : this.ERROR_MSG_DRAFT)
            + ': ' + e
          );
        });
      }
    }
  ]
});

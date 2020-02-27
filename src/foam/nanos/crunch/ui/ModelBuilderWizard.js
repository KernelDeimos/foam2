

/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.crunch.ui',
  name: 'ModelBuilderWizard',
  extends: 'foam.u2.detail.MultipleModelAbstractSectionedDetailView',

  requires: [
    'foam.u2.layout.Cols',
    'foam.u2.layout.Rows'
  ],

  css: `
    ^ .foam-u2-layout-Cols {
      align-items: center;
    }
    ^wizard-body {
      height: 100%;
      background-color: white;
    }

    ^footer {
      min-height: 75px;
      border-top: solid 1px /*%GREY5%*/ #edf0f5;
      padding: 0px 128px;
    }

    ^next-button {
      width: 156px;
      height: 48px;
    }
  `,

  properties: [
    {
      class: 'DateTime',
      name: 'lastUpdate'
    },
    {
      class: 'Int',
      name: 'currentIndex'
    },
    {
      class: 'Int',
      name: 'prevIndex',
      expression: function(lastUpdate, currentIndex, sections, data) {
        for ( var i = currentIndex - 1 ; i >= 0 ; i-- ) {
          if ( sections[i].createIsAvailableFor(this.data$).get() ) return i;
        }
        return -1;
      }
    },
    {
      class: 'Int',
      name: 'nextIndex',
      expression: function(lastUpdate, currentIndex, sections, data) {
        for ( var i = currentIndex + 1 ; i < sections.length ; i++ ) {
          if ( sections[i].createIsAvailableFor(this.data$).get() ) return i;
        }
        return -1;
      }
    },
    {
      class: 'foam.u2.ViewSpec',
      name: 'sectionView',
      value: { class: 'foam.u2.detail.SectionView' }
    }
  ],

  reactions: [
    ['', 'propertyChange.sections', 'restartWizard'],
    ['', 'propertyChange.data', 'restartWizard'],
    ['data', 'propertyChange', 'onDataUpdate']
  ],

  listeners: [
    {
      name: 'restartWizard',
      isFramed: true,
      code: function() {
        for ( var i = 0 ; i < this.sections.length ; i++ ) {
          if ( this.sections[i].createIsAvailableFor(this.data$).get() ) {
            this.currentIndex = i;
            return;
          }
        }
      }
    },
    {
      name: 'onDataUpdate',
      isFramed: true,
      code: function() { this.lastUpdate = new Date(); }
    }
  ],

  actions: [
    {
      name: 'prev',
      label: 'Go back',
      code: function() { this.currentIndex = this.prevIndex; },
      isAvailable: function(prevIndex) { return prevIndex != -1; }
    },
    {
      name: 'next',
      label: 'Continue',
      code: function() { this.currentIndex = this.nextIndex; },
      isAvailable: function(nextIndex) { return nextIndex != -1; },
      isEnabled: function(lastUpdate, data$errors_, sections, currentIndex) {
        return sections[currentIndex]
          .createErrorSlotFor(this.data$).get()
          .filter(e => e).length == 0;
      }
    }
  ],

  methods: [
    function initE() {
      var self = this;

      this.addClass(this.myClass());

      self.SUPER();
      self
        .start(self.Rows)
          .add(self.slot(function(sections, currentIndex) {
            return self.E()
              .tag(self.sectionView, {
                section: sections[currentIndex],
                data$: self.data$
              });
          })).addClass(this.myClass('wizard-body'))
          .startContext({ data: this })
            .start(self.Cols).addClass(this.myClass('footer'))
              .add(this.PREV)
              .add(this.NEXT)
            .end()
          .endContext()
        .end();
    }
  ]
}); 
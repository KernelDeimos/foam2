foam.CLASS({
  package: 'foam.nanos.crunch.ui',
  name: 'CapabilityWizardSection',

  implements: [
    'foam.mlang.Expressions'
  ],

  imports: [
    'user',
    'userCapabilityJunctionDAO'
  ],

  requires: [
    'foam.nanos.crunch.UserCapabilityJunction',
  ],

  properties: [
    // Properties specific to CapabilityWizardSection
    {
      name: 'capability',
    },
    {
      name: 'ucj',
    },

    // Properties for WizardSection interface
    {
      name: 'of',
      expression: function (capability) {
        return capability.of;
      }
    },
    {
      name: 'daoKey',
      expression: function (capability) {
        return capability.daoKey
      }
    },
    {
      name: 'daoFindKey',
      expression: function (capability) {
        return capability.daoFindKey
      }
    },
    {
      name: 'subSections',
      factory: null,
      expression: function(capability) {
        if ( ! ofList ) return [];

        let listOfSectionAxiomsFromClass = of.getAxiomsByClass(this.SectionAxiom);
        var listOfSectionsFromClass = listOfSectionAxiomsFromClass
          .sort((a, b) => a.order - b.order)
          .map((a) => this.Section.create().fromSectionAxiom(a, of));
        let unSectionedPropertiesSection = this.checkForUnusedProperties(listOfSectionsFromClass, of); // this also will handle models with no sections
        if ( unSectionedPropertiesSection ) listOfSectionsFromClass.push(unSectionedPropertiesSection);
        return { 'data': of.create({}, this), 'sections': listOfSectionsFromClass, 'dao': daoList[index], 'daoKey': this.argsList[index] };

        return sections;
      }
    },
  ],

  actions: [
    {
      name: 'save',
      code: function() {
        console.log('action this', this);
        this.updateUCJ().then(() => {
          var ucj = this.ucj;
          ucj.data = this.data;
          return this.userCapabilityJunctionDAO.put(ucj);
        });
      }
    },
  ],

  methods: [
    {
      // This can be moved to an expression on the 'data' property
      // iff property expressions unwrap promises.
      name: 'updateUCJ',
      async: true,
      code: function () {
        return this.userCapabilityJunctionDAO.find(
          this.AND(
            this.EQ(
              this.UserCapabilityJunction.SOURCE_ID,
              this.user.id),
            this.EQ(
              this.UserCapabilityJunction.TARGET_ID,
              this.capability.id))
        ).then(ucj => {
          this.ucj = ucj;
          return this;
        });
      }
    }
  ]
});
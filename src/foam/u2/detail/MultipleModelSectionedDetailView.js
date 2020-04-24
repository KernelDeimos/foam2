/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.detail',
  name: 'MultipleModelSectionedDetailView',
  extends: 'foam.u2.View',

  documentation: `Takes in a list of class paths in "ofList" representing the MultipleModels
  and creates a section list in "sections" for editing properties.`,

  requires: [
    'foam.core.Action',
    'foam.core.Property',
    'foam.layout.Section',
    'foam.layout.SectionAxiom',
    'foam.nanos.crunch.ui.ScrollSectionWizardViewSection'
  ],

  properties: [
    {
      name: 'sections',
      factory: null,
      expression: function(capabilityInfos) {
        if ( ! capabilityInfos ) return [];

        sections = capabilityInfos.map((capInfo) => {
          let listOfSectionAxiomsFromClass = capInfo.of.getAxiomsByClass(
            this.SectionAxiom);
          var listOfSectionsFromClass = listOfSectionAxiomsFromClass
            .sort((a, b) => a.order - b.order)
            .map((a) => this.Section.create().fromSectionAxiom(a, capInfo.of));
          let unSectionedPropertiesSection = this.checkForUnusedProperties(
            listOfSectionsFromClass, capInfo.of); // this also will handle models with no sections
          if ( unSectionedPropertiesSection ) listOfSectionsFromClass.push(unSectionedPropertiesSection);
          return this.ScrollSectionWizardViewSection.create({
            capabilityInfo: capInfo,
            sections: listOfSectionsFromClass
          });
        });

        return sections;
      }
    },
    {
      class: 'FObjectArray',
      name: 'capabilityInfos',
      of: 'foam.nanos.crunch.ui.WizardCapabilityInfo',
    }
  ],

  methods: [
    {
      name: 'checkForUnusedProperties',
      code: function(sections, of) {
        var usedAxioms = sections
          .map((s) => s.properties.concat(s.actions))
          .flat()
          .reduce((map, a) => {
            map[a.name] = true;
            return map;
          }, {});
        var unusedProperties = of.getAxiomsByClass(this.Property)
          .filter((p) => ! usedAxioms[p.name])
          .filter((p) => ! p.hidden);
        var unusedActions = of.getAxiomsByClass(this.Action)
          .filter((a) => ! usedAxioms[a.name]);

        if ( unusedProperties.length || unusedActions.length ) {
          return this.Section.create({
            properties: unusedProperties,
            actions: unusedActions
          });
        }
        return undefined;
      }
    }
  ]
});

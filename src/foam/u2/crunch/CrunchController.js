foam.CLASS({
  package: 'foam.u2.crunch',
  name: 'CrunchController',
  documentation: `
    Defines behaviour for invocation of CRUNCH-related views.
  `,

  implements: [
    'foam.mlang.Expressions'
  ],

  imports: [
    'capabilityDAO',
    'ctrl',
    'prerequisiteCapabilityJunctionDAO',
    'stack',
    'user'
    'userCapabilityJunctionDAO',
  ],

  requires: [
    'foam.nanos.crunch.Capability',
    'foam.nanos.crunch.CapabilityCapabilityJunction',
    'foam.nanos.crunch.UserCapabilityJunction',
    'foam.nanos.crunch.ui.WizardCapabilityInfo'
  ],

  methods: [
    function launchWizard(capabilityId) {
      var self = this;

      var ofList = []; // This is what the wizard wants
      var tcList = []; // but we need this first
      var tcRecurse = () => {}; // and we'll do it with this

      // Pre-Order Traversial of Capability Dependancies.
      // Using Pre-Order here will cause the wizard to display
      // dependancies in a logical order.
      tcRecurse = (sourceId) => {
        return self.prerequisiteCapabilityJunctionDAO.where(
          self.EQ(self.CapabilityCapabilityJunction.SOURCE_ID, sourceId)
        ).select().then((result) => {
          var arry = result.array;

          if ( arry.length == 0 ) {
            tcList.push(sourceId);
            return;
          }

          return arry.reduce(
            (p, pcj) => p.then(() => tcRecurse(pcj.targetId)),
            Promise.resolve()
          ).then(() => tcList.push(sourceId));
        });
      };

      // Create capsList for the wizard
      let capInfosPromise = tcRecurse(capabilityId).then(() => {
        return self.capabilityDAO.where(
          self.IN(self.Capability.ID, tcList)
        ).select().then((results) => {
          var userID = self.user.id;

          // Combine Capability and UCJ to create WizardCapabilityInfo objects
          wizardInfoPromises = results.array.map((cap) => {
            return self.userCapabilityJunctionDAO.find(
              self.AND(
                self.EQ(self.UserCapabilityJunction.SOURCE_ID, userID),
                self.EQ(self.UserCapabilityJunction.TARGET_ID, cap.id))
            ).then(data => {
              return self.WizardCapabilityInfo.create({
                id: cap.id,
                of: cap.of,
                daoKey: cap.daoKey,
                arg: this.ctrl[cap.daoFindKey] &&
                  this.ctrl[cap.daoFindKey].id,
                data: data || null
              })
            });
          });

          return Promise.all(wizardInfoPromises).then(
            wizardInfos =>
              wizardInfos.filter(wizardInfo => !! wizardInfo.of));

        });
      });
      this.capabilityDAO.find(capabilityId).then((cap) => {
        // Summon the wizard; accio!
        capInfosPromise.then(capInfos => {
          self.stack.push({
            class: 'foam.nanos.crunch.ui.ScrollSectionWizardView',
            title: cap.name,
            capabilityInfos: capInfos
          });
        });
      });
    }
  ]
});

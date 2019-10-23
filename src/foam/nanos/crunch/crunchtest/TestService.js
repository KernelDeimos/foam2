foam.INTERFACE({
  name: 'TestService',
  package: 'foam.box.testspace',

  documentation: `
    The CRUNCH TestService allows manual invocation of capability intercepts.
  `,

  methods: [
    {
      name: 'testAuthorizationException',
      args: [
        {
          name: 'permission',
          type: 'String'
        }
      ],
      type: 'Boolean'
    }
  ]
});

foam.CLASS({
  name: 'TestServiceServer',
  package: 'foam.box.testspace',
  implements: ['foam.box.testspace.TestService'],

  methods: [
    {
      name: 'testAuthorizationException',
      type: 'Boolean',
      args: [
        {
          name: 'permission',
          type: 'String'
        }
      ],
      javaCode: `
        throw new foam.nanos.auth.AuthorizationException(
          "Test authorization failure", permission,
        );
        return true;
      `
    }
  ]
});

foam.CLASS({
  name: 'TestServiceClient',
  package: 'foam.box.testspace',

  requires: [
    'foam.box.SessionClientBox',
    'foam.box.HTTPBox'
  ],

  properties: [
    {
      class: 'String',
      name: 'serviceName'
    },
    {
      class: 'Stub',
      of: 'foam.box.testspace.TestService',
      name: 'delegate',
      factory: function() {
        return this.SessionClientBox.create({ delegate: this.HTTPBox.create({
          method: 'POST',
          url: this.serviceName
        })
      });
      },
      swiftFactory: `
return SessionClientBox_create(["delegate": HTTPBox_create([
  "method": "POST",
  "url": serviceName
])])
      `
    }
  ]
});

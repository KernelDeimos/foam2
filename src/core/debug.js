/*
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Debug.js
 *
 * This file contains refinements and replacements designed to make
 * FOAM apps easier to debug. Things like more informative toString() methods
 * .describe() on various types of objects, extra type checking, warnings,
 * and asserts, etc. Many of these features may negatively affect performance,
 * so while this file should be loaded during your day-to-day development,
 * it should not be included in production.
 */

foam.assert = function assert(cond /*, args */) {
  if ( ! cond ) {
    var msg = Array.prototype.slice.call(arguments, 1).join(' ');
    console.assert(false, msg);
  }
};


/* Validating a Model should also validate all of its Axioms. */
foam.CLASS({
  refines: 'foam.core.Model',

  methods: [
    function validate() {
      this.SUPER();

      if ( this.hasOwnProperty('extends') && this.refines )
        throw this.id + ': "extends" and "refines" are mutually exclusive.';

      for ( var i = 0 ; i < this.axioms_.length ; i++ )
        this.axioms_[i].validate && this.axioms_[i].validate(this);
    }
  ]
});


/* Validating a Model should also validate all of its Axioms. */
foam.CLASS({
  refines: 'foam.core.Property',

  methods: [
    function validate(model) {
      this.SUPER();

      // TODO: Have work with 'extends'.
      var mName = model ? model.id + '.' : '';

      // List of properties which are hidden by other properties.
      var es = [
        [ 'setter',     [ 'adapt', 'preSet', 'postSet' ] ],
        [ 'getter',     [ 'factory', 'expression', 'value' ] ],
        [ 'factory',    [ 'expression', 'value' ] ],
        [ 'expression', [ 'value' ] ]
      ];

      for ( var i = 0 ; i < es.length ; i++ ) {
        var e = es[i];
        for ( var j = 0 ; j < e.length ; j++ ) {
          if ( this[e[0]] && this.hasOwnProperty(e[1][j]) ) {
            console.warn('Property ' + mName + this.name + ' "' + e[1][j] + '" hidden by "' + e[0] + '"');
          }
        }
      }
    },

    function validateClass(cls) {
      // Validate that expressions only depend on known Axioms with Slots
      if ( this.expression ) {
        var expression = this.expression;
        var pName = cls.id + '.' + this.name + '.expression: ';

        var argNames = foam.Function.argsArray(expression);
        for ( var i = 0 ; i < argNames.length ; i++ ) {
          var name  = argNames[i];
          var axiom = cls.getAxiomByName(name);

          console.assert(
              axiom,
              'Unknown argument "', name, '" in ', pName, expression);
          console.assert(
              axiom.toSlot,
              'Non-Slot argument "', name, '" in ', pName, expression);
        }
      }
    }
  ]
});


/* Add describe() support to classes. */
foam.AbstractClass.describe = function(opt_name) {
  console.log('CLASS:  ', this.name);
  console.log('extends:', this.model_.extends);
  console.log('Axiom Type           Source Class   Name');
  console.log('----------------------------------------------------');
  for ( var key in this.axiomMap_ ) {
    var a = this.axiomMap_[key];
    console.log(
      foam.String.pad(a.cls_ ? a.cls_.name : 'anonymous', 20),
      foam.String.pad(a.sourceCls_.name, 14),
      a.name);
  }
  console.log('\n');
};


// Decorate installModel() to verify that axiom names aren't duplicated.
foam.AbstractClass.installModel = function() {
  var superInstallModel = foam.AbstractClass.installModel;

  return function(m) {
    var names = {};

    for ( var i = 0 ; i < m.axioms_.length ; i++ ) {
      var a = m.axioms_[i];

      foam.assert(
        ! names.hasOwnProperty(a.name),
        'Axiom name conflict in', m.id || m.refines, ':', a.name);

      names[a.name] = a;
    }

    superInstallModel.call(this, m);
  };
}();

foam.AbstractClass.validate = function() {
  for ( var key in this.axiomMap_ ) {
    var a = this.axiomMap_[key];
    a.validateClass && a.validateClass(this);
  }
}


/* Add describe() support to objects. */
foam.CLASS({
  refines: 'foam.core.FObject',

  methods: [
    function unknownArg(key, value) {
      if ( key == 'class' ) return;
      console.warn('Unknown property ' + this.cls_.id + '.' + key + ':', value);
    },

    function describe(opt_name) {
      console.log('Instance of', this.cls_.name);
      console.log('Axiom Type           Name           Value');
      console.log('----------------------------------------------------');
      var ps = this.cls_.getAxiomsByClass(foam.core.Property);
      for ( var i = 0 ; i < ps.length ; i++ ) {
        var p = ps[i];
        console.log(
          foam.String.pad(p.cls_ ? p.cls_.name : 'anonymous', 20),
          foam.String.pad(p.name, 14),
          this[p.name]);
      }
      console.log('\n');
    }
  ]
});


/* Add describe support to contexts. */
foam.X.describe = function() {
  console.log('Context:', this.hasOwnProperty('NAME') ? this.NAME : ('anonymous ' + this.$UID));
  console.log('KEY                  Type           Value');
  console.log('----------------------------------------------------');
  for ( var key in this ) {
    var value = this[key];
    var type = foam.core.FObject.isInstance(value) ? value.cls_.name : typeof value;
    console.log(
      foam.String.pad(key,  20),
      foam.String.pad(type, 14),
      typeof value === 'string' || typeof value === 'number' ? value : '');
  }
  console.log('\n');
};


foam.CLASS({
  package: 'foam.debug',
  name: 'Window',

  // documentation: 'Decorated merged() and framed() to have debug friendly toString() methods.',

  exports: [ 'merged', 'framed' ],

  methods: [
    function merged(l, opt_delay) {
      var f = this.X.merged(l, opt_delay);
      f.toString = function() {
        return 'MERGED(' + delay + ', ' + listener.$UID + ', ' + listener + ')';
      };
      return f;
    },
    function framed(l) {
      var f = this.X.framed(l);
      f.toString = function() {
        return 'ANIMATE(' + l.$UID + ', ' + l + ')';
      };
      return f;
    }
  ]
});

foam.X = foam.debug.Window.create(null, foam.X).Y;


foam.CLASS({
  package: 'foam.core',
  name: 'Argument',

  // documentation: "Describes one argument of a function.",

  constants: {
    PREFIX: 'Argument',
  },

  properties: [
    {
      /** The name of the argument */
      name: 'name'
    },
    {
      /** The string name of the type (either a model name or javascript typeof name) */
      name: 'typeName'
    },
    {
      /** If set, this holds the actual Model represented by typeName. */
      name: 'type'
    },
    {
      /** If true, indicates that this argument is optional. */
      name: 'optional', value: false
    },
    {
      /** The index of the argument (the first argument is at index 0). */
      name: 'index', value: -1
    },
    {
      /** The documentation associated with the argument (denoted by a // ) */
      name: 'documentation', value: ''
    }
  ],

  methods: [
    /** Validates the given argument against this type information.
        If any type checks are failed, a TypeError is thrown.
         */
    function validate(/* any // the argument value to validate. */ arg) {
      i = ( this.index >= 0 ) ? ' '+this.index+', ' : ', ';
      // optional check
      if ( ( ! arg ) && typeof arg === 'undefined' ) {
        if ( ! this.optional ) {
          throw new TypeError(this.PREFIX + i + this.name+', is not optional, but was undefined in a function call');
        } else {
          return; // value is undefined, but ok with that
        }
      }
      // type this for non-modelled types (no model, but a type name specified)
      if ( ! this.type ) {
        if ( this.typeName
            && typeof arg !== this.typeName
            && ! ( this.typeName === 'array' && Array.isArray(arg) ) ) {
          throw new TypeError(this.PREFIX + i + this.name + ', expected type ' + this.typeName + ' but passed ' + (typeof arg));
        } // else no this: no type, no typeName
      } else {
        // have a modelled type
        if ( ! arg.cls_ || ! this.type.isInstance(arg) ) {   // TODO: .cls_ check in isInstance() instead?
          var gotType = (arg.cls_) ? arg.cls_.name : typeof arg;
          throw new TypeError(this.PREFIX + i + this.name + ', expected type ' + this.typeName + ' but passed ' + gotType);
        }
      }
    }
  ]
});


/** Describes a function return type. */
foam.CLASS({
  package: 'foam.core',
  name: 'ReturnValue',
  extends: 'foam.core.Argument',

  constants: {
    PREFIX: 'Return'
  }
});


/** The types library deals with type safety. */
foam.LIB({
  name: 'foam.types',

  methods: [
    function getFunctionArgs(fn) {
      /** Extracts the arguments and their types from the given function.
        * @arg fn The function to extract from. The toString() of the function must be
        *     accurate.
        * @return An array of Argument objects.
        */
      // strip newlines and find the function(...) declaration
      var args = foam.Function.argsStr(fn);
      if ( ! args ) return [];
      args += ','; // easier matching

      var ret = [];
      // check each arg for types
      // Optional commented type(incl. dots for packages), argument name, optional commented return type
      // ws [/* ws package.type? ws */] ws argname ws [/* ws retType ws */]
      //console.log('-----------------');
      var argIdx = 0;
      var argMatcher = /(\s*\/\*\s*([\w._$]+)(\?)?\s*(\/\/\s*(.*?))?\s*\*\/)?\s*([\w_$]+)\s*(\/\*\s*([\w._$]+)\s*\*\/)?\s*\,+/g;
      var typeMatch;
      while ( typeMatch = argMatcher.exec(args) ) {
        // if can't match from start of string, fail
        if ( argIdx == 0 && typeMatch.index > 0 ) break;

        ret.push(foam.core.Argument.create({
          name:          typeMatch[6],
          typeName:      typeMatch[2],
          type:          global[typeMatch[2]],
          optional:      typeMatch[3] == '?',
          index:        argIdx++,
          documentation: typeMatch[5],
        }));
        // TODO: this is only valid on the last arg
        if ( typeMatch[6] ) {
          ret.returnType = foam.core.ReturnValue.create({
            typeName: typeMatch[8],
            type: global[typeMatch[8]]
          });
        }
      }
      if ( argIdx == 0 ) {
        // check for bare return type with no args
        typeMatch = args.match(/^\s*\/\*\s*([\w._$]+)\s*\*\/\s*/);
        if ( typeMatch && typeMatch[1] ) {
          ret.returnType = foam.core.ReturnValue.create({
            typeName: typeMatch[1],
            type: global[typeMatch[1]]
          });
        } else {
          throw "foam.types.getFunctionArgs argument parsing error: " + args.toString();
        }
      }

      return ret;
    },

    /** Decorates the given function with a runtime type checker.
      * Types should be denoted before each argument:
      * <code>function(\/\*TypeA\*\/ argA, \/\*string\*\/ argB) { ... }</code>
      * Types are either the names of Models (i.e. declared with CLASS), or
      * javascript primitives as returned by 'typeof'. In addition, 'array'
      * is supported as a special case, corresponding to an Array.isArray() check.
      * @fn The function to decorate. The toString() of the function must be
      *     accurate.
      * @return A new function that will throw errors if arguments
      *         doesn't match the declared types, run the original function,
      *         then type check the returned value.
      */
    function typeCheck(fn) {
      // parse out the arguments and their types
      var args = foam.types.getFunctionArgs(fn);
      var ret = function() {
        // check each declared argument, arguments[i] can be undefined for missing optional args,
        // extra arguments are ok
        for ( var i = 0 ; i < args.length ; i++ )
          args[i].validate(arguments[i]);

        // If nothing threw an exception, we are free to run the function
        var retVal = fn.apply(this, arguments);

        // check the return value
        if ( args.returnType ) args.returnType.validate(retVal);

        return retVal;
      }

      // keep the old value of toString (hide the decorator)
      ret.toString = function() { return fn.toString(); }

      return ret;
    }
  ]
});

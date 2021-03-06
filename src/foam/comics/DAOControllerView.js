/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.comics',
  name: 'DAOControllerView',
  extends: 'foam.u2.View',

  requires: [
    'foam.comics.SearchMode',
    'foam.comics.DAOController',
    'foam.comics.DAOUpdateControllerView',
    'foam.u2.view.ScrollTableView',
    'foam.u2.dialog.Popup'
  ],

  imports: [
    'createControllerView? as importedCreateControllerView',
    'data? as importedData',
    'stack',
    'summaryView? as importedSummaryView',
    'updateView? as importedUpdateView',
    'window'
  ],

  exports: [
    'as controllerView',
    'data.selection as selection',
    'data.data as dao',
    'data.filteredTableColumns as filteredTableColumns',
    'data.searchColumns as searchColumns',
    'dblclick'
  ],

  css: `
    ^ {
      /* The following three lines are a cross-browser
         equivalent to width: fit-content; in Chrome */
      width: intrinsic;
      width: -moz-max-content;
      width: -webkit-max-content;
      margin: 24px auto 0 auto;
    }

    ^top-row {
      align-items: center;
      margin-bottom: 10px;
    }

    ^separate {
      display: flex;
      justify-content: space-between;
    }

    ^title-container > * {
      color: /*%BLACK%*/ #1e1f21;
      margin: 0;
    }

    ^container {
      display: flex;
      justify-content: space-between;
    }

    ^ .actions {
      display: inline-block;
      margin-bottom: 8px;
    }

    ^ .actions button + button {
      margin-left: 8px;
    }

    ^full-search-container {
      flex: 0 0 250px;
    }

    ^ .foam-u2-view-TableView {
      width: 1024px;
    }
  `,

  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.comics.DAOController',
      name: 'data',
      expression: function(importedData) {
        return importedData;
      }
    },
    {
      name: 'cls',
      expression: function(data) {
        return data.cls_;
      }
    },
    {
      class: 'foam.u2.ViewSpec',
      name: 'defaultSummaryView_',
      value: { class: 'foam.u2.view.ScrollTableView' }
    },
    {
      class: 'foam.u2.ViewSpec',
      name: 'summaryView',
      factory: function() {
        return this.data.summaryView ||
          this.importedSummaryView ||
          this.defaultSummaryView_;
      }
    },
    {
      name: 'createControllerView',
      expression: function() {
        return this.importedCreateControllerView || {
          class: 'foam.comics.DAOCreateControllerView'
        };
      }
    },
    {
      name: 'updateView',
      expression: function() {
        return this.importedUpdateView || {
          class: 'foam.comics.DAOUpdateControllerView'
        };
      }
    }
  ],

  reactions: [
    ['data', 'action.create', 'onCreate'],
    ['data', 'edit', 'onEdit'],
    ['data', 'finished', 'onFinished'],
    ['data', 'export', 'onExport']
  ],

  methods: [
    function initE() {
      var self = this;

      this.data.border.add(
        this.E()
          .addClass(this.myClass())
          .start()
            .addClass(this.myClass('top-row'))
            .addClass(this.myClass('separate'))
            .start()
              .addClass(this.myClass('title-container'))
              .start('h1')
                .add(this.data.title$)
              .end()
              .start()
                .add(this.data.subtitle$)
              .end()
            .end()
            .callIfElse(self.data.createLabel, function() {
              this.tag(self.data.primaryAction, {
                label$: self.data.createLabel$,
                size: 'LARGE'
              });
            }, function() {
              this.start().tag(self.data.primaryAction, { size: 'LARGE' }).end();
            })
          .end()
          .start()
            .addClass(this.myClass('container'))
            .callIf(this.data.searchMode === this.SearchMode.FULL, function() {
              this.start()
                .hide(self.data.searchHidden$)
                .addClass(self.myClass('full-search-container'))
                .add(self.cls.PREDICATE.clone().copyFrom({
                  view: { class: 'foam.u2.view.ReciprocalSearch' }
                }))
              .end();
            })
            .start()
              .start()
                .addClass(this.myClass('separate'))
                .callIf(this.data.searchMode === this.SearchMode.SIMPLE, function() {
                  this
                    .start()
                      .add(self.cls.PREDICATE.clone().copyFrom({
                        view: { class: 'foam.u2.view.SimpleSearch' }
                      }))
                    .end();
                })
                .start()
                  .addClass('actions')
                  .show(self.mode$.map((m) => m === foam.u2.DisplayMode.RW))
                  .start()
                    .forEach(self.cls.getAxiomsByClass(foam.core.Action).filter((action) => {
                      return action.name !== self.data.primaryAction.name;
                    }), function(action) {
                      this.tag(action, { buttonStyle: 'TERTIARY' });
                    })
                    .add()
                  .end()
                .end()
              .end()
              .start()
                .style({ 'overflow-x': 'auto' })
                .tag(this.summaryView, {
                  data$: this.data.filteredDAO$,
                  multiSelectEnabled: !! this.data.relationship,
                  selectedObjects$: this.data.selectedObjects$
                })
              .end()
            .end()
          .end());

      this.add(this.data.border);
    },

    function dblclick(obj) {
      if ( this.data.dblclick ) {
        this.data.dblclick(obj);
      } else {
        this.onEdit(null, null, obj.id);
      }
    }
  ],

  listeners: [
    function onCreate() {
      this.stack.push({
        class: this.createControllerView.class,
        detailView: this.data.detailView
      }, this);
    },

    function onEdit(s, edit, id) {
      this.stack.push({
        class: this.updateView.class,
        detailView: this.data.detailView,
        editEnabled: this.data.editEnabled,
        key: id
      }, this);
    },

    function onFinished() {
      this.stack.back();
    },

    function onExport(dao) {
      this.add(this.Popup.create().tag({
        class: 'foam.u2.ExportModal',
        exportData: dao.src.filteredDAO
      }));
    }
  ]
});

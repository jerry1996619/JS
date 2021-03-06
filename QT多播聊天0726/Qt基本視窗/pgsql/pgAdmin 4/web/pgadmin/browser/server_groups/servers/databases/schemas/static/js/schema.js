define('pgadmin.node.schema', [
  'sources/gettext', 'sources/url_for', 'jquery', 'underscore',
  'underscore.string', 'pgadmin', 'pgadmin.browser', 'backform', 'alertify',
  'pgadmin.browser.collection', 'pgadmin.browser.server.privilege'
], function(gettext, url_for, $, _, S, pgAdmin, pgBrowser, Backform, alertify) {

  // VacuumSettings Collection to display all settings parameters as Grid
  var VacuumCollectionControl = Backform.VacuumCollectionControl =
    Backform.Control.extend({

    grid_columns:undefined,

    initialize: function() {
      Backform.Control.prototype.initialize.apply(this, arguments);
      var self = this,
          m = this.model;
          url = self.field.get('url');

      if (url && m.isNew()) {
        var node = self.field.get('node'),
            node_data = self.field.get('node_data'),
            node_info = self.field.get('node_info'),
            full_url = node.generate_url.apply(
              node, [
                null, url, node_data, false, node_info
              ]),
            data;
        m.trigger('pgadmin-view:fetching', m, self.field);

        // fetch default values for autovacuum fields
        $.ajax({
          async: false,
          url: full_url,
          success: function (res) {
            data = res;
          },
          error: function() {
            m.trigger('pgadmin-view:fetch:error', m, self.field);
          }
        });
        m.trigger('pgadmin-view:fetched', m, self.field);

        // Add fetched models into collection
        if (data && _.isArray(data)) {
          m.get(self.field.get('name')).reset(data, {silent: true});
        }
      }
    },

    render: function() {
      var self = this,
          m = this.model,
          attributes = self.field.attributes;

      // remove grid
      if(self.grid) {
        self.grid.remove();
        delete self.grid;
        self.grid = undefined;
      }

      self.$el.empty();

      var gridHeader = _.template([
          '<div class="subnode-header">',
          '  <label class="control-label col-sm-4"><%-label%></label>',
          '</div>'].join("\n")),
          gridBody = $('<div class="pgadmin-control-group backgrid form-group col-xs-12 object subnode"></div>').append(
              gridHeader(attributes)
              );

      // Initialize a new Grid instance
      var grid = self.grid = new Backgrid.Grid({
        columns: self.grid_columns,
        collection: self.model.get(self.field.get('name')),
        className: "backgrid table-bordered"
      });

      // render grid
      self.$el.append($(gridBody).append(grid.render().$el));

      return self;
    }
  });

  // We will use this function in VacuumSettings Control
  // to convert data type on the fly
  var cellFunction = Backform.cellFunction = function(model) {
    var self = this,
        m = model,
        vartype = model.get('column_type');

    switch(vartype) {
      case "integer":
        return Backgrid.IntegerCell;
      break;
      case "number":
        return Backgrid.NumberCell;
      break;
      case "string":
        return Backgrid.StringCell;
      break;
      default:
        return Backgrid.Cell;
      break;
    }
  };

  pgBrowser.SecurityGroupUnderSchema = {
    id: 'security', label: gettext('Security'), type: 'group',
    // Show/Hide security group for nodes under the catalog
    visible: function(args) {
      if (args && 'node_info' in args) {
        // If node_info is not present in current object then it might in its
        // parent in case if we used sub node control
        var node_info = args.node_info || args.handler.node_info;
        return 'catalog' in node_info ? false : true;
      }
      return true;
    }
  };

  // Define Security Model with fields and validation for VacuumSettings Control
  var VacuumTableModel =  Backform.VacuumTableModel = pgBrowser.Node.Model.extend({
    defaults: {
      name: undefined,
      setting: undefined,
      label:undefined,
      value: undefined,
      column_type: undefined
    },

    toJSON: function(){
      var d = pgBrowser.Node.Model.prototype.toJSON.apply(this);
      delete d.label;
      delete d.setting;
      delete d.column_type;
      return d;
    }
  });

   // Extend the browser's collection class for VacuumSettingsModel
  var VacuumSettingsSchema = Backform.VacuumSettingsSchema = [{
    id: 'autovacuum_custom', label: gettext('Custom auto-vacuum?'),
    group: gettext('Table'), mode: ['edit', 'create'],
    type: 'switch',
    disabled: function(m) {
      // If table is partitioned table then disabled it.
      if (m.top && m.top.get('is_partitioned')) {
        // We also need to unset rest of all
        setTimeout(function() {
          m.set('autovacuum_custom', false);
        }, 10);

        return true;
      }

      if(!m.top.inSchema.apply(this, [m])) {
        return false;
      }
      return true;
    }
  },{
    id: 'autovacuum_enabled', label: gettext('Enabled?'),
    group: gettext('Table'), mode: ['edit', 'create'],
    type: 'switch',
    deps: ['autovacuum_custom'],
    disabled: function(m) {
      if(!m.top.inSchema.apply(this, [m]) &&
        m.get('autovacuum_custom') == true) {
        return false;
      }

      // We also need to unset rest of all
      setTimeout(function() {
        m.set('autovacuum_enabled', false);
      }, 10);
      return true;
    }
  },{
    id: 'vacuum_table', label: gettext('Vacuum Table'),
    model: Backform.VacuumTableModel, editable: false, type: 'collection',
    canEdit: true, group: gettext('Table'),
    mode: ['edit', 'create'], url: 'get_table_vacuum',
    control: Backform.VacuumCollectionControl.extend({
      grid_columns :[
        {
          name: 'label', label: gettext('Label'),
          headerCell: Backgrid.Extension.CustomHeaderCell,
          cell: 'string', editable: false, cellHeaderClasses:'width_percent_40'
        },
        {
          name: 'value', label: gettext('Value'),
          cellHeaderClasses:'width_percent_30',
          cellFunction: Backform.cellFunction, editable: function(m) {
            return m.handler.get('autovacuum_enabled');
          }, headerCell: Backgrid.Extension.CustomHeaderCell
        },
        {
          name: 'setting', label: gettext('Default value'),
          cellHeaderClasses:'width_percent_30',
          headerCell: Backgrid.Extension.CustomHeaderCell,
          cellFunction: Backform.cellFunction, editable: false
        }
      ]
    }),
    deps: ['autovacuum_enabled']
  },{
    id: 'toast_autovacuum', label: gettext('Custom auto-vacuum?'),
    group: gettext('Toast Table'), mode: ['edit', 'create'],
    type: 'switch',
    disabled: function(m) {
      // We need to check additional condition to toggle enable/disable
      // for table auto-vacuum
      if(!m.top.inSchema.apply(this, [m]) && m.isNew()) {
        return false;
      } else if(!m.top.inSchema.apply(this, [m]) &&
          (m.get('toast_autovacuum_enabled') === true ||
          m.top.get('hastoasttable') === true)) {
        return false;
      }
      return true;
    }
  },{
    id: 'toast_autovacuum_enabled', label: gettext('Enabled?'),
    group: gettext('Toast Table'), mode: ['edit', 'create'],
    type: 'switch',
    deps:['toast_autovacuum'],
    disabled: function(m) {
      // If in schema & in create mode then enable it
      if(!m.top.inSchema.apply(this, [m]) &&
          m.get('toast_autovacuum') === true) {
        return false;
      }

      if (m.isNew() || m.get('hastoasttable')) {
        // we also need to unset rest of all
        setTimeout(function() {
          m.set('toast_autovacuum_enabled', false);
        }, 10);
      }
    return true;
    }
  },{
    id: 'vacuum_toast', label: gettext('Vacuum Toast Table'),
    model: Backform.VacuumTableModel, type: 'collection', editable: function(m) {
      return m.isNew();
    },
    canEdit: true, group: gettext('Toast Table'),
    mode: ['properties', 'edit', 'create'], url: 'get_toast_table_vacuum',
    control: Backform.VacuumCollectionControl.extend({
      grid_columns :[
        {
          name: 'label', label: gettext('Label'),
          headerCell: Backgrid.Extension.CustomHeaderCell,
          cell: 'string', editable: false, cellHeaderClasses:'width_percent_40'
        },
        {
          name: 'value', label: gettext('Value'),
          cellHeaderClasses:'width_percent_30',
          headerCell: Backgrid.Extension.CustomHeaderCell,
          cellFunction: Backform.cellFunction, editable: function(m) {
            return m.handler.get('toast_autovacuum_enabled');
          }
        },
        {
          name: 'setting', label: gettext('Default value'),
          cellHeaderClasses:'width_percent_30',
          headerCell: Backgrid.Extension.CustomHeaderCell,
          cellFunction: Backform.cellFunction, editable: false
        }
      ]
    }),
    deps: ['toast_autovacuum_enabled']
  }];

  // Extend the browser's collection class for schema collection
  if (!pgBrowser.Nodes['coll-schema']) {
    var databases = pgBrowser.Nodes['coll-schema'] =
      pgBrowser.Collection.extend({
        node: 'schema',
        label: gettext('Schemas'),
        type: 'coll-schema',
        columns: ['name', 'namespaceowner', 'description']
      });
  };
  // Extend the browser's node class for schema node
  if (!pgBrowser.Nodes['schema']) {
    pgBrowser.Nodes['schema'] = pgBrowser.Node.extend({
      parent_type: 'database',
      type: 'schema',
      sqlAlterHelp: 'sql-alterschema.html',
      sqlCreateHelp: 'sql-createschema.html',
      dialogHelp: url_for('help.static', {'filename': 'schema_dialog.html'}),
      label: gettext('Schema'),
      hasSQL:  true,
      canDrop: true,
      canDropCascade: true,
      hasDepends: true,
      Init: function() {
        /* Avoid mulitple registration of menus */
        if (this.initialized)
            return;

        this.initialized = true;

        pgBrowser.add_menus([{
          name: 'create_schema_on_coll', node: 'coll-schema', module: this,
          applies: ['object', 'context'], callback: 'show_obj_properties',
          category: 'create', priority: 4, label: gettext('Schema...'),
          icon: 'wcTabIcon icon-schema', data: {action: 'create'}
        },{
          name: 'create_schema', node: 'schema', module: this,
          applies: ['object', 'context'], callback: 'show_obj_properties',
          category: 'create', priority: 4, label: gettext('Schema...'),
          icon: 'wcTabIcon icon-schema', data: {action: 'create'}
        },{
          name: 'create_schema', node: 'database', module: this,
          applies: ['object', 'context'], callback: 'show_obj_properties',
          category: 'create', priority: 4, label: gettext('Schema...'),
          icon: 'wcTabIcon icon-schema', data: {action: 'create'},
          enable: 'can_create_schema'
        }
        ]);
      },
      can_create_schema: function(node, item) {
        return pgBrowser.Nodes['database'].is_conn_allow.call(this, node);
      },
      model: pgBrowser.Node.Model.extend({
        defaults: {
          name: undefined,
          namespaceowner: undefined,
          description: undefined,
          is_system_obj: undefined,
        },
        initialize: function(attrs, args) {
          var isNew = (_.size(attrs) === 0);

          if (isNew) {
            var userInfo = pgBrowser.serverInfo[args.node_info.server._id].user;

            this.set({'namespaceowner': userInfo.name}, {silent: true});
          }
          pgBrowser.Node.Model.prototype.initialize.apply(this, arguments);
        },
        schema: [{
          id: 'name', label: gettext('Name'), cell: 'string',
          type: 'text'
        },{
          id: 'oid', label: gettext('OID'), cell: 'string',
          type: 'text', disabled: true, mode: ['properties']
        },{
          id: 'namespaceowner', label: gettext('Owner'), cell: 'string',
          type: 'text', control: 'node-list-by-name', node: 'role',
          select2: { allowClear: false }
        },{
          id: 'is_sys_object', label: gettext('System schema?'),
          cell: 'switch', type: 'switch', mode: ['properties'], disabled: true
        },{
          id: 'description', label: gettext('Comment'), cell: 'string',
          type: 'multiline'
        },{
          id: 'acl', label: gettext('Privileges'), type: 'text',
          group: gettext('Security'), mode: ['properties'], disabled: true
        },{
          id: 'tblacl', label: gettext('Default TABLE privileges'), type: 'text',
          group: gettext('Security'), mode: ['properties'], disabled: true
        },{
          id: 'seqacl', label: gettext('Default SEQUENCE privileges'), type: 'text',
          group: gettext('Security'), mode: ['properties'], disabled: true
        },{
          id: 'funcacl', label: gettext('Default FUNCTION privileges'),
          group: gettext('Security'), type: 'text', mode: ['properties'], disabled: true
        },{
          id: 'typeacl', label: gettext('Default TYPE privileges'), type: 'text',
          group: gettext('Security'), mode: ['properties'], disabled: true, min_version: 90200,
          visible: function() {
            return this.version_compatible;
          }
        },{
          id: 'nspacl', label: gettext('Privileges'),
          model: pgBrowser.Node.PrivilegeRoleModel.extend(
          {privileges: ['C', 'U']}), uniqueCol : ['grantee', 'grantor'],
          editable: false, type: 'collection', group: gettext('Security'),
          mode: ['edit', 'create'],
          canAdd: true, canDelete: true, control: 'unique-col-collection',
        },{
          id: 'seclabels', label: gettext('Security Labels'),
          model: pgBrowser.SecLabelModel, editable: false, type: 'collection',
          group: gettext('Security'), mode: ['edit', 'create'],
          min_version: 90200, canAdd: true,
          canEdit: false, canDelete: true, control: 'unique-col-collection'
        },{
          type: 'nested', control: 'tab', group: gettext('Default Privileges'),
          mode: ['create','edit'],
          schema:[{
              id: 'deftblacl', model: pgBrowser.Node.PrivilegeRoleModel.extend(
              {privileges: ['a', 'r', 'w', 'd', 'D', 'x', 't']}),
              label: gettext('Default Privileges: Tables'),
              editable: false, type: 'collection', group: gettext('Tables'),
              mode: ['edit', 'create'], control: 'unique-col-collection',
              canAdd: true, canDelete: true, uniqueCol : ['grantee', 'grantor']
            },{
              id: 'defseqacl', model: pgBrowser.Node.PrivilegeRoleModel.extend(
              {privileges: ['r', 'w', 'U']}),
              label: gettext('Default Privileges: Sequences'),
              editable: false, type: 'collection', group: gettext('Sequences'),
              mode: ['edit', 'create'], control: 'unique-col-collection',
              canAdd: true, canDelete: true, uniqueCol : ['grantee', 'grantor']
            },{
              id: 'deffuncacl', model: pgBrowser.Node.PrivilegeRoleModel.extend(
              {privileges: ['X']}),
              label: gettext('Default Privileges: Functions'),
              editable: false, type: 'collection', group: gettext('Functions'),
              mode: ['edit', 'create'], control: 'unique-col-collection',
              canAdd: true, canDelete: true, uniqueCol : ['grantee', 'grantor']
            },{
              id: 'deftypeacl', model: pgBrowser.Node.PrivilegeRoleModel.extend(
              {privileges: ['U']}),
              label: gettext('Default Privileges: Types'),
              editable: false, type: 'collection', group: gettext('Types'),
              mode: ['edit', 'create'], control: 'unique-col-collection',
              canAdd: true, canDelete: true, uniqueCol : ['grantee', 'grantor'],
              min_version: 90200
            }]
         }
        ],
        validate: function() {
          var err = {},
              errmsg = null;
          // Validation of mandatory fields
          this.errorModel.clear();
          if (_.isUndefined(this.get('name')) ||
            _.isNull(this.get('name')) ||
            String(this.get('name')).replace(/^\s+|\s+$/g, '') == '') {
                errmsg = gettext('Name cannot be empty.');
                this.errorModel.set('name', errmsg);
                return errmsg;
          } else if (_.isUndefined(this.get('namespaceowner')) ||
            _.isNull(this.get('namespaceowner')) ||
            String(this.get('namespaceowner')).replace(/^\s+|\s+$/g, '') == '') {
                errmsg = gettext('Owner cannot be empty.');
                this.errorModel.set('namespaceowner', errmsg);
                return errmsg;
          }
          return null;
        }
      }),
      // This function will checks whether we can allow user to
      // drop object or not based on location within schema & catalog
      canChildDrop: function(itemData, item) {
        var t = pgBrowser.tree, i = item, d = itemData;
        // To iterate over tree to check parent node
        while (i) {
          // If it is schema then allow user to create collation
          if (_.indexOf(['schema'], d._type) > -1)
            return true;

            //Check if we are not child of catalog
            prev_i = t.hasParent(i) ? t.parent(i) : null;
            prev_d = prev_i ? t.itemData(prev_i) : null;
            if( prev_d && prev_d._type == 'catalog') {
              return false;
            }
          i = t.hasParent(i) ? t.parent(i) : null;
          d = i ? t.itemData(i) : null;
        }
        // by default we do not want to allow create menu
        return true;
      }
    });

    pgBrowser.tableChildTreeNodeHierarchy = function(i) {
      var idx = 0,
          res = {},
          t = pgBrowser.tree;

      do {
        d = t.itemData(i);
        if (
          d._type in pgBrowser.Nodes && pgBrowser.Nodes[d._type].hasId
        ) {
          if (d._type === 'partition' || d._type === 'table') {
            if (!('table' in res)) {
              res['table'] = _.extend({}, d, {'priority': idx});
              idx -= 1;
            }
          } else {
            res[d._type] = _.extend({}, d, {'priority': idx});
            idx -= 1;
          }
        }
        i = t.hasParent(i) ? t.parent(i) : null;
      } while (i);

      return res;
    };
  }

  // Switch Cell with Deps (specifically for table children)
  var TableChildSwitchCell =
    Backgrid.Extension.TableChildSwitchCell = Backgrid.Extension.SwitchCell.extend({
      initialize: function() {
        Backgrid.Extension.SwitchCell.prototype.initialize.apply(this, arguments);
        Backgrid.Extension.DependentCell.prototype.initialize.apply(this, arguments);
      },
      dependentChanged: function () {
        var model = this.model,
          column = this.column,
          editable = this.column.get("editable"),
          input = this.$el.find('input[type=checkbox]').first(),
          self_name = column.get('name');

        is_editable = _.isFunction(editable) ? !!editable.apply(column, [model]) : !!editable;
        if (is_editable) {
           this.$el.addClass("editable");
           input.bootstrapSwitch('disabled',false);
         } else {
           this.$el.removeClass("editable");
           input.bootstrapSwitch('disabled',true);
           // Set self value into model to false
           setTimeout(function() { model.set(self_name, false); }, 10);
         }

        this.delegateEvents();
        return this;
      },
      remove: Backgrid.Extension.DependentCell.prototype.remove
  });

  return pgBrowser.Nodes['schema'];
});

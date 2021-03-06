define('pgadmin.node.trigger', [
  'sources/gettext', 'sources/url_for', 'jquery', 'underscore',
  'underscore.string', 'pgadmin', 'pgadmin.browser', 'backform', 'alertify',
  'sources/alerts/alertify_wrapper',
  'pgadmin.browser.collection'
], function(gettext, url_for, $, _, S, pgAdmin, pgBrowser, Backform, alertify, AlertifyWrapper) {

  var CustomSwitchControl = Backform.CustomSwitchControl = Backform.SwitchControl.extend({
    template: _.template([
      '<label class="<%=Backform.controlLabelClassName%> custom_switch_label_class"><%=label%></label>',
      '<div class="<%=Backform.controlsClassName%> custom_switch_control_class">',
      '  <div class="checkbox">',
      '    <label>',
      '      <input type="checkbox" class="<%=extraClasses.join(\' \')%>"',
      '        name="<%=name%>" <%=value ? "checked=\'checked\'" : ""%>',
      '        <%=disabled ? "disabled" : ""%> <%=required ? "required" : ""%> />',
      '    </label>',
      '  </div>',
      '</div>',
      '<% if (helpMessage && helpMessage.length) { %>',
      '  <span class="<%=Backform.helpMessageClassName%>"><%=helpMessage%></span>',
      '<% } %>'
    ].join("\n")),
    className: 'pgadmin-control-group form-group col-xs-6'
  });

  if (!pgBrowser.Nodes['coll-trigger']) {
    var triggers = pgAdmin.Browser.Nodes['coll-trigger'] =
      pgAdmin.Browser.Collection.extend({
        node: 'trigger',
        label: gettext('Triggers'),
        type: 'coll-trigger',
        getTreeNodeHierarchy: pgBrowser.tableChildTreeNodeHierarchy,
        columns: ['name', 'description']
      });
  };

  if (!pgBrowser.Nodes['trigger']) {
    pgAdmin.Browser.Nodes['trigger'] = pgBrowser.Node.extend({
      getTreeNodeHierarchy: pgBrowser.tableChildTreeNodeHierarchy,
      parent_type: ['table', 'view', 'partition'],
      collection_type: ['coll-table', 'coll-view'],
      type: 'trigger',
      label: gettext('Trigger'),
      hasSQL:  true,
      hasDepends: true,
      width: '650px',
      sqlAlterHelp: 'sql-altertrigger.html',
      sqlCreateHelp: 'sql-createtrigger.html',
      dialogHelp: url_for('help.static', {'filename': 'trigger_dialog.html'}),
      Init: function() {
        /* Avoid mulitple registration of menus */
        if (this.initialized)
            return;

        this.initialized = true;

        pgBrowser.add_menus([{
          name: 'create_trigger_on_coll', node: 'coll-trigger', module: this,
          applies: ['object', 'context'], callback: 'show_obj_properties',
          category: 'create', priority: 4, label: gettext('Trigger...'),
          icon: 'wcTabIcon icon-trigger', data: {action: 'create', check: true},
          enable: 'canCreate'
        },{
          name: 'create_trigger', node: 'trigger', module: this,
          applies: ['object', 'context'], callback: 'show_obj_properties',
          category: 'create', priority: 4, label: gettext('Trigger...'),
          icon: 'wcTabIcon icon-trigger', data: {action: 'create', check: true},
          enable: 'canCreate'
        },{
          name: 'create_trigger_onTable', node: 'table', module: this,
          applies: ['object', 'context'], callback: 'show_obj_properties',
          category: 'create', priority: 4, label: gettext('Trigger...'),
          icon: 'wcTabIcon icon-trigger', data: {action: 'create', check: true},
          enable: 'canCreate'
        },{
          name: 'create_trigger_onPartition', node: 'partition', module: this,
          applies: ['object', 'context'], callback: 'show_obj_properties',
          category: 'create', priority: 4, label: gettext('Trigger...'),
          icon: 'wcTabIcon icon-trigger', data: {action: 'create', check: true},
          enable: 'canCreate'
        },{
          name: 'enable_trigger', node: 'trigger', module: this,
          applies: ['object', 'context'], callback: 'enable_trigger',
          category: 'connect', priority: 3, label: gettext('Enable trigger'),
          icon: 'fa fa-check', enable : 'canCreate_with_trigger_enable'
        },{
          name: 'disable_trigger', node: 'trigger', module: this,
          applies: ['object', 'context'], callback: 'disable_trigger',
          category: 'drop', priority: 3, label: gettext('Disable trigger'),
          icon: 'fa fa-times', enable : 'canCreate_with_trigger_disable'
        },{
          name: 'create_trigger_onView', node: 'view', module: this,
          applies: ['object', 'context'], callback: 'show_obj_properties',
          category: 'create', priority: 4, label: gettext('Trigger...'),
          icon: 'wcTabIcon icon-trigger', data: {action: 'create', check: true},
          enable: 'canCreate'
        }
        ]);
      },
      callbacks: {
        /* Enable trigger */
        enable_trigger: function(args) {
          var input = args || {};
          obj = this,
          t = pgBrowser.tree,
          i = input.item || t.selected(),
          d = i && i.length == 1 ? t.itemData(i) : undefined;

          if (!d)
            return false;

          var data = d;
          $.ajax({
            url: obj.generate_url(i, 'enable' , d, true),
            type:'PUT',
            data: {'enable' : true},
            dataType: "json",
            success: function(res) {
              if (res.success == 1) {
                var alertifyWrapper = new AlertifyWrapper();
                alertifyWrapper.success(res.info);
                t.removeIcon(i);
                data.icon = 'icon-trigger';
                t.addIcon(i, {icon: data.icon});
                t.unload(i);
                t.setInode(i);
                t.deselect(i);
                // Fetch updated data from server
                setTimeout(function() {
                  t.select(i);
                }, 10);
              }
            },
            error: function(xhr, status, error) {
              try {
                var err = $.parseJSON(xhr.responseText);
                if (err.success == 0) {
                  var alertifyWrapper = new AlertifyWrapper();
                  alertifyWrapper.error(err.errormsg);
                }
              } catch (e) {}
              t.unload(i);
            }
          })
        },
        /* Disable trigger */
        disable_trigger: function(args) {
          var input = args || {};
          obj = this,
          t = pgBrowser.tree,
          i = input.item || t.selected(),
          d = i && i.length == 1 ? t.itemData(i) : undefined;

          if (!d)
            return false;

          var data = d;
          $.ajax({
            url: obj.generate_url(i, 'enable' , d, true),
            type:'PUT',
            data: {'enable' : false},
            dataType: "json",
            success: function(res) {
              if (res.success == 1) {
                var alertifyWrapper = new AlertifyWrapper();
                alertifyWrapper.success(res.info);
                t.removeIcon(i);
                data.icon = 'icon-trigger-bad';
                t.addIcon(i, {icon: data.icon});
                t.unload(i);
                t.setInode(i);
                t.deselect(i);
                // Fetch updated data from server
                setTimeout(function() {
                  t.select(i);
                }, 10);
              }
            },
            error: function(xhr, status, error) {
              try {
                var err = $.parseJSON(xhr.responseText);
                if (err.success == 0) {
                  var alertifyWrapper = new AlertifyWrapper();
                  alertifyWrapper.error(err.errormsg);
                }
              } catch (e) {}
              t.unload(i);
            }
          })
        }
      },
      canDrop: pgBrowser.Nodes['schema'].canChildDrop,
      canDropCascade: pgBrowser.Nodes['schema'].canChildDrop,
      model: pgAdmin.Browser.Node.Model.extend({
        defaults: {
          name: undefined,
          is_row_trigger: true,
          fires: 'BEFORE'
        },
        schema: [{
          id: 'name', label: gettext('Name'), cell: 'string',
          type: 'text', disabled: 'inSchema'
        },{
          id: 'oid', label: gettext('OID'), cell: 'string',
          type: 'int', disabled: true, mode: ['properties']
        },{
          id: 'is_enable_trigger', label: gettext('Trigger enabled?'),
          type: 'switch', disabled: 'inSchema', mode: ['edit', 'properties'],
          group: gettext('Definition')
        },{
          id: 'is_row_trigger', label: gettext('Row trigger?'),
          type: 'switch', group: gettext('Definition'),
          mode: ['create','edit', 'properties'],
          deps: ['is_constraint_trigger'],
          disabled: function(m) {
            // Disabled if table is a partitioned table.
            if (_.has(m, 'node_info') && _.has(m.node_info, 'table') &&
                _.has(m.node_info.table, 'is_partitioned') && m.node_info.table.is_partitioned)
            {
              setTimeout(function(){
                  m.set('is_row_trigger', false);
              },10);

              return true;
            }

            // If constraint trigger is set to True then row trigger will
            // automatically set to True and becomes disable
            var is_constraint_trigger = m.get('is_constraint_trigger');
            if(!m.inSchemaWithModelCheck.apply(this, [m])) {
                if(!_.isUndefined(is_constraint_trigger) &&
                is_constraint_trigger === true) {
                // change it's model value
                    setTimeout(function() { m.set('is_row_trigger', true) }, 10);
                    return true;
                } else {
                    return false;
                }
            } else {
                // Check if it is row trigger then enabled it.
                var is_row_trigger = m.get('is_row_trigger');
                if (!_.isUndefined(is_row_trigger) && m.node_info['server']['server_type'] == 'ppas') {
                  return false;
                }
                // Disable it
                return true;
            }
          }
        },{
          id: 'is_constraint_trigger', label: gettext('Constraint trigger?'),
          type: 'switch', disabled: 'inSchemaWithModelCheck',
          mode: ['create','edit', 'properties'],
          group: gettext('Definition'),
          disabled: function(m) {
            // Disabled if table is a partitioned table.
            if (_.has(m, 'node_info') && _.has(m.node_info, 'table') &&
                _.has(m.node_info.table, 'is_partitioned') && m.node_info.table.is_partitioned)
            {
              setTimeout(function(){
                  m.set('is_constraint_trigger', false);
              },10);

              return true;
            }
          }
        },{
          id: 'tgdeferrable', label: gettext('Deferrable?'),
          type: 'switch', group: gettext('Definition'),
          mode: ['create','edit', 'properties'],
          deps: ['is_constraint_trigger'],
          disabled: function(m) {
            // If constraint trigger is set to True then only enable it
            var is_constraint_trigger = m.get('is_constraint_trigger');
            if(!m.inSchemaWithModelCheck.apply(this, [m])) {
                if(!_.isUndefined(is_constraint_trigger) &&
                is_constraint_trigger === true) {
                    return false;
                } else {
                    // If value is already set then reset it to false
                    if(m.get('tgdeferrable')) {
                      setTimeout(function() { m.set('tgdeferrable', false) }, 10);
                    }
                    return true;
                }
            } else {
                // Disable it
                return true;
            }
          }
        },{
          id: 'tginitdeferred', label: gettext('Deferred?'),
          type: 'switch', group: gettext('Definition'),
          mode: ['create','edit', 'properties'],
          deps: ['tgdeferrable', 'is_constraint_trigger'],
          disabled: function(m) {
            // If Deferrable is set to True then only enable it
            var tgdeferrable = m.get('tgdeferrable');
            if(!m.inSchemaWithModelCheck.apply(this, [m])) {
                if(!_.isUndefined(tgdeferrable) &&
                tgdeferrable) {
                    return false;
                } else {
                    // If value is already set then reset it to false
                    if(m.get('tginitdeferred')) {
                      setTimeout(function() { m.set('tginitdeferred', false) }, 10);
                    }
                    // If constraint trigger is set then do not disable
                    return m.get('is_constraint_trigger') ? false : true;
                }
            } else {
                // Disable it
                return true;
            }
          }
        },{
          id: 'tfunction', label: gettext('Trigger Function'),
          type: 'text', disabled: 'inSchemaWithModelCheck',
          mode: ['create','edit', 'properties'], group: gettext('Definition'),
          control: 'node-ajax-options', url: 'get_triggerfunctions',
          cache_node: 'trigger_function'
        },{
          id: 'tgargs', label: gettext('Arguments'), cell: 'string',
          group: gettext('Definition'),
          type: 'text',mode: ['create','edit', 'properties'], deps: ['tfunction'],
          disabled: function(m) {
            // We will disable it when EDB PPAS and trigger function is
            // set to Inline EDB-SPL
            var tfunction = m.get('tfunction'),
                server_type = m.node_info['server']['server_type'];
            if(!m.inSchemaWithModelCheck.apply(this, [m])) {
                if(server_type === 'ppas' &&
                    !_.isUndefined(tfunction) &&
                tfunction === 'Inline EDB-SPL') {
                    // Disable and clear its value
                    m.set('tgargs', undefined)
                    return true;
                } else {
                    return false;
                }
            } else {
                // Disable it
                return true;
            }
          }
        },{
        id: 'fires', label: gettext('Fires'), deps: ['is_constraint_trigger'],
        mode: ['create','edit', 'properties'], group: gettext('Events'),
        options: function(control) {
            var table_options = [
                {label: "BEFORE", value: "BEFORE"},
                {label: "AFTER", value: "AFTER"}],
                view_options = [
                {label: "BEFORE", value: "BEFORE"},
                {label: "AFTER", value: "AFTER"},
                {label: "INSTEAD OF", value: "INSTEAD OF"}];
            // If we are under table then show table specific options
            if(_.indexOf(Object.keys(control.model.node_info), 'table') != -1) {
                return table_options;
            } else {
                return view_options;
            }
        },
        // If create mode then by default open composite type
        control: 'select2', select2: { allowClear: false, width: "100%" },
        disabled: function(m) {
        // If contraint trigger is set to True then only enable it
        var is_constraint_trigger = m.get('is_constraint_trigger');
        if(!m.inSchemaWithModelCheck.apply(this, [m])) {
            if(!_.isUndefined(is_constraint_trigger) &&
            is_constraint_trigger === true) {
                setTimeout(function() { m.set('fires', 'AFTER') }, 10);
                return true;
            } else {
                return false;
            }
        } else {
            // Check if it is row trigger then enabled it.
            var fires_ = m.get('fires');
            if (!_.isUndefined(fires_) && m.node_info['server']['server_type'] == 'ppas') {
              return false;
            }
            // Disable it
            return true;
        }
       }
      },{
        type: 'nested', control: 'fieldset', mode: ['create','edit', 'properties'],
        label: gettext('Events'), group: gettext('Events'),
        schema:[{
            id: 'evnt_insert', label: gettext('INSERT'),
            type: 'switch', mode: ['create','edit', 'properties'],
            group: gettext('Events'),
            control: Backform.CustomSwitchControl,
            disabled: function(m) {
                var evn_insert = m.get('evnt_insert');
                if (!_.isUndefined(evn_insert) && m.node_info['server']['server_type'] == 'ppas')
                  return false;
                return m.inSchemaWithModelCheck.apply(this, [m]);
            }
        },{
            id: 'evnt_update', label: gettext('UPDATE'),
            type: 'switch', mode: ['create','edit', 'properties'],
            group: gettext('Events'),
            control: Backform.CustomSwitchControl,
            disabled: function(m) {
                var evn_update = m.get('evnt_update');
                if (!_.isUndefined(evn_update) && m.node_info['server']['server_type'] == 'ppas')
                  return false;
                return m.inSchemaWithModelCheck.apply(this, [m]);
            }
        },{
            id: 'evnt_delete', label: gettext('DELETE'),
            type: 'switch', mode: ['create','edit', 'properties'],
            group: gettext('Events'),
            control: Backform.CustomSwitchControl,
            disabled: function(m) {
                var evn_delete = m.get('evnt_delete');
                if (!_.isUndefined(evn_delete) && m.node_info['server']['server_type'] == 'ppas')
                  return false;
                return m.inSchemaWithModelCheck.apply(this, [m]);
            }
        },{
            id: 'evnt_truncate', label: gettext('TRUNCATE'),
            type: 'switch', group: gettext('Events'),
            control: Backform.CustomSwitchControl,
            disabled: function(m) {
            var is_constraint_trigger = m.get('is_constraint_trigger'),
                is_row_trigger = m.get('is_row_trigger'),
                server_type = m.node_info['server']['server_type'];
            if(!m.inSchemaWithModelCheck.apply(this, [m])) {
                // We will enabale truncate only for EDB PPAS
                // and both triggers row & constarint are set to false
                if(server_type === 'ppas' &&
                    !_.isUndefined(is_constraint_trigger) &&
                    !_.isUndefined(is_row_trigger) &&
                is_constraint_trigger === false &&
                    is_row_trigger === false) {
                    return false;
                } else {
                    return true;
                }
            } else {
                // Disable it
                return true;
            }
        }
        }]
        },{
            id: 'whenclause', label: gettext('When'),
            type: 'text', disabled: 'inSchemaWithModelCheck',
            mode: ['create', 'edit', 'properties'],
            control: 'sql-field', visible: true, group: gettext('Events')
        },{
            id: 'columns', label: gettext('Columns'), url: 'nodes',
            control: 'node-list-by-name', cache_node: 'column', type: 'array',
            select2: {'multiple': true},
            deps: ['evnt_update'], node: 'column', group: gettext('Events'),
            disabled: function(m) {
                if(this.node_info &&  'catalog' in this.node_info) {
                    return true;
                }
                //Disable in edit mode
                if (!m.isNew()) {
                    return true;
                }
                // Enable column only if update event is set true
                var isUpdate = m.get('evnt_update');
                if(!_.isUndefined(isUpdate) && isUpdate) {
                    return false;
                }
             return true;
            }
        },{
            id: 'prosrc', label: gettext('Code'), group: gettext('Code'),
            type: 'text', mode: ['create', 'edit'], deps: ['tfunction'],
            control: 'sql-field', visible: true,
            disabled: function(m) {
                // We will enable it only when EDB PPAS and trigger function is
                // set to Inline EDB-SPL
                var tfunction = m.get('tfunction'),
                    server_type = m.node_info['server']['server_type'];

                if(server_type === 'ppas' &&
                    !_.isUndefined(tfunction) &&
                    tfunction === 'Inline EDB-SPL')
                  return false;
                else
                  return true;
            }
        },{
          id: 'is_sys_trigger', label: gettext('System trigger?'), cell: 'string',
          type: 'switch', disabled: 'inSchemaWithModelCheck', mode: ['properties']
        },{
          id: 'is_constarint', label: gettext('Constraint?'), cell: 'string',
          type: 'switch', disabled: 'inSchemaWithModelCheck', mode: ['properties'],
          group: gettext('Definition')
        },{
          id: 'description', label: gettext('Comment'), cell: 'string',
          type: 'multiline', mode: ['properties', 'create', 'edit'],
          disabled: 'inSchema'
    }],
        validate: function(keys) {
          var err = {},
              msg = undefined;
          this.errorModel.clear();

          // If nothing to validate
          if (keys && keys.length == 0) {
            return null;
          }

          if(_.isUndefined(this.get('name'))
              || String(this.get('name')).replace(/^\s+|\s+$/g, '') == '') {
            msg = gettext('Name cannot be empty.');
            this.errorModel.set('name', msg);
            return msg;
            }
          if(_.isUndefined(this.get('tfunction'))
              || String(this.get('tfunction')).replace(/^\s+|\s+$/g, '') == '') {
            msg = gettext('Trigger function cannot be empty.');
            this.errorModel.set('tfunction', msg);
            return msg;
          }

          if(!this.get('evnt_truncate') && !this.get('evnt_delete') &&
            !this.get('evnt_update') && !this.get('evnt_insert')) {
            msg = gettext('Specify at least one event.');
            this.errorModel.set('evnt_truncate', " ");
            this.errorModel.set('evnt_delete', " ");
            this.errorModel.set('evnt_update', " ");
            this.errorModel.set('evnt_insert', msg);
            return msg;
          }

          if(!_.isUndefined(this.get('tfunction')) &&
            this.get('tfunction') === 'Inline EDB-SPL' &&
            (_.isUndefined(this.get('prosrc'))
              || String(this.get('prosrc')).replace(/^\s+|\s+$/g, '') == ''))
          {
            msg = gettext('Trigger code cannot be empty.');
            this.errorModel.set('prosrc', msg);
            return msg;
          }
          return null;
        },
        // We will check if we are under schema node & in 'create' mode
        inSchema: function() {
          if(this.node_info &&  'catalog' in this.node_info) {
            return true;
          }
          return false;
        },
        // We will check if we are under schema node & in 'create' mode
        inSchemaWithModelCheck: function(m) {
          if(this.node_info &&  'schema' in this.node_info) {
            // We will disable control if it's in 'edit' mode
            if (m.isNew()) {
              return false;
            } else {
              return true;
            }
          }
          return true;
        },
        // Checks weather to enable/disable control
        inSchemaWithColumnCheck: function(m) {
          if(this.node_info &&  'schema' in this.node_info) {
            // We will disable control if it's system columns
            // ie: it's position is less then 1
            if (m.isNew()) {
              return false;
            } else {
              // if we are in edit mode
              if (!_.isUndefined(m.get('attnum')) && m.get('attnum') >= 1 ) {
                return false;
              } else {
                return true;
              }
           }
          }
          return true;
        }
      }),
      // Below function will enable right click menu for creating column
      canCreate: function(itemData, item, data) {
          // If check is false then , we will allow create menu
          if (data && data.check == false)
            return true;

          var t = pgBrowser.tree, i = item, d = itemData, parents = [];
          // To iterate over tree to check parent node
          while (i) {
            // If it is schema then allow user to c reate table
            if (_.indexOf(['schema'], d._type) > -1)
              return true;
            parents.push(d._type);
            i = t.hasParent(i) ? t.parent(i) : null;
            d = i ? t.itemData(i) : null;
          }
          // If node is under catalog then do not allow 'create' menu
          if (_.indexOf(parents, 'catalog') > -1) {
            return false;
          } else {
            return true;
          }
      },
      // Check to whether trigger is disable ?
      canCreate_with_trigger_enable: function(itemData, item, data) {
        if(this.canCreate.apply(this, [itemData, item, data])) {
          // We are here means we can create menu, now let's check condition
          if(itemData.icon === 'icon-trigger-bad') {
            return true;
          } else {
            return false;
          }
        }
      },
      // Check to whether trigger is enable ?
      canCreate_with_trigger_disable: function(itemData, item, data) {
        if(this.canCreate.apply(this, [itemData, item, data])) {
          // We are here means we can create menu, now let's check condition
          if(itemData.icon === 'icon-trigger') {
            return true;
          } else {
            return false;
          }
        }
      }
  });
 }

  return pgBrowser.Nodes['trigger'];
});

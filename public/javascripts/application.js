Ext.Loader.setConfig({
    enabled: true,
    paths: {
        Ext4app: '/javascripts/Ext4app'
    }
});

var Rails = {};

Ext.define('Rails.AttributeProtection', {
	sensibleParams: [
		'id', 'updated_at', 'updated_on', 'created_at', 'created_on'
	],
	removeSensibleParams: function(data) {
		var clone = Ext.clone(data);
		Ext.each(this.sensibleParams, function(param) {
			delete clone[param];
		}, this);
		return clone;
	},
});

Ext.define('Rails.ForgeryProtection', {
	csrfParam: function() {
        var meta = Ext.select('meta[name=csrf-param]').item(0);
		return meta == undefined ? undefined : meta.getAttribute('content');
	},
	csrfToken: function() {
        var meta = Ext.select('meta[name=csrf-token]').item(0);
		return meta == undefined ? undefined : meta.getAttribute('content');
	},
    csrfParams: function() {
        var params = {};
		var name = this.csrfParam();
		var value = this.csrfToken();
        if (name != undefined && value != undefined) {
            params[name] = value;
        }
        return params;
    }
});

Ext.define('Rails.JsonWriter', {
    extend: 'Ext.data.JsonWriter',
	requires: [ 'Rails.ForgeryProtection', 'Rails.AttributeProtection' ],
    mixins: {
        forgeryProtection: 'Rails.ForgeryProtection',
		attributeProtection: 'Rails.AttributeProtection'
    },
    alias: 'writer.railsjson',
	writeRecords: function(request, data) {
		request = this.callParent([request, data]);
		// add CSRF token
		Ext.applyIf(request.jsonData, this.csrfParams());
		// remove sensible parameters.
		if (this.root) {
			request.jsonData[this.root] = this.removeSensibleParams(request.jsonData[this.root]);
		} else {
			request.jsonData = this.removeSensibleParams(request.jsonData);
		}
		return request;
    }
});

Ext.define('Rails.RestProxy', {
	extend: 'Ext.data.RestProxy',
	requires: [ 'Rails.JsonWriter' ],
	alias: 'proxy.railsrest',
	constructor: function(config) {
		config = config || {};
		var rootName = config.root || config.url;
		var recordName = config.record || Ext.util.Inflector.singularize(rootName);
		Ext.applyIf(config, {
			format: 'json',
			reader: {
				type: 'json',
				root: rootName,
				record: recordName,
				totalProperty: config.totalProperty || 'total',
				successProperty: config.successProperty || 'success'
			},
			writer: {
				type: 'railsjson',
				root: recordName
			}
		});
		this.callParent([config]);
	}
});

Ext.require('Rails.RestProxy');

Ext.apply(Rails, {
	regModel: function(name, config) {
		config = config || {};
		Ext.applyIf(config, {
		    proxy: {
		        type: 'railsrest',
		        url: config.url
		    }
		});
		return Ext.regModel(name, config);
	}
});

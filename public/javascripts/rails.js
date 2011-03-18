Ext.Loader.setConfig({
    enabled: true
});

Ext.namespace('Rails');

Ext.apply(Rails, {
	regModel: function(name, config) {
		var baseName = name.split('.').pop();
		config = config || {};
		config.proxy = config.proxy || {};
		Ext.applyIf(config.proxy, {
	        type: 'railsrest',
			url: '/' + Ext.util.Inflector.pluralize(baseName.toLowerCase())
		});
		Ext.applyIf(config, {
		});
		return Ext.regModel(name, config);
	}
});

Ext.define('Rails.data.AttributeProtection', {
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

Ext.define('Rails.data.ForgeryProtection', {
	selector: new Ext.Template('meta[name={0}]', {compiled: true}),
	getMeta: function(name) {
        var meta = Ext.select(this.selector.apply([name])).item(0);
		return meta == undefined ? undefined : meta.getAttribute('content');
	},
    csrfParams: function() {
        var params = {};
		var name = this.getMeta('csrf-param');
		var value = this.getMeta('csrf-token');
        if (name != undefined && value != undefined) {
            params[name] = value;
        }
        return params;
    }
});

Ext.mixin('Ext.data.JsonWriter', {
    forgeryProtection: 'Rails.data.ForgeryProtection',
	attributeProtection: 'Rails.data.AttributeProtection'
});

Ext.override('Ext.data.JsonWriter', {
	write: function(request) {
		request = this.callOverridden([request]);
		// add CSRF token
		Ext.applyIf(request.jsonData, this.csrfParams());
		return request;
	},
	writeRecords: function(request, data) {
		// remove sensible parameters.
		data = this.removeSensibleParams(data);
		return this.callOverridden([request, data]);
    }
});

Ext.define('Rails.data.RestProxy', {
	extend: 'Ext.data.RestProxy',
	alias: 'proxy.railsrest',
	constructor: function(config) {
		config = config || {};
		var rootName = config.root || config.url;
		if (rootName != undefined) {
			rootName = rootName.replace(/^\/+/, '');
		}
		var recordName = config.record || Ext.util.Inflector.singularize(rootName);
		config.reader = config.reader || {};
		Ext.applyIf(config.reader, {
			type: 'json',
			root: rootName,
			record: recordName,
			totalProperty: 'total',
			successProperty: 'success'
		});
		config.writer = config.writer || {};
		Ext.applyIf(config.writer, {
			type: 'json',
			root: recordName
		});
		Ext.applyIf(config, {
			format: 'json'
		});
		this.callParent([config]);
	}
});

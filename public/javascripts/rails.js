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
	        type: 'rest',
			url: '/' + Ext.util.Inflector.pluralize(baseName.toLowerCase())
		});
		Ext.applyIf(config, {
		});
		return Ext.regModel(name, config);
	}
});

Ext.define('Rails.data.AttributeProtection', function() {

	var sensibleParams = [
		'id', 'updated_at', 'updated_on', 'created_at', 'created_on'
	];

	return {
		removeSensibleParams: function(data) {
			var clone = Ext.clone(data);
			Ext.each(sensibleParams, function(param) {
				delete clone[param];
			}, this);
			return clone;
		}
	};
}());

Ext.define('Rails.data.ForgeryProtection', function() {

	var selector = new Ext.Template('meta[name={0}]', {compiled: true});

	function getMetaContent(name) {
        var meta = Ext.select(selector.apply([name])).item(0);
		return meta == undefined ? undefined : meta.getAttribute('content');
	}

	return {
	    csrfParams: function() {
	        var params = {};
			var name = getMetaContent('csrf-param');
			var value = getMetaContent('csrf-token');
	        if (name != undefined && value != undefined) {
	            params[name] = value;
	        }
	        return params;
	    }
	};
}());

Ext.data.JsonWriter.mixin({
	forgeryProtection: Rails.data.ForgeryProtection,
	attributeProtection: Rails.data.AttributeProtection
});

Ext.data.JsonWriter.override({
	write: function(request) {
		request = this.callOverridden([request]);
		// add CSRF token
		Ext.applyIf(request.jsonData, this.csrfParams());
		return request;
	},
	writeRecords: function(request, data) {
		// remove sensible parameters.
		data = Ext.Array.map(data, function(o) {
			return this.removeSensibleParams(o);
		}, this);
		return this.callOverridden([request, data]);
    }
});

Ext.define('Rails.data.RestConvention', function() {

	function urlToName(url) {
		if (url == undefined) {
			raise 'URL must be defined';
		}
		return url.replace(/^\//, '');
	}

	function rootName(config) {
		return config.root || urlToName(config.url);
	}

	function recordName(config) {
		return config.record || Ext.util.Inflector.singularize(rootName(config));
	}

	return {
		defaultReaderConfig: function(config) {
			return {
				type: 'json',
				root: rootName(config),
				record: recordName(config),
				totalProperty: 'total',
				successProperty: 'success'
			};
		},
		defaultWriterConfig: function(config) {
			return {
				type: 'json',
				root: recordName(config)
			};
		}
	};
	
}());

Ext.data.RestProxy.mixin({railsConvention: Rails.data.RestConvention});

Ext.data.RestProxy.override({
	constructor: function(config) {
		config = config || {};
		Ext.applyIf(config, { format: 'json' });
		config.reader = config.reader || {};
		Ext.applyIf(config.reader, this.defaultReaderConfig(config));
		config.writer = config.writer || {};
		Ext.applyIf(config.writer, this.defaultWriterConfig(config));
		this.callOverridden([config]);
	}
});

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext4app': '/javascripts/Ext4app'
    }
});

Ext.define('Ext.rails.ForgeryProtection', {
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

Ext.define('Ext.rails.JsonWriter', {
    extend: 'Ext.data.JsonWriter',
    mixins: {
        forgeryProtection: 'Ext.rails.ForgeryProtection'
    },
    alias: 'writer.railsjson',
	sensibleParams: [
		'id', 'updated_at', 'updated_on', 'created_at', 'created_on'
	],
	removeSensibleParams: function(data) {
		var clone = {};
		Ext.apply(clone, this.root ? data[this.root] : data);
		Ext.each(this.sensibleParams, function(param) {
			delete clone[param];
		}, this);
		if (this.root) {
			result = {};
			result[this.root] = clone;
			return result;
		} else {
			return clone;
		}
	},
	writeRecords: function(request, data) {
		request = this.callParent([request, data]);
		// add CSRF token
		Ext.applyIf(request.jsonData, this.csrfParams());
		// remove sensible parameters.
		request.jsonData = this.removeSensibleParams(request.jsonData);
        return request;
    }
});

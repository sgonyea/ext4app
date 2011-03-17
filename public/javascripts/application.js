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

Ext.define('Ext.rails.RestProxy', {
    extend: 'Ext.data.RestProxy',
    mixins: {
        forgeryProtection: 'Ext.rails.ForgeryProtection'
    },
    alias: 'proxy.railsrest',
    buildRequest: function(operation) {
        var request = this.callParent([operation]);
        if (operation.allowWrite()) {
			request.jsonData = request.jsonData || {};
			Ext.applyIf(request.jsonData, this.csrfParams());
        }
        return request;
    }
});

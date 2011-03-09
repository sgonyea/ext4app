Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext4app': '/javascripts/Ext4app'
    }
});

Ext.define('Ext.rails.RestProxy', {
    extend: 'Ext.data.RestProxy',
    alias: 'proxy.railsrest',
    buildRequest: function(operation) {
        var request = this.callParent([operation]);
        if (operation.action != 'read') {
            Ext.applyIf(request.params, this.csrfParams());
        }
        return request;
    },
    csrfParams: function() {
        var params = {};
        var metaCsrfParam = Ext.select('meta[name=csrf-param]').item(0);
        var metaCsrfToken = Ext.select('meta[name=csrf-token]').item(0);
        if (metaCsrfParam != undefined && metaCsrfToken != undefined) {
            var name = metaCsrfParam.getAttribute('content');
            var value = metaCsrfToken.getAttribute('content');
            if (name != undefined && value != undefined) {
                params[name] = value;
            }
        }
        return params;
    }
});

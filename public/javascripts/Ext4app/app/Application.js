Ext.require('Ext4app.stores.UserStore');
Ext.require('Ext4app.views.Main');

Ext.regApplication({
    name: 'Ext4app.app.Application',
    autoInitViewport: false,
    defaultUrl: 'index',
    launch: function(profile) {
        new Ext4app.stores.UserStore({
            pageSize: 30,
            storeId: 'ext4app.users',
            autoLoad: true
        });
        new Ext4app.views.Main();
        console.log("launch!");
    }
});

Ext.regController('dashboard', {
    index: function() {
        console.log("dashboard#index.");
    },
    welcome: function() {
        console.log("dashboard#welcome.");
    }
});

Ext.Router.draw(function(map) {
    map.connect('index', {controller: 'dashboard', action: 'index'});
    map.connect('welcome', {controller: 'dashboard', action: 'welcome'});
});

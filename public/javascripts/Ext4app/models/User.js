Ext.require('Rails.RestProxy');
Ext.regModel('Ext4app.models.User', {
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'age', type: 'int'}
    ],
    proxy: {
        type: 'railsrest',
        url: 'users'
    }
});

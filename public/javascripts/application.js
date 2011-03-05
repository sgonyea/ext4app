Ext.regModel('Ext4app.User', {
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'age', type: 'int'},
        'created_at',
        'updated_at'
    ],
    proxy: {
        type: 'rest',
        url: 'users',
        format: 'json',
        reader: {
            type: 'json',
            root: 'users',
            record: 'user',
            totalProperty: 'total',
            successProperty: 'success'
        }
    }
});

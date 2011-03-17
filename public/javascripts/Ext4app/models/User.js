Ext.regModel('Ext4app.models.User', {
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'age', type: 'int'},
        'created_at',
        'updated_at'
    ],
    proxy: {
        type: 'railsrest',
        url: 'users',
        format: 'json',
        reader: {
            type: 'json',
            root: 'users',
            record: 'user',
            totalProperty: 'total',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            root: 'user',
	    }
    }
});

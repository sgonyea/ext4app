Ext.regModel('Ext4app.models.User', {
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'age', type: 'int'}
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
        },
        writer: {
            type: 'railsjson',
            root: 'user',
	    }
    }
});

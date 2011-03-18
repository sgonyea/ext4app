Rails.regModel('Ext4app.models.User', {
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'age', type: 'int'},
		{name: 'updated_at', type: 'string'}
    ],
	proxy: {
		url: '/users'
	}
});

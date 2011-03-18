Rails.regModel('Ext4app.models.User', {
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'age', type: 'int'}
    ],
	proxy: {
		url: '/users'
	}
});

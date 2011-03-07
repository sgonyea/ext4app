Ext.define('Ext4app.views.Main', {
    extend: 'Ext.container.Viewport',
    constructor: function(config) {
        config = config || {};
        config.layout = 'border';
        config.items = [{
            region: 'center',
            xtype: 'grid',
            store: Ext.getStore('ext4app.users'),
            title: 'Listing Users',
            headers: [
                {text: 'Name', dataIndex: 'name', width: 380, sortable: true},
                {text: 'Age', dataIndex: 'age', width: 40, align: 'right', sortable: true}
            ],
            split: false,
            columnLines: true,
            viewConfig: {
                stripeRows: true
            }
        }, {
            region: 'south',
            xtype: 'pagingtoolbar',
            store: Ext.getStore('ext4app.users'),
            displayInfo: true,
            prependButtons: true
        }];
        this.callParent([config]);
    }
});

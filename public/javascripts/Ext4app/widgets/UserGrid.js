Ext.define('Ext4app.widgets.UserGrid', {
  extend: 'Ext.grid.GridPanel',
  alias: 'widget.usergrid',
  requires: [ 'Ext4app.stores.UserStore' ],
  initComponent: function() {
    this.headers = [
      {text: 'Name', dataIndex: 'name', width: 380, sortable: true},
      {text: 'Age', dataIndex: 'age', width: 40, align: 'right', sortable: true}
    ];
    this.store = new Ext4app.stores.UserStore({
      pageSize: 25,
      storeId: 'ext4app.users',
      autoLoad: true
    });
    this.dockedItems = [
      new Ext.toolbar.PagingToolbar({
        dock: 'bottom',
        store: Ext.data.StoreMgr.get(this.store.storeId),
        displayInfo: true,
        prependButtons: true
      })
    ];
    this.callParent();
  }
});

Ext.define('Ext4app.stores.UserStore', {
  extend: 'Ext.data.Store',
  requires: [ 'Ext4app.models.User' ],
  constructor: function(config) {
    config = config || {};
    config.model = 'Ext4app.models.User';
    config.remoteSort = true;
    this.callParent([config]);
  }
});

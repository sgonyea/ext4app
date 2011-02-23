// Ext.js 4 PR1 WORKAROUND
Ext.data.Model.override({
    getProxy: function(){
        return this.self.proxy;
    }
});
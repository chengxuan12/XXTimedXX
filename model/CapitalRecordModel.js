/**
 * Created by Administrator on 2015/7/6.
 */


'use strict';
define(['backbone'],function(Backbone){
    var CapitalRecordModel = Backbone.Model.extend({
        initialize:function(type,amount,status,account,source,date_time) {
            this.set("type",type);
            this.set("amount",amount);
            this.set("status",status);
            this.set("account",account);
            this.set("source",source);
            this.set("date_time",date_time);
        },
        defaults: {
            type:'',
            account:'',
            amount:'',
            source:'',
            status:''
        },
    });
    return CapitalRecordModel;
});

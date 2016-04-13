/**
 * Created by Administrator on 2015/8/7.
 */
define(['backbone'],function(Backbone){
    var TransactionRecordModel = Backbone.Model.extend({
        defaults: {
            id:"",
            quantity:0,
            orderDate:new Date(),
            product:{
                id:"",
                title:""
            },
            palState: ""
        }
    });
    return TransactionRecordModel;
});

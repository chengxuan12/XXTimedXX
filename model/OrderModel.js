/**
 * Created by Administrator on 2015/8/5.
 */
define(['backbone'],function(Backbone){
    var OrderModel = Backbone.Model.extend({
        initialize:function() {
        },
        defaults: {
            "id": "",
            "userSimple": null,
            "quantity": 0,
            "orderDate": "",
            "payDate": "",
            "endDate": "",
            "product": {
            },
            "yesterdayEarnMoney": 0,
            "totalEarnMoney": 0,
            "status": "",
            "palState": ""
        }
    });
    return OrderModel;
});

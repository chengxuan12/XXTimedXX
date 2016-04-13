/**
 * Created by Administrator on 2015/8/7.
 */
define(['backbone'],function(Backbone){
    var AssetModel = Backbone.Model.extend({
        defaults: {
            earnMoney:0,
            totalMoney:0 ,
            availableMoney: 0,
            inprogressMoney: 0,
            proportion: "0.00%"
        },
        url: "/api/account"
    });
    return AssetModel;
});

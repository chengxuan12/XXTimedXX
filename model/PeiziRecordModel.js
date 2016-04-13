/**
 * Created by Administrator on 2015/7/3.
 */

'use strict';
define(['backbone'],function(Backbone){
    var PeiZiRecordModel = Backbone.Model.extend({
        initialize:function(type,warn_line,open_line,deposit,lever,loan,account,status,cycle_count,open_account_time) {
            this.set("type",type);
            this.set("warn_line",warn_line);
            this.set("open_line",open_line);
            this.set("deposit",deposit);
            this.set("lever",lever);
            this.set("loan",loan);
            this.set("account",account);
            this.set("status",status);
            this.set("cycle_count",cycle_count);
            this.set("open_account_time",open_account_time);
        },
        defaults: {
            "type": "",
            "warn_line":"",
            "open_line":"",
            "deposit":"",
            "lever":"",
            "loan":"",
            "account":"",
            "status":""
        },
    });
    return PeiZiRecordModel;
});

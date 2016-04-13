/**
 * Created by Administrator on 2015/8/5.
 */
'use strict';
define(['backbone'],function(Backbone){
    var RegisterModel = Backbone.Model.extend({
        defaults: {
            mobileNumber: "",
            pwd: "",
            confirmPwd: "",
            refereeNumber:"",
            smsVarify: ""
        },

    });
    return RegisterModel;
});

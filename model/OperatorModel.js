/**
 * Created by Administrator on 2015/7/10.
 */
'use strict';
define(['backbone'],function(Backbone){
    var OperatorModel = Backbone.Model.extend({
        initialize:function(cookie){
            this.cookie = cookie;
        },
        defaults:{
            cookie:''
        }
    });
    return OperatorModel;
});
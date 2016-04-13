/**
 * Created by Administrator on 2015/8/5.
 */
'use strict';
define(['backbone'],function(Backbone){
    var CookieModel = Backbone.Model.extend({
        initialize:function(){

        },
        defaults:{
            loginStatus:false
        }
    });
    return CookieModel;
});
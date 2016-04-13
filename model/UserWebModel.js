/**
 * Created by Administrator on 2015/8/4.
 */
'use strict';
define(['backbone'],function(Backbone){
    var UserWebModel = Backbone.Model.extend({
        defaults: {
            user:{}
        },

    });
    return UserWebModel;
});
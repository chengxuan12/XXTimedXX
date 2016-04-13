/**
 * Created by Administrator on 2015/7/27.
 */
'use strict';

define(['backbone', '../model/InvestProductModel','../component/Common/Cookie.react'], function(Backbone, InvestProductModel,Cookie) {
    var InvestProductCollection = Backbone.Collection.extend({
        model: InvestProductModel,
        url:(new Cookie().getCookie("loginStatus")?globamParam.login_url:globamParam.public_url)+"/products/recommend?start=0&count=8"
    });
    return InvestProductCollection;
});

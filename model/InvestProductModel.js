/* Created by Administrator on 2015/7/27.*/
'use strict';
define(['backbone'], function (Backbone) {
    var InvestProductModel = Backbone.Model.extend({
        defaults: {
            id: "",
            title: "",
            description: "",
            profitRate: "",
            limitCycle: "",
            amount: "",
            bought: "",
            payType: "",
            startDate: "",
            endDate: "",
            minBuy: "",
            maxBuy: "",
            star: "",
            deposit: "",
            additionalRate: "",
            returnCash: "",
            riskRegister: "",
            returnedMoney: "",
            share: "",
            typeName: "",
            badges: [],
            status: ""
        }
    });
    return InvestProductModel;
});
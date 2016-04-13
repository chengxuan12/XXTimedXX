/**
 * Created by Administrator on 2015/8/7.
 */
'use strict';
define(['backbone', '../model/TransactionRecordModel'], function(Backbone, TransactionRecordModel) {
    var TransactionRecordCollection = Backbone.Collection.extend({
        model: TransactionRecordModel,
        url:"/api/account/tradehistory"
    });
    return TransactionRecordCollection;
});

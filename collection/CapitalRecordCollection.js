/**
 * Created by Administrator on 2015/7/6.
 */
'use strict';

define(['backbone', '../model/CapitalRecordModel'], function(Backbone, CapitalRecordModel) {
    var CapitalRecordCollection = Backbone.Collection.extend({
        model: CapitalRecordModel
    });
    return CapitalRecordCollection;
});

/**
 * Created by Administrator on 2015/7/2.
 */
'use strict';

define(['backbone', '../model/PeiziRecordModel'], function(Backbone, PeiziRecordModel) {
    var PeiziRecordCollection = Backbone.Collection.extend({
        model: PeiziRecordModel
    });
    return PeiziRecordCollection;
});

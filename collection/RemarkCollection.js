/**
 * Created by Administrator on 2015/7/10.
 */
'use strict';
define(['backbone', '../model/RemarkModel'], function(Backbone, RemarkModel) {
    var RemarkCollection = Backbone.Collection.extend({
        model: RemarkModel
    });
    return RemarkCollection;
});

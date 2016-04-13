/**
 * Created by Administrator on 2015/7/3.
 */
define(['backbone'],function(Backbone){
    var PeiZiRecordListModel = Backbone.Model.extend({
        defaults: {
            list:{
                ulist:[],
                plist:[]
            }
        },

    });
    return PeiZiRecordListModel;
});
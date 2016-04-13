/**
 * Created by Administrator on 2015/7/6.
 */
define(['backbone'],function(Backbone){
    var CapitalRecordListModel = Backbone.Model.extend({

        defaults: {
            list: {
                ulist: [],
                clist: []
            }
        }

    });
    return CapitalRecordListModel;
});
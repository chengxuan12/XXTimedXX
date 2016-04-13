/**
 * Created by Administrator on 2015/7/2.
 */
define(['backbone'],function(Backbone){
    var PeiZiModel = Backbone.Model.extend({
        initialize:function(uid,type,status,title) {
            this.set("uid",uid);
            this.set("type",type);
            this.set("status",status);
            this.set("title",title);
        },
            defaults: {
            uid:"",
            type:"",
            status:"",
            title:""
        }
    });
    return PeiZiModel;
});

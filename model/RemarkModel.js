/**
 * Created by Administrator on 2015/7/10.
 */
'use strict';
define(['backbone'],function(Backbone){
    var RemarkModel = Backbone.Model.extend({
        initialize:function(author,remark){
            this.author = author;
            this.remark = remark;
        },
        defaults:{
           author:"",
           remark:"",
           status:"",
           remarks:[]
        }
    });
    return RemarkModel;
});
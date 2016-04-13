/**
 * Created by Administrator on 2015/7/3.
 */
'use strict';
define(['backbone'],function(Backbone){
    var UserModel = Backbone.Model.extend({
       initialize:function(id,name,mobile){
           this.set("id",id);
           this.set("name",name);
           this.set("mobile",mobile);
       },
        defaults:{
            id:'',
            name:'',
            mobile:'',
            "mobileNumber": "",
            "nickName": "",
            "userName": "",
            "sex": "",
            "idNo": "",
            "birthdate": 0,
            "marry": "",
            "education": "",
            "province": "",
            "city": "",
            "area": "",
            "addressId": 0,
            "email": "",
            "qq": "",
            "reference": 0,
            "regDate": "",
            "totalMoney": "",
            "earnMoney": "",
            "availableMoney": "",
            "inprogressMoney": "",
            "tradePassStates": "",
            "userIcon": ""
        }
    });
    return UserModel;
});
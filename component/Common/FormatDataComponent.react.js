/**
 * Created by Administrator on 2015/9/15.
 */
'use strict';

define([
    'react',
    'jquery'
], function (React,$) {
    return React.createClass({
        formatData: function (now,flag) {
            now = new Date(now);
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var min = now.getMinutes();
            var sec = now.getSeconds();
            if(month<10){month = "0"+month;}
            if(date<10){date = "0"+date};
            if(hour<10) {hour = "0"+hour;}
            if(min<10){min = "0"+min;}
            if(sec<10){sec = "0"+sec;}
            if(flag==1) {
                return year + "年" + month + "月" + date + "日 " + hour + ":" + min + ":" + sec;
            }else if(flag==2) {
                return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
            }else if(flag==3){
                return year + "-" + month + "-" + date;
            }else{
                return year + "年" + month + "月" + date + "日 " + hour + ":" + min + ":" + sec;
            }
        },
        render: function() {
            return (
                <div>
                </div>
            );
        }
    });
});
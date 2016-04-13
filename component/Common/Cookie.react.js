/**
 * Created by Administrator on 2015/7/27.
 */
'use strict';

define([
    'react',
    'jquery'
], function (React,$) {
    return React.createClass({
        setCookie :function(name, value, exdays) {
            var exdays=(exdays==null||exdays==undefined)?1000:exdays;
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            value = encodeURI(value);
            var many=(document.cookie=="")?"":" ;";
            var cookie=name + "=" + value +many+document.cookie+";"+expires;
            document.cookie=cookie;
            return document.cookie;
        },
        getCookie : function(name) {
            var name = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return decodeURI(c.substring(name.length, c.length));
            }
            return "";
        },

        render: function() {
            return (
                 <div>
                 </div>
            );
        }
    });
});


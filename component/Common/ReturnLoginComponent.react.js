/**
 * Created by Administrator on 2015/8/18.
 */
'use strict';

define([
    'react',
    'jquery'
], function (React,$) {
    return React.createClass({
        returnLogin:function(){
          if(window.location.href.indexOf("login")==-1){
              window.location.href="/#/login";
          }else{
              return;
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


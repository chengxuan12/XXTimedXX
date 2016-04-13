/**
 * Created by Administrator on 2015/7/20.
 */
/**
 * Created by Administrator on 2015/7/14.
 */
'use strict';
define([
    'react',
    'jquery',
], function (React,$) {
    return React.createClass({
        componentDidMount: function() {

        },
        setItem:function(name,value){
            storage.setItem(name,value);
        },
        getItem:function(name){
            return storage.getItem(name);
        },
        render: function() {
                return(<div></div>);
        }
    });
});


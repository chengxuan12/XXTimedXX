/**
 * Created by Administrator on 2015/7/7.
 */
'use strict';

define([
    'react',
    'backbone',
    'jquery',
    'jsx!component/Search/SearchComponent.react',
    'jsx!component/Search/StatusComponent.react',
    'jsx!component/Search/TypeComponent.react',
    'jsx!component/Search/HeaderTitle.react'
], function (React,Backbone,$,SearchComponent,StatusComponent,TypeComponent,HeaderTitle) {
    return React.createClass({
        render: function() {

            return (
                <div>
                    <div ><HeaderTitle peiziModel={this.props.peiziModel}/></div>
                    <div ><StatusComponent peiziModel={this.props.peiziModel}/></div>
                    <div className="search-bottom-line"><TypeComponent peiziModel={this.props.peiziModel}/></div>
                    <div><SearchComponent peiziModel={this.props.peiziModel}/></div>
                </div>
            );
        }
    });
});


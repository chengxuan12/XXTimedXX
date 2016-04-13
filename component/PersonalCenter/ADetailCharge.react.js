/**
 * Created by Administrator on 2015/9/10.
 */
'use strict';

define([
        'react',
        'jquery',
        'jsx!component/PersonalCenter/AssetDetails.react',
        'jsx!component/PersonalCenter/BalanceCharge.react',
    ],
    function(React,$,AssetDetails,BalanceCharge){
        return React.createClass({
            render:function(){
                if(this.props.page!=undefined&&this.props.page!=""&&this.props.page!=null){
                    return (
                        <AssetDetails title={this.props.title} user={this.props.user} status={this.props.status} type={this.props.type} page={this.props.page}/>);
                }else{
                    return (
                        <BalanceCharge user={this.props.user} title={this.props.title}/>
                    );
                }

            }
        });
    });
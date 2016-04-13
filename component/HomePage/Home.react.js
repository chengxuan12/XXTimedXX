/**
 * Created by Administrator on 2015/8/19.
 */

'use strict';
define([
    'react',
    'jquery',
    'jsx!component/HomePage/Swiper.react',
    'jsx!component/HomePage/InvestRecommend.react',
    'jsx!component/HomePage/LatestNotice.react',
    'jsx!component/HomePage/LatestInvestNotes.react',
    'jsx!component/HomePage/InvestHot.react',
    'jsx!component/HomePage/Others.react',
    'jsx!component/HomePage/Superiority.react',
    'jsx!component/HomePage/StartInvest.react'

], function (React,$,Swiper,InvestRecommend,LatestNotice,LatestInvestNotes,InvestHot,Others,Superiority,StartInvest) {
    return React.createClass({
        render: function () {
            return(
                <div style={{background:"#F0F0F0"}}>
                    <Swiper  user={this.props.user} assetData={this.props.assetData}/>
                    <Superiority/>
                    <LatestNotice/>
                    <InvestHot/>
                    <LatestInvestNotes/>
                    <div id="rProducts"><InvestRecommend /></div>
                    <Others />
                    <StartInvest user={this.props.user}/>
                </div>
            );
        }
    });
});
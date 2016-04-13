/**
 * Created by Administrator on 2015/8/31.
 */
'use strict';
define([
    'react',
    'jquery',
    'jsx!component/OtherPage/CommonProblem.react'
], function (React,$,CommonProblem) {
    return React.createClass({
        componentDidMount: function () {
            this.setTimer();
            $(window).resize(function() {
                this.forceUpdate();
                this.setTimer();
            }.bind(this));
        },
        setTimer:function(){
            var t = this;
            if(this.refs.financial_banner){
                var naturalWidth,naturalHeight;//原始的宽高度
                $("#financial_banner").attr("src", $("#financial_banner").attr("src")).load(function() {
                    naturalWidth = this.naturalWidth;
                    naturalHeight = this.naturalHeight;
                    if($(window).width()>768) {
                        var N = 2;
                        var left = -((naturalWidth - $(window).width()) / N).toFixed(2);
                        $("#financial_banner").css("position", "absolute").css("left", left).css("width","auto");
                        t.restSwiper(naturalHeight);
                    }else{
                        $("#financial_banner").attr("src","assets/images/photo_financing_banner.png");
                        $("#financial_banner").css("position", "relative").css("width","100%").css("left",0);
                        t.restSwiper("auto");
                    }
                });
            }
        },
        restSwiper:function(height){
            $("#financial_banner").height(height);
            $("#financial_div").height(height);
            if($(window).width()>750){
                $("#financial_div").css("margin-top","-20px");
            }else{
                $("#financial_div").css("margin-top","0px");
            }
        },
        render: function () {
            var src = "assets/images/financing_banner.png";
            if($(window).width()<768){
                src = "assets/images/photo_financing_banner.png"
            }
            return(<div style={{background:"#F0F0F0"}}>
                <div id="financial_div" style={{background:"#F0F0F0",position:"relative",overflow:"hidden",width:"100%",height:"100%"}}>
                    <img src={src} id="financial_banner" ref="financial_banner" style={{width:"100%"}}/>
                </div>
                </div>
            );
        }
    });
});
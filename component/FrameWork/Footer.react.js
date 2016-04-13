/**
 * Created by Administrator on 2015/7/20.
 */
define([
    'react',
    'backbone',
    'jquery'
], function (React,Backbone,$) {
    return React.createClass({

        render: function() {
            return (
                        <div className="main-footer">
                            <div className="footer container">
                                <div className="row row-footer">

                                <div className="f1 col-sm-12 col-lg-7">
                                     <div className="row info">
                                        <div className="float-l mcol-xs-12">
                                        <a href="#">关于翔翔财富</a>
                                        <span className="x">&nbsp;|&nbsp;</span>
                                        <a href="#">免费体验</a>
                                        <span className="x">&nbsp;|&nbsp;</span>
                                        <a href="#">天天赢</a>
                                        <span className="x">&nbsp;|&nbsp;</span>
                                        <a href="#">月月赢</a>
                                         </div>
                                        <div className="float-l mcol-xs-12">
                                        <span className="f1-hide">&nbsp;|&nbsp;</span>
                                        <a href="#">安全保障</a>
                                        <span className="x">&nbsp;|&nbsp;</span>
                                        <a href="#">新手指引</a>
                                        <span className="#">&nbsp;|&nbsp;</span>
                                        <a href="#">联系我们</a>
                                        <span className="x">&nbsp;|&nbsp;</span>
                                        <a target="#">软件下载</a>
                                        </div>
                                    </div>
                                    <div className="copy">©&nbsp;2015 &nbsp;翔翔 &nbsp;All rights reserved &nbsp;上海小翔互联网金融信息服务有限公司&nbsp;|&nbsp;<a target="_blank" href="#">沪ICP备15013590号</a></div>
                                </div>

                                <div className="f2 col-xs-8 col-sm-7 col-lg-2 col-lg-offset-2">
                                    <div className="dh">
                                        <span className="tit">联系我们：</span>
                                        <span>400-8081-999</span>
                                    </div>
                                    <div className="kf">
                                        <a target="_blank" href="#" class="blue">在线客服</a>
                                    </div>
                                </div>

                                <div className="f3 col-xs-4 col-sm-5 col-lg-1 ">
                                    <div className="tit">关注我们</div>

                                    <img src="assets/images/qrcode.jpg" className="f3-img"/>

                                </div>

                            </div>
                        </div>
                </div>
            );
        }
    });
});

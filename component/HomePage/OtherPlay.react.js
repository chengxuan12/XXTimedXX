/**
 * Created by Administrator on 2015/8/21.
 */
'use strict';
define([
    'react',
    'jquery'
], function (React,$) {
    return React.createClass({
        render: function () {
            return(
                <div>
                    <div className="wTitle" style={{paddingLeft:"0px"}}>翔翔财富还能怎么玩？</div>
                    <div style={{background:"#fff",marginTop:"5px"}}>
                        <div className="row">
                            <div className="clearfix otherPlay" style={{borderBottom:"0px"}}>
                                <div className="col-sm-3 hidden-xs">
                                <img src = "assets/images/113.png" />
                                </div>
                                <div className="col-xs-12 col-sm-9 oPlayTitle">
                                 <div>突然急用钱想收回投资?<a href="/#/article/help/cash" className="otherLink">如何变现&nbsp;<i className="icon-chevron-right"></i></a></div>
                                 <ul className="oPlayUl">
                                    <li style={{paddingTop:"10px"}}>2步轻松搞定，自主设定借款费率</li>
                                    <li style={{padding:"5px 0"}}>变现成功后，资金自动打款至原银行卡账户</li>
                                 </ul>
                                </div>
                            </div>
                         </div>
                         <div className="row">
                             <div className="clearfix otherPlay">
                                <div className="col-sm-3 hidden-xs">
                                    <img src = "assets/images/114.png" />
                                </div>
                                <div className="col-xs-12 col-sm-9 oPlayTitle">
                                    <div>缺钱融资?<a href="/#/article/help/financial" className="otherLink">如何融资&nbsp;<i className="icon-chevron-right"></i></a></div>
                                    <ul className="oPlayUl">
                                        <li style={{paddingTop:"10px"}}>缺钱用？简单两步，快速融资</li>
                                        <li style={{padding:"5px 0"}}>融资利率超低，最低年化4.5%</li>
                                        <li>融资成功后，资金自动打到绑定银行卡上</li>
                                    </ul>
                                </div>
                               </div>
                          </div>
                    </div>
                </div>);
        }
    })
})
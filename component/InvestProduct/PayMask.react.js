/**
 * Created by Administrator on 2015/9/14.
 */

'use strict';
define([
    'react',
    'jquery',
], function (React, $) {
    return React.createClass({
        getInitialState:function(){
          return {
              title: this.props.title
          }
        },
        hide:function(){
            $('#charge_light').css("display",'none');
            $('#charge_fade').css("display",'none');
        },
        render: function () {
            var href = "/#/personal/asset";
            if(this.state.title && this.state.title == "buy"){
                href = "/#/personal/transRecord";
            }
            return (<div>
                <div id="charge_light" className="row white_content">
                    <div className="col-xs-12 charge_liTitle">支付完成前，请不要关闭此窗口</div>
                    <div className="col-xs-6 text-right">
                        <div className="charge_liBtn liBtnColor1">
                            <a href="javascript:void(0)" onClick={this.hide} type="button"><div>支付失败</div></a>
                        </div>
                    </div>
                    <div className="col-xs-6 text-left ">
                        <div className="charge_liBtn liBtnColor2">
                            <a href={href} onClick={this.hide} type="button"><div style={{borderRadius:"3px"}}>支付成功</div></a>
                        </div>
                    </div>
                </div>
                <div id="charge_fade" className="black_overlay"></div>
               </div> );
            }
    });
});

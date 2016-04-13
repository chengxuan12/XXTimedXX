/**
 * Created by Administrator on 2015/8/12.
 */
'use strict';

define([
    'react',
    'jquery'
], function (React,$) {
    return React.createClass({

        render: function() {
            return (
                <div style={{background:"#efefef"}} className="swMarATop">
                    <div className="container registerSu">
                        <div className="row register-success">
                             <div className="col-xs-12  tAlignCe">
                                 <img src="assets/images/icn_sign_up_success.png" style={{height:"60px"}}/>
                              </div>
                              <div className="col-xs-12  reSucFont" >
                                    注册成功！
                              </div>
                              <div className="col-xs-12  reSucFont2">
                                  恭喜你成功组成翔翔财富并绑定银行卡
                              </div>
                              <div className="col-xs-12  reSucFont2" style={{paddingTop:"5px"}}>
                                  快快开始你的财富之旅，开始投资吧！
                              </div>
                              <div className="col-xs-12 tAlignCe">
                                  <a  href="/#/invest" className="btn rsBtn" type="button">开始投资</a>
                              </div>
                       </div>
                 </div>
                </div>

            );
        }
    });
});

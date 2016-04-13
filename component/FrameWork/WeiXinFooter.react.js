/**
 * Created by Administrator on 2015/8/19.
 */
define([
    'react',
    'backbone',
    'jquery'
], function (React,Backbone,$) {
    return React.createClass({
        componentDidMount: function () {
            this.getFootType();
        },
        componentDidUpdate: function () {
            this.getFootType();
        },
        getFootType:function(){
            var headType=this.props.headType;
            if(headType=="homePage"){
                $('#homePageF').addClass("wTFoChoose");
                $("#homePageF img").attr("src","assets/images/icn_menu_home_pre.svg");
            }else if(headType=="invest"){
                $('#investF').addClass("wTFoChoose");
                $("#investF img").attr("src","assets/images/icn_menu_investment_pre.svg");
            }else if(headType=="financial"){
                $('#financingF').addClass("wTFoChoose");
                $("#financingF img").attr("src","assets/images/icn_menu_finance_pre.svg");
            }else if(headType=="personal"){
                $('#personalF').addClass("wTFoChoose");
                $("#personalF img").attr("src","assets/images/icn_menu_my_pre.svg");
            }else{

            }
        },
        goPeronalAsset:function(){
            if (window.loginStatus == undefined || window.loginStatus == "" || window.loginStatus == false){
                routerReact.navigate("login",{trigger: true});
            }else{
                routerReact.navigate("personal/asset",{trigger: true});
            }
        },
        render: function() {
            return (
                <div className="mMarTop">
                <div className="main-footer hidden-xs">
                    <div className="container">
                        <div style={{padding:"40px 0px",borderBottom:"1px solid #545454"}}>
                                <div className="row">
                                    <div className="col-sm-6 col-md-5">
                                        <div className="row">
                                            <div className="col-sm-3" style={{paddingRight:"0px"}}>
                                                    <div className="titleFont">关于翔翔</div>
                                                    <div className="fontChild"><a href="/#/article/about/platform">平台介绍</a></div>
                                             </div>
                                            <div className="col-sm-3" style={{paddingRight:"0px"}}>
                                                    <div className="titleFont" >安全保障</div>
                                                    <div className="fontChild"><a href="/#/article/secure/investSafe">投资安全</a></div>
                                                    <div className="fontChild"><a href="/#/article/secure/moneySafe">资金安全</a></div>
                                                    <div className="fontChild"><a href="/#/article/secure/riskManage">风险管理</a></div>
                                            </div>
                                            <div className="col-sm-3" style={{paddingRight:"0px"}}>
                                                    <div className="titleFont">理财产品</div>
                                                    <div className="fontChild"><a href="/#/article/products/monthlyWin">周周赚</a></div>
                                                    <div className="fontChild"><a href="/#/article/products/weeklyWin">月月赢</a></div>
                                            </div>
                                            <div className="col-sm-3" style={{paddingRight:"0px"}}>
                                                    <div className="titleFont">理财帮助</div>
                                                    <div className="fontChild"><a href="/#/article/help/register">注册</a></div>
                                                    <div className="fontChild"><a href="/#/article/help/invest">投资</a></div>
                                                    <div className="fontChild"><a href="/#/article/help/pay">支付</a></div>
                                                    <div className="fontChild"><a href="/#/article/help/cash">变现</a></div>
                                                    <div className="fontChild"><a href="/#/article/help/financial">融资</a></div>
                                            </div>
                                        </div>
                                 </div>
                                <div className="col-sm-5  col-lg-4 col-sm-offset-1 col-md-offset-2 col-lg-offset-3">
                                    <div className="row">
                                        <div className="col-sm-6 col-sm-offset-6 tAlignCe">
                                            <img src="assets/images/qrcode.jpg" style={{width:"100px"}}/>
                                            <div className="titleFont" style={{paddingTop:"10px"}}>翔翔财富微信公众账号</div>
                                         </div>
                                     </div>
                                </div>
                            </div>
                        </div>
                        <div style={{padding:"20px 0px 40px 0px"}}>
                            <div className="row">
                                <div className="col-sm-7 col-md-5">
                                    <div>
                                        <span className="titleFont" style={{fontSize:"16px"}}>客服热线（09:00&nbsp;-&nbsp;18:00）：&nbsp;</span><span className="bottomFont" style={{fontSize:"24px",fontWeight:"600"}}>400-8081-999</span>
                                     </div>
                                    <div>
                                        <span className="titleFont" style={{paddingTop:"5px"}}>客服邮箱：&nbsp;</span><span className="bottomFont">service@xxcaifu.com</span>
                                    </div>
                                </div>
                                <div className="col-sm-5  col-md-offset-2" style={{textAlign:"right",paddingTop:"6px"}}>
                                    <div>
                                        <span className="bottomFont" style={{fontSize:"16px",fontWeight:"600"}}>版权所有@上海小翔金融有限公司</span>
                                    </div>
                                    <div>
                                       <span className="bottomFont" style={{fontWeight:"600"}}>投资有风险，购买需谨慎</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                 <div className="visible-xs container-fluid" style={{position:"fixed",bottom:"0px",width:"100%",zIndex:"999"}}>
                         <div className="row" style={{background:"#F9F9F9",borderTop:"1px solid #e6e6e6"}}>
                             <div className="clearfix wei-mobileFooter">
                                 <a href="/#/home">
                                     <div className="col-xs-3" id="homePageF">
                                         <img src="assets/images/icn_menu_home.svg" style={{width:"18px"}}/><br />首页
                                     </div>
                                 </a>
                                 <a href="/#/invest">
                                     <div className="col-xs-3" id="investF">
                                         <img src="assets/images/icn_menu_investment.svg" style={{width:"17px"}}/><br />投资
                                     </div>
                                 </a>
                                 <a href="/#/financial">
                                     <div className="col-xs-3" id="financingF">
                                         <img src="assets/images/icn_menu_finance.svg" style={{width:"17px"}}/><br />融资
                                      </div>
                                 </a>
                                 <a onClick={this.goPeronalAsset} style={{cursor:"pointer"}} href="javascript:void(0)">
                                     <div className="col-xs-3" id="personalF">
                                         <img src="assets/images/icn_menu_my.svg" style={{width:"18px"}}/><br />个人
                                     </div>
                                 </a>
                          </div>
                         </div>
                 </div>
             </div>
            );
        }
    });
});

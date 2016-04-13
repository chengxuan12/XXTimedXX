/**
 * Created by Administrator on 2015/8/7.
 */
'use strict';

define([
        'react',
        'jquery',
        ],
    function(React,$){
        return React.createClass({
            PropTypes:{
                menuList:[
                    "我的资产","交易记录","余额明细","资料修改","账户安全","银行卡管理"
                ],
                menuRoute: {
                    "我的资产":"/#/personal/asset",
                    "交易记录":"/#/personal/transRecord",
                    "余额明细":"/#/personal/assetDetails",
                    "资料修改":"/#/personal/personalData",
                    "账户安全":"/#/personal/accountSecurity",
                    "银行卡管理":"/#/personal/banksMange",
                }

            },
            getInitialState:function(){
                return{
                    inputString:'',
                    title:this.props.title
                };
            },
            componentDidMount:function() {
            },
            render:function(){
                return (
                    <div>
                        <ul style={{marginBottom:"0px",padding:"4px 0 1px 0"}}>
                            {
                                this.PropTypes.menuList.map(function(menu){
                                    var style={color:"#414a50"};
                                    if(menu == this.state.title){
                                        style={color:"#428bca"};
                                    }
                                   return(<li style={{lineHeight:"32px"}}><a style={style} href={this.PropTypes.menuRoute[menu]}>{menu}</a></li>);
                                }.bind(this))
                            }
                        </ul>
                    </div>
                );
            }
        });
    });
/**
 * Created by Administrator on 2015/8/21.
 */
define([
    'react',
    'jquery',
    'jsx!component/Common/Cookie.react'
], function (React,$,Cookie) {
    return React.createClass({
        getInitialState:function(){
            return {
                tType:"",
                bType:"",
                rightList:false
            }
        },
        componentWillMount: function () {
            var cookie=new Cookie();
            var rightList=cookie.getCookie('rightList');
            if(rightList=="show"){
                this.setState({rightList :true});
            }
        },
        componentDidMount:function(){
            this.setState({tType:this.props.tType,bType:this.props.bType});
            this.setRightList();
            $('#goTop').hide();
            $(window).scroll(function() {
                this.setRightFix();
            }.bind(this));

        },
        setRightFix:function(){
            if($(window).scrollTop()>130+$(window).height() * 0.16){
                $("#queEvRight").css("position","fixed");
                $("#queEvRight").css("top","0%");
            }else{
                $("#queEvRight").css("position","initial");
            }
            if ($(window).scrollTop() >200){
                $('#goTop').show();
            } else{
                $('#goTop').hide();
            }

        },
        componentWillReceiveProps:function(nextProps){
                this.setState({tType:nextProps.tType,bType:nextProps.bType});

        },

        PropTypes:{
            Category: [{
                id: "about",
                title: "关于翔翔财富",
                items: [{
                    id: "platform",
                    title:"平台介绍"
                }],
                img:"assets/images/icn_help_about.png"
            },{
                id: "secure",
                title: "安全保障",
                items: [{
                    id: "investSafe",
                    title:"投资安全"
                },{
                    id: "moneySafe",
                    title:"资金安全"
                },{
                    id:"riskManage",
                    title:"风险管理"
                }],
                img:"assets/images/icn_help_safe.png"
            },{
                id:"products",
                title:"理财产品",
                items:[{
                    id:"monthlyWin",
                    title:"月月赢"
                },{
                    id:"weeklyWin",
                    title:"周周赚"
                }],
                img:"assets/images/icn_help_product.png"
            },
             {
                 id:"help",
                 title:"理财帮助",
                 items:[{
                     id:"register",
                     title:"注册"
                 },{
                     id:"invest",
                     title:"投资"
                 },{
                    id:"pay",
                    title:"支付"
                 },{
                     id:"cash",
                     title:"变现"
                 },{
                     id:"financial",
                     title:"融资"
                 }],
                 img:"assets/images/icn_help_financial_manage.png"
             }
            ],
        },
        change:function(tType,bType){
            this.props.change(tType,bType);
        },
        setRightList:function(){
            var cookie=new Cookie();
            if(this.state.rightList){
                $('#queEvRiMoList').css("display","block");
                this.setState({rightList:false});
                cookie.setCookie("rightList","show");
            }else{
                $('#queEvRiMoList').css("display","none");
                this.setState({rightList:true});
                cookie.setCookie("rightList","");
            }

        },
        setRightTop:function(){
            $('html, body').animate({scrollTop: 0}, 500);
        },
        render: function () {
            var tType = this.state.tType;
            var bType = this.state.bType;
            var category = this.PropTypes.Category;
            var inClass = "collapse",outerClass = "collapse in";
            var t = this;
            if(tType!="event"){
                return(<div>
                          <div className="queEvRight hidden-xs" id="queEvRight">
                            <div className="queEvRightName">帮助中心</div>
                            {
                                category.map(function(c,index){
                                    var _linkId = "/#/article/"+c.id+"/"+c.items[0].id;
                                    var showHidden = (tType==c.id)?outerClass:inClass;
                                    return (
                                        <div className="queEvRightItem">
                                            <a href ={_linkId} ><span className="riItemTitle"><img src={c.img} style={{width:"25px"}} />&nbsp;&nbsp;{c.title}</span></a>
                                            <ul className={showHidden} style={{marginBottom:"-18px"}}>
                                                {
                                                    c.items.map(function(d){
                                                        var hightLight = (bType==d.id)?"queULactive":"";
                                                        var href = "/#/article/"+c.id+"/"+d.id;
                                                        var unhref="javascript:void(0)";
                                                        if(tType==c.id){
                                                            return (<li className={hightLight}>
                                                                <a  href={unhref} onClick={t.change.bind(null,c.id,d.id)}>{d.title}</a>
                                                            </li>)
                                                        }else{
                                                            return (<li className={hightLight}>
                                                                <a href={href}>{d.title}</a>
                                                            </li>)
                                                        }
                                                    })
                                                }
                                            </ul>
                                        </div>)
                                })
                            }
                        </div>
                         <div className="queEvRiMobile visible-xs">
                             <div className="queEvRiMoList" id="queEvRiMoList">
                                 {category.map(function(c,index){
                                         var _linkId = "/#/article/"+c.id+"/"+c.items[0].id;
                                         var showHidden = (tType==c.id)?outerClass:inClass;
                                         return (
                                             <div className="queEvRiMobileItem">
                                                 <a href ={_linkId} ><span style={{color:"#3A3A3A",padding:"5px 10px",fontSize:"14px"}}><span className={c.img} style={{width:"14px"}}></span>&nbsp;&nbsp;{c.title}</span></a>
                                                 <ul className={showHidden} style={{marginBottom:"-15px"}}>
                                                     {
                                                         c.items.map(function(d){
                                                             var hightLight = (bType==d.id)?"qMoULactive":"";
                                                             var href = "/#/article/"+c.id+"/"+d.id;
                                                             var unhref="javascript:void(0)";
                                                             if(tType==c.id){
                                                                 return (<li className={hightLight}>
                                                                     <a  href={unhref} onClick={t.change.bind(null,c.id,d.id)}>{d.title}</a>
                                                                 </li>)
                                                             }else{
                                                                 return (<li className={hightLight}>
                                                                     <a href={href}>{d.title}</a>
                                                                 </li>)
                                                             }
                                                         })
                                                     }
                                                 </ul>
                                             </div>)
                                     })
                                 }
                             </div>
                             <a href="javascript:void(0)" onClick={this.setRightList}>
                                 <div className="queEvRiMoImg">
                                     <i className="icon-reorder"/>
                                 </div>
                             </a>
                             <a href="javascript:void(0)" onClick={this.setRightTop} id="goTop">
                                 <div className="queEvRiMoImg">
                                     <i className=" icon-circle-arrow-up"/>
                                 </div>
                             </a>
                         </div>
                </div>);
            }
            else{
                return(<div className="queEvRight">
                    <div className="queEvRiActive">
                        <a href="/#/article/event/all/1" style={{color:"#666"}}><span className="icon-volume-up"></span>&nbsp;&nbsp;&nbsp;活动列表</a>
                    </div>
                    <ul>
                        <a href="/#/article/event/all/1"> <li className="queULactive">活动</li></a>
                    </ul>
                </div>);
            }
        }
    })
})
/**
 * Created by Administrator on 2015/7/27.
 */
'use strict';

define([
    'react',
    'jquery',
    'Scroll',
    'Swipe',
    'Confirm',
    'model/InvestProductModel',
    'jsx!component/Common/AlertComponent.react',
    'jsx!component/Common/Cookie.react',
    'jsx!component/Common/FormatDataComponent.react'
], function (React,$,Scroll,Swipe,Confirm,InvestProductModel,AlertComponent,Cookie,FormatDataComponent) {
    return React.createClass({
        getInitialState:function(){
          return {
              id:"",
              InvestProduct:new InvestProductModel,
              info:null,
              buyRecords:[],
              showDisplay1:"block",
              showDisplay2:"none",
              showDisplay3:"none",
              title:"",
              content:"",
              item:[]
          }
        },
        PropTypes :{
            COLS: ["amount","startDate","minBuy","returnedMoney","endDate"],
            COLS_IN:["title","amount","profitRate","startDate","endDate","timeLimit","returnedMoney","riskRegister"],
            COLS_H:["investor","investMoney","investTime"],
            COLS_MAPPING : {
                amount: "产品规模",
                startDate: "起息日",
                minBuy: "起投金额",
                returnedMoney: "还款方式",
                endDate: "到期日",
                title:"产品名称",
                profitRate:"年化收益率",
                timeLimit:"期限",
                riskRegister:"风险类型",
                investor:"投资人",
                investMoney:"投资金额(元)",
                investTime:"投资时间"
            },
            COLS_AL:["项目概述","风控措施"]
        },
        componentDidMount:function(){
            this.props.user.on('change', function() {
                this.forceUpdate();
            }.bind(this));

            this.setState({id:this.props.id});
            if(this.state.id!="") {
                this.fetchData();
                this.fetchRecords();
            }
            window.flag = 0;
        },

        componentDidUpdate:function (prevProps, prevState) {
            if(prevState.id != this.state.id) {
                this.setState({id:this.props.id});
                this.fetchData();
                this.fetchRecords();
            }
            if(this.state.info!=null && this.state.buyRecords.length > 4 && window.flag == 0){
                $("#scrollDiv"+this.state.info.id).Scroll({line: 1, speed: 500, timer: 3000, up: "but_up", down: "but_down"});
                window.flag = 1;
            }
            var tabsSwiper = new Swiper('.swiper-container',{
                speed:500,
                onSlideChangeStart: function(){
                    $(".tabs .active").removeClass('active');
                    $(".tabs a").eq(tabsSwiper.activeIndex).addClass('active');
                }
            });

            $(".tabs a").on('touchstart mousedown',function(e){
                e.preventDefault()
                $(".tabs .active").removeClass('active');
                $(this).addClass('active');
                tabsSwiper.swipeTo($(this).index());
            });

            $(".tabs a").click(function(e){
                e.preventDefault();
            });

            var num =Math.round($('.product-circle').find('span:first').text() * 3.6);
            if (num<=180) {
                $('.product-circle').find('.right').css('transform', "rotate(" + num + "deg)");
            } else {
                $('.product-circle').find('.right').css('transform', "rotate(180deg)");
                $('.product-circle').find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
            };

            $('#buyModal').on('shown.bs.modal', function () {
                $("#buy_quantity").focus();
            })

        },
        getUrlHeader:function(){
            return (new Cookie().getCookie("loginStatus"))=="true"?globamParam.login_url:globamParam.public_url
        },
        fetchData:function(){
            this.state.InvestProduct.url = this.getUrlHeader()+"/products/"+this.state.id;
            this.state.InvestProduct.fetch({
                method:"post",
                success:function(model,data){
                    if(data.items.length>0) {
                        var item = data.items[0];
                        var newFormat = new FormatDataComponent();
                        item["timeLimit"]= (item["endDate"]-item["startDate"])/(1000*60*60*24);
                        item["startDate"]= newFormat.formatData(item["startDate"],3);item["endDate"]=newFormat.formatData(item["endDate"],3);
                        if(item["amount"]>10000){
                            item["amount"]=item["amount"]/10000+"万元";
                        }
                        item["minBuy"]+="元";
                        item["profitRate"]= Math.round((item["profitRate"]*100)*1000)/1000;
                        item["allProfitRate"] = item["profitRate"];
                        if(item["additionalRate"]>0) {
                            item["allProfitRate"] = item["profitRate"] + Math.round((item["additionalRate"] * 100) * 1000) / 1000;
                        }
                        this.setState({info:item});
                    }else{
                        this.setState({info:null});
                    }
                }.bind(this),
                error:function(){
                    $.alert({
                        title: '',
                        content: '查询产品失败'
                    });
                }
            });
        },
        fetchRecords:function(){
            var url =  this.getUrlHeader()+"/products/proselldet";
                $.ajax({
                    url:url,
                    method:"post",
                    data:{proId:this.state.id},
                    dataType: "json",
                    success: function (data) {
                        if (data.items.length > 0) {
                            for(var i=0;i<data.items.length;i++){
                                    if(data.items[i]!=null) {
                                        var newFormat = new FormatDataComponent();
                                        data.items[i].orderDate = newFormat.formatData(data.items[i].orderDate,2);
                                    }
                                }
                            this.setState({buyRecords: data.items});
                        } else {
                            this.setState({buyRecords: []});
                        }
                    }.bind(this)
            });
        },
        learnMore:function(index){
            var content = this.state.info.description;
            this.setState({title:this.PropTypes.COLS_AL[index],content:content});
        },

        makeOrder:function(url){//下单
            $.ajax({
                 url:this.getUrlHeader()+"/products/buy?proId="+this.state.id+"&quantity="+parseFloat($("#buy_quantity").val()),
                 method:"post",
                 success:function(info,state){
                     if(info.result=="success"){
                         var order = info.items[0];
                         this.props.orderModel.set("model",JSON.stringify(order));
                          routerReact.navigate("/investBuy/"+order.id,{trigger:true});//订单号支付
                     }else{
                         $.alert({
                             title: '',
                             content: info.message
                         });
                     }
                 }.bind(this),
                error:function(data){
                    $.alert({
                        title: '',
                        content:data.responseJSON.message
                    });
                }
            });
        },
        checkLogin:function(url){
            var mobileNumber=this.props.user.get('user')['mobileNumber'];
            if(mobileNumber!=undefined&&mobileNumber!=null&&mobileNumber!=''){
                this.makeOrder(url);
                $("body").removeClass("modal-open");
            }else{
                // window.location.href="/#/login";
                routerReact.navigate("login",{trigger: true});
            }
        },
        render:function(){
            if(this.state.info!=null){
                var info = this.state.info;
                var status = <span style={{fontSize: "22px",color:"#000000"}} className="product-buy hidden-xs">{info.status}</span>
                var buyBtn = '';
                if(info.status.indexOf('认购')!=-1){
                    var url="/#/investBuy/"+info.id;
                    buyBtn = <a href="javascript:void(0);" className="btn btn-warning btn-lg product-buyBtn" id="goToBuy" data-toggle="modal" data-target="#buyModal">{info.status}</a>
                }
                var endTime="";
                if(info.status.indexOf('售罄')!=-1){
                    if(info["endTime"]==undefined){
                        info["endTime"] = "N/A";
                    }
                    endTime = <div style={{fontSize:"20px",fontColor:"#000"}}>募集结束时间：{info["endTime"]}<br /><i className="glyphicon glyphicon-arrow-down"></i></div>;
                }
                var longAmount =""+info["amount"];
                if(longAmount.indexOf("万元")!='-1'){
                    longAmount = parseFloat(parseFloat(longAmount)*10000).toFixed(2);
                }
                var InvestProgress = parseFloat((info['bought'] / longAmount)*100).toFixed(2) ;

                var title = this.renderTitle();
                var inTitle = this.renderInTitle();
                var header = this.renderRecordHeader();
                var id = "scrollDiv"+info.id;
                var timeLimit = info["timeLimit"];


                var buyRecords = <div></div>;
                if(this.state.buyRecords.length > 0){
                    buyRecords=<div className="row">
                        <div style={{margin:"0px 15px"}}>
                            <div style={{margin:"20px 0px",fontSize:"20px"}}>大家抢购记录</div>
                            <div style={{backgroundColor:"#e5e5e5;padding:10px 0px;"}} className="clearfix">{header}</div>
                            <div className ="scrollDiv col-xs-12" id={id}>
                                <ul>{
                                    this.state.buyRecords.map(function(record){
                                        if(record!=null){
                                            var mobile = record.userSimple && record.userSimple.mobile;
                                            return(<li><div className="col-xs-6 col-sm-4">{mobile}</div> <div className="col-xs-6 col-sm-4">{parseFloat(record.quantity).toFixed(2)}</div> <div className="col-sm-4 hidden-xs">{record.orderDate}</div></li>)
                                        }
                                    })
                                }</ul>
                            </div>
                        </div>
                    </div>;
                }
                return (
                    <div className="container" style={{paddingTop:"40px",paddingBottom:"40px"}}>
                        <div className="row">
                            <div className="col-sm-8 product-leftTop">
                                <div >
                                    <img src="assets/images/product_info_bg.png" className="hidden-xs" style={{width:"100%"}}/>
                                    <div className="product-title">{info.title}</div>
                                    <div className="product-timeLimit hidden-xs">
                                        <div style={{marginBottom:"-12px"}}>{timeLimit}<span style={{fontSize:"16px"}}>天</span></div>
                                        <div  style={{fontSize:"16px"}}>产品期限</div>
                                    </div>
                                    <div className="product-profit hidden-xs">
                                        <div style={{marginBottom:"-12px"}}>{info.allProfitRate}<span style={{fontSize:"16px"}}>%</span></div>
                                        <div  style={{fontSize:"16px"}}>预期年化</div>
                                    </div>

                                    <div className="product-progress hidden-xs">
                                        <div className="product-circle">
                                            <div className="pie_left"><div
                                                className="left"></div></div>
                                            <div className="pie_right"><div
                                                className="right"></div></div>
                                            <div className="mask"><span>{InvestProgress}</span>%</div>
                                        </div>
                                    </div>

                                    <div className="product-showTitle">{title}</div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 product-rightTop">
                                <div>
                                    <div className="row">{status}</div>
                                    <div className="row hidden-xs product-investMoney">
                                        <span>{endTime}</span>
                                        <span style={{fontSize:"20px",color:"#01abff"}}>投资金额</span><br />
                                        <span style={{fontSize:"18px"}}>{longAmount}</span>
                                        <span style={{fontSize:"14px"}}>元</span>
                                    </div>
                                    <div className="row">
                                        {buyBtn}

                                        <div className="modal fade" id="buyModal" style={{overflow:"hidden"}}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                        <h4 className="modal-title">购买</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p><label htmlFor="buy_quantity" style={{marginLeft:"10px",fontWeight:"100"}}>请输入购买金额</label><input type="text" id="buy_quantity" style={{paddingLeft:"10px",marginLeft:"10px"}}/></p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <a href="javascript:void(0)" className="btn btn-primary" data-dismiss="modal" onClick={this.checkLogin.bind(null,url)}>购买</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row hidden-xs"><a href="/#/invest" className = "btn btn-lg btn-info product-btn-more">查看更多产品</a></div>
                                </div>
                            </div>
                        </div>
                        {buyRecords}
                        <div className="row">
                            <div style={{border:"1px solid #e5e5e5;margin:20px 15px;padding:20px;"}} className="clearfix">
                                {
                                    this.PropTypes.COLS_AL.map(function(al,index){
                                        var introduction = <div>期限{timeLimit}天，预期年化收益率{info.allProfitRate}%</div>
                                        if(index==1){
                                             introduction = <div>中国投融资担保有限公司为基础资产的本金及收益兑付提供保障</div>;
                                         }
                                            return(
                                                <div className="col-xs-12 col-sm-6">
                                                    <div className="row">
                                                        <div className="col-xs-12 col-sm-4">
                                                            <div className="product-showImg">
                                                                 <img src="/assets/images/action.png" />
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-12 col-sm-8">
                                                            <div className="product-learnMore">
                                                                <div style={{fontSize:"24px",fontWeight:"bold"}}>{al}</div>
                                                                <div>{introduction}</div>
                                                                <div><a style={{color:"#01abff"}} href="javascript:void(0)" data-toggle="modal" data-target="#myModal" onClick={this.learnMore.bind(null,index)}> 了解更多</a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <AlertComponent title={this.state.title} content={this.state.content}/>
                                                    </div>
                                               </div>
                                            )
                                    }.bind(this))
                                }
                            </div>
                        </div>

                        <div className="row" style={{padding:"0px 15px;"}}>
                            <div style={{border:"1px solid #e5e5e5"}}>
                                <div className="tabs">
                                    <a href="#" className="active">产品说明</a><a>变现说明</a><a>风险提示</a>
                                    <div>&nbsp;</div>
                                </div>
                                <div className="swiper-container">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="content-slide">
                                                {inTitle}
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="content-slide">
                                                该产品不支持变现
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="content-slide">
                                                {info.riskRegister}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>);
            }
            else
                return(<div style={{minHeight:"600px",textAlign:"center"}}>
                    <i className="icon-spinner icon-spin" style={{fontSize:"36px",marginTop:"100px"}}></i>
                </div>);
        },
        renderTitle:function(){
            var COLS = this.PropTypes.COLS;
            var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
            return <div className="row product-min-title">{
                COLS.map(function(col) {
                    return(<div className="col-sm-4 product-min-per">
                        <span>{COLS_MAPPING[col]} </span>: {this.state.info[col]}
                    </div>);
                }.bind(this))
            }</div>
        },
        renderInTitle:function(){
            var COLS = this.PropTypes.COLS_IN;
            var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
            return <div>{
                COLS.map(function(col){
                    var value = this.state.info[col];
                    if(col=="timeLimit"){
                        value+="天";
                    }else if(col=="profitRate"){
                        value+="%";
                        if(this.state.info['additionalRate']>0){
                            value+="+"+(Math.round((this.state.info['additionalRate']*100)*1000)/1000+"%");
                        }
                    }
                    return(<ul><li>{COLS_MAPPING[col]} : {value}</li></ul>);
                }.bind(this))
            }</div>
        },
        renderRecordHeader:function(){
            var COLS = this.PropTypes.COLS_H;
            var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
            return <div className="col-xs-12">{
                COLS.map(function(col){
                    var inClass = "col-xs-6 col-sm-4";
                    if(col=="investTime"){
                        inClass="col-sm-4 hidden-xs";
                    }
                    return(<div className={inClass}>{COLS_MAPPING[col]}</div>);
                }.bind(this))
            }</div>
        },
    })
});
/**
 * Created by Administrator on 2015/9/9.
 */
'use strict';

define([
        'react',
        'jquery',
        'Page',
        'jsx!component/PersonalCenter/InfoAndMenu.react',
        'jsx!component/PersonalCenter/TitleType.react',
        'jsx!component/Common/FormatDataComponent.react'
    ],
    function(React,$,Page,InfoAndMenu,TitleType,FormatDataComponent){
        return React.createClass({
            PropTypes:{

                COLS:["type","status","detailMoney","startDate","endDate"],
                COLS_MAPPING:{
                    "type":"类型",
                    "status":"状态",
                    "detailMoney":"金额 (元)",
                    "startDate":"开始时间",
                    "endDate":"结束时间",
                },
                TYPE_MAPPING:{
                    "all":"类型",
                    "1":"充值",
                    "2":"提现",
                    "3":"支付",
                    "4":"盈利",
                    "5":"产品到期返款"
                },
                STATUS_MAPPING:{
                    "all":"状态",
                    "0":"失败",
                    "1":"完成",
                    "2":"撤销",
                    "3":"未结算",
                    "4":"处理中"
                },

            },
            getInitialState:function(){
                return{
                    status:"状态",
                    type:"类型",
                };
            },
            componentWillReceiveProps:function(){
                var type=this.PropTypes.TYPE_MAPPING[this.props.type];
                var status=this.PropTypes.STATUS_MAPPING[this.props.status];
                this.setState({status:status,type:type});

                if(this.props.data.length > 0&&this.props.totalPage>1) {
                    $(".tcdPageCode").createPage({
                        pageCount: parseInt(this.props.totalPage),
                        current: parseInt(this.props.currentPage),
                        backFn: function (page) {
                            routerReact.navigate("personal/assetDetails/"+ this.props.type+"/" + this.props.status + "/" + page,{trigger:true});
                        }.bind(this)
                    });
                }
            },
            render:function(){
                if(this.props.fetch==true){
                    var data = this.props.data;
                    var showData ="";
                    if(data.length>0){
                        showData= this.props.data.map(function(record){
                            var amount=parseFloat(record.amount).toFixed(2);
                            var styles={
                                paddingRight:"0px"
                            };
                            if(record.type=="充值"||record.type=="盈利"||record.type=="产品到期返款"){
                                styles.color="#A2BD7A";
                                amount="+"+amount;
                            }else{
                                styles.color="#CE746C";
                                amount="-"+amount;
                            }
                            var newFormat = new FormatDataComponent();
                            var startDate= newFormat.formatData(record.startDate,2);
                            var endDate= newFormat.formatData(record.endDate,2);
                            var date=(record.endDate=="0")?startDate:endDate;
                            return(
                                <div className="row tranDetail-W">
                                    <div className="col-sm-2 hidden-xs" style={{fontSize:"15px"}}>{record.type}&nbsp;</div>
                                    <div className="col-sm-2 hidden-xs" style={{fontSize:"15px"}}>{record.status}&nbsp;</div>
                                    <div className="col-sm-2 hidden-xs font15 wAmount"  style={styles}>{amount}</div>
                                    <div className="col-sm-3 hidden-xs asDetail-wdate">{startDate}</div>
                                    <div className="col-sm-3 hidden-xs asDetail-wdate">{endDate}</div>
                                    <div className="col-xs-4 visible-xs" style={styles}>{record.type}&nbsp;</div>
                                    <div className="col-xs-3 visible-xs" style={styles}>{record.status}&nbsp;</div>
                                    <div className="col-xs-5 visible-xs font15" style={styles}>{amount} 元</div>
                                    <div className="col-xs-5 col-xs-offset-7 visible-xs asDetail-mdate">{date}</div>
                                </div>
                            );
                        }.bind(this))
                    }else{
                       showData =<div className="row">
                            <div className="col-xs-12 tAlignCe noTran">
                                未找到符合要求的记录
                            </div>
                        </div>;
                    }
                    var detail=<div className="col-sm-8">
                        <div className="asDetail">
                             <div className="row">
                                 <TitleType title={"assetDetail"}/>
                              </div>
                            <div className="asDetail-title">{this.renderTitle()}</div>
                            {showData}
                        </div>
                    </div> ;

                    return (
                        <div className="container" style={{minHeight:"653px"}}>
                            <div className="row">

                                <div className="visible-xs" style={{marginBottom:"20px"}}>
                                    <InfoAndMenu title={this.props.title} user={this.props.user}/>
                                </div>
                                {detail}
                                <div className="hidden-xs">
                                    <InfoAndMenu title={this.props.title} user={this.props.user}/>
                                </div>
                                <div className="col-sm-12">
                                    <div className="tcdPageCode page-float"></div>
                                </div>

                            </div>
                        </div>
                    );
                }else{
                    return( <div className="container" style={{minHeight:"653px",textAlign:"center"}}>
                        <i className="icon-spinner icon-spin" style={{fontSize:"36px",marginTop:"100px"}}></i>
                    </div>);
                }
            },
            change:function(e){
                if(e.target.value=="all"){
                    routerReact.navigate("/personal/assetDetails/",{trigger:true});
                }else {
                    routerReact.navigate("/personal/assetDetails/" + e.target.value + "/" + 1,{trigger:true});
                }
            },
            renderTitle:function(){
                var COLS = this.PropTypes.COLS;
                var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
                return(<div className="row">{
                        COLS.map(function (col) {
                            if (col=="status"){
                                return (<div className="col-xs-8 col-sm-2" style={{padding:"5px 15px"}}>
                                    <a  data-toggle="dropdown" href="javascript:void(0)" className="dropdown-toggle" role="button" id="tutorial" style={{color:"#999"}}>{this.state.status}<b className="caret"></b></a>
                                    <ul className="dropdown-menu asDatail-menu" role="menu" aria-labelledby="tutorial" style={{minWidth:"80px"}}>
                                        <li role="presentation" ><a href={"/#/personal/assetDetails/"+this.props.type+"/all/1"}>全部</a></li>
                                        <li role="presentation" ><a href={"/#/personal/assetDetails/"+this.props.type+"/1/1"}>完成</a></li>
                                        <li role="presentation" ><a href={"/#/personal/assetDetails/"+this.props.type+"/0/1"}>失败</a></li>
                                        <li role="presentation" ><a href={"/#/personal/assetDetails/"+this.props.type+"/2/1"}>撤销</a></li>
                                        <li role="presentation" ><a href={"/#/personal/assetDetails/"+this.props.type+"/3/1"}>未结算</a></li>
                                        <li role="presentation" ><a href={"/#/personal/assetDetails/"+this.props.type+"/4/1"}>处理中</a></li>
                                    </ul>
                                </div>);
                            }else if(col=="type"){
                                return (<div className="col-xs-4 col-sm-2" style={{padding:"5px 15px"}}>
                                    <a  data-toggle="dropdown" href="javascript:void(0)" className="dropdown-toggle" role="button" id="tutorial" style={{color:"#999"}}>{this.state.type}<b className="caret"></b></a>
                                    <ul className="dropdown-menu asDatail-menu" role="menu" aria-labelledby="tutorial" style={{minWidth:"100px"}}>
                                        <li role="presentation" ><a href={"/#/personal/assetDetails/all/"+this.props.status+"/1"}>全部</a></li>
                                        <li role="presentation" ><a href={"/#/personal/assetDetails/1/"+this.props.status+"/1"}>充值</a></li>
                                        <li role="presentation" ><a href={"/#/personal/assetDetails/2/"+this.props.status+"/1"}>提现</a></li>
                                        <li role="presentation" ><a href={"/#/personal/assetDetails/3/"+this.props.status+"/1"}>支付</a></li>
                                        <li role="presentation" ><a href={"/#/personal/assetDetails/4/"+this.props.status+"/1"}>盈利</a></li>
                                        <li role="presentation" ><a href={"/#/personal/assetDetails/5/"+this.props.status+"/1"}>产品到期返款</a></li>
                                    </ul></div>);
                            }else if(col=="detailMoney"){
                                return (<div className="hidden-xs col-sm-2" style={{padding:"5px 0px",color:"#999",textAlign:"center"}}>{COLS_MAPPING[col]}</div>);
                            }else{
                                return (<div className="hidden-xs col-sm-3" style={{padding:"5px 15px",color:"#999"}}>{COLS_MAPPING[col]}</div>);
                            }
                        }.bind(this))
                    }</div>
                );
            }
        });
    });
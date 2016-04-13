/**
 * Created by Administrator on 2015/8/20.
 */
'use strict';
define([
    'react',
    'jquery',
    'collection/InvestProductCollection',
], function (React,$,InvestProductCollection) {
    return React.createClass({
        PropTypes:{
            types:["周周赚","月月赢"],
            typeValues:[
                {
                    title:"周周赚",
                    minCycle:"7天",
                    maxAnnual:"8%",
                    img:"assets/images/icn_product_1.png",
                    color:"#01abff",
                    mark:"稳健收益",
                    rightImg:"assets/images/icn_product_point_1.svg",
                    fundMultiple:"1.8倍",
                    bankMultiple:"20倍",
                    rightBottomImg:"assets/images/photo_product_1.png"
                },
                {
                    title:"月月赢",
                    minCycle:"1个月",
                    maxAnnual:"9%",
                    img:"assets/images/icn_produce_2.png",
                    color:"#FEA603",
                    mark:"更高收益",
                    rightImg:"assets/images/icn_product_point_2.svg",
                    fundMultiple:"3倍",
                    bankMultiple:"35倍",
                    rightBottomImg:"assets/images/photo_product_2.png"
                }
            ]
        },
        getInitialState:function(){
          return{
              investProducts:new InvestProductCollection,
              Products:[],
          }
        },
        componentDidMount:function(){//首页，当页面滚动到推荐产品处，开始加载
            if (window.pageYOffset > ($("#rProducts").offset().top - window.screen.availHeight)) {
                if(this.state.Products.length == 0) {
                    this.fetchData();
                }
            }
            $(window).scroll(function () {
                if($("#rProducts").offset()) {
                    if (window.pageYOffset > ($("#rProducts").offset().top - window.screen.availHeight)) {
                        if (this.state.Products.length == 0) {
                            this.fetchData();
                        }
                    }
                }
            }.bind(this));
        },
        fetchData:function(){
            this.state.investProducts.url = globamParam.public_url+"/products/recommend";
            this.state.investProducts.fetch({
                async:false,
                success: function (model, data) {
                    var all=[],list=[],array = this.PropTypes.types;
                    for(var i=0;i<array.length;i++){
                            for(var j=0;j<data.items.length;j++){
                                if(data.items[j].typeName==array[i]&&list.length<2)
                                {
                                    list.push(data.items[j]);
                                }
                            }
                        all.push({
                            type:array[i],
                            products:list
                        });
                        list=[];
                    }
                    this.setState({Products:all});
                }.bind(this)
            });
        },
        getRight:function(typeValue){
            return <div className="col-xs-12 col-sm-3">
                <div className="row">
                    <div className="col-xs-12 tAlignCe" style={{padding:"15px"}}>
                        <img src={typeValue.rightImg}/>
                    </div>
                    <div className="col-xs-12 tAlignCe">
                        <div style={{fontSize:"24px",color:"#777",paddingBottom:"5px"}}>{typeValue.mark}</div>
                        <div style={{fontSize:"14px",color:"#777",paddingBottom:"10px"}}>
                            货币基金的<span className="wIReBeiFont">{typeValue.fundMultiple}</span>，银行活期的<span className="wIReBeiFont">{typeValue.bankMultiple}</span>
                        </div>
                    </div>
                    <div className="col-xs-12 hidden-xs">
                        <img src={typeValue.rightBottomImg} style={{width:"90%"}}/>
                    </div>
                </div>
            </div>
        },
        render: function () {
            var s=this;
            var typeValues = this.PropTypes.typeValues;
            var value = "";
            return(<div className="container">
                    {
                    this.state.Products.map(function(records){
                        var color,imgSrc,dingQi,recommendRight;
                        typeValues.map(function(typeValue){
                            if(typeValue.title == records.type){
                                value = typeValue;
                                dingQi=<div className="wReNameBottom">
                                    定期理财{typeValue.minCycle}起，预期年化最高<span style={{color:"#ff6400"}}>&nbsp;{typeValue.maxAnnual}</span>
                                </div>
                                recommendRight=s.getRight(typeValue);
                                return;
                            }
                        });
                        var style1={
                            borderTop: "2px solid "+ value.color
                        };
                        var style2={color:value.color};
                      return  <div className="row">
                                <div className="clearfix wRecommend" style={style1}>
                                    <div className="col-xs-12 col-sm-9" style={{borderRight:"1px solid #E6E6E6"}}>
                                        <div className="row">
                                                <div  className="clearfix" style={{borderBottom:"1px solid #E6E6E6"}}>
                                                    <div className="col-xs-3 col-sm-2 col-lg-1 inReTopImg" >
                                                        <img src={value.img} style={{width:"55px",padding:"20px 0px"}}/>
                                                    </div>
                                                    <div className="ol-xs-9 col-sm-10 wTitleRight">
                                                        <span className="wReName" style={style2}>{records.type}</span>
                                                        {dingQi}
                                                    </div>
                                               </div>
                                          </div>
                                         <div>
                                            {
                                                records.products.map(function(record){
                                                    var url="/#/invest/product/"+record.id;
                                                    var timeLimit = (record.endDate - record.startDate)/(1000*60*60*24);
                                                    var tieXiValue = record.additionalRate > 0 ? Math.round((record.additionalRate * 100) * 1000) / 1000 : "";
                                                    var tieXi= (tieXiValue!="")?<span className="tieXiValue">+{tieXiValue}<span style={{fontSize:"12px"}}>%</span></span>:"";
                                                    var rProfit =  Math.round((record.profitRate*100)*1000)/1000;

                                                    return (<div className="row wRecord">
                                                            <div className="col-xs-12 col-sm-12 wRecordHead" >
                                                                <div className="wRecordTitle" style={{width:"100%",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>
                                                                    <a href={url} className="zyTitle">{record.title}</a>
                                                                </div>
                                                            </div>
                                                            <div className="col-xs-4 col-sm-3 wProfit" style={{paddingRight:"0px"}}>
                                                                <div className="weiXin-tBottom">预期年化</div>
                                                                <div className="wProfitRate">{rProfit}<span style={{fontSize:"14px"}}>%</span>{tieXi}</div>
                                                            </div>
                                                            <div className="col-xs-3 col-sm-2" style={{padding:"0px"}}>
                                                                <div className="weiXin-tBottom">产品期限</div>
                                                                <div className="w33">{timeLimit}<span style={{fontSize:"14px"}}>天</span></div>
                                                            </div>
                                                            <div className="col-xs-5 col-sm-3">
                                                                <div className="weiXin-tBottom">起投金额</div>
                                                                <div className="w33">{record.minBuy}<span style={{fontSize:"14px"}}>元</span></div>
                                                            </div>
                                                            <div className="col-xs-12 col-sm-4" style={{paddingRight:"30px"}}>
                                                                 <div className="wStatus">
                                                                    <a href={url} style={{color:"#fff"}}>
                                                                    <div>
                                                                     {record.status}
                                                                     </div>
                                                                     </a>
                                                                 </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    {recommendRight}
                                </div>
                        </div>
                     })
                    }

                </div>);
        }
    });
});
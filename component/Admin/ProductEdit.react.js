/**
 * Created by Administrator on 2015/9/21.
 */
'use strict';
define([
    'react',
    'backbone',
    'jquery',
    'jqueryForm',
    'Confirm',
    'model/InvestProductModel',
    'jsx!component/Common/FormatDataComponent.react',
], function (React, backbone, $, jqueryForm, Confirm, InvestProductModel, FormatDataComponent) {
    return React.createClass({
       PropTypes:{
          type:[
              {
                  id:"1",
                  name: "周周赚",
                  items: [{
                      show: "1周",
                      days: 7
                  },
                      {
                          show: "2周",
                          days: 14
                      },
                      {
                          show: "3周",
                          days: 21
                      }
                  ]
              },
              {
                  id:"2",
                  name: "月月赢",
                  items: [{
                      show: "1月",
                      days: 30
                  },
                      {
                          show: "2月",
                          days: 60
                      },
                      {
                          show: "3月",
                          days: 90
                      },
                      {
                          show: "6月",
                          days: 180
                      },
                      {
                          show: "12月",
                          days: 360
                      },
                      {
                          show: "24月",
                          days: 720
                      }
                  ]
              }
          ]
       },
       getInitialState:function(){
          return{
              InvestProduct:new InvestProductModel,
              id:this.props.id,
              data: {
                  "returnedMoney": "返款至帐户余额",
                  "returnCash":0,
                  "payType":0,
                  "type": 1,
                  "star": 5,
                  "minBuy": 100,
                  "profitRate": 6,
                  "startDate": "",
                  "deposit":0
              },
              daySelect: this.PropTypes.type[0].items,
          }
       },
       componentDidMount:function(){
           if(this.state.id!=0){//查询
               this.fetchData();
           } else {
               this.setEndDate(1);
           }
       },
       fetchData:function(){
            this.state.InvestProduct.url = "/api/products/"+this.state.id;
            this.state.InvestProduct.fetch({
                method:"post",
                success:function(model,data){
                    if(data.items.length>0) {
                        var item = data.items[0];
                        var newFormat = new FormatDataComponent();
                        item["timeLimit"]= (item["endDate"]-item["startDate"])/(1000*60*60*24);
                        item["days"] = (item["endDate"] - item["startDate"]) / (24 * 60 * 60 * 1000);
                        item["startDate"]= newFormat.formatData(item["startDate"],3);item["endDate"]=newFormat.formatData(item["endDate"],3);
                        item["profitRate"]= Math.round((item["profitRate"]*100)*1000)/1000;
                        item["additionalRate"]= Math.round((item["additionalRate"]*100)*1000)/1000;
                        this.PropTypes.type.map(function(t){
                            if(t.name== item["typeName"]){
                                item["type"]=t.id;
                                return;
                            }
                        });
                        this.setState({data: item, daySelect: this.PropTypes.type[item["type"] - 1].items});
                    }else{
                        this.setState({data:null});
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
        checkForm:function(){
            if($("#title").val()==""){
                this.alertForm("产品名称不为空");
            }else if($("#description").val()==""){
                this.alertForm("产品描述不为空");
            }else{
                this.submit();
            }
        },
        alertForm:function(mess){
            $.alert({
                title: '',
                content:mess
            });
            return;
        },
        submit:function(){
           var form = $("form[name=product_form]");
           var url = "/api/admin/products";
           var product = this.state.data;
            var reg = new RegExp('\"', "g"); //创建正则RegExp对象
            product.title = product.title.replace(reg, "\'");
            product.description = product.description.replace(reg, "\'");

            var profitRate = (product.profitRate / 100).toFixed(2);
            var additionalRate = (product.additionalRate / 100).toFixed(2);
            var data = '{"title":"' + product.title + '","description":"' + product.description + '","profitRate":"' + profitRate + '","amount":"' + product.amount + '","payType":"' + product.payType + '","startDate":"' + product.startDate + '","endDate":"' + product.endDate + '","minBuy":"' + product.minBuy + '","maxBuy":"' + product.maxBuy + '","star":"' + product.star + '","deposit":"' + product.deposit + '", "additionalRate":"' + additionalRate + '", "riskRegister":"' + product.riskRegister + '", "returnedMoney":"' + product.returnedMoney + '", "returnCash":"' + product.returnCash + '","type":"' + product.type + '"}';
           if(this.state.id!=0){
               url = "/api/admin/products/update";
               data = '{"id":"' + this.state.id + '","title":"' + product.title + '","description":"' + product.description + '","profitRate":"' + profitRate + '","amount":"' + product.amount + '","payType":"' + product.payType + '","startDate":"' + product.startDate + '","endDate":"' + product.endDate + '","minBuy":"' + product.minBuy + '","maxBuy":"' + product.maxBuy + '","star":"' + product.star + '","deposit":"' + product.deposit + '", "additionalRate":"' + additionalRate + '", "riskRegister":"' + product.riskRegister + '", "returnedMoney":"' + product.returnedMoney + '", "returnCash":"' + product.returnCash + '","type":"' + product.type + '"}';
           }
           $.ajax({
               url:url,
               headers: {
                   'Accept':'application/json;charset=UTF-8',
                   'Content-Type': 'application/json;charset=UTF-8'
               },
               method:"post",
               data: data,
               success:function(data){
                   $.alert({
                       title: '',
                       content:data.message
                    });
                   if(data.result=="success"){
                       routerReact.navigate("/admin/product",{trigger:true});
                   }
               }.bind(this),
               error: function (data) {
                   if(data.status==500){
                       $.alert({
                           title: '',
                           content: data.responseJSON.message||data.statusText
                       });
                   }else{
                       $.alert({
                           title: '',
                           content:"填入信息有误"
                       });
                   }

               }.bind(this)
           });
       },
       change:function(title,event){
           var data = this.state.data, value = event.target.value;
           data[title] = value;
           if (title == "type") {
               data["profitRate"] = 6;
               if (value == 2) {
                   data["profitRate"] = 7;
               }
               data["days"] = this.PropTypes.type[value - 1].items[0].days;
               this.setState({daySelect: this.PropTypes.type[value - 1].items});
               this.setEndDate(value);
           } else if (title == "amount") {
               data["maxBuy"] = value;
           } else if (title == "startDate") {
               this.setEndDate();
           }
            this.setState({data:this.state.data});
       },
        setEndDate: function (type) {
            var value = $("#selectDate").val();
            if (type == 1 || type == 2) {
                value = this.PropTypes.type[type - 1].items[0].days;
                this.state.data["days"] = this.PropTypes.type[type - 1].items[0].days;
            }
            var newFormat = new FormatDataComponent();
            var date = Date.parse(new Date($("#startDate").val()));
            if (!date) {
                var timestamp = new Date();
                timestamp = newFormat.formatData(timestamp, 3);
                this.state.data["startDate"] = timestamp;
                date = Date.parse(timestamp);
            }
            var time = parseInt(date) + (value * 24 * 60 * 60 * 1000);
            time = newFormat.formatData(time, 3);
            this.state.data["endDate"] = time;
            this.state.data["days"] = value;
            this.setState({data: this.state.data});
        },
       render:function(){
           var idStyle="form-group";
           if(this.props.type=="add"){
               idStyle="form-group hidden"
           }
           var product = this.state.data;
           var type = this.PropTypes.type;
            return(
                <div className="col-xs-12">
                                <form name="product_form" className="form-horizontal" encType="multipart/form-data" method="post">
                                    <div className={idStyle}>
                                        <label className="col-sm-3 col-md-2 col-md-2 control-label" htmlFor="pID">产品ID</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="text" className="form-control inputAStyle" id="pID" name="pID" value={product.id} disabled/>&nbsp;&nbsp;
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 col-md-2 control-label" htmlFor="title">产品名称</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="text" className="form-control inputAStyle" id="title" name="title" value={product.title} onChange={this.change.bind(null,"title")}  />&nbsp;&nbsp;
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="title">产品类型</label>
                                        <div className="col-sm-7 col-lg-5">
                                            {
                                                type.map(function(t){
                                                    if (product.type == t.id) {
                                                        return (<span><input type="radio" name="type" value={t.id} onClick={this.change.bind(null,"type")} checked/>{t.name}&nbsp;&nbsp;&nbsp;&nbsp;</span>);
                                                    }else{
                                                        return (<span><input type="radio" name="type" value={t.id} onClick={this.change.bind(null,"type")}/>{t.name}&nbsp;&nbsp;&nbsp;&nbsp;</span>);
                                                    }
                                                }.bind(this))
                                            } </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="description">产品描述</label>
                                        <div className="col-sm-9 col-lg-8">
                                            <textarea  className="form-control textAStyle" id="description" name="description" value={product.description} onChange={this.change.bind(null,"description")} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="riskRegister">风险等级</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="text" className="form-control inputAStyle" id="riskRegister" name="riskRegister" value={product.riskRegister} onChange={this.change.bind(null,"riskRegister")}/>
                                        </div>
                                        <div className="col-sm-7 col-lg-5 col-sm-offset-3 col-md-offset-2" style={{fontSize:"13px",color:"red",marginTop:"10px"}}>提示:抵押率XX%或质押率XX%</div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="profitRate">年化率</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="text" className="form-control inputAStyle" id="profitRate" name="profitRate" value={product.profitRate} onChange={this.change.bind(null,"profitRate")}/>&nbsp;&nbsp;%
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="additionalRate">附加贴息</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="text" className="form-control inputAStyle" id="additionalRate" name="additionalRate" value={product.additionalRate} onChange={this.change.bind(null,"additionalRate")}/>&nbsp;&nbsp;%
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="returnCash">返现比例</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="text" className="form-control inputAStyle" id="returnCash" name="returnCash" value={product.returnCash} onChange={this.change.bind(null,"returnCash")}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="payType">付息方式</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="text" className="form-control inputAStyle" id="payType" name="payType" value={product.payType} onChange={this.change.bind(null,"payType")} disabled/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="returnedMoney">回款方式</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="text" className="form-control inputAStyle" id="returnedMoney" name="returnedMoney" value={product.returnedMoney} onChange={this.change.bind(null,"returnedMoney")}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="amount">借款总额</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="text" className="form-control inputAStyle" id="amount" name="amount" value={product.amount} onChange={this.change.bind(null,"amount")} />&nbsp;&nbsp;元
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="minBuy">最小认购</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="text" className="form-control inputAStyle" id="minBuy" name="minBuy"  value={product.minBuy} onChange={this.change.bind(null,"minBuy")}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="maxBuy">最大认购</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="text" className="form-control inputAStyle" id="maxBuy" name="maxBuy"  value={product.maxBuy} onChange={this.change.bind(null,"maxBuy")}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="startDate">开始时间</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="date" className="form-control inputAStyle" id="startDate" name="startDate" value={product.startDate} onChange={this.change.bind(null,"startDate")}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label"
                                               htmlFor="endDate">产品时间</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <div>
                                                <select name="selectDate" id="selectDate" onChange={this.setEndDate} style={{padding:"1px 5px",marginBottom:"2px"}}>
                                                    {
                                                        this.state.daySelect.map(function (d, index) {
                                                            if (d.days == product.days) {
                                                                return (
                                                                    <option value={d.days} selected>{d.show}</option>)
                                                            } else {
                                                                return (<option value={d.days}>{d.show}</option>);
                                                            }
                                                        }.bind(this))
                                                    }
                                                </select>
                                                &nbsp; &nbsp;&nbsp;<span style={{display:"inline-block"}}>预计到期时间：{product.endDate}</span>
                                                <input type="hidden" id="endDate" value={product.endDate}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group hidden">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="deposit">保证金</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="text" className="form-control inputAStyle" id="deposit" name="deposit" value={product.deposit} onChange={this.change.bind(null,"deposit")}/>&nbsp;&nbsp;元
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 col-md-2 control-label" htmlFor="star">星级</label>
                                        <div className="col-sm-7 col-lg-5">
                                            <input type="text" className="form-control inputAStyle" id="star" name="star" value={product.star} onChange={this.change.bind(null,"star")}/>
                                        </div>
                                    </div>
                                    <div className="form-group clearfix">
                                        <div className="col-xs-12 col-sm-9 col-md-10  col-sm-offset-3 col-md-offset-2">
                                            <button onClick={this.checkForm} className="btn  adminBtn" type="button" style={{marginBottom:"0px"}}>提交</button>
                                        </div>
                                    </div>
                                </form>
                </div>
            );
       }
    });
});
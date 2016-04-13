/**
 * Created by Administrator on 2015/9/2.
 */
'use strict';
define([
    'react',
    'jquery',
    'model/InvestProductModel',
    'jsx!component/OtherPage/ProductHeader.react'
], function (React,$,InvestProductModel,ProductHeader) {
    return React.createClass({
        getInitialState:function(){
            return{
                id:this.props.id,
                product:new InvestProductModel,
            }
        },
        componentDidMount:function(){
            if(this.state.id) {
                this.state.product.url = globamParam.public_url + "/products/" + this.state.id;
                this.state.product.fetch({
                    async:"false",
                    method: "post",
                    success: function (model, data) {
                        if (data.items.length > 0) {
                            var item = data.items[0];
                            this.setState({product: item});
                        } else {
                            this.setState({product: null});
                        }
                        if(this.props.title=="note") {
                            this.getNote();
                        }else{
                            this.getProtocol();
                        }
                    }.bind(this),
                    error: function () {

                    }
                });
            }
        },
        getNote:function(){
            $("#product_note").css("display","block");
            $("#product_protocol").css("display","none");
        },
        getProtocol:function(){
            var replace = [];
            replace.push({
                reg: /\n/g,
                val: "<br/>"
            });
            replace.push({
                reg: / /g,
                val: "&nbsp;"
            });

            if (this.state.product) {
            var product = this.state.product;
            replace.push({
                reg: /productTitle/,
                val: product.title
            });
            replace.push({
                reg: /XXXXXXXXXXXXXXXXXX/g,
                val: product.title
            });
            replace.push({
                reg: /XXXXXXXXXX/g,
                val: product.title
            });
            replace.push({
                reg: /XXXX/g,
                val: product.title
            });
            replace.push({
                reg: /XXX/g,
                val: ""
            });
            replace.push({
                reg: /X/g,
                val:""
            });
        }
        var d = document.getElementById("product_proContent");
        var str = d.innerHTML;
        for (var i = 0; i < replace.length; i++) {
            var r = replace[i];
            str = str.replace(r.reg, r.val);
        }
        d.innerHTML = str;
            $("#product_note").css("display","none");
            $("#product_protocol").css("display","block");
        },
        render: function () {
            return(
                <div className="container protocol_header" style={{minHeight:"500px"}}>
                    <div className="clearfix" style={{border:"1px solid #e5e5e5"}}>
                        <div className="row">
                            <ProductHeader title={this.props.title} id={this.props.id}/>
                            <div className="col-xs-12" id="product_protocol"  style={{minHeight:"300px"}}>
                                <div className="clearfix" style={{padding:"20px 30px"}}>
                                   <h4 className="hDetailH" id="product_proContent"> productTitle 产品</h4>
                                </div>
                            </div>
                            <div className="col-xs-12" id="product_note"  style={{minHeight:"300px"}}>
                                <div className="clearfix" style={{padding:"20px 30px"}}>
                                      <h4 className="hDetailH"> 尊敬的客户，提请您在购买理财产品前特别注意以下事项：</h4>
                                      <p className="hDeP9_14"> 1.保证收益或保本浮动收益理财产品具有投资风险，不应视为一般储蓄存款产品或其替代品，投资者应充分理解产品的风险评级，充分认识投资风险，谨慎投资。</p>
                                      <p className="hDeP9_14"> 2.非保本浮动收益理财产品不保证本金和收益，投资者的本金可能会因市场变动而蒙受损失，投资者应充分理解产品的风险评级，充分认识投资风险，谨慎投资。</p>
                                      <p className="hDeP9_14"> 3.除产品说明书明确承诺的收益外，任何预期收益、预计收益、测算收益或类似表述均不代表甲方最终获得的实际收益，亦不构成翔翔财富对理财产品收益的任何承诺或保证，风险等级或结构相同的同类理财产品既往的业绩或收益率并不代表甲方可预期的业绩或收益率。</p>
                                      <p className="hDeP9_14"> 4.投资者应确认自身具备理财产品的投资常识，充分认知自身的投资经验和风险承受能力，并根据自身独立判断做出投资决定。</p>
                                      <p className="hDeP9_14"> 5.投资者在决定认购或申购理财产品之前，应审慎阅读客户权益须知、产品风险揭示书、产品说明书等销售文件内容和其他有关信息，自行及/或通过法律、税务、金融或会计顾问充分认知拟认购/申购理财产品的产品性质、投资计划和投资风险，并在充分考虑自身投资经验和风险承受能力的基础上，根据自身判断做出最终投资决定。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
});
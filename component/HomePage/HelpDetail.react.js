/**
 * Created by Administrator on 2015/8/24.
 */
define([
    'react',
    'jquery',
    'Ajax',
    'jsx!component/HomePage/QueEventMoreRight.react',
    'jsx!component/Admin/RichTextBox.react'
], function (React, $, Ajax, QueEventMoreRight, RichTextBox) {
    return React.createClass({
        getInitialState:function(){
          return{
              tType:"",
              bType:"",
              id:"",
              data:[],
              imgHeight:"",
              showMore: "",
              rich: ""
          }
        },
        componentDidMount:function(){
            var tType = this.props.tType,bType = this.props.bType,id = this.props.id;
            if(tType=='help'){
                this.getData(bType);
            }
            this.setState({tType:tType,bType:bType,id:id});
            this.setTimer();
            $(window).resize(function() {
                this.setTimer();
            }.bind(this));
        },
        componentDidUpdate:function(){
            bType = this.props.bType,id = this.props.id;
            var obj = document.getElementById(bType+id);
            window.articleScrollFlag = 0;
            if(obj && window.articleScrollFlag == 0){
                var t = obj.offsetTop; //获取该元素对应父容器的上边距
                var l = obj.offsetLeft; //对应父容器的上边距
                while (obj = obj.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
                    t += obj.offsetTop; //叠加父容器的上边距
                    l += obj.offsetLeft; //叠加父容器的左边距
                }
                window.articleScrollFlag = 1;
                window.scrollTo(0,t);
            }
            $(window).resize(function() {
                this.setTimer();
            }.bind(this));
            this.setTimer();
        },
        componentWillReceiveProps:function(nextProps){
            this.setState({tType:nextProps.tType,bType:nextProps.bType});

        },
        setTimer:function(){
            var t = this;
            if(this.refs.help_center_banner){
                var height = 0 ,baseHeight = $(window).height() * 0.16,naturalWidth,naturalHeight;//原始的宽高度
                if((window.mobilecheck() && $(window).height()< 385)){
                    baseHeight = baseHeight > 135 ? baseHeight : 135;
                }else if(!window.mobilecheck()){
                    baseHeight = baseHeight > 150 ? baseHeight : 150;
                }
                $("#help_center_banner").attr("src", $("#help_center_banner").attr("src")).load(function() {
                    naturalWidth = this.naturalWidth;
                    naturalHeight = this.naturalHeight;
                    var prop = naturalWidth / naturalHeight;
                    var baseWidth = prop * baseHeight;
                    var N = 4;
                    var left = -((baseWidth - $(window).width())/N).toFixed(2) +"px";
                    $("#help_center_banner").css("position","absolute").css("height",baseHeight).css("width","auto").css("left",left);
                    t.restSwiper(baseHeight);
                });
            }
        },
        restSwiper:function(height){
            $("#help_center_banner").height(height);
            $("#help_center_banner_div").height(height);
            if($(window).width()>750){
                $("#help_center_banner_div").css("margin-top","-20px");
            }else{
                $("#help_center_banner_div").css("margin-top","0px");
            }
        },
        PropTypes:{
           problemTypes: {
                register:1,
                invest:2,
                pay:3,
                cash:4,
                financial:5
            },
           Title:{
               'platform':'平台介绍',
               'investSafe':'投资安全',
               'moneySafe':'资金安全',
               'riskManage': '风险管理',
               'monthlyWin':'月月赢',
               'weeklyWin':'周周赚',
               'register':'注册',
               'invest':'投资',
               'pay':'支付',
               'cash':'变现',
               'financial':'融资'
           },
           Detail:{
               'platform': <div>
                   <h4 className="hDetailH">翔翔财富的目标和愿景</h4>
                   <p className="hDeP9_14">翔翔财富的目标是致力于通过互联网，利用IT技术和大数据，与金融机构合作，为个人和企业建立自金融生态体系。</p>
                   <p className="hDeP9_14">翔翔财富的愿景和使命是“让财富动起来”，这其中包含三层意义：一是给全国用户提供稳健的投资理财机会，让用户的财富不断滚动增长；二是基于金融大数据的应用，让用户财富的流动性更强，随时可以变现使用；三是真正围绕用户需求进行体验创新，给用户带来极简灵动的互联网金融服务体验。</p>
                   <h4 className="hDetailH">服务对象</h4>
                   <p className="hDeP9_14">翔翔财富通过自建互联网平台“翔翔财富”（www.xxcaifu.com）为具有投资或融资需求的机构和个人提供服务。本平台实行会员制，任何市场参与主体拟通过翔翔财富进行金融资产交易行为或接受翔翔财富提供的任何服务，均应先行成为翔翔财富的会员。</p>
                   <p className="hDeP6_16">申请成为翔翔财富的个人会员，应同时具备下列基本条件（个人用户注册/登录帮助）：</p>
                   <p className="hDeP9_14">1、应为具有完全民事权利能力和民事行为能力，并能够独立承担民事责任的自然人；</p>
                   <p className="hDeP9_14">2、有来源合法、可自主支配的必要资金；</p>
                   <p className="hDeP9_14">3、有相关产品风险识别能力和判断能力；</p>
                   <p className="hDeP9_14">4、具备投资相关金融产品的投资经历或者相关投资能力；</p>
                   <p className="hDeP9_14">5、本平台规定的其他条件。</p>
                   <p className="hDeP6_16">申请成为翔翔财富的机构会员，应同时具备下列基本条件（如需帮助请联系客服）：</p>
                   <p className="hDeP9_14">1、应为依法设立并有效存续的法人或其他组织；</p>
                   <p className="hDeP9_14">2、具有良好的信誉和经营业绩；</p>
                   <p className="hDeP9_14">3、认可并遵照执行本交易中心的交易管理办法和其他相关制度及规定，按规定缴纳有关费用；</p>
                   <p className="hDeP9_14">4、最近十二个月不存在重大违法违规行为，且未受到其主管部门的行政处罚；</p>
                   <p className="hDeP9_14">5、本平台规定的其他条件。</p>
               </div>,
               'investSafe':<div>
                   <p className="hDeP6_16">翔翔财富中心通过自身的风控管理体系建设，在产品结构设计、合作机构审核、内控管理、产品管理、系统、运营等方面进行全方位的风险把关，保护投资者利益。</p>
                   <p className="hDeP6_16">对于有增信措施的金融资产产品，本公司采取以下各项措施以尽可能保障投资安全：</p>
                   <p className="hDeP9_14"> 1、控制承担担保和增信功能的担保和信用增级服务会员在本交易中心的准入条件；</p>
                   <p className="hDeP9_14">  2、对被担保资产的市场价值进行持续性的动态监管；</p>
                   <p className="hDeP9_14"> 3、对担保和信用增级服务会员的担保能力进行持续性的动态监管；</p>
                   <p className="hDeP9_14">4、对担保履约的执行以及兑付进行监管等。</p>
                   <p className="hDeP6_16">  对于无增信措施的金融资产产品，本公司采取以下各项措施以尽可能保障投资安全：</p>
                   <p className="hDeP9_14">1、审核相关融资会员对交易产品所做的信息披露符合相关规定；</p>
                   <p className="hDeP9_14">2、对相关交易产品进行严谨的风险评级；</p>
                   <p className="hDeP9_14">3、严格执行投资者适当性的要求等。</p>
               </div>,
               'moneySafe':<div>
                   <p className="hDeP6_16"> 本平台的所有交易由第三方支付贝付提供支付结算, 严格执行同卡进出的限制, 保障用户资金安全</p>
               </div>,
               'riskManage': <div>
                   <p className="hDeP6_16">翔翔财富中心建立有完善的风险控制管理体系，依据章程的有关规定，负责监督并运行本平台的风险控制管理体系，并视实际需要研究制定风险防控相关实施细则。</p>
                   <p className="hDeP6_16">当出现或可能出现交易、运营或其他风险的情况下，本公司及相关风控岗位人员均有权及时采取足够有效的措施予以防范或制止风险，或减少相关风险引发的不良后果。本公司风险防范及应急处置内容包括：</p>
                   <p className="hDeP6_16">事前控制</p>
                   <p className="hDeP9_14">本公司各相关业务参与人要建立高效、灵敏的信息网络，重点加强对不稳定因素的掌握，对可能影响正常业务开展之重大事件的相关信息进行评估和预测，做到事前控制。</p>
                   <p className="hDeP6_16">及时报告</p>
                   <p className="hDeP9_14">在可能导致影响正常业务开展的重大事件发生时，本公司相关业务参与人一经发现，应立即并不迟于事发后24小时向本交易中心报告，并视需要而及时取得有关部门的协助。</p>
                   <p className="hDeP6_16">处置得当</p>
                   <p className="hDeP9_14">上述重大事件发生时，本公司各相关业务参与人应迅速采取有力措施，及时控制事态的蔓延，尽量将损失及不良影响降低到最低限度。</p>
               </div>,
               'monthlyWin':<div><p className="hDeP6_16">月月赢</p></div>,
               'weeklyWin':<div><p className="hDeP6_16">周周赚</p></div>,
           }
        },
        getData:function(bType){
            $.Ajax.request("/api/public/help/questions", {
                data:"type="+this.PropTypes.problemTypes[bType],
                success:function(xhr){
                    if(xhr.status == 200) {
                        var data = JSON.parse(xhr.responseText).items;
                        this.setState({data:data});
                    }
                }.bind(this),
                failure:function(data){

                }.bind(this)
            });
        },
        change:function(tType,bType){
            this.setState({tType:tType,bType:bType});
            if(tType=="help") {
                this.getData(bType);
            }
            window.scrollTo(0, 0);
        },
        going: function (rich) {
            this.setState({rich: rich});
        },
        render: function () {
            var tType = this.state.tType;
            var bType = this.state.bType;
            var data = <div className="queEvLeftPadding"><h3 style={{paddingBottom:"20px",textAlign:"center"}}>{this.PropTypes.Title[bType]}</h3><div>{this.PropTypes.Detail[bType]}</div></div>;
            if(tType == "help"){
                var id = "accordion"+this.PropTypes.problemTypes[bType];
                var _id = "#"+id;
                data = <div className="panel-group" id={id} role="tablist" aria-multiselectable="true" style={{paddingTop:"20px"}}>
                    {
                        this.state.data.map(function(d){
                                var headerId = bType+d.id;
                                var contentId = bType+"content"+d.id;
                                var contentHref = "#"+contentId;
                                var aId = bType+"a"+d.type+""+d.id
                                var chooseId = this.state.id;
                                var inClass = "panel-collapse collapse";
                                if(d.id == chooseId ){
                                    inClass = "panel-collapse collapse in";
                                }
                            var content = d.content;
                            var reg = new RegExp("\\[(.| )+?\\]", "igm");
                            var t = d.content.match(reg);
                            var going = "";
                            if (t != null) {
                                var rich = t[t.length - 1];
                                content = d.content.substring(0, d.content.length - rich.length);
                                rich = rich.substring(1, rich.length - 1);
                                if (rich == this.state.rich) {
                                    going = <div>
                                        <RichTextBox id={rich}/>
                                        <div style={{textAlign:"center"}}>
                                        <button className="btn moreBtn" onClick={this.going.bind(null,"")}>收起</button>
                                        </div>
                                    </div>;
                                } else {
                                    going = <div style={{marginTop:"20px",textAlign:"center"}}>
                                        <button className="btn moreBtn"  onClick={this.going.bind(null,rich)}>加载更多</button></div>;
                                }
                            }
                                return (
                                    <div className="panel panel-default queEvLeftItem">
                                        <a style={{padding:"0px"}} className="panel-heading" href={contentHref} id={aId} role="button" id={headerId}  data-toggle="collapse" data-parent={_id} aria-expanded="false" aria-controls={contentId}>
                                            <div className="panel-title panel-tFont">
                                                <div style={{marginRight:"20px"}}>{d.title}</div><div style={{position:"absolute",right:"15px",top:"15px"}}><i className="icon-chevron-down" style={{float:"right"}}></i></div>
                                            </div>
                                        </a>
                                        <div id={contentId} className={inClass} role="tabpanel" aria-labelledby={headerId} style={{background:"#fff"}}>
                                            <div className="panel-body">
                                                {content}
                                                {going}
                                            </div>

                                        </div>
                                    </div>
                                );
                        }.bind(this))
                    }
                </div>;
            }
            if(tType){
                return(<div style={{background:"#f7f7f7"}}>
                    <div style={{position:"relative",overflow:"hidden",width:"100%",height:"100%"}} id="help_center_banner_div">
                        <img src="assets/images/help_center_banner.png" style={{width:"100%"}} id="help_center_banner" ref="help_center_banner"/>
                    </div>
                    <div className="container" style={{minHeight:"600px"}}>
                        <div className="row">
                            <div className="clearfix queEvent">
                                <div className="col-sm-3">
                                    <QueEventMoreRight tType={tType} bType={bType} change={this.change}/>
                                </div>
                                <div className="col-xs-12 col-sm-9 queEvLeftBack">
                                    {data}
                                </div>
                              </div>
                        </div>
                    </div>
                </div>);
             }else{
               return(<div style={{minHeight:"600px"}}></div>);
             }
        }
    })
})
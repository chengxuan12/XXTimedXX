/**
 * Created by Administrator on 2015/8/19.
 */
'use strict';

define([
    'react',
    'jquery',
    'Swipe',
    'Confirm',
], function (React,$,Swipe,Confirm) {
    return React.createClass({
        getInitialState:function(){
           return{
               data:[],
               user:this.props.user.get("user"),
               protocolChecked:true,
               assetData:this.props.assetData
           }
        },
        componentDidMount: function () {
            window.loadHome = 0,window.loadAssetData = 0;
            this.props.user.on("change",function(){
                this.setState({user:this.props.user.get("user")});
            }.bind(this));
            $.ajax({
                async:false,
                url:"/api/public/ads?start=0&count=5&sortField=id:false",
                success:function(data){
                    if(data.code==200){
                        this.setState({data:data.items})
                    }
                }.bind(this),
                error:function(data){

                }
            });
            this.setTimer();
        },
        setTimer:function(){
            var t = this;
            if(this.refs.adv0){
                var height = 0 ,baseHeight = $(window).height() * 0.25,naturalWidth,naturalHeight;//原始的宽高度
                if ((window.mobilecheck() && $(window).height() < 385) || (!window.mobilecheck())) {
                    baseHeight = baseHeight > 200 ? baseHeight : 200;
                }
                $("#adv0").attr("src", $("#adv0").attr("src")).load(function() {
                    naturalWidth = this.naturalWidth;
                    naturalHeight = this.naturalHeight;
                    var prop = naturalWidth / naturalHeight;
                    var baseWidth = prop * baseHeight;
                    if(baseWidth > $(window).width()){
                        var N = 3;
                        var left = -((baseWidth - $(window).width())/N).toFixed(2) +"px";
                        for(var i = 0;i<t.state.data.length;i++){
                            $("#adv"+i).css("position","absolute").css("height",baseHeight).css("width","auto").css("left",left);
                        }
                    }
                    else{//如果小于浏览器的宽度按照原尺寸显示
                        var p2 = naturalHeight / naturalWidth;
                        baseHeight = p2 * $(window).width();
                        for(var i = 0;i<t.state.data.length;i++){
                            $("#adv"+i).css("position","relative").css("width",'100%').css("height",baseHeight).css("left","0px");
                        }
                    }
                    t.restSwiper(baseHeight);
                });
            }
        },
        componentDidUpdate:function(prevProps, prevState){
            if(window.mySwiper == undefined || window.loadHome == 0) {
                window.mySwiper = new Swiper('.swiper-container', {
                    pagination: '.mypagination',
                    paginationClickable: true,
                    speed: 600,
                    loop: false,
                    autoplay: 2000
                });
                window.loadHome = 1;
            }
            window.red = 0;
            $(window).resize(function() {
                this.setTimer();
            }.bind(this));
            this.setTimer();
            var userMobile = this.state.user['mobileNumber'];
            if (userMobile != undefined && userMobile != "" && userMobile != null && window.loadAssetData == 0) {
                window.loadAssetData = 1;
                $.Ajax.request(globamParam.login_url+"/account", {
                    method:"get",
                    success:function(xhr){
                        if(xhr.status == 200) {
                            if(xhr.responseText.indexOf("<html>")==-1){
                                var data = JSON.parse(xhr.responseText);
                                this.props.assetData.set({"earnMoney":data.items[0].earnMoney,"totalMoney":data.items[0].totalMoney,"availableMoney":data.items[0].availableMoney,"inprogressMoney":data.items[0].inprogressMoney,"proportion":data.items[0].proportion});
                                this.setState({assetData:this.props.assetData});
                            }
                        }
                    }.bind(this),
                    failure:function(data){
                    }.bind(this)
                });
            }
        },
        restSwiper:function(height){
            if(height!=window.runHeight) {
                window.runHeight = height;
            }
            $('.swiper-container').height(window.runHeight);
            $('.swiper-wrapper').height(window.runHeight);
            $('.swiper-slide').height(window.runHeight);
            var t = document.documentElement.clientWidth;
            var ct = document.getElementsByClassName("container")[0].clientWidth;
            if(t>768) {
                var value = (t - ct +32) / 2;
                $("#recommendBack").css("display","block").css("right", value);
            }else{
                $("#recommendBack").css("display","none");
            }
        },
        setCheck:function(){
            if(this.state.protocolChecked==true){
                $('#zhiFuBaoBtn').css("background","#BEBEBE");
                $('#zhiFuBaoBtn').attr("disabled",true);
            }else{
                $('#zhiFuBaoBtn').css("background","#ff6400");
                $('#zhiFuBaoBtn').attr("disabled",false);
            }
            this.setState({protocolChecked:this.state.protocolChecked?false:true});
        },
        joinInvest:function(){
            if(this.state.protocolChecked==true){
                   routerReact.navigate("register",{trigger: true});
            }
        },
        getSwiperRight:function(){
            var swiperRight = "", userMobile = this.state.user['mobileNumber'];
            if (userMobile == undefined || userMobile == "" || userMobile == null) {
                swiperRight=<div id="recommendBack" className="swiperRight hidden-xs hidden-sm">
                    <div style={{position:"relative",height:"100%"}}>
                     <div className="clearfix swiperBottom" style={{position:"relative"}}>
                        <div className="swRightdashed">
                        </div>
                        <div className="swLeftTop"  style={{float:"left"}}>
                            <div className="swiperBottom">
                                <span className="swiperFontM ">投资</span><span className="swiperFontS" >&nbsp;|&nbsp;预期年化</span>
                            </div>
                            <div>
                                <span className="swiperFontS" >高至</span><span className="swiperFontL" >16</span> <span className="swiperFontM">%</span>
                            </div>
                        </div>
                        <div className="swRightTop"  style={{float:"right"}}>
                            <div className="swiperBottom">
                                <span className="swiperFontM" >融资</span><span className="swiperFontS" >&nbsp;|&nbsp;年化利率</span>
                            </div>
                            <div>
                                <span span className="swiperFontL" >4.5</span> <span className="swiperFontM" >%</span><span className="swiperFontS">起</span>
                            </div>
                        </div>
                    </div>
                    <div  style={{fontSize:"12px",position:"absolute",bottom:"30%"}} >
                        <input type="checkbox" id="bank_checkbox" checked={this.state.protocolChecked} onClick={this.setCheck}/>&nbsp;
                        <a style={{color:"#fff"}} href="/#/protocol/user" target="_blank" >《会员注册协议》</a>&nbsp;

                    </div>
                    <div className="zhiFuBaoBtn" id="zhiFuBaoBtn">
                        <a href="javascript:void(0)" style={{color:"#fff"}} onClick={this.joinInvest}>
                            <div>立即加入</div>
                        </a>
                    </div>

                 </div>
              </div>

            }else{
                var data = this.state.assetData;
                var totalMoney=parseFloat(data.get('totalMoney')).toFixed(2);
                var availableMoney=parseFloat(data.get('availableMoney')).toFixed(2);
                var inprogressMoney=parseFloat(data.get('inprogressMoney')).toFixed(2);
                var earnMoney=parseFloat(data.get('earnMoney')).toFixed(2);
                var earnRest=(earnMoney==0)?"":earnMoney.substring(earnMoney.length-3);
                earnMoney=(earnMoney==0)?"暂无收益":Math.floor(data.get('earnMoney'));
                swiperRight=<div id="recommendBack" className="swRightAsset hidden-xs hidden-sm">
                                    <div className="swAssetBack" >
                                        <div>当前收益（元）
                                        </div>
                                        <div style={{fontSize:"30px",paddingTop:"5%"}} >{earnMoney}<span style={{fontSize:"22px"}}>{earnRest}</span></div>
                                    </div>
                                    <div style={{padding:"3% 12%",border:"1px solid #e5e5e5",height:"55%"}}>
                                        <div className="swAssetFont">持有资产 &nbsp;&nbsp;<span className="swMoney">{totalMoney}</span>&nbsp;元</div>
                                        <div className="swAssetFont">可用资产 &nbsp;&nbsp;<span className="swMoney">{availableMoney}</span>&nbsp;元
                                        </div>
                                        <div className="swAssetFont" style={{textAlign:"right"}}> <a href="/#/personal/asset" style={{color:"#333",fontSize:"17px"}}> <i className="icon-chevron-right"></i></a>
                                        </div>
                                        <div className="swAssetFont"> 在途交易 &nbsp;&nbsp;<span className="swMoney">{inprogressMoney}</span>&nbsp;元
                                        </div>
                                   </div>
                         </div>
             }
            return swiperRight;
        },
        render: function () {
            var data = this.state.data;
            var height = $(window).height() * 0.25;
            if(document.documentElement && document.getElementsByClassName("container")[0]){
                var t = document.documentElement.clientWidth;
                var ct = document.getElementsByClassName("container")[0].clientWidth;
                if(t>768) {
                    var value = (t - ct +32) / 2;
                    $("#recommendBack").css("display","block").css("right", value);
                }else{
                    $("#recommendBack").css("display","none");
                }
             }
            var swiperRight=this.getSwiperRight();
            return(<div style={{position:"relative"}}>
                    <div className="swiper-container swMarATop" style={{position:"static",height:height}}>
                        {swiperRight}
                        <ul className="swiper-wrapper" style={{marginTop:"-4px"}}>
                        {
                            data.map(function(d,index){
                                var ref = "adv"+index;
                                var href= d.value;
                                if(d.type=="理财产品"){
                                    href = "/#/invest/product/"+d.value;
                                }
                                return (<li className="swiper-slide">
                                    <div style={{width:"100%",height:"100%",position:"relative",overflow:"hidden"}}>
                                        <a href={href}><img src={d.cover}  ref={ref} id={ref} /></a>
                                     </div>
                                </li>)
                            })
                        }
                    </ul>
                    <div className="mypagination"></div>

                    </div>

                </div>);
        }
    });
});
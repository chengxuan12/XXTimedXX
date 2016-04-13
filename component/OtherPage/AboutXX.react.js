/*Created by Administrator on 2015/8/31.*/
'use strict';
define([
    'react',
    'jquery'
], function (React,$) {
    return React.createClass({
        componentDidMount: function () {
            this.setTimer();
            $(window).resize(function() {
                this.setTimer();
            }.bind(this));
        },
        mobilecheck:function(){
            var check = false;
            (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        },
        setTimer:function(){
            var t = this;
            if(this.refs.about_xxcaifu_banner){
                var height = 0 ,baseHeight = $(window).height() * 0.20,naturalWidth,naturalHeight;//原始的宽高度
                if(!this.mobilecheck()){//电脑浏览器
                    baseHeight = baseHeight > 265 ? baseHeight : 265;
                }else if((this.mobilecheck() && $(window).height()> 385)){//手机竖屏
                    baseHeight = baseHeight > 120 ? baseHeight : 120;
                }else if((this.mobilecheck() && $(window).height()< 385)){//手机横屏
                    baseHeight = baseHeight > 205 ? baseHeight : 205;
                }
                $("#about_xxcaifu_banner").attr("src", $("#about_xxcaifu_banner").attr("src")).load(function() {
                    naturalWidth = this.naturalWidth;
                    naturalHeight = this.naturalHeight;
                    var prop = this.naturalWidth / this.naturalHeight;
                    var baseWidth = prop * baseHeight;
                    var N = 2;
                    var left = -((baseWidth - $(window).width())/N).toFixed(2) +"px";
                    $("#about_xxcaifu_banner").css("position","absolute").css("height",baseHeight).css("width","auto").css("left",left);
                    if($(window).width() > 992) {
                        $("#about_xxcaifu_banner").css("position","relative").css("width",'100%').css("height",baseHeight).css("left","0px");
                        baseHeight = "auto";
                    }
                    t.restSwiper(baseHeight);
                });
            }
        },
        restSwiper:function(height){
            $("#about_xxcaifu_banner").height(height);
            $("#about_div").height(height);
            if($(window).width()>750){
                $("#about_div").css("margin-top","-20px");
            }else{
                $("#about_div").css("margin-top","0px");
            }
            this.forceUpdate();
        },
        render: function () {
            var classContent = "aboutContent window";
            if(((this.mobilecheck() && $(window).height()> 385))){
                classContent = "aboutContent mobile";
            }
            var aboutIntroduce = "aboutIntroduce";
            return(<div>
                <div id="about_div" style={{background:"#F0F0F0",position:"relative",overflow:"hidden",width:"100%",height:"100%"}}>
                    <img src="assets/images/about_xxcaifu_banner.png" id="about_xxcaifu_banner" ref="about_xxcaifu_banner"/>
                    <div className={classContent}>
                        <div className="aboutTitle">翔翔财富</div>
                        <div>
                            <p className={aboutIntroduce}>
                            是一家专业致力于p2p理财的互联网金融企业，拥有强大的专业团队，核心成员拥有金融机构、知名律师事务所、世界五百强企业的多年工作经验。翔翔财富的所有理财产品均经过专业风控团队精心设计及论证，确保投资资金的高安全性及高回报率。
                           </p>
                        </div>
                    </div>
                </div>
                 <div style={{background:"#F6F6F6"}}>
                      <div className="container abXXM">
                          <div className="row">
                              <div className="col-xs-12 abXX-title">
                                  精英团队，创新金融
                              </div>
                              <div className="col-xs-12 abXX-content">
                                  <div className="row">
                                      <li className="col-xs-12 col-sm-6 col-lg-5 col-sm-offset-1 col-lg-offset-2 abContent1"><span className="abColor" >多位金融机构、知名律所、世界百强企业的资深专家</span></li>
                                      <li className="col-xs-12 col-sm-5 abContent2"><span className="abColor">丰富的金融知识和经验</span></li>
                                      <li className="col-xs-12 col-sm-6 col-lg-5 col-sm-offset-1 col-lg-offset-2 abContent1 abContent1"><span className="abColor">互联网精英团队以及丰富的实战经验</span></li>
                                      <li className="col-xs-12 col-sm-5 abContent2"><span className="abColor">出彩的专业精神</span></li>
                                      <div className="col-xs-12 abContent3" style={{textAlign:"center"}}>
                                          遇上极致互联网产品体验，让我们立志于从 "心" 打造一家真正有利于投资人的高效配资平台
                                      </div>
                                  </div>
                              </div>
                              <div>
                                  <img src="assets/images/photo_about_xxcaifu_1.png" style={{width:"100%"}}/>
                              </div>
                          </div>
                      </div>
                 </div>
                 <div style={{background:"#FFF"}}>
                    <div className="container abXXB">
                        <div className="row abXX-content">
                            <div className="col-xs-12 col-sm-6 ">
                                <div className="row" style={{marginBottom:"10px"}}>
                                    <div className="col-xs-12 abXX-title" style={{textAlign:"left"}}>全新体验，高效整合</div>
                                    <div className="abContent3">翔翔财富网上融资平台区别于传统线下融资公司或个人，</div>
                                    <div className="abContent3" style={{padding:"15px 15px 40px 15px"}}>我们把极致的互联网体验带到融资，摆脱了传统线下模式中：</div>
                                    <div className="col-xs-12">
                                        <div className="row ">
                                            <li className="col-xs-12 col-sm-5 abContent1"><span className="abColor">超高的利息</span></li>
                                            <li className="col-xs-12 col-sm-7 abContent2"><span className="abColor">繁杂的操作</span></li>
                                            <li className="col-xs-12 col-sm-5 abContent1"><span className="abColor">地域的限制</span></li>
                                            <li className="col-xs-12 col-sm-7 abContent2"><span className="abColor">低效死板的风控</span></li>
                                        </div>
                                    </div>
                                 </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 text-center">
                                <img src="assets/images/photo_about_xxcaifu_2.png" style={{width:"100%"}} />
                            </div>
                        </div>
                  </div>
                </div>
             </div>
            );
        }
    });
});
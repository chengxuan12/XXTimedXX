/**
 * Created by Administrator on 2015/8/21.
 */
define([
    'react',
    'jquery',
    'Page',
    'jsx!component/Common/FormatDataComponent.react'
], function (React, $, Page, FormatDataComponent) {
    return React.createClass({
        getInitialState:function(){
            return{
                currentPage:1,
                totalPage:1
            }
        },
        componentDidMount:function(){
          this.setTimer();
        },
        componentDidUpdate:function(prevProps, prevState){
            $(window).resize(function() {
                this.setTimer();
            }.bind(this));
            this.setTimer();
        },
        setTimer:function(){
            var t = this;
            if(this.refs.adv0){
                var height = 0 ,baseHeight = $(window).height() * 0.20,naturalWidth,naturalHeight;//原始的宽高度
                if ((window.mobilecheck() && $(window).height() < 385) || !window.mobilecheck()) {
                    baseHeight = baseHeight > 200 ? baseHeight : 200;
                }
                $("#adv0").attr("src", $("#adv0").attr("src")).load(function() {
                    naturalWidth = this.naturalWidth;
                    naturalHeight = this.naturalHeight;
                    var prop = naturalWidth / naturalHeight;
                    var baseWidth = prop * baseHeight;
                    var N = 3;
                    var a = document.getElementsByClassName("container")[0].clientWidth;
                    var b = 2/3 * a + 100;
                    var left = -((baseWidth - b)/N).toFixed(2);
                    if($(window).width()<768){
                        left = -((baseWidth - $(window).width() + 60 )/N).toFixed(2) ;
                    }
                    left=(left>0)?-left:left;
                    for(var i = 0;i<3;i++){
                        $("#adv"+i).css("position","absolute").css("height",baseHeight).css("width","auto").css("left",left).css("top","65px");
                        t.restSwiper(baseHeight,i);
                    }
                });
            }
        },
        componentWillReceiveProps:function(){
            if(this.props.type && this.props.data && this.props.data.length > 0) {
                $(".tcdPageCode").createPage({
                    pageCount: parseInt(this.props.totalPage),
                    current: parseInt(this.props.currentPage),
                    backFn: function (page) {
                        window.location.href="/#/article/"+this.props.type+"/all/"+page;
                        console.log(page);
                    }.bind(this)
                });
            }
        },
        restSwiper:function(height,index){
            $('#adv'+index).height(height);
            $("#outAdv"+index).height(height+30);
        },
        render: function () {
            var s=this;
            if(this.props.data){
                return(
                    <div>
                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                            {
                                this.props.data.map(function(d,index){
                                        var href="/#/article/event/detail/"+d.id;
                                        var id = "adv"+index;
                                        var outerId = "outAdv"+index;
                                        var newFormat = new FormatDataComponent();
                                        var beginDate =  newFormat.formatData(d.beginDate,2);
                                        return (
                                            <div className="queEvLeftList"  id={outerId}>
                                            <a href={href} style={{color:"#666",fontSize:"18px"}}>{d.title}
                                                <div style={{fontSize:"12px",margin:"2px 0px"}}>开始时间：{beginDate}</div>
                                            </a>
                                            <img src={d.imgUrl} id={id} ref={id}/>
                                            </div>);
                                }.bind(this))
                            }
                        </div>
                        <div className="tcdPageCode"></div>
                    </div>);
            }else{
                return(<div />);
            }
        }
    })
})
/**
 * Created by Administrator on 2015/8/7.
 */
'use strict';

define([
        'react',
        'jquery',
        'Ajax',
        'jsx!component/PersonalCenter/InfoAndMenu.react',],
    function(React,$,Ajax,InfoAndMenu){
        return React.createClass({
            getInitialState:function(){
                return{
                    data:this.props.assetData,
                    title:this.props.title,
                    user:this.props.user.get("user"),
                    fetch:false
                };
            },
            componentDidMount:function() {
                this.props.user.on("change",function(){
                    this.setState({user:this.props.user.get("user")});
                    this.forceUpdate();
                }.bind(this));
                this.props.assetData.on("change",function(){
                    this.setState({data:this.props.assetData});
                    this.forceUpdate();
                }.bind(this));

                $.Ajax.request(globamParam.login_url+"/account", {
                    method:"get",
                    success:function(xhr){
                        if(xhr.status == 200) {
                            if(xhr.responseText.indexOf("<html>")==-1){
                                var data = JSON.parse(xhr.responseText);
                                this.props.assetData.set("earnMoney",data.items[0].earnMoney);
                                this.props.assetData.set("totalMoney",data.items[0].totalMoney);
                                this.props.assetData.set("availableMoney",data.items[0].availableMoney);
                                this.props.assetData.set("inprogressMoney",data.items[0].inprogressMoney);
                                this.props.assetData.set("proportion",data.items[0].proportion);
                                this.setState({fetch:true});
                            }
                        }
                    }.bind(this),
                    failure:function(data){
                    }.bind(this)
                });
            },
            floatFix2:function(param){
                param=parseFloat(param).toFixed(2);
                return param;
            },
            assetDetail:function(){
                var data = this.state.data;
                var totalMoney=parseFloat(data.get('totalMoney')).toFixed(2);
                var totalRest=totalMoney.substring(totalMoney.length-3);
                var totalMoneyInt=Math.floor(data.get('totalMoney'));

                var availableMoney=parseFloat(data.get('availableMoney')).toFixed(2);
                var inprogressMoney=parseFloat(data.get('inprogressMoney')).toFixed(2);

                var earnMoney=parseFloat(data.get('earnMoney')).toFixed(2);
                var earnRest=(earnMoney==0)?"":earnMoney.substring(earnMoney.length-3);
                earnMoney=(earnMoney==0)?"暂无收益":Math.floor(data.get('earnMoney'));
                var onlinePay = <a href="/#/personal/charge" style={{fontSize:"15px",color:"#ff6400",whiteSpace:"nowrap"}}>[充值]</a>;
                var detail=<div className="col-sm-8 assetData">
                    <div className="row assetRow">
                        <div className="col-xs-6 col-sm-6 perAsset">
                            <div>
                                <span style={{display:"inline-block"}}>我的资产(元) </span>&nbsp; <a href="/#/personal/charge" className="visible-inl" style={{color:"#ff6400",whiteSpace:"nowrap"}}>[充值]</a>
                                <div className="myAsset">
                                    {totalMoneyInt}<span style={{fontSize:"22px"}}>{totalRest}
                                    &nbsp; <a href="/#/personal/charge" className="hidden-xs" style={{fontSize:"15px",color:"#ff6400",whiteSpace:"nowrap"}}>[充值]</a>
                                </span>
                                </div>
                            </div>
                            <div style={{padding:"5px 0px"}}>
                                可用资产 &nbsp;&nbsp;{availableMoney}
                            </div>
                            <div style={{padding:"5px 0px"}}>
                                在途交易 &nbsp;&nbsp;{inprogressMoney}
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 currentEarn">
                            当前收益(元)
                            <div className="earning" >{earnMoney}<span style={{fontSize:"22px"}}>{earnRest}</span></div>
                        </div>
                    </div>
                </div>;

             return detail;
            },

            render:function(){
                if(this.state.data!=undefined){
                    var detail=this.assetDetail();
                    return (
                        <div className="container" style={{minHeight:"653px"}}>
                            <div className="row">
                                <div className="hidden-xs">
                                    {detail}
                                 </div>
                                <InfoAndMenu title={this.state.title} user={this.props.user}/>
                                <div className="visible-xs" style={{marginTop:"20px"}}>
                                    {detail}
                                </div>
                            </div>
                        </div>
                    );
                }else{
                    return( <div className="container" style={{minHeight:"653px",textAlign:"center"}}>
                        <i className="icon-spinner icon-spin" style={{fontSize:"36px",marginTop:"100px"}}></i>
                    </div>);
                }
            }
        });
    });
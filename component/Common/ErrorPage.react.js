/**
 * Created by Administrator on 2015/9/17.
 */
'use strict';
define([
    'react',
    'jquery'
], function (React,$) {
    return React.createClass({
        getInitialState:function(){
           return {
               error: this.props.error,
               url: "",
               errorRemind: "",
               errorInfo: "",
               errorButton: "",
           }
        },
        componentDidMount: function () {
            if (this.state.error == 403) {
                this.setState({
                    url: "assets/images/" + this.state.error + ".jpg",
                    errorRemind: "噢，页面错误了！",
                    errorInfo: "立即刷新一下吧。",
                    errorButton: "刷新"
                });
            } else {
                this.setState({
                    url: "assets/images/" + 404 + ".jpg",
                    errorRemind: "噢，页面不见了！",
                    errorInfo: "休息一下回到翔翔财富首页吧。",
                    errorButton: "回到首页"
                });
            }
        },
        go: function () {
            if (this.state.error == 403) {
                history.go(-1);
            } else {
                location.href = "/#";
            }
        },
        render: function() {
            return (
                <div className="container" style={{minHeight:"653px"}}>
                    <div className="row text-center">
                        <div className="col-xs-12">
                            <img src={this.state.url} className="errorImg"/>
                            <div className="errorFont">
                                {this.state.errorRemind}
                            </div>
                            <div>
                                {this.state.errorInfo}
                            </div>
                            <div>
                                <button className="btn errorBtn" onClick={this.go}>{this.state.errorButton}</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
});
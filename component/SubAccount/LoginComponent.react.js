/**
 * Created by Administrator on 2015/7/14.
 */
'use strict';
define([
    'react',
    'jquery',
], function (React,$) {
    return React.createClass({
        propTypes:{
          onChanged : React.PropTypes.func.isRequired
        },
        getInitialState:function(){
            return{
                "text":""
            };
        },

        setText:function(event){
          this.setState({"text":event.target.value});
        },
        onConfirm:function(){
            this.setState({
                "img": "",
            }, function () {
                $.ajax({
                    url:globamParam.url_header+"/api/ths/login?code="+this.state.text,
                    headers: {
                        'Accept': 'application/json;charset=UTF-8',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    type:'POST',
                    success:function(data){
                        if(data.success){
                            this.props.onChanged(data.success);
                        }
                    }.bind(this),
                    error: function (data) {
                        console.log(data);
                    }.bind(this)
                });
            });
        },
        render: function() {
            if(this.props.login)
            {
                var img = globamParam.url_header+"/api/ths/verification.jpg";
                return (
                    <div>
                        <div className="login-home login-style"><img src={img}/><input type = 'text' placeholder='请输入验证码' onChange = {this.setText}/><a  href="javascript:void(0)" onClick={this.onConfirm}>验证</a></div>
                    </div>
                );
            }
            else{
                return(<div></div>);
            }

        }
    });
});


/*Created by Administrator on 2015/7/10.*/
'use strict';
define([
        'react',
        'jquery',
        'Confirm',
        'jsx!component/Common/Cookie.react'],
    function(React,$,Confirm,Cookie){
        return React.createClass({
            ProperTypes:{
                Operator:"operatorName",
            },
            getInitialState:function(){
                return{
                    inputString:'',
                };
            },
            componentDidMount:function() {
                this.props.operatorModel.on('change', function() {
                    this.forceUpdate();
                }.bind(this));
            },
            componentWillUnmount: function() {
                this.props.operatorModel.off('change', function() {
                    this.forceUpdate();
                }.bind(this));
            },
            handlechange : function(event){
                var inputValue = event.target.value;
                this.setState({"inputString":inputValue});
            },
            clearCookie:function() {
                var cookie=new Cookie();
                var oCookie = cookie.setCookie(this.ProperTypes.Operator, "", -1);
                this.setState({"inputString":''});
                this.props.operatorModel.set("cookie",oCookie);
            },
            submitOperator : function(){
              if(this.state.inputString == ''){
                  $.alert({
                      title: '',
                      content:"请输入操作员，并确认！"
                  });
                  return;
              }else{
                  var cookie=new Cookie();
                  var oCookie = cookie.setCookie(this.ProperTypes.Operator,this.state.inputString.trim(),1000);
                  this.props.operatorModel.set("cookie",oCookie);
              }
            },
            render:function(){
                var styles={padding:'5px'}
                var cookie=new Cookie();
                var operatorName=cookie.getCookie(this.ProperTypes.Operator);
                if(operatorName!=''){

                    return (
                        <div className="search-bottom-line" style={styles}>
                            <div>操作员 : {operatorName}&nbsp; <button className='btn btn-info btn-sm' onClick={this.clearCookie}>清除</button></div>
                        </div>
                    );
                }
                return (
                    <div className="search-bottom-line" style={styles}>
                        操作员: &nbsp;<input type = "text" value = {this.state.inputString}  onChange = {this.handlechange} />
                        &nbsp;<button className="btn btn-info btn-sm" onClick = {this.submitOperator}>确定</button>
                    </div>
                );
            }
        });
    });
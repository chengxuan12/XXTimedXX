/**
 * Created by Administrator on 2015/7/28.
 */
'use strict';

define([
    'react',
    'jquery'
], function (React,$) {
    return React.createClass({
        getInitialState:function(){
          return{
              title:"",
              content:""
          }
        },
        componentWillMount:function(){
            this.setState({title:this.props.title,content:this.props.content});
        },
        componentDidUpdate:function(prevProps, prevState){
            if(prevState.title != this.props.title) {
                this.setState({title:this.props.title,content:this.props.content});
                $("button").focus();
            }
        },
        render:function(){
            var title = (this.state.title==null?"":this.state.title);
            var content = (this.state.content==null?"":this.state.content);
            return (<div className="modal fade" id="myModal">
                <div className="modal-dialog" id="myDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">{title}</h4>
                        </div>
                        <div className="modal-body">
                            {content}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>);
        }
    })
});
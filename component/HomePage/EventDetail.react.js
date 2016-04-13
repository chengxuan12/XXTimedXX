/**
 * Created by Administrator on 2015/8/21.
 */
define([
    'react',
    'jquery',
    'Ajax',
    'jsx!component/HomePage/QueEventMoreRight.react',
    'jsx!component/Common/FormatDataComponent.react',
    'jsx!component/Admin/RichTextBox.react'
], function (React, $, Ajax, QueEventMoreRight, FormatDataComponent, RichTextBox) {
    return React.createClass({
        getInitialState:function(){
            return{
                data: {
                    content: ""
                }
            }
        },
        componentDidMount:function(){
            $.Ajax.request("/api/public/events/"+this.props.id,{
               success:function(xhr){
                   var data = JSON.parse(xhr.responseText).items[0];
                   this.setState({
                      data:data
                   });
               }.bind(this),
               failure:function(){

               }
            });
            window.scrollTo(0,0);
        },
        goBack:function(){
            window.history.back();
        },
        render: function () {
           var type="event";
           var newFormat = new FormatDataComponent();
           var beginDate =  newFormat.formatData(this.state.data.beginDate,1);
           if(this.state.data){
               var content = this.state.data.content;
               var reg = new RegExp("\\[(.| )+?\\]", "igm");
               var t = content.match(reg);
               var going = "";
               if (t != null) {
                   var rich = t[t.length - 1];
                   content = content.substring(0, content.length - rich.length);
                   rich = rich.substring(1, rich.length - 1);
                   going = <div><RichTextBox id={rich}/></div>
               }
               return(
                   <div style={{background:"#f7f7f7",paddingTop:"10px",marginTop:"-20px"}}>
                   <div className="container">
                       <div className="row">
                           <div className="clearfix queEvent">
                               <div className="col-sm-3 hidden-xs">
                                   <QueEventMoreRight tType={type} />
                               </div>
                               <div className="col-xs-12 col-sm-9 queEvLeftBack">
                                   <div className="row" style={{borderBottom:"1px solid #e6e6e6"}}>
                                       <div className="col-xs-12 " style={{padding:"15px 0 0 30px"}}>
                                          <a onClick={this.goBack} style={{color:"#42b8ff"}} href="javascript:void(0)" className="hidden-xs"><span className="icon-angle-left"></span>&nbsp;返回</a>
                                        </div>
                                       <div className="col-xs-12 queEvtitle">
                                           {this.state.data.title}
                                       </div>
                                       <div className="col-xs-12 queEvtime">开始：{beginDate}</div>
                                    </div>
                                   <div className="row">
                                       <div className="col-xs-12 " style={{padding:"15px 0 0 30px"}}>
                                           <p className="hDeP6_14">
                                               {content}
                                               {going}
                                           </p>
                                       </div>
                                    </div>
                               </div>
                           </div>
                       </div>
                     </div>
               </div>);
           }else{
               return(<div></div>);
           }
        }
    })
})
/**
 * Created by Administrator on 2015/8/21.
 */
'use strict';
define([
    'react',
    'jquery',
    'Ajax',
    'jsx!component/HomePage/QueEventMoreLeft.react',
    'jsx!component/HomePage/QueEventMoreRight.react',
], function (React,$,Ajax,QueEventMoreLeft,QueEventMoreRight) {
    return React.createClass({
        getInitialState:function(){
            return {
                type:"",
                totalPage:1,
                currentPage:1,
                perCount:3
            }
        },
        componentDidMount:function(){
            this.setState({type:this.props.tType?this.props.tType:"",currentPage:this.props.page?this.props.page:1});
            this.fetchData(this.props.tType,this.props.page);
            window.scrollTo(0,0);
        },

        fetchData:function(type,page){
            var url = "";
            if(this.props.tType=="event"){
                url = "/api/public/events";
            }
            if(page){
                var start =  (page-1)*this.state.perCount;
            }
            $.Ajax.request(url, {
                data:"start="+start+"&count="+this.state.perCount+"&sortField=beginDate:false",
                success:function(xhr){
                    if(xhr.status == 200) {
                        var data = JSON.parse(xhr.responseText);
                        this.setState({data:data.items,totalPage:Math.ceil(data.total/this.state.perCount)});
                        this.forceUpdate();
                    }
                }.bind(this),
                failure:function(data){

                }.bind(this)
            });
        },
        render: function () {
            var type = this.state.type;
            if(type!=""){
                return(
                    <div style={{background:"#f7f7f7",paddingTop:"10px",marginTop:"-20px"}}>
                        <div className="container">
                            <div className="row">
                                <div className="clearfix queEvent">
                                    <div className="hidden-xs col-sm-3">
                                        <QueEventMoreRight tType={type}/>
                                    </div>
                                    <div  className="col-xs-12 col-sm-9 queEvLeftBack" >
                                        <QueEventMoreLeft data = {this.state.data} type={this.state.type} currentPage={this.props.page} totalPage = {this.state.totalPage} />
                                    </div>
                                  </div>
                            </div>
                        </div>
                    </div>);
            } else{
                return(<div></div>);
            }
        }
    })
})
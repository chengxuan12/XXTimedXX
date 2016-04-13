/**
 * Created by Administrator on 2015/9/9.
 */
'use strict';

define([
        'react',
        'jquery',
        'Page',
        'jsx!component/PersonalCenter/AssetDetailRecords.react',
    ],
    function(React,$,Page,AssetDetailRecords){
        return React.createClass({
            getInitialState:function(){
                return{
                    totalPage:1,
                    currentPage:1,
                    perCount:6,
                    data:[],
                    status:"",
                    type:"",
                    fetch:false
                };
            },
            componentDidMount:function() {
                this.goToFetch();
            },
            componentWillReceiveProps:function(nextProps){
                this.setState({currentPage:nextProps.page});
                this.fetchData(nextProps.page);
            },
            goToFetch:function(){
                if(this.props.page) {
                    this.fetchData(this.props.page);
                }else{
                    this.fetchData(1);
                }
            },
            fetchData:function(page){
                var start = (page-1)*this.state.perCount;
                var url =globamParam.login_url+"/account/capital/daybook";
                var type=this.props.type;
                if(type!="all"&&type!="1"&&type!="2"&&type!="3"&&type!="4"&&type!="5"){
                    type="all";
                }
                this.setState({type:type});
                var data="start="+start+"&count="+this.state.perCount+"&type="+type;
                if(this.props.status==0||this.props.status==1||this.props.status==2||this.props.status==3||this.props.status==4){
                    data=data+"&status="+this.props.status;
                }
                $.Ajax.request(url, {
                    data:data,
                    success:function(xhr){
                        if(xhr.status == 200) {
                            var data = JSON.parse(xhr.responseText);
                            this.setState({data:data.items,totalPage:Math.ceil(data.total/this.state.perCount),fetch:true});
                            this.forceUpdate();
                        }
                    }.bind(this),
                    failure:function(data){
                    }.bind(this)
                });
            },

            render:function(){
                return (
                    <AssetDetailRecords data = {this.state.data} fetch={this.state.fetch} currentPage={this.props.page}  totalPage = {this.state.totalPage} user = {this.props.user}  title={this.props.title} status={this.props.status} type={this.state.type}/>
                );
            }
        });
    });
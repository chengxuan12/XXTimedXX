/**
 * Created by Administrator on 2015/9/21.
 */
'use strict';

define([
        'react',
        'jquery',
        'Page',
        'jsx!component/Admin/AdminOpinion.react',
    ],
    function(React,$,Page,AdminOpinion){
        return React.createClass({
            getInitialState:function(){
                return{
                    totalPage:1,
                    currentPage:1,
                    perCount:6,
                    data:[],
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
                var url =globamParam.login_url+"/admin/help/feedbacks/all?start="+start+"&count="+this.state.perCount+"&sortField=createdAt:false";
                $.Ajax.request(url, {
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
                    <AdminOpinion data ={this.state.data} fetch={this.state.fetch} currentPage={this.props.page}  totalPage = {this.state.totalPage}/>
                );
            }
        });
    });
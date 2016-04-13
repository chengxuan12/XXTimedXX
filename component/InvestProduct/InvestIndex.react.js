/* Created by Administrator on 2015/7/27.*/

'use strict';

define([
    'react',
    'jquery',
    'jsx!component/InvestProduct/InvestRecords.react',
    'collection/InvestProductCollection',
    'jsx!component/Common/Cookie.react',
    'jsx!component/HomePage/LatestNotice.react',
], function (React,$,InvestRecords,InvestProductCollection,Cookie,LatestNotice) {
    return React.createClass({
        PropTypes:{
            types:["全部产品","周周赚","月月赢"]
        },
        getInitialState:function(){
            return{
                investProducts:new InvestProductCollection,
                typeName:["全部产品"],
                Products:[],
                type:"",
                totalPage:1,
                currentPage:1,
                perCount:3
            }
        },
        goToFetch:function(){
            if(this.props.page) {
                this.fetchData(this.props.page,this.props.sort);
            }else{
                this.fetchData(1);
            }
        },
        componentDidMount:function(){
            this.setState({currentPage:this.props.page,type:this.props.type});
            this.goToFetch();
            this.props.cookieModel.on("change",function(){
                this.goToFetch();
                this.forceUpdate();
            }.bind(this));
        },
        componentDidUpdate:function (prevProps, prevState) {
            if((this.props.type != this.state.type) || (this.props.page !=this.state.currentPage)) {
                this.setState({currentPage:this.props.page,type:this.props.type});
                this.fetchData(this.props.page,this.props.sort);
            }
        },
        componentWillReceiveProps:function(nextProps){
            this.setState({currentPage:nextProps.page});
            this.fetchData(nextProps.page,nextProps.sort);
        },
        fetchData:function(page,sort){
            var start = (page-1)*this.state.perCount;
            var url_header = this.props.cookieModel.get("loginStatus")?globamParam.login_url:globamParam.public_url;
            sort=(sort==null||sort==undefined)?"":"&sortFields="+sort ;

            if(this.props.type == 'monthyly' || this.props.type == 'weekly') {
                this.state.investProducts.url = url_header+"/products/"+this.props.type+"?start="+start+"&count="+this.state.perCount+sort;
            }else{
                this.state.investProducts.url = url_header+"/products/recommend";
            }
            this.state.investProducts.fetch({
                success: function (model, data) {
                    var all=[],list=[],array = this.PropTypes.types;
                    if(this.props.type == 'monthyly' || this.props.type == 'weekly') {
                        all.push({products:data.items});
                    }
                    else{
                        for(var i=1;i<array.length;i++){
                            for(var j=0;j<data.items.length;j++){
                                if(data.items[j].typeName==array[i])
                                {
                                    list.push(data.items[j]);
                                }
                            }
                            all.push({
                                type:array[i],
                                products:list
                            });
                            list=[];
                        }
                    }
                    this.setState({Products:all,typeName:array,totalPage:Math.ceil(data.total/this.state.perCount)});
                    this.forceUpdate();
                }.bind(this)
            });
        },
        render:function(){
            return (<div style={{background:"#F0F0F0",marginTop:"-20px",paddingTop:"30px"}}>
                <LatestNotice/>
                <InvestRecords data = {this.state.Products} typeName={this.state.typeName} type={this.props.type} currentPage={this.props.page} totalPage = {this.state.totalPage} sort={this.props.sort}/>
            </div>);
        }
    })
});

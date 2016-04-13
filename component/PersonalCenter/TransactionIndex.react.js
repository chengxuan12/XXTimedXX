/**
 * Created by Administrator on 2015/8/13.
 */
'use strict';

define([
        'react',
        'jquery',
        'Page',
        'jsx!component/PersonalCenter/TransactionRecords.react',
        'collection/TransactionRecordCollection'
    ],
    function(React,$,Page,TransactionRecords,TransactionRecordCollection){
        return React.createClass({
            PropTypes:{
                COLS:["investTime","productName","investMoney","status"],
                COLS_MAPPING:{
                    "investTime":"投资时间",
                    "productName":"产品名称",
                    "investMoney":"投资金额（元）",
                    "status":"状态"
                }
            },
            getInitialState:function(){
                return{
                    transactionRecords:new TransactionRecordCollection,
                    title:this.props.title,
                    palState:"",
                    user:this.props.user.get("user"),
                    totalPage:1,
                    currentPage:1,
                    count:"",
                    perCount:5,
                    data:[],
                    fetch:false
                };
            },
            componentDidMount:function() {
                this.props.user.on("change",function(){
                    this.setState({user:this.props.user.get("user")});
                }.bind(this));
                this.goToFetch();
            },
            componentDidUpdate:function (prevProps, prevState) {
                if((this.props.palState != this.state.palState) || (this.props.page !=this.state.currentPage)) {
                    this.setState({currentPage:this.props.page,palState:this.props.palState});
                    this.goToFetch();
                    this.forceUpdate();
                }
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
                var url_header = "/api/account/tradehistory?start="+start+"&count="+this.state.perCount;
                this.state.transactionRecords.url = url_header;
                if(this.props.palState == '1' ) {//未支付
                    this.state.transactionRecords.url = url_header+"&palState=1";
                }else if(this.props.palState == '0'){//已支付
                    this.state.transactionRecords.url = url_header+"&palState=0";
                }
                this.state.transactionRecords.fetch({
                    success: function (model, data) {
                        this.setState({data:data.items,totalPage:Math.ceil(data.total/this.state.perCount),fetch:true});
                        this.forceUpdate();
                    }.bind(this)
                });
            },
            render:function(){
                    return (
                        <TransactionRecords data = {this.state.data} fetch={this.state.fetch} currentPage={this.props.page}  totalPage = {this.state.totalPage} user = {this.props.user}  title={this.state.title} palState={this.state.palState}/>
                    );
            }
        });
    });
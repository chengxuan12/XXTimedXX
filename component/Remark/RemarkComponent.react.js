/**
 * Created by Administrator on 2015/7/10.
 */
'use strict';
define([
    'react',
    'jquery'],
    function(React,$){
    return React.createClass({
        componentDidMount:function() {
            this.props.remarkModel.on('change', function() {
                this.forceUpdate();
            }.bind(this));
        },
        componentWillUnmount: function() {
            this.props.remarkModel.off('change', function() {
                this.forceUpdate();
            }.bind(this));
        },
        deleteRemark : function(){
            $.ajax({
                url:globamParam.url_header+"/api/user/"+this.props.user.get("id")+"/remark/"+this.props.remark.id,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type:"DELETE",
                dataType:"json",
                success:function(data){
                    this.props.remarkModel.set("status","DELETE");
                }.bind(this),
                error:function(data){
                    console.log(data);
                }.bind(this)
            });
        },
        formatData: function (now) {
            now = new Date(now);
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var min = now.getMinutes();
            var sec = now.getSeconds();
            if(hour<10) {
                hour = "0"+hour;
            }
            if(min<10){
                min = "0"+min;
            }
            if(sec<10){
                sec = "0"+sec;
            }
            return year + "-" + month + "-" + date +" "+hour+":"+min+":"+sec;
        },
        render:function(){
            var date = this.formatData(this.props.remark.date_time);
            var author = decodeURI(this.props.remark.author);
            return (
                <div className = "remarks">
                    {author}:  {this.props.remark.remark} <i className='icon-remove mark' onClick={this.deleteRemark}></i><span className="date-mark">{date}</span>
                </div>
            );
        }
    });
});
/**
 * Created by Administrator on 2015/7/6.
 */
'use strict';

define([
    'react',
    'jquery'
], function (React,$) {
   return React.createClass({

        handlechange:function(index){
            this.props.peiziModel.set("uid",this.props.model[index].id);
            this.props.peiziModel.set("name",this.props.model[index].name);
            this.props.peiziModel.set("default",this.props.peiziModel.get("default")==undefined || this.props.peiziModel.get("default")==false ?true:false);
            this.props.model[0].default = false;
        },
       getRecord:function(){
           var peiziModel=this.props.peiziModel;
           var auid,atype,astatus;
           atype=(peiziModel.get('type')==null||peiziModel.get('type')=='')?0:peiziModel.get('type');
           astatus=(peiziModel.get('status')==null||peiziModel.get('status')=='')?0:peiziModel.get('status');

           var record={
               "atype":atype,
               "astatus":astatus
           }
           return record;
       },
        render: function() {
            var record=this.getRecord();
            var title=(this.props.peiziModel.get("title")=='peizi')?'peizi':'capital';

            var model = this.props.model;
            if(model!=undefined && model[0].mobile!='' &&model[0].default != false) {
                return(
                    <ul>
                        {this.props.model.map(function (l,index) {
                            var link=globamParam.url_header+'/#'+title+'/'+l.id+'/'+record.atype+'/'+record.astatus;

                            if(l.name == undefined || l.name == null || l.name == '') {
                                return <li>
                                    <a href={link}>{l.mobile}</a>
                                </li>;
                            }
                            else if(l.mobile == undefined || l.mobile == null) {
                                return <li>
                                    <a>{l.name}</a>
                                </li>;
                            }
                            else
                                return <li>
                                    <a href={link}>{l.mobile} ({l.name})</a>
                                </li>;
                            }.bind(this))}
                    </ul>)
            }else{
                return (<div>
                    </div>
                );
            }
        }
    });
});

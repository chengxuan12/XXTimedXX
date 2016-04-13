/**
 * Created by Administrator on 2015/9/18.
 */
'use strict';

define([
    'react',
    'jquery',
], function (React,$) {
    return React.createClass({
        PropTypes: {
            Menu: [
                {
                    id: "messNotice",
                    title: "短信管理",
                    items: [],
                    icon:<i className="icon-th-list"/>,
                    href:"/#/admin/messNotice"
                }, {
                    id: "appNotice",
                    title: "App通知管理",
                    items: [],
                    icon:<i className="icon-th-list"/>,
                    href:"/#/admin/appNotice"
                }, {
                    id:"product",
                    title:"产品管理",
                    items:[],
                    icon:<i className="icon-th-list"/>,
                    href:"/#/admin/product"
                }, {
                    id: "event",
                    title: "活动管理",
                    items: [],
                    icon:<i className="icon-th-list"/>,
                    href: "/#/admin/event"
                }, {
                    id: "adv",
                    title: "广告管理",
                    items: [],
                    icon:<i className="icon-th-list"/>,
                    href:"/#/admin/adv"
                }, {
                    id: "help",
                    title: "帮助管理",
                    items: [],
                    icon:<i className="icon-th-list"/>,
                    href: "/#/admin/help"
                }, {
                    id: "opinion",
                    title: "意见反馈管理",
                    items: [],
                    icon:<i className="icon-th-list"/>,
                    href:"/#/admin/opinion"
                },
            ],
        },
        render: function() {
            var s=this;
            var inClass = "collapse",outerClass = "collapse in";
            return (
                <div className="row">
                    <ul className="nav-a navbar-nav admin-MLul">
                        {
                            s.PropTypes.Menu.map(function(m,index){
                                var showHidden = (s.props.title==m.id)?outerClass:inClass;
                                var lLiActive=(s.props.title==m.id)?"lLiActive":"";
                                if(m.items.length==0){
                                    return (<li className={lLiActive}>
                                        <a href={m.href} className={lLiActive}>{m.icon}&nbsp;{m.title}</a>
                                    </li>)
                                }else{
                                    return(<li className="dropdown admin-lLiCo">
                                            <a  role="button" data-toggle="collapse" href={"#l"+m.id} className="dropdown-toggle" >{m.icon}&nbsp;{m.title}</a>
                                            <ul  role="menu" className={showHidden} id={"l"+m.id}>
                                                {
                                                    m.items.map(function(d){
                                                        return(<li>
                                                                <a href={d.href}>{d.icon}&nbsp;{d.title}</a>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            );
        }
    });
});

/**
 * Created by Administrator on 2015/8/24.
 */
'use strict';
define([
    'react',
    'jquery',
], function (React,$) {
    return React.createClass({
        render: function () {
            return(<div style={{background:"#fff"}} className="hidden-xs">
                       <div className="container">
                         <div className="row">
                           <div className="col-xs-12 col-sm-4">
                               <div className="row">
                                   <div className="col-xs-3" style={{textAlign:"right"}}>
                                       <img src="assets/images/point_1.png" className="SuperImg"/>
                                   </div>
                                   <div className="col-xs-9 wTitleRight" style={{paddingLeft:"20px"}}>
                                       <span className="wSuperTitle">安安稳稳</span>
                                        <div className="wSuperBottom">
                                           <span style={{fontSize:"16px",color:"#333"}}>贝付</span>支付，平台100%回购保障
                                       </div>
                                   </div>
                               </div>
                           </div>
                             <div className="col-xs-12 col-sm-4">
                                 <div className="row">
                                     <div className="col-xs-3" style={{textAlign:"right"}}>
                                         <img src="assets/images/point_2.png" className="SuperImg"/>
                                     </div>
                                     <div className="col-xs-9 wTitleRight" style={{paddingLeft:"20px"}}>
                                         <span className="wSuperTitle">灵活变现</span>
                                         <div className="wSuperBottom">
                                             定期秒变<span style={{fontSize:"16px",color:"#333"}}>活期</span>，资金周转不担心
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xs-12 col-sm-4">
                                 <div className="row">
                                     <div className="col-xs-3" style={{textAlign:"right"}}>
                                         <img src="assets/images/point_3.png" className="SuperImg"/>
                                     </div>
                                     <div className="col-xs-9 wTitleRight" style={{paddingLeft:"20px"}}>
                                         <span className="wSuperTitle">方便融资</span>
                                         <div className="wSuperBottom">
                                                 无需<span style={{fontSize:"16px",color:"#333"}}>面签</span>即可融资，费率超低
                                         </div>
                                     </div>
                                 </div>
                             </div>
                           </div>
                        </div>
                 </div>);
         }
    });
});



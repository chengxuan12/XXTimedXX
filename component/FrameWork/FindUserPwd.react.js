/**
 * Created by Administrator on 2015/8/4.
 */
'use strict';

define([
    'react',
    'jquery',
    'jsx!component/FrameWork/ResettingPwd.react'
], function (React,$,ResettingPwd) {
    return React.createClass({
        render: function() {
            return (
                    <div className="container" style={{minHeight:"500px"}}>
                        <div className="findPwd">
                              <ResettingPwd title={"findPwd"}/>
                        </div>
                   </div>

            );
        }
    });
});
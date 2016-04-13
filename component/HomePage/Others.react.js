/**
 * Created by Administrator on 2015/8/21.
 */
'use strict';
define([
    'react',
    'jquery',
    'jsx!component/HomePage/OtherPlay.react',
    'jsx!component/HomePage/OtherProblems.react'
], function (React,$,OtherPlay,OtherProblems) {
    return React.createClass({
        render: function () {
            return(
                <div>
                  <div className="container">
                   <div className="row othersTop">
                        <div className="col-xs-12 col-sm-9">
                            <OtherPlay />
                        </div>
                        <div className="col-xs-12 col-sm-3">
                            <OtherProblems />
                        </div>
                   </div>
                  </div>
                </div>);
        }
    })
})
/**
 * Created by Administrator on 2015/9/17.
 */
'use strict';
define([
    'react',
    'jquery',
    'Ajax'
], function (React, $, Ajax) {
    return React.createClass({
        getInitialState: function () {
            return {
                id: this.props.id,
                content: ""
            }
        },
        componentDidMount: function () {
            this.fetchData();
        },
        fetchData: function () {
            $.Ajax.request("/api/public/help/content/" + this.state.id, {
                method: "get",
                success: function (xhr) {
                    if (xhr.status == 200) {
                        if (xhr.responseText.indexOf("<html>") == -1) {
                            var data = JSON.parse(xhr.responseText);
                            if (data.code == 200 && data.items[0]) {
                                this.setState({content: data.items[0].content});
                            }
                        } else {
                        }
                    }
                }.bind(this),
                failure: function (data) {
                }.bind(this)
            });
        },
        componentDidUpdate: function () {
            $("#p-text-box").html(this.state.content);
            if ($('#p-text-box img')) {
                $('#p-text-box img').removeAttr('style').removeAttr('width').removeAttr('height').removeClass().addClass('img-responsive').css('display', 'inline-block').css("margin", "20px 0px");
            }
        },
        render: function () {
            return (<div>
                    <div className="text-box" id="p-text-box">
                    </div>
                </div>
            );
        }
    });
});
/**
 * Created by Administrator on 2015/7/20.
 */
'use strict';

define([
    'react',
    'backbone',
    'jquery'
], function (React,Backbone,$) {
    return React.createClass({
        componentDidMount: function() {
            (function ($, window, document, undefined) {
                var pluginName = "metisMenu",
                    defaults = {
                        toggle: true
                    };
                function Plugin(element, options) {
                    this.element = element;
                    this.settings = $.extend({}, defaults, options);
                    this._defaults = defaults;
                    this._name = pluginName;
                    this.init();
                }
                Plugin.prototype = {
                    init: function () {
                        var $this = $(this.element),
                            $toggle = this.settings.toggle;
                        $this.find('li.active').has('ul').children('ul').addClass('collapse in');
                        $this.find('li').not('.active').has('ul').children('ul').addClass('collapse');
                        $this.find('li').has('ul').children('a').on('click', function (e) {
                            e.preventDefault();
                            $(this).parent('li').toggleClass('active').children('ul').collapse('toggle');
                            if ($toggle) {
                                $(this).parent('li').siblings().removeClass('active').children('ul.in').collapse('hide');
                            }
                        });
                    }
                };
                $.fn[pluginName ] = function (options) {
                    return this.each(function () {
                        if (!$.data(this, "plugin_" + pluginName)) {
                            $.data(this, "plugin_" + pluginName, new Plugin(this, options));
                        }
                    });
                }
            })(jQuery, window, document);
            (function ($) {
                var mainApp = {
                    initFunction: function()
                    {
                        /*MENU
                         ------------------------------------*/
                        $('#main-menu').metisMenu();
                        $(window).bind("load resize", function () {
                            if ($(this).width() < 768) {
                                $('div.sidebar-collapse').addClass('collapse')
                            } else {
                                $('div.sidebar-collapse').removeClass('collapse')
                            }
                        });
                    },
                    initialization: function () {
                        mainApp.initFunction();
                    }
                }
                $(document).ready(function () {
                    mainApp.initFunction();
                });
            }(jQuery));
        },
        render: function() {
            return (
                <nav className="navbar-default navbar-side" role="navigation">
                    <div className="sidebar-collapse sidebar-color">
                        <ul className="nav" id="main-menu">
                            <li>
                                <a  href={globamParam.url_header+"/#peizi/0/0/in_progress"}><i className="fa fa-table"></i>配资</a>
                            </li>
                            <li>
                                <a href={globamParam.url_header+"/#capital/0/0/0"}><i className="fa fa-edit"></i>资金</a>
                            </li>

                        </ul>

                    </div>

                </nav>

            );
        }
    });
});

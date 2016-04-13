/**
 * Created by Administrator on 2015/7/2.
 */
'use strict';

define([
    'backbone', 'react', 'jsx!router.react', 'react.backbone', 'jquery', 'bootstrap', 'common',
    'jsx!component/IndexComponent.react',
], function (Backbone, React, RouterReact, ReactBackbone, $, Bootstrap, common, IndexComponent) {

    var initialize = function () {
        //React.render( <IndexComponent />, document.getElementById('wrapper'));
       window.routerReact=new RouterReact();
    };

    return {
        initialize: initialize
    };
});
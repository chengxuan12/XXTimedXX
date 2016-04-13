/**
 * Created by Administrator on 2015/7/2.
 */
'use strict';

require.config({
    baseURL: "../",
    paths: {
        jquery: 'assets/common/js/jquery.min',
        react: 'assets/common/js/react-with-addons.min',
        "JSXTransformer": 'assets/common/js/JSXTransformer',
        backbone: 'assets/common/js/backbone-min',
        bootstrap: "assets/common/js/bootstrap.min",
        underscore: 'assets/common/js/underscore',

        jsx: 'assets/common/js/jsx',
        text: 'assets/common/js/text',
        'react.backbone': 'assets/common/js/react.backbone',
        'Scroll': 'assets/common/js/jq_scroll',
        'Page': 'assets/common/js/jquery.page',
        'Swipe': 'assets/common/js/idangerous.swiper.min',
        'MD5': 'assets/common/js/md5',
        jqueryForm: 'assets/common/js/jquery-form',
        birth: 'assets/default/js/birthdate',
        PCAS: 'assets/default/js/PCASClass',
        Confirm: 'assets/common/js/jquery-confirm',
        ajaxFileUpload: 'assets/default/js/ajaxfileupload',
        Ajax: 'assets/common/js/Ajax',
        Wysiwyg:"assets/common/js/bootstrap-wysiwyg",
        HotKeys:"assets/common/js/jquery.hotkeys"
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        }
    }
});

// Start the main app logic.
require(["backbone","bootstrap","jsx!main"],
    function (Backbone,Bootstrap,main) {
        main.initialize();
    });

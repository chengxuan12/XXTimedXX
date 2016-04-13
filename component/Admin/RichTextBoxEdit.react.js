/**
 * Created by Administrator on 2015/9/21.
 */
'use strict';
define([
    'react',
    'jquery',
    'Wysiwyg',
    'HotKeys',
    'jqueryForm',
    'Confirm',
], function (React, $, Wysiwyg, HotKeys, jqueryForm, Confirm) {
    return React.createClass({
        getInitialState:function(){
            return{
                richId:this.props.richId
            }
        },
        componentDidMount:function(){
            window.dataUrl = undefined;
            this.setInitialValue();
            this.setRichEditor();
        },
        fetchData: function (richId) {
            $.Ajax.request("/api/public/help/content/"+richId, {
                method: "get",
                success: function (xhr) {
                    if (xhr.status == 200) {
                        if (xhr.responseText.indexOf("<html>") == -1) {
                            var data = JSON.parse(xhr.responseText);
                            if (data.code == 200 && data.items[0]) {
                                $("#rich_editor").html(data.items[0].content);
                                this.forceUpdate()
                            }
                        } else {
                        }
                    }
                }.bind(this),
                failure: function (data) {
                }.bind(this)
            });
        },
        showErrorAlert:function (reason, detail) {
            var msg='';
            if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
            else {
                console.log("error uploading file", reason, detail);
            }
            $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+
                '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
        },
        componentDidUpdate:function(){
           this.setRichEditor();
            if(this.props.richId!=this.state.richId){
                this.setState({richId:this.props.richId});
                this.fetchData(this.props.richId);
            }
        },
        setInitialValue:function(){
            var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
                    'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
                    'Times New Roman', 'Verdana'],
                fontTarget = $('[title=Font]').siblings('.dropdown-menu');
            $.each(fonts, function (idx, fontName) {
                fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
            });
            $('a[title]').tooltip({container:'body'});
            $('.dropdown-menu input').click(function() {return false;})
                .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
                .keydown('esc', function () {this.value='';$(this).change();});

            $('[data-role=magic-overlay]').each(function () {
                var overlay = $(this), target = $(overlay.data('target'));
                overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
            });
        },
        setRichEditor:function(){
            if($("#rich_editor")){
                $('#rich_editor').wysiwyg({fileUploadError: this.showErrorAlert} );
            }
        },
        handle:function(){
            var editorValue =  $("#rich_editor").html();
            window.dataUrl.map(function(m) {
                var t = editorValue.indexOf(m.value);
                if (t!=-1) {
                    var s = editorValue.substring(t-10,t+m.value.length+2);
                    var r="{"+m.name+"}";
                    editorValue = editorValue.replace(s,r);
                }
            });
            $("#textarea").val(editorValue);
            //window.dataUrl = [];
            var form = $("form[name=rich_text_form]");
            var options={
                url:"/api/admin/help/content",
                method:"post",
                async:false,
                data:form.serialize(),
                success:function(data){
                    if(data.code==200 && data.items[0]){
                       this.props.setRichValue(data.items[0].id);
                    }
                }.bind(this),
                error:function(data){
                    alert("error");
                }
            }
            if(editorValue!=""){
                form.ajaxSubmit(options);
            }else{
                $.alert({
                    title: '',
                    content:"富文本框不为空"
                });
            }

        },
        render: function() {
            return (
                    <form name="rich_text_form" className="form-inline" encType="multipart/form-data" method="post">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="btn-toolbar" data-role="editor-toolbar" data-target="#rich_editor">
                                    <div className="btn-group">
                                        <a className="btn-a dropdown-toggle" data-toggle="dropdown" title="Font"><i className="icon-font"></i><b className="caret"></b></a>
                                        <ul className="dropdown-menu">
                                        </ul>

                                    </div>
                                    <div className="btn-group" style={{marginLeft:"0px"}}>
                                        <a className="btn-a dropdown-toggle" data-toggle="dropdown" title="Font Size"><i className="icon-text-height"></i>&nbsp;<b className="caret"></b></a>
                                        <ul className="dropdown-menu">
                                            <li><a data-edit="fontSize 5"><font size="5">Huge</font></a></li>
                                            <li><a data-edit="fontSize 4"><font size="4">Middle</font></a></li>
                                            <li><a data-edit="fontSize 3"><font size="3">Normal</font></a></li>
                                            <li><a data-edit="fontSize 2"><font size="2">Small</font></a></li>
                                            <li><a data-edit="fontSize 1"><font size="1">Tiny</font></a></li>
                                        </ul>
                                    </div>
                                    <div className="btn-group">
                                        <a className="btn-a" data-edit="bold" title="Bold (Ctrl/Cmd+B)"><i className="icon-bold"></i></a>
                                        <a className="btn-a" data-edit="italic" title="Italic (Ctrl/Cmd+I)"><i className="icon-italic"></i></a>
                                    </div>
                                    <div className="btn-group">
                                        <a className="btn-a" data-edit="strikethrough" title="Strikethrough"><i className="icon-strikethrough"></i></a>
                                        <a className="btn-a" data-edit="underline" title="Underline (Ctrl/Cmd+U)"><i className="icon-underline"></i></a>
                                    </div>
                                    <div className="btn-group">
                                        <a className="btn-a" data-edit="insertunorderedlist" title="Bullet list"><i className="icon-list-ul"></i></a>
                                        <a className="btn-a" data-edit="insertorderedlist" title="Number list"><i className="icon-list-ol"></i></a>
                                    </div>
                                    <div className="btn-group">
                                        <a className="btn-a" data-edit="outdent" title="Reduce indent (Shift+Tab)"><i className="icon-indent-left"></i></a>
                                        <a className="btn-a" data-edit="indent" title="Indent (Tab)"><i className="icon-indent-right"></i></a>
                                    </div>
                                    <div className="btn-group">
                                        <a className="btn-a" data-edit="justifyleft" title="Align Left (Ctrl/Cmd+L)"><i className="icon-align-left"></i></a>
                                        <a className="btn-a" data-edit="justifycenter" title="Center (Ctrl/Cmd+E)"><i className="icon-align-center"></i></a>
                                    </div>
                                    <div className="btn-group">
                                        <a className="btn-a" data-edit="justifyright" title="Align Right (Ctrl/Cmd+R)"><i className="icon-align-right"></i></a>
                                        <a className="btn-a" data-edit="justifyfull" title="Justify (Ctrl/Cmd+J)"><i className="icon-align-justify"></i></a>
                                    </div>
                                    <div className="btn-group">
                                        <a className="btn-a dropdown-toggle" data-toggle="dropdown" title="Hyperlink"><i className="icon-link"></i></a>
                                        <div className="dropdown-menu input-append">
                                            <input className="span2" placeholder="URL" type="text" data-edit="createLink"/>
                                            <button className="btn-a" type="button">Add</button>
                                        </div>
                                        <a className="btn-a" data-edit="unlink" title="Remove Hyperlink"><i className="icon-cut"></i></a>
                                    </div>
                                    <div className="btn-group">
                                        <a className="btn-a" data-edit="undo" title="Undo (Ctrl/Cmd+Z)"><i className="icon-undo"></i></a>
                                        <a className="btn-a" data-edit="redo" title="Redo (Ctrl/Cmd+Y)"><i className="icon-repeat"></i></a>
                                    </div>
                                    <div className="btn-group" id = "fileGroup">
                                        <a className="btn-a" title="Insert picture (or just drag & drop)" id="pictureBtn"><i className="icon-picture"></i></a>
                                        <input type="file" name="files" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" id="uploadPic0"/>
                                    </div>
                                </div>
                                <div id="rich_editor">
                                    Go ahead &hellip;
                                </div>
                                <textArea name="content" id="textarea" className="hidden"/>
                                <a type="button" onClick={this.handle} className="hidden" id="rich_btn"></a>
                            </div>
                        </div>
                    </form>
            );
        }
    });
});
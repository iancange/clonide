var __extends=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)};define(["require","exports","vs/nls","vs/base/common/arrays","vs/base/common/keyCodes","vs/base/common/lifecycle","vs/base/common/winjs.base","vs/editor/common/editorAction","vs/editor/common/editorActionEnablement","vs/editor/common/editorCommon","vs/platform/keybinding/common/keybinding","vs/editor/common/editorCommonExtensions","vs/editor/common/modes","../common/format","./formatCommand"],function(t,e,o,i,n,r,s,a,d,p,c,l,m,u,h){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var g=function(){function t(t){var e=this;this.editor=t,this.callOnDispose=[],this.callOnModel=[],this.callOnDispose.push(t.onDidChangeConfiguration(function(){return e.update()})),this.callOnDispose.push(t.onDidChangeModel(function(){return e.update()})),this.callOnDispose.push(t.onDidChangeModelMode(function(){return e.update()})),this.callOnDispose.push(m.OnTypeFormattingEditProviderRegistry.onDidChange(this.update,this))}return t.prototype.update=function(){var t=this;if(this.callOnModel=r.dispose(this.callOnModel),this.editor.getConfiguration().contribInfo.formatOnType&&this.editor.getModel()){var e=this.editor.getModel(),o=m.OnTypeFormattingEditProviderRegistry.ordered(e)[0];o&&o.autoFormatTriggerCharacters&&o.autoFormatTriggerCharacters.forEach(function(e){t.callOnModel.push(t.editor.addTypingListener(e,t.trigger.bind(t,e)))})}},t.prototype.trigger=function(t){var e=this;if(!(this.editor.getSelections().length>1)){var o=this.editor.getModel(),n=this.editor.getPosition(),r=!1,s=this.editor.onDidChangeModelRawContent(function(t){if(t.changeType===p.EventType.ModelRawContentChangedFlush)r=!0;else if(t.changeType===p.EventType.ModelRawContentChangedLineChanged){var e=t.lineNumber;r=e<=n.lineNumber}else if(t.changeType===p.EventType.ModelRawContentChangedLinesInserted){var o=t.fromLineNumber;r=o<=n.lineNumber}else if(t.changeType===p.EventType.ModelRawContentChangedLinesDeleted){var i=t.toLineNumber;r=i<=n.lineNumber}r&&s.dispose()}),a=o.getOptions();u.getOnTypeFormattingEdits(o,n,t,{tabSize:a.tabSize,insertSpaces:a.insertSpaces}).then(function(t){s.dispose(),r||i.isFalsyOrEmpty(t)||e.editor.executeCommand(e.getId(),new h.EditOperationsCommand(t,e.editor.getSelection()))},function(t){throw s.dispose(),t})}},t.prototype.getId=function(){return t.ID},t.prototype.dispose=function(){this.callOnDispose=r.dispose(this.callOnDispose),this.callOnModel=r.dispose(this.callOnModel)},t.ID="editor.contrib.autoFormat",t}(),y=function(t){function e(e,o){var i=this;t.call(this,e,o,d.Behaviour.WidgetFocus|d.Behaviour.Writeable|d.Behaviour.UpdateOnModelChange),this._disposables=[m.DocumentFormattingEditProviderRegistry.onDidChange(function(){return i.resetEnablementState()}),m.DocumentRangeFormattingEditProviderRegistry.onDidChange(function(){return i.resetEnablementState()})]}return __extends(e,t),e.prototype.dispose=function(){t.prototype.dispose.call(this),this._disposables=r.dispose(this._disposables)},e.prototype.isSupported=function(){return(m.DocumentFormattingEditProviderRegistry.has(this.editor.getModel())||m.DocumentRangeFormattingEditProviderRegistry.has(this.editor.getModel()))&&t.prototype.isSupported.call(this)},e.prototype.run=function(){var t,e=this,o=this.editor.getModel(),i=this.editor.getSelection(),n=o.getOptions(),r={tabSize:n.tabSize,insertSpaces:n.insertSpaces};if(t=i.isEmpty()?u.getDocumentFormattingEdits(o,r):u.getDocumentRangeFormattingEdits(o,i,r),!t)return s.TPromise.as(!1);var a=this.editor.captureState(p.CodeEditorStateFlag.Value,p.CodeEditorStateFlag.Position);return t.then(function(t){return!!a.validate(e.editor)&&(!(!t||0===t.length)&&(e.apply(e.editor,i,t),e.editor.focus(),!0))})},e.prototype.apply=function(t,e,o){var i=null;e.isEmpty()&&(i=t.saveViewState());var n=new h.EditOperationsCommand(o,e);t.executeCommand(this.id,n),i&&t.restoreViewState(i)},e.ID="editor.action.format",e}(a.EditorAction);e.FormatAction=y,l.CommonEditorRegistry.registerEditorAction({ctor:y,id:y.ID,label:o.localize("formatAction.label","Format Code"),alias:"Format Code",kbOpts:{context:l.ContextKey.EditorTextFocus,primary:n.KeyMod.Shift|n.KeyMod.Alt|n.KeyCode.KEY_F,linux:{primary:n.KeyMod.CtrlCmd|n.KeyMod.Shift|n.KeyCode.KEY_I}},menuOpts:{group:"1_modification",order:1.3,kbExpr:c.KbExpr.has(p.ModeContextKeys.hasFormattingProvider)}}),l.CommonEditorRegistry.registerEditorContribution(g)});
var __extends=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)},__decorate=this&&this.__decorate||function(t,e,o,i){var n,r=arguments.length,s=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var c=t.length-1;c>=0;c--)(n=t[c])&&(s=(r<3?n(s):r>3?n(e,o,s):n(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s},__param=this&&this.__param||function(t,e){return function(o,i){e(o,i,t)}};define(["require","exports","vs/nls","vs/base/common/keyCodes","vs/base/common/lifecycle","vs/base/common/winjs.base","vs/base/browser/dom","vs/base/browser/ui/actionbar/actionbar","vs/platform/contextview/browser/contextView","vs/platform/keybinding/common/keybinding","vs/platform/actions/common/actions","vs/editor/common/editorAction","vs/editor/common/editorActionEnablement","vs/editor/common/editorCommon","vs/editor/common/editorCommonExtensions","vs/editor/browser/editorBrowserExtensions"],function(t,e,o,i,n,r,s,c,u,d,a,h,p,_,g,f){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var v=function(){function t(t,e,o,n,r){var s=this;this._contextMenuService=e,this._contextViewService=o,this._keybindingService=n,this._menuService=r,this._toDispose=[],this._contextMenuIsBeingShownCount=0,this._editor=t,this._contextMenu=this._menuService.createMenu(a.MenuId.EditorContext,this._keybindingService),this._toDispose.push(this._contextMenu),this._toDispose.push(this._editor.onContextMenu(function(t){return s._onContextMenu(t)})),this._toDispose.push(this._editor.onKeyDown(function(t){t.keyCode===i.KeyCode.ContextMenu&&(t.preventDefault(),t.stopPropagation(),s.showContextMenu())}))}return t.prototype._onContextMenu=function(t){if(!this._editor.getConfiguration().contribInfo.contextmenu)return this._editor.focus(),void(t.target.position&&!this._editor.getSelection().containsPosition(t.target.position)&&this._editor.setPosition(t.target.position));if(t.target.type!==_.MouseTargetType.OVERLAY_WIDGET&&(t.event.preventDefault(),t.target.type===_.MouseTargetType.CONTENT_TEXT||t.target.type===_.MouseTargetType.CONTENT_EMPTY||t.target.type===_.MouseTargetType.TEXTAREA)){this._editor.focus(),t.target.position&&!this._editor.getSelection().containsPosition(t.target.position)&&this._editor.setPosition(t.target.position);var e;t.target.type!==_.MouseTargetType.TEXTAREA&&(e={x:t.event.posx,y:t.event.posy+1}),this.showContextMenu(e)}},t.prototype.showContextMenu=function(t){if(this._editor.getConfiguration().contribInfo.contextmenu){if(!this._contextMenuService)return void this._editor.focus();var e=this._getMenuActions();e.length>0&&this._doShowContextMenu(e,t)}},t.prototype._getMenuActions=function(){this._editor.beginForcedWidgetFocus();try{for(var t=[],e=this._contextMenu.getActions(),o=0,i=e;o<i.length;o++){var n=i[o],r=n[1];t.push.apply(t,r),t.push(new c.Separator)}return t.pop(),t}finally{this._editor.endForcedWidgetFocus()}},t.prototype._doShowContextMenu=function(t,e){var o=this;void 0===e&&(e=null),this._editor.beginForcedWidgetFocus();var i=this._editor.getConfiguration().contribInfo.hover;this._editor.updateOptions({hover:!1});var n=e;if(!n){this._editor.revealPosition(this._editor.getPosition()),this._editor.render();var u=this._editor.getScrolledVisiblePosition(this._editor.getPosition()),d=s.getDomNodePagePosition(this._editor.getDomNode()),a=d.left+u.left,h=d.top+u.top+u.height;n={x:a,y:h}}this._contextMenuService.showContextMenu({getAnchor:function(){return n},getActions:function(){return r.TPromise.as(t)},getActionItem:function(t){var e=o._keybindingFor(t);if(e)return new c.ActionItem(t,t,{label:!0,keybinding:o._keybindingService.getLabelFor(e)});var i=t;return"function"==typeof i.getActionItem?i.getActionItem():null},getKeyBinding:function(t){return o._keybindingFor(t)},onHide:function(t){o._contextMenuIsBeingShownCount--,o._editor.focus(),o._editor.endForcedWidgetFocus(),o._editor.updateOptions({hover:i})}})},t.prototype._keybindingFor=function(t){var e=this._keybindingService.lookupKeybindings(t.id);return e.length>0?e[0]:null},t.prototype.getId=function(){return t.ID},t.prototype.dispose=function(){this._contextMenuIsBeingShownCount>0&&this._contextViewService.hideContextView(),this._toDispose=n.dispose(this._toDispose)},t.ID="editor.contrib.contextmenu",t=__decorate([__param(1,u.IContextMenuService),__param(2,u.IContextViewService),__param(3,d.IKeybindingService),__param(4,a.IMenuService)],t)}(),y=function(t){function e(e,o){t.call(this,e,o,p.Behaviour.TextFocus)}return __extends(e,t),e.prototype.run=function(){var t=this.editor.getContribution(v.ID);return t?(t.showContextMenu(),r.TPromise.as(null)):r.TPromise.as(null)},e.ID="editor.action.showContextMenu",e}(h.EditorAction);f.EditorBrowserRegistry.registerEditorContribution(v),g.CommonEditorRegistry.registerEditorAction(new g.EditorActionDescriptor(y,y.ID,o.localize("action.showContextMenu.label","Show Editor Context Menu"),{context:g.ContextKey.EditorTextFocus,primary:i.KeyMod.Shift|i.KeyCode.F10},"Show Editor Context Menu"))});
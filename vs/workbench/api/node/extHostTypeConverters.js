define(["require","exports","vs/base/common/severity","vs/base/common/arrays","./extHostTypes","vs/platform/editor/common/editor","vs/base/common/uri"],function(e,n,t,r,o,i,a){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function u(e){var n=e.selectionStartLineNumber,t=e.selectionStartColumn,r=e.positionLineNumber,i=e.positionColumn,a=new o.Position(n-1,t-1),u=new o.Position(r-1,i-1);return new o.Selection(a,u)}function m(e){var n=e.anchor,t=e.active;return{selectionStartLineNumber:n.line+1,selectionStartColumn:n.character+1,positionLineNumber:t.line+1,positionColumn:t.character+1}}function c(e){var n=e.start,t=e.end;return{startLineNumber:n.line+1,startColumn:n.character+1,endLineNumber:t.line+1,endColumn:t.character+1}}function l(e){var n=e.startLineNumber,t=e.startColumn,r=e.endLineNumber,i=e.endColumn;return new o.Range(n-1,t-1,r-1,i-1)}function s(e){return new o.Position(e.lineNumber-1,e.column-1)}function f(e){return{lineNumber:e.line+1,column:e.character+1}}function d(e){switch(e){case o.DiagnosticSeverity.Error:return t["default"].Error;case o.DiagnosticSeverity.Warning:return t["default"].Warning;case o.DiagnosticSeverity.Information:return t["default"].Info;case o.DiagnosticSeverity.Hint:return t["default"].Ignore}return t["default"].Error}function p(e){switch(e){case t["default"].Info:return o.DiagnosticSeverity.Information;case t["default"].Warning:return o.DiagnosticSeverity.Warning;case t["default"].Error:return o.DiagnosticSeverity.Error;case t["default"].Ignore:return o.DiagnosticSeverity.Hint}return o.DiagnosticSeverity.Error}function g(e){var n=i.Position.LEFT;return"number"!=typeof e||(e===o.ViewColumn.Two?n=i.Position.CENTER:e===o.ViewColumn.Three&&(n=i.Position.RIGHT)),n}function C(e){if("number"==typeof e)return e===i.Position.LEFT?o.ViewColumn.One:e===i.Position.CENTER?o.ViewColumn.Two:e===i.Position.RIGHT?o.ViewColumn.Three:void 0}function v(e){return"undefined"!=typeof e.range}function y(e){return 0===e.length||!!v(e[0])}function b(e){return y(e)?e.map(function(e){return{range:c(e.range),hoverMessage:e.hoverMessage,renderOptions:e.renderOptions}}):e.map(function(e){return{range:c(e)}})}function I(e){return{name:e.name,type:o.SymbolKind[e.kind||o.SymbolKind.Property].toLowerCase(),range:c(e.location.range),resourceUri:e.location.uri,containerName:e.containerName,parameters:""}}function w(e){return new o.SymbolInformation(e.name,o.SymbolKind[e.type.charAt(0).toUpperCase()+e.type.substr(1)],l(e.range),e.resourceUri,e.containerName)}function S(e){return{range:c(e.range),contents:e.contents}}function h(e){return new o.Hover(e.contents,l(e.range))}function K(e){return new o.DocumentHighlight(l(e.range),e.kind)}n.toSelection=u,n.fromSelection=m,n.fromRange=c,n.toRange=l,n.toPosition=s,n.fromPosition=f,n.fromDiagnosticSeverity=d,n.toDiagnosticSeverty=p,n.fromViewColumn=g,n.toViewColumn=C,n.fromRangeOrRangeWithMessage=b,n.TextEdit={from:function(e){return{text:e.newText,range:c(e.range)}},to:function(e){return new o.TextEdit(l(e.range),e.text)}};var T;!function(e){function n(e){return new o.SymbolInformation(e.name,e.kind,l(e.location.range),e.location.uri,e.containerName)}function t(e){return{name:e.name,kind:e.kind,containerName:e.containerName,location:{uri:e.location.uri,range:c(e.location.range)}}}e.fromOutlineEntry=n,e.toOutlineEntry=t}(T=n.SymbolInformation||(n.SymbolInformation={})),n.fromSymbolInformation=I,n.toSymbolInformation=w,n.location={from:function(e){return{range:c(e.range),uri:e.uri}},to:function(e){return new o.Location(e.uri,l(e.range))}},n.fromHover=S,n.toHover=h,n.toDocumentHighlight=K,n.CompletionItemKind={from:function(e){switch(e){case o.CompletionItemKind.Function:return"function";case o.CompletionItemKind.Constructor:return"constructor";case o.CompletionItemKind.Field:return"field";case o.CompletionItemKind.Variable:return"variable";case o.CompletionItemKind.Class:return"class";case o.CompletionItemKind.Interface:return"interface";case o.CompletionItemKind.Module:return"module";case o.CompletionItemKind.Property:return"property";case o.CompletionItemKind.Unit:return"unit";case o.CompletionItemKind.Value:return"value";case o.CompletionItemKind.Enum:return"enum";case o.CompletionItemKind.Keyword:return"keyword";case o.CompletionItemKind.Snippet:return"snippet";case o.CompletionItemKind.Text:return"text";case o.CompletionItemKind.Color:return"color";case o.CompletionItemKind.File:return"file";case o.CompletionItemKind.Reference:return"reference"}return"property"},to:function(e){return e?o.CompletionItemKind[e.charAt(0).toUpperCase()+e.substr(1)]:o.CompletionItemKind.Property}},n.Suggest={from:function(e){var t={label:e.label,codeSnippet:e.insertText||e.label,type:n.CompletionItemKind.from(e.kind),typeLabel:e.detail,documentationLabel:e.documentation,sortText:e.sortText,filterText:e.filterText};return t},to:function(e,t,r){var i=new o.CompletionItem(r.label);i.insertText=r.codeSnippet,i.kind=n.CompletionItemKind.to(r.type),i.detail=r.typeLabel,i.documentation=r.documentationLabel,i.sortText=r.sortText,i.filterText=r.filterText;var a="number"==typeof r.overwriteBefore?r.overwriteBefore:e.currentWord.length,u=new o.Position(t.line,Math.max(0,t.character-a)),m=t;return"number"==typeof r.overwriteAfter&&(m=new o.Position(t.line,t.character+r.overwriteAfter)),i.textEdit=o.TextEdit.replace(new o.Range(u,m),r.codeSnippet),i}};var x;!function(e){function n(e){return e}function t(e){return e}e.from=n,e.to=t}(x=n.SignatureHelp||(n.SignatureHelp={}));var E;!function(e){function n(e){return{range:c(e.range),url:e.target.toString()}}function t(e){return new o.DocumentLink(l(e.range),a["default"].parse(e.url))}e.from=n,e.to=t}(E=n.DocumentLink||(n.DocumentLink={}));var L;!function(e){function n(e){return e.registerCommand(i,function(n){var t=a[n];if(t)return e.executeCommand.apply(e,[t.command].concat(t.arguments))})}function t(e,n){if(e){var t={id:e.command,title:e.title};if(!r.isFalsyOrEmpty(e.arguments)){var o="delegate/"+u++ +"/for/"+e.command;t.id=i,t.arguments=[o],a[o]=e,n.push({dispose:function(){delete a[o]}})}return t}}function o(e){var n;if(e.id===i){var t=e.arguments[0];n=a[t]}return n||(n={command:e.id,title:e.title}),n}var i="_internal_delegate_command",a=Object.create(null),u=1;e.initialize=n,e.from=t,e.to=o}(L=n.Command||(n.Command={}))});
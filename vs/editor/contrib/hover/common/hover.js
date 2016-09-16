/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","vs/base/common/arrays","vs/base/common/errors","vs/base/common/winjs.base","vs/editor/common/editorCommonExtensions","vs/editor/common/modes","vs/base/common/async"],function(e,n,o,r,t,s,i,c){"use strict";function m(e,n){var s=i.HoverProviderRegistry.ordered(e),m=[],a=s.map(function(o,t){return c.asWinJsPromise(function(r){return o.provideHover(e,n,r)}).then(function(e){if(e){var n="undefined"!=typeof e.range,o="undefined"!=typeof e.contents&&e.contents&&e.contents.length>0;n&&o&&(m[t]=e)}},function(e){r.onUnexpectedError(e)})});return t.TPromise.join(a).then(function(){return o.coalesce(m)})}n.getHover=m,s.CommonEditorRegistry.registerDefaultLanguageCommand("_executeHoverProvider",m)});
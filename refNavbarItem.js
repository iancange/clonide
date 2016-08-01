/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Spiffcode, Inc. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", 'vs/platform/contextview/browser/contextView', 'vs/platform/instantiation/common/instantiation', 'githubService', 'vs/base/browser/ui/dropdown/dropdown', 'vs/base/common/actions', 'vs/base/common/winjs.base'], function (require, exports, contextView_1, instantiation_1, githubService_1, dropdown_1, actions_1, winjs_base_1) {
    'use strict';
    var RefNavbarItem = (function () {
        function RefNavbarItem(instantiationService, contextMenuService, githubService) {
            this.instantiationService = instantiationService;
            this.contextMenuService = contextMenuService;
            this.githubService = githubService;
        }
        RefNavbarItem.prototype.render = function (el) {
            var _this = this;
            var repo = this.githubService.github.getRepo(this.githubService.repoName);
            repo.listBranches(function (err, branches) {
                if (err)
                    return;
                _this._actions = [];
                var _loop_1 = function(branch) {
                    var action = new actions_1.Action('ref', branch, 'tight-menu-items', true, function (event) {
                        githubService_1.openRepository(_this.githubService.repoName, branch);
                        return winjs_base_1.TPromise.as(true);
                    });
                    _this._actions.push(action);
                };
                for (var _i = 0, branches_1 = branches; _i < branches_1.length; _i++) {
                    var branch = branches_1[_i];
                    _loop_1(branch);
                }
            });
            return this.instantiationService.createInstance(dropdown_1.DropdownMenu, el, {
                tick: true,
                label: this.githubService.ref,
                contextMenuProvider: this.contextMenuService,
                actionProvider: this
            });
        };
        // IActionProvider implementation
        RefNavbarItem.prototype.getActions = function () {
            if (this._actions)
                return this._actions;
            return [
                // TODO: string localization
                new actions_1.Action('loading', 'Loading...', '', true, function (event) {
                    return winjs_base_1.TPromise.as(true);
                }),
            ];
        };
        RefNavbarItem = __decorate([
            __param(0, instantiation_1.IInstantiationService),
            __param(1, contextView_1.IContextMenuService),
            __param(2, githubService_1.IGithubService)
        ], RefNavbarItem);
        return RefNavbarItem;
    }());
    exports.RefNavbarItem = RefNavbarItem;
});
//# sourceMappingURL=refNavbarItem.js.map
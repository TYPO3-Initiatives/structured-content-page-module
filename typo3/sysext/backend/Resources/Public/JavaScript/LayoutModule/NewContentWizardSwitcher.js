/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};define(["require","exports","jquery"],(function(t,e,a){"use strict";a=__importDefault(a);class n{static initialize(){const t=a.default('[data-module-name="web_layout"]');a.default(".t3js-new-content-wizard-switcher").on("click",()=>{t.toggleClass("new-content-wizard-expanded")});const e=a.default(".t3js-new-content-wizard-bar-container").attr("data-new-content-url");a.default(".t3js-new-content-wizard-bar-container").load(e,(function(){a.default(".t3js-new-content-wizard-bar-container .input-group-addon").remove(),a.default(".t3js-new-content-wizard-bar-container .t3js-contentWizard-search").addClass("form-control-sm"),a.default(".t3js-new-content-wizard-bar-container .t3js-tabmenu-item a").each((function(t,e){a.default(e).attr("data-bs-toggle","collapse"),a.default(e).attr("role","button"),0===t?a.default(e).attr("aria-expanded","true"):a.default(e).attr("aria-expanded","false"),a.default(".t3js-new-content-wizard-bar-container .tab-content .tab-pane:nth-of-type("+(t+1)+")").before(a.default(e).parent().html()),0===t?a.default(".t3js-new-content-wizard-bar-container .tab-content .tab-pane:nth-of-type("+(t+1)+")").attr("class","collapse show"):a.default(".t3js-new-content-wizard-bar-container .tab-content .tab-pane:nth-of-type("+(t+1)+")").attr("class","collapse")})),a.default(".t3js-new-content-wizard-bar-container .t3js-media-new-content-element-wizard").each((function(t,e){a.default(e).wrap('<div class="t3js-page-ce"></div>').wrap('<div class="t3-page-ce-dragitem"></div>').wrap('<div class="t3-page-ce-header-draggable t3js-page-ce-draghandle ui-draggable-handle"></div>')}))}))}}return a.default(n.initialize),new n}));
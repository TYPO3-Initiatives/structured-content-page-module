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
var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};define(["require","exports","jquery"],(function(t,e,n){"use strict";n=__importDefault(n);class a{static initialize(){const t=n.default('[data-module-name="web_layout"]');n.default(".t3js-new-content-wizard-switcher").on("click",()=>{t.toggleClass("new-content-wizard-expanded")});const e=n.default(".t3js-new-content-wizard-bar-container").attr("data-new-content-url");n.default(".t3js-new-content-wizard-bar-container").load(e,(function(){n.default(".t3js-new-content-wizard-bar-container .input-group-addon").remove(),n.default(".t3js-new-content-wizard-bar-container .t3js-contentWizard-search").addClass("form-control-sm")}))}}return n.default(a.initialize),new a}));
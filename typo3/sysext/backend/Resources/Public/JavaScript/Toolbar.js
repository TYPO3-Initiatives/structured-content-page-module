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
define(["require","exports","TYPO3/CMS/Core/DocumentService","TYPO3/CMS/Core/Event/RegularEvent"],(function(e,t,o,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class c{static initialize(){c.initializeEvents()}static initializeEvents(){new a("click",()=>{const e=document.querySelector(".scaffold");e.classList.remove("scaffold-modulemenu-expanded","scaffold-search-expanded"),e.classList.toggle("scaffold-toolbar-expanded")}).bindTo(document.querySelector(".scaffold-topbar .t3js-topbar-button-toolbar")),new a("click",()=>{const e=document.querySelector(".scaffold");e.classList.remove("scaffold-modulemenu-expanded","scaffold-toolbar-expanded"),e.classList.toggle("scaffold-search-expanded")}).bindTo(document.querySelector(".t3js-topbar-button-search"))}}o.ready().then(c.initialize)}));
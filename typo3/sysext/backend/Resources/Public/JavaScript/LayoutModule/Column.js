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
var __decorate=this&&this.__decorate||function(e,t,n,o){var r,a=arguments.length,l=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,o);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(l=(a<3?r(l):a>3?r(t,n,l):r(t,n))||l);return a>3&&l&&Object.defineProperty(t,n,l),l},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","lit-element","lit-html/directives/unsafe-html","TYPO3/CMS/Backend/Wizard/NewContentElement","TYPO3/CMS/Backend/Element/IconElement"],(function(e,t,n,o,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Column=void 0,r=__importDefault(r);let a=class extends n.LitElement{constructor(){super(),this.addEventListener("content-element:add",this._handleAddNewContent)}createRenderRoot(){return this}firstUpdated(e){this.contentElements.forEach(e=>e.column=this)}render(){return n.html`
      <div data-colpos="${this.colpos}" data-language-uid="${this.languageUid}"
        class="t3js-sortable t3js-sortable-lang t3js-sortable-lang-${this.languageUid} t3-page-ce-wrapper">
        ${o.unsafeHTML(this.innerHTML)}
      </div>
    `}_handleAddNewContent(e){e.stopPropagation(),r.default.wizard(e.detail.newContentUrl,"//TODO wizardTitle"),console.log(this,e)}};__decorate([n.property({type:String})],a.prototype,"colpos",void 0),__decorate([n.property({type:Number,attribute:"language-uid"})],a.prototype,"languageUid",void 0),__decorate([n.property({type:String})],a.prototype,"content",void 0),__decorate([n.queryAll("typo3-backend-content-element")],a.prototype,"contentElements",void 0),a=__decorate([n.customElement("typo3-backend-column")],a),t.Column=a}));
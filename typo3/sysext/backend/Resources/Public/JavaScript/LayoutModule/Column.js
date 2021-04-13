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
var __decorate=this&&this.__decorate||function(e,t,o,n){var r,l=arguments.length,a=l<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(a=(l<3?r(a):l>3?r(t,o,a):r(t,o))||a);return l>3&&a&&Object.defineProperty(t,o,a),a};define(["require","exports","lit-element","lit-html/directives/unsafe-html","TYPO3/CMS/Backend/Element/IconElement"],(function(e,t,o,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Column=void 0;let r=class extends o.LitElement{createRenderRoot(){return this}firstUpdated(e){console.log(this.contentElements),this.contentElements.forEach(e=>e.column=this)}render(){return o.html`
      <div data-colpos="${this.colpos}" data-language-uid="${this.languageUid}"
        class="t3js-sortable t3js-sortable-lang t3js-sortable-lang-${this.languageUid} t3-page-ce-wrapper">
        ${n.unsafeHTML(this.innerHTML)}
      </div>
    `}};__decorate([o.property({type:String})],r.prototype,"colpos",void 0),__decorate([o.property({type:Number,attribute:"language-uid"})],r.prototype,"languageUid",void 0),__decorate([o.property({type:String})],r.prototype,"content",void 0),__decorate([o.queryAll("typo3-backend-content-element")],r.prototype,"contentElements",void 0),r=__decorate([o.customElement("typo3-backend-column")],r),t.Column=r}));
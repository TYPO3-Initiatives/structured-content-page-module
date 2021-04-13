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
var __decorate=this&&this.__decorate||function(e,t,o,r){var n,l=arguments.length,a=l<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(a=(l<3?n(a):l>3?n(t,o,a):n(t,o))||a);return l>3&&a&&Object.defineProperty(t,o,a),a};define(["require","exports","lit-element","lit-html/directives/unsafe-html","TYPO3/CMS/Backend/Element/IconElement"],(function(e,t,o,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Column=void 0;let n=class extends o.LitElement{createRenderRoot(){return this}render(){return console.log(this.contentElements),o.html`
      <div data-colpos="${this.colpos}" data-language-uid="${this.languageUid}"
        class="t3js-sortable t3js-sortable-lang t3js-sortable-lang-${this.languageUid} t3-page-ce-wrapper">
        ${r.unsafeHTML(this.innerHTML)}
      </div>
    `}};__decorate([o.property({type:String})],n.prototype,"colpos",void 0),__decorate([o.property({type:Number,attribute:"language-uid"})],n.prototype,"languageUid",void 0),__decorate([o.property({type:String})],n.prototype,"content",void 0),__decorate([o.queryAll("typo3-backend-content-element")],n.prototype,"contentElements",void 0),n=__decorate([o.customElement("typo3-backend-column")],n),t.Column=n}));
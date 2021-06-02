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
var __decorate=this&&this.__decorate||function(e,t,o,n){var r,l=arguments.length,a=l<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(l<3?r(a):l>3?r(t,o,a):r(t,o))||a);return l>3&&a&&Object.defineProperty(t,o,a),a},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","lit-element","TYPO3/CMS/Backend/Wizard/NewContentElement","TYPO3/CMS/Backend/Element/IconElement"],(function(e,t,o,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Column=void 0,n=__importDefault(n);let r=class extends o.LitElement{constructor(){super(),this.addEventListener("content-element:add",this._handleAddNewContent)}firstUpdated(e){this.contentElements.forEach(e=>e.column=this)}render(){return o.html`
      <!-- TODO: this is just a quick enabler for now -->
      <link rel="stylesheet" type="text/css" href="/typo3/sysext/backend/Resources/Public/Css/backend.css" >

      <div data-colpos="${this.colpos}" data-language-uid="${this.languageUid}"
        class="t3js-sortable t3js-sortable-lang t3js-sortable-lang-${this.languageUid} t3-page-ce-wrapper">
        <slot></slot>
      </div>
    `}_handleAddNewContent(e){e.stopPropagation(),n.default.wizard(e.detail.newContentUrl,TYPO3.lang.newContentElement),console.log(this,e)}};__decorate([o.property({type:String})],r.prototype,"colpos",void 0),__decorate([o.property({type:Number,attribute:"language-uid"})],r.prototype,"languageUid",void 0),__decorate([o.property({type:String})],r.prototype,"content",void 0),__decorate([o.queryAll("typo3-backend-content-element")],r.prototype,"contentElements",void 0),r=__decorate([o.customElement("typo3-backend-column")],r),t.Column=r}));
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
var __decorate=this&&this.__decorate||function(e,t,o,n){var r,c=arguments.length,d=c<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(e,t,o,n);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(d=(c<3?r(d):c>3?r(t,o,d):r(t,o))||d);return c>3&&d&&Object.defineProperty(t,o,d),d};define(["require","exports","lit-element","lit-html/directives/unsafe-html","TYPO3/CMS/Backend/Element/IconElement"],(function(e,t,o,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ContentElement=void 0;let r=class extends o.LitElement{static get styles(){return o.css`
      :host {
        display: block;
        border: 1px solid var(--typo3-border-color, #ccc);
        padding: 2em;
      }

      :host([disabled]) {
        border: 1px dashed var(--typo3-border-color, #ccc);
      }
    `}render(){return o.html`
      <div class="content-element">
        <h2>${this.header}</h2>
        ${n.unsafeHTML(this.content)}

        <typo3-backend-icon @click=${()=>this.dispatchEvent(new CustomEvent("content-element:add"))} identifier="actions-add" size="small"></typo3-backend-icon>
      </div>
    `}};__decorate([o.property({type:String})],r.prototype,"type",void 0),__decorate([o.property({type:String})],r.prototype,"header",void 0),__decorate([o.property({type:String})],r.prototype,"content",void 0),r=__decorate([o.customElement("typo3-backend-content-element")],r),t.ContentElement=r}));
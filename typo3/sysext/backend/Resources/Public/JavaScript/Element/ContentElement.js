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
var __decorate=this&&this.__decorate||function(e,t,r,o){var a,i=arguments.length,p=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(e,t,r,o);else for(var d=e.length-1;d>=0;d--)(a=e[d])&&(p=(i<3?a(p):i>3?a(t,r,p):a(t,r))||p);return i>3&&p&&Object.defineProperty(t,r,p),p};define(["require","exports","lit-element","lit-html/directives/style-map","lit-html/directives/unsafe-html","TYPO3/CMS/Backend/Element/IconElement"],(function(e,t,r,o,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ContentElement=void 0;let i=class extends r.LitElement{createRenderRoot(){return this}render(){const e={display:this.show?"block":"none"};return r.html`
      <div class="t3-page-ce ${this.wrapperClassName} t3js-page-ce t3js-page-ce-sortable"
        id="element-tt_content-${this.uid}" data-table="tt_content" data-uid="${this.uid}"
        data-language-uid="${this.languageUid}" style=${o.styleMap(e)}
      >
        <div class="t3-page-ce-dragitem" id="${this.uniqueId}">
          ${a.unsafeHTML(JSON.parse(this.header))}
          <div class="t3-page-ce-body">
            <div class="t3-page-ce-body-inner">
              <div class="${this.versioned?"ver-element":""}">
                ${a.unsafeHTML(this.innerHTML)}
              </div>
            </div>
            ${a.unsafeHTML(JSON.parse(this.footer))}
          </div>
        </div>
      </div>
    `}};__decorate([r.property({type:String})],i.prototype,"header",void 0),__decorate([r.property({type:String})],i.prototype,"footer",void 0),__decorate([r.property({type:Array})],i.prototype,"actions",void 0),__decorate([r.property({type:String,attribute:"wrapper-class-name"})],i.prototype,"wrapperClassName",void 0),__decorate([r.property({type:String})],i.prototype,"table",void 0),__decorate([r.property({type:Number})],i.prototype,"uid",void 0),__decorate([r.property({type:Number,attribute:"language-uid"})],i.prototype,"languageUid",void 0),__decorate([r.property({type:Number,attribute:"unique-uid"})],i.prototype,"uniqueId",void 0),__decorate([r.property({type:Boolean})],i.prototype,"disabled",void 0),__decorate([r.property({type:Boolean})],i.prototype,"show",void 0),__decorate([r.property({type:Boolean})],i.prototype,"versioned",void 0),i=__decorate([r.customElement("typo3-backend-content-element")],i),t.ContentElement=i}));
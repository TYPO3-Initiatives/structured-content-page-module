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
var __decorate=this&&this.__decorate||function(e,t,r,o){var p,a=arguments.length,i=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,o);else for(var d=e.length-1;d>=0;d--)(p=e[d])&&(i=(a<3?p(i):a>3?p(t,r,i):p(t,r))||i);return a>3&&i&&Object.defineProperty(t,r,i),i};define(["require","exports","lit-element","lit-html/directives/unsafe-html","TYPO3/CMS/Backend/Element/IconElement"],(function(e,t,r,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ContentElement=void 0;let p=class extends r.LitElement{createRenderRoot(){return this}render(){this.show;return r.html`
      <div class="t3-page-ce ${this.wrapperClassName} t3js-page-ce t3js-page-ce-sortable"
        id="element-tt_content-${this.uid}" data-table="tt_content" data-uid="${this.uid}"
        data-language-uid="${this.languageUid}" style=$(styleMap(styles)
      >
        <div class="t3-page-ce-dragitem" id="${this.uniqueId}">
          ${o.unsafeHTML(JSON.parse(this.header))}
          <div class="t3-page-ce-body">
            <div class="t3-page-ce-body-inner">
              <div class="${this.versioned?"ver-element":""}">
                ${o.unsafeHTML(JSON.parse(this.content))}
              </div>
            </div>
            ${o.unsafeHTML(JSON.parse(this.footer))}
          </div>
        </div>
      </div>
    `}};__decorate([r.property({type:String})],p.prototype,"header",void 0),__decorate([r.property({type:String})],p.prototype,"content",void 0),__decorate([r.property({type:String})],p.prototype,"footer",void 0),__decorate([r.property({type:Array})],p.prototype,"actions",void 0),__decorate([r.property({type:String,attribute:"wrapper-class-name"})],p.prototype,"wrapperClassName",void 0),__decorate([r.property({type:String})],p.prototype,"table",void 0),__decorate([r.property({type:Number})],p.prototype,"uid",void 0),__decorate([r.property({type:Number,attribute:"language-uid"})],p.prototype,"languageUid",void 0),__decorate([r.property({type:Number,attribute:"unique-uid"})],p.prototype,"uniqueId",void 0),__decorate([r.property({type:Boolean})],p.prototype,"disabled",void 0),__decorate([r.property({type:Boolean})],p.prototype,"show",void 0),__decorate([r.property({type:Boolean})],p.prototype,"versioned",void 0),p=__decorate([r.customElement("typo3-backend-content-element")],p),t.ContentElement=p}));
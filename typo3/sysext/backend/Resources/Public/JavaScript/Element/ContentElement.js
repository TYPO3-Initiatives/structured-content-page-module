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
var __decorate=this&&this.__decorate||function(e,t,o,n){var d,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var r=e.length-1;r>=0;r--)(d=e[r])&&(a=(i<3?d(a):i>3?d(t,o,a):d(t,o))||a);return i>3&&a&&Object.defineProperty(t,o,a),a};define(["require","exports","lit-element","lit-html/directives/style-map","lit-html/directives/unsafe-html","TYPO3/CMS/Backend/Utility/CEPosition","TYPO3/CMS/Backend/Element/IconElement"],(function(e,t,o,n,d,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ContentElement=void 0;let a=class extends o.LitElement{constructor(){super(...arguments),this.isAddContentModeEnabled=!1}async firstUpdated(){await new Promise(e=>setTimeout(e,0)),console.log(this.toggleAddContentModeBtn),this.toggleAddContentModeBtn.addEventListener("click",this._handleToggleAddContentModeBtn.bind(this))}createRenderRoot(){return this}render(){const e={display:this.show?"block":"none"};return o.html`
      <div class="t3-page-ce ${this.wrapperClassName} t3js-page-ce t3js-page-ce-sortable"
        id="element-tt_content-${this.uid}" data-table="tt_content" data-uid="${this.uid}"
        data-language-uid="${this.languageUid}" style=${n.styleMap(e)}
      >

        <button class="btn btn-default btn-borderless t3-page-ce-add t3-page-ce-add-rowabove" hidden
          @click="${e=>this._handleAddNewContent(e,i.CEPosition.RowAbove)}">
            <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-borderless t3-page-ce-add t3-page-ce-add-above" ?hidden="${!this.isAddContentModeEnabled}"
          @click="${e=>this._handleAddNewContent(e,i.CEPosition.Above)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-borderless t3-page-ce-add t3-page-ce-add-left" ?hidden="${!this.isAddContentModeEnabled}"
          @click="${e=>this._handleAddNewContent(e,i.CEPosition.Left)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-borderless t3-page-ce-add t3-page-ce-add-right" ?hidden="${!this.isAddContentModeEnabled}"
          @click="${e=>this._handleAddNewContent(e,i.CEPosition.Right)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-borderless t3-page-ce-add t3-page-ce-add-below" ?hidden="${!this.isAddContentModeEnabled}"
          @click="${e=>this._handleAddNewContent(e,i.CEPosition.Below)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-borderless t3-page-ce-add t3-page-ce-add-rowbelow" hidden
          @click="${e=>this._handleAddNewContent(e,i.CEPosition.RowAbove)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <div class="t3-page-ce-dragitem" id="${this.uniqueId}">
          ${d.unsafeHTML(JSON.parse(this.header))}
          <div class="t3-page-ce-body">
            <div class="t3-page-ce-body-inner">
              <div class="${this.versioned?"ver-element":""}">
                ${d.unsafeHTML(JSON.parse(this.content))}
              </div>
            </div>
            ${d.unsafeHTML(JSON.parse(this.footer))}
          </div>
        </div>
      </div>
    `}_handleAddNewContent(e,t){e.preventDefault(),this.dispatchEvent(new CustomEvent("content-element:add",{detail:{position:t,contentElementUid:this.uid,newContentUrl:this.newContentUrl},bubbles:!0,composed:!0}))}_handleToggleAddContentModeBtn(e){e.preventDefault(),this.isAddContentModeEnabled=!this.isAddContentModeEnabled,document.querySelectorAll("typo3-backend-content-element").forEach(e=>{e!==this&&(e.isAddContentModeEnabled=!1)})}};__decorate([o.property({type:String})],a.prototype,"header",void 0),__decorate([o.property({type:String})],a.prototype,"footer",void 0),__decorate([o.property({type:String})],a.prototype,"content",void 0),__decorate([o.property({type:Array})],a.prototype,"actions",void 0),__decorate([o.property({type:String,attribute:"wrapper-class-name"})],a.prototype,"wrapperClassName",void 0),__decorate([o.property({type:String})],a.prototype,"table",void 0),__decorate([o.property({type:Number})],a.prototype,"uid",void 0),__decorate([o.property({type:Number,attribute:"language-uid"})],a.prototype,"languageUid",void 0),__decorate([o.property({type:Number,attribute:"unique-uid"})],a.prototype,"uniqueId",void 0),__decorate([o.property({type:String,attribute:"new-content-url"})],a.prototype,"newContentUrl",void 0),__decorate([o.property({type:Boolean})],a.prototype,"disabled",void 0),__decorate([o.property({type:Boolean})],a.prototype,"show",void 0),__decorate([o.property({type:Boolean})],a.prototype,"versioned",void 0),__decorate([o.property({type:Boolean})],a.prototype,"isAddContentModeEnabled",void 0),__decorate([o.query("[data-t3-ce-toggle-add-content-mode-btn]")],a.prototype,"toggleAddContentModeBtn",void 0),a=__decorate([o.customElement("typo3-backend-content-element")],a),t.ContentElement=a}));
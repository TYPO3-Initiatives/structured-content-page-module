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
var __decorate=this&&this.__decorate||function(e,t,n,o){var d,i=arguments.length,a=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var c=e.length-1;c>=0;c--)(d=e[c])&&(a=(i<3?d(a):i>3?d(t,n,a):d(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a};define(["require","exports","lit-element","lit-html/directives/style-map","TYPO3/CMS/Backend/Utility/CEPosition","TYPO3/CMS/Backend/Element/IconElement"],(function(e,t,n,o,d){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ContentElement=void 0;let i=class extends n.LitElement{constructor(){super(...arguments),this.isAddContentModeEnabled=!1}async firstUpdated(){await new Promise(e=>setTimeout(e,0)),console.log(this.toggleAddContentModeBtn),this.toggleAddContentModeBtn.addEventListener("click",this._handleToggleAddContentModeBtn.bind(this))}render(){const e={display:this.show?"block":"none"};return n.html`
      <!-- TODO: this is just a quick enabler for now -->
      <link rel="stylesheet" type="text/css" href="/typo3/sysext/backend/Resources/Public/Css/backend.css" >

      <div class="t3-page-ce ${this.wrapperClassName} t3js-page-ce t3js-page-ce-sortable"
        id="element-tt_content-${this.uid}" data-table="tt_content" data-uid="${this.uid}"
        data-language-uid="${this.languageUid}" style=${o.styleMap(e)}
      >

        <button class="btn btn-default btn-fab t3-page-ce-add t3-page-ce-add-rowabove" hidden
          @click="${e=>this._handleAddNewContent(e,d.CEPosition.RowAbove)}">
            <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-fab t3-page-ce-add t3-page-ce-add-above" ?hidden="${!this.isAddContentModeEnabled}"
          @click="${e=>this._handleAddNewContent(e,d.CEPosition.Above)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-fab t3-page-ce-add t3-page-ce-add-left" ?hidden="${!this.isAddContentModeEnabled}"
          @click="${e=>this._handleAddNewContent(e,d.CEPosition.Left)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-fab t3-page-ce-add t3-page-ce-add-right" ?hidden="${!this.isAddContentModeEnabled}"
          @click="${e=>this._handleAddNewContent(e,d.CEPosition.Right)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-fab t3-page-ce-add t3-page-ce-add-below" ?hidden="${!this.isAddContentModeEnabled}"
          @click="${e=>this._handleAddNewContent(e,d.CEPosition.Below)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-fab t3-page-ce-add t3-page-ce-add-rowbelow" hidden
          @click="${e=>this._handleAddNewContent(e,d.CEPosition.RowAbove)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <div class="t3-page-ce-dragitem" id="${this.uniqueId}">
          <slot name="header"></slot>
          <div class="t3-page-ce-body">
            <div class="t3-page-ce-body-inner">
              <div class="${this.versioned?"ver-element":""}">
                <slot name="content"></slot>
              </div>
            </div>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `}_handleAddNewContent(e,t){e.preventDefault(),this.dispatchEvent(new CustomEvent("content-element:add",{detail:{position:t,contentElementUid:this.uid,newContentUrl:this.newContentUrl},bubbles:!0,composed:!0}))}_handleToggleAddContentModeBtn(e){e.preventDefault(),this.isAddContentModeEnabled=!this.isAddContentModeEnabled,document.querySelectorAll("typo3-backend-content-element").forEach(e=>{e!==this&&(e.isAddContentModeEnabled=!1)})}};__decorate([n.property({type:Array})],i.prototype,"actions",void 0),__decorate([n.property({type:String,attribute:"wrapper-class-name"})],i.prototype,"wrapperClassName",void 0),__decorate([n.property({type:String})],i.prototype,"table",void 0),__decorate([n.property({type:Number})],i.prototype,"uid",void 0),__decorate([n.property({type:Number,attribute:"language-uid"})],i.prototype,"languageUid",void 0),__decorate([n.property({type:String,attribute:"unique-id"})],i.prototype,"uniqueId",void 0),__decorate([n.property({type:String,attribute:"new-content-url"})],i.prototype,"newContentUrl",void 0),__decorate([n.property({type:Boolean})],i.prototype,"disabled",void 0),__decorate([n.property({type:Boolean})],i.prototype,"show",void 0),__decorate([n.property({type:Boolean})],i.prototype,"versioned",void 0),__decorate([n.property({type:Boolean})],i.prototype,"isAddContentModeEnabled",void 0),__decorate([n.query("[data-t3-ce-toggle-add-content-mode-btn]")],i.prototype,"toggleAddContentModeBtn",void 0),i=__decorate([n.customElement("typo3-backend-content-element")],i),t.ContentElement=i}));
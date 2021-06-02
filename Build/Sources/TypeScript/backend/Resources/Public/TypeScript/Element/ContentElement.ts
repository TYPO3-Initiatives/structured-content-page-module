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

import {html, css, customElement, property, LitElement, TemplateResult, CSSResult, query} from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map';
import {classMap} from 'lit-html/directives/class-map';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
import 'TYPO3/CMS/Backend/Element/IconElement';
import {Column} from 'TYPO3/CMS/Backend/LayoutModule/Column';
import {CEPosition} from 'TYPO3/CMS/Backend/Utility/CEPosition';


/**
 * Module: TYPO3/CMS/Backend/Element/ContentElement
 *
 * @example
 * <typo3-backend-content-element content="…">
 * </typo3-backend-content-element>
 *
 * This is based on W3C custom elements ("web components") specification, see
 * https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
 */
@customElement('typo3-backend-content-element')
export class ContentElement extends LitElement {
  @property({type: String}) header: string;
  @property({type: String}) footer: string;
  @property({type: String}) content: string;
  @property({type: Array}) actions: Array<any>;
  @property({type: String, attribute: 'wrapper-class-name'}) wrapperClassName: string;
  @property({type: String}) table: string;
  @property({type: Number}) uid: string;
  @property({type: Number, attribute: 'language-uid'}) languageUid: string;
  @property({type: String, attribute: 'unique-id'}) uniqueId: string;
  @property({type: String, attribute: 'new-content-url'}) newContentUrl: string;
  @property({type: Boolean}) disabled: string;
  @property({type: Boolean}) show: string;
  @property({type: Boolean}) versioned: string;
  @property({type: Boolean}) isAddContentModeEnabled: boolean = false;

  @query('[data-t3-ce-toggle-add-content-mode-btn]') toggleAddContentModeBtn: HTMLButtonElement;

  public column: Column;

  async firstUpdated() {
    await new Promise((r) => setTimeout(r, 0));
    console.log(this.toggleAddContentModeBtn)

    this.toggleAddContentModeBtn.addEventListener('click', this._handleToggleAddContentModeBtn.bind(this));
  }

  // disable shadow dom for now
  public createRenderRoot(): HTMLElement | ShadowRoot {
    return this;
  }

  public render(): TemplateResult {
    const styles = {
      display: this.show? 'block': 'none'
    };

    return html`
      <!-- TODO: this is just a quick enabler for now -->
      <link rel="stylesheet" type="text/css" href="/typo3/sysext/backend/Resources/Public/Css/backend.css" >

      <div class="t3-page-ce ${this.wrapperClassName} t3js-page-ce t3js-page-ce-sortable"
        id="element-tt_content-${this.uid}" data-table="tt_content" data-uid="${this.uid}"
        data-language-uid="${this.languageUid}" style=${styleMap(styles)}
      >

        <button class="btn btn-default btn-fab t3-page-ce-add t3-page-ce-add-rowabove" hidden
          @click="${(event: Event) => this._handleAddNewContent(event, CEPosition.RowAbove)}">
            <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-fab t3-page-ce-add t3-page-ce-add-above" ?hidden="${!this.isAddContentModeEnabled}"
          @click="${(event: Event) => this._handleAddNewContent(event, CEPosition.Above)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-fab t3-page-ce-add t3-page-ce-add-left" ?hidden="${!this.isAddContentModeEnabled}"
          @click="${(event: Event) => this._handleAddNewContent(event, CEPosition.Left)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-fab t3-page-ce-add t3-page-ce-add-right" ?hidden="${!this.isAddContentModeEnabled}"
          @click="${(event: Event) => this._handleAddNewContent(event, CEPosition.Right)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-fab t3-page-ce-add t3-page-ce-add-below" ?hidden="${!this.isAddContentModeEnabled}"
          @click="${(event: Event) => this._handleAddNewContent(event, CEPosition.Below)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <button class="btn btn-default btn-fab t3-page-ce-add t3-page-ce-add-rowbelow" hidden
          @click="${(event: Event) => this._handleAddNewContent(event, CEPosition.RowAbove)}">
          <typo3-backend-icon identifier="actions-add"></typo3-backend-icon>
        </button>
        <div class="t3-page-ce-dragitem" id="${this.uniqueId}">
          ${unsafeHTML(JSON.parse(this.header))}
          <div class="t3-page-ce-body">
            <div class="t3-page-ce-body-inner">
              <div class="${this.versioned ? 'ver-element': ''}">
                ${unsafeHTML(JSON.parse(this.content))}
              </div>
            </div>
            ${unsafeHTML(JSON.parse(this.footer))}
          </div>
        </div>
      </div>
    `;
  }

  private _handleAddNewContent(event: Event, position: CEPosition): void {
    event.preventDefault();

    this.dispatchEvent(
      new CustomEvent(
        'content-element:add',
        {
          detail: {
            position: position,
            contentElementUid: this.uid,
            newContentUrl: this.newContentUrl
          },
          bubbles: true,
          composed: true
        }
      )
    );
  }

  private _handleToggleAddContentModeBtn(event: Event): void {
    event.preventDefault()
    this.isAddContentModeEnabled = !this.isAddContentModeEnabled;

    document.querySelectorAll('typo3-backend-content-element').forEach(
      (e: ContentElement) => {
        if (e !== this) {
          e.isAddContentModeEnabled = false;
        }
      }
    )
  }
}

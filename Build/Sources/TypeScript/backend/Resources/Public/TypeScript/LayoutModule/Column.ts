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

import {html, css, customElement, property, LitElement, TemplateResult, CSSResult, queryAll} from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map';
import {classMap} from 'lit-html/directives/class-map';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
import 'TYPO3/CMS/Backend/Element/IconElement';
import {ContentElement} from 'TYPO3/CMS/Backend/Element/ContentElement';
import {CEPosition} from 'TYPO3/CMS/Backend/Utility/CEPosition';
import NewContentElement from 'TYPO3/CMS/Backend/Wizard/NewContentElement';

/**
 * Module: TYPO3/CMS/Backend/LayoutModule/Column
 *
 * @example
 * <typo3-backend-column content="…">
 * </typo3-backend-column>
 *
 * This is based on W3C custom elements ("web components") specification, see
 * https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
 */
@customElement('typo3-backend-column')
export class Column extends LitElement {
  @property({type: String}) colpos: string;
  @property({type: Number, attribute: 'language-uid'}) languageUid: string;
  @property({type: String}) content: string;

  @queryAll('typo3-backend-content-element') contentElements: ContentElement[];

  constructor() {
    super();
    this.addEventListener('content-element:add', this._handleAddNewContent);
  }

  // public static get styles(): CSSResult
  // {
  //   return css`
  //     :host {
  //       display: block;
  //       border: 1px solid var(--typo3-border-color);
  //       padding: 2em;
  //     }
  //
  //     :host([disabled]) {
  //       border: 1px dashed var(--typo3-border-color);
  //     }
  //   `;
  // }

  // disable shadow dom for now
  // public createRenderRoot(): HTMLElement | ShadowRoot {
  //   return this;
  // }

  public firstUpdated(changedProperties: Map<string, unknown> | Map<number, unknown> | Map<symbol, unknown>) {
    this.contentElements.forEach(
      (e: ContentElement) => (
        e.column = this
      )
    )
  }

  public render(): TemplateResult {
    return html`
      <!-- TODO: this is just a quick enabler for now -->
      <link rel="stylesheet" type="text/css" href="/typo3/sysext/backend/Resources/Public/Css/backend.css" >

      <div data-colpos="${this.colpos}" data-language-uid="${this.languageUid}"
        class="t3js-sortable t3js-sortable-lang t3js-sortable-lang-${this.languageUid} t3-page-ce-wrapper">
        <slot></slot>
      </div>
    `;
  }

  private _handleAddNewContent(event: CustomEvent): void {
    event.stopPropagation();

    NewContentElement.wizard(event.detail.newContentUrl, TYPO3.lang.newContentElement);

    console.log(this, event)
  }
}

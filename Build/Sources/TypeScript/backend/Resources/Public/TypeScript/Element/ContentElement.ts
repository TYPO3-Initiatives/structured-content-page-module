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

import {html, css, customElement, property, LitElement, TemplateResult, CSSResult} from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map';
import {classMap} from 'lit-html/directives/class-map';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
import 'TYPO3/CMS/Backend/Element/IconElement';

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
  @property({type: Array}) actions: Array<any>;
  @property({type: String, attribute: 'wrapper-class-name'}) wrapperClassName: string;
  @property({type: String}) table: string;
  @property({type: Number}) uid: string;
  @property({type: Number, attribute: 'language-uid'}) languageUid: string;
  @property({type: Number, attribute: 'unique-uid'}) uniqueId: string;
  @property({type: Boolean}) disabled: string;
  @property({type: Boolean}) show: string;
  @property({type: Boolean}) versioned: string;

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
  public createRenderRoot(): HTMLElement | ShadowRoot {
    return this;
  }

  public render(): TemplateResult {
    const styles = {
      display: this.show? 'block': 'none'
    }

    // <typo3-backend-icon @click=${() => this.dispatchEvent(new CustomEvent('content-element:add'))}
    //   identifier="actions-add" size="small"></typo3-backend-icon>
    // </div>
    return html`
      <div class="t3-page-ce ${this.wrapperClassName} t3js-page-ce t3js-page-ce-sortable"
        id="element-tt_content-${this.uid}" data-table="tt_content" data-uid="${this.uid}"
        data-language-uid="${this.languageUid}" style=${styleMap(styles)}
      >
        <div class="t3-page-ce-dragitem" id="${this.uniqueId}">
          ${unsafeHTML(JSON.parse(this.header))}
          <div class="t3-page-ce-body">
            <div class="t3-page-ce-body-inner">
              <div class="${this.versioned ? 'ver-element': ''}">
                ${unsafeHTML(this.innerHTML)}
              </div>
            </div>
            ${unsafeHTML(JSON.parse(this.footer))}
          </div>
        </div>
      </div>
    `;
  }
}

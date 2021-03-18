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
  @property({type: String}) type: string;
  @property({type: String}) header: string;
  @property({type: String}) content: string;

  public static get styles(): CSSResult
  {
    return css`
      :host {
        display: block;
        border: 1px solid var(--typo3-border-color, #ccc);
        padding: 2em;
      }

      :host([disabled]) {
        border: 1px dashed var(--typo3-border-color, #ccc);
      }
    `;
  }

  //public createRenderRoot(): HTMLElement | ShadowRoot {
  //  return this;
  //}

  public render(): TemplateResult {
    return html`
      <div class="content-element">
        <h2>${this.header}</h2>
        ${unsafeHTML(this.content)}

        <typo3-backend-icon @click=${() => this.dispatchEvent(new CustomEvent('content-element:add'))} identifier="actions-add" size="small"></typo3-backend-icon>
      </div>
    `;
  }
}

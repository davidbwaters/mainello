//
// component - page header
//

import {
  LitElement,
  html,
  css
} from 'lit'

import {
  customElement,
  property
} from 'lit/decorators.js'


declare global {
  interface HTMLElementTagNameMap {
    'c-page-header': PageHeader,
  }
}

@customElement('c-page-header')

export class PageHeader extends LitElement {

  static styles = css`
    :host {
      align-content: center;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 1fr;
      justify-content: center;
      min-height: 80vh;
      padding-left: 6.4vw;
      padding-right: 32vw;
      pointer-events: none;
    }

    :host(.u-text-align-center) {
      padding-right: 6.4vw;
    }

    :host(.u-height-120vh-min) {
      padding-bottom: 20vh;
    }

    .c-page-header__inner {
      justify-content: center;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 1fr;
      margin-left: auto;
      margin-right: auto;
      max-width: var(--wrapper-width);
      text-align: left;
      width: 100%;
    }

    ::slotted(*) {
      font-size: var(--font-size-normal);
      margin-bottom: var(--spacing-2);
      margin-top: var(--spacing-2);
      pointer-events: auto;
    }

    ::slotted([slot="subtitle"]),
    ::slotted([slot="single"])  {
      font-size: var(--font-size-display-0);
      line-height: var(--line-height-display-0);
    }
  `

  protected render():TemplateSpecification {

    return html`
      <div class='c-page-header__inner'>

        <slot name="single"></slot>
        <slot></slot>
        <slot name="subtitle"></slot>
      </div>
    `

  }

}

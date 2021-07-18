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
      display: block;
      border-bottom: solid 1px var(--color-gray);
    }

    .c-page-header__inner {
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: var(--wrapper-width);
      padding-bottom: calc(var(--spacing-8) + 5vh + 4.5rem);
      padding-left: 6.2vw;
      padding-right: 6.2vw;
      padding-top: calc(var(--spacing-8) + 5vh + 4.5rem);
    }

    ::slotted(*) {
      font-size: var(--font-size-large-4);
      margin-bottom: 0;
      margin-top: 0;
    }

    ::slotted([slot="subtitle"]) {
      font-size: var(--font-size-large-2);
    }
  `


  @property({
    type: String,
    attribute: true
  })
  link:string

  protected render():TemplateSpecification {

    return html`
      <div class='c-page-header__inner'>
        <slot></slot>
        <slot name="subtitle"></slot>
      </div>
    `

  }

}

//
// component - button
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
      margin-left: auto;
      margin-right: auto;
      margin-top: 5rem;
      max-width: var(--wrapper-width);
      padding-bottom: calc(var(--spacing-8) + 5vh);
      padding-left: 6.2vw;
      padding-right: 6.2vw;
      padding-top: calc(var(--spacing-8) + 5vh);
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

  protected render(): TemplateSpecification {

    return html`
      <slot></slot>
      <slot name="subtitle"></slot>
    `

  }

}

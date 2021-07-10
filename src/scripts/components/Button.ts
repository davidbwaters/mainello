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
  queryAssignedNodes
} from 'lit/decorators.js'


declare global {
  interface HTMLElementTagNameMap {
    'c-button': Button,
  }
}

@customElement('c-button')

export class Button extends LitElement {

  static styles = css`
    ::slotted(a) {
      border: solid 1px currentColor;
      color: inherit;
      cursor: pointer;
      display: inline-block;
      font-family: var(--font-mono);
      font-size: var(--font-size-mono-normal);
      padding:
        var(--spacing-2);
      text-decoration: none;
      transition: all .4s;
    }

    ::slotted(a:hover) {
      background-color: var(--color-eerie-black);
      border-color: var(--color-eerie-black);
      color: white !important;
    }

    ::slotted(a:hover) {
      color: inherit;
    }

    ::slotted([large]) {
      padding: var(--spacing-3);
    }

    ::slotted([small]) {
      font-size: var(--font-size-mono-small);
      padding: var(--spacing-1);
    }
  `

  firstUpdated() {

    if (this.hasAttribute('small')) {

      this.querySelector('a').setAttribute(
        'small', ''
      )

    }

    if (this.hasAttribute('large')) {

      this.querySelector('a').setAttribute(
        'large', ''
      )

    }


  }

  protected render(): TemplateSpecification {

    return html`
      <slot></slot>
    `

  }

}

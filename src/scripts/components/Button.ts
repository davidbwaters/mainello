//
// component - button
//

import {
  LitElement,
  html,
  css
} from 'lit'

import {
  customElement
} from 'lit/decorators.js'


declare global {
  interface HTMLElementTagNameMap {
    'c-button': Button,
  }
}

@customElement('c-button')

export class Button extends LitElement {

  static styles = css`
    ::slotted(*) {
      border: solid 1px var(--color-opaque-dark-subtle);
      border-radius: 5rem;
      color: inherit;
      cursor: pointer;
      display: inline-block;
      font-family: var(--font-mono);
      font-size: var(--font-size-mono-normal);
      padding-bottom: 1em;
      padding-left: 1.4em;
      padding-right: 1.4em;
      padding-top: 1em;
      text-decoration: none;
      transition: all .4s;
    }

    ::slotted(*::selection) {
      background-color: transparent;
    }

    ::slotted(*:hover) {
      background-color: var(--color-eerie-black);
      border-color: var(--color-eerie-black);
      color: white !important;
    }

    ::slotted([large]) {
      font-size: var(--font-size-normal);
      padding-bottom: 1.1em;
      padding-left: 1.5em;
      padding-right: 1.5em;
      padding-top: 1.1em;
    }

    ::slotted([small]) {
      font-size: var(--font-size-mono-small);
      padding-bottom: 0.9em;
      padding-left: 1.2em;
      padding-right: 1.2em;
      padding-top: 0.9em;
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

  protected render():TemplateSpecification {

    return html`
      <slot></slot>
    `

  }

}

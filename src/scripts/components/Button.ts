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
    'c-button': Button,
  }
}

@customElement('c-button')

export class Button extends LitElement {

  static styles = css`
    :host {
      border: solid 1px currentColor;
      color: inherit;
      cursor: pointer;
      font-family: var(--font-mono);
      font-size: var(--font-size-mono-normal);
      padding:
        var(--spacing-2);
      text-decoration: none;
      transition: all .4s;
    }

    :host([large]) {
      padding: var(--spacing-3);
    }

    :host([small]) {
      font-size: var(--font-size-mono-small);
      padding: var(--spacing-1);
    }

    :host(:hover) {
      background-color: var(--color-eerie-black);
      border-color: var(--color-eerie-black);
      color: white;
    }

    :host a,
    :host a:visited {
      color: inherit;
      text-decoration: none;
    }
  `

  @property({
    type: String,
    attribute: true
  })
  link:string

  protected render(): TemplateSpecification {

    return html`
      <a href="${this.link}">
        <slot></slot>
      </a>
    `

  }

}

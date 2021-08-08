//
// component - button
//

import {
  LitElement,
  html,
  css
} from 'lit'

import {
  property,
  customElement
} from 'lit/decorators.js'


declare global {
  interface HTMLElementTagNameMap {
    'c-toggle': Toggle,
  }
}

@customElement('c-toggle')

export class Toggle extends LitElement {

  static styles = css`
    ::slotted(*) {
      border: solid 1px var(--color-opaque-dark);
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
    }

    ::slotted([small]) {
      font-size: var(--font-size-mono-small);
    }
  `

  @property({
    type: String,
    attribute: true
  })
  text:string

  @property({
    type: String,
    attribute: true
  })
  key:string

  protected createRenderRoot():Toggle {

    return this

  }

  protected render():TemplateSpecification {

    return html`

      <input
        type='checkbox'
        id='${this.key}'
        nane='${this.key}'
        class='c-toggle__input'
      >
      <label for=${this.key} class='c-toggle__label'>

        <div class='c-toggle__filler'></div>

        <span class='c-toggle__text'>

          <span class='c-toggle__text-inner'>
            ${this.text}
          </span>

        </span>

      </label>
    `

  }

}

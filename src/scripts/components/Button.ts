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
    'c-button': Button,
  }
}

@customElement('c-button')

export class Button extends LitElement {

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
  link:string


  @property({
    type: String,
    attribute: true
  })
  type:'button' | 'submit' | 'reset' | 'menu'


  firstUpdated():void {

    if (this.hasAttribute('small')) {

      this.querySelector('.c-button').classList.add(
        'c-button--small'
      )

    }

    if (this.hasAttribute('large')) {

      this.querySelector('.c-button').classList.add(
        'c-button--large'
      )

    }


  }

  protected render():TemplateSpecification {

    return html`

      ${this.link && !this.type

        ? html`
          <a class='c-button' href='${this.link}'>

            <div class='c-button__filler'></div>

            <span class='c-button__text'>

              <span class='c-button__text-inner'>
                ${this.text}
              </span>

            </span>

          </a>`
        : html`
          <button class='c-button' type='${this.type}'>

            <div class='c-button__filler'></div>

            <span class='c-button__text'>

              <span class='c-button__text-inner'>
                ${this.text}
              </span>

            </span>

          </button>`

      }

    `

  }


  protected createRenderRoot():Button {

    return this

  }

}

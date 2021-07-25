//
// component - section title
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
    'c-section-title': SectionTitle,
  }
}

@customElement('c-section-title')

export class SectionTitle extends LitElement {

  static styles = css`
    :host {
      border-top: solid var(--section-title-border) var(
        --color-opaque-dark-subtle
      );
      display: block;
      font-size: 10vw;
      padding-bottom: calc(10vh + 7.5vw);
      padding-top: calc(10vh + 7.5vw);
      text-align: center;
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 1px var(--color-eerie-black);
    }

    @media (min-width: 320px) {
      :host {
        font-size: 8vw;
      }
    }

    @media (min-width: 768px) {
      :host {
        font-size: 7vw;
        margin-top: calc(5vh + 3.75vw);
      }
    }
  `


  @property({
    type: String,
    attribute: true
  })
  text:string

  @property({
    type: Boolean,
    attribute: true
  })
  border:boolean

  connectedCallback():void {

    super.connectedCallback()

    this.border = JSON.parse(
      this.getAttribute('border')
    )

    if (this.border) {

      this.style.setProperty(
        '--section-title-border',
        '1px'
      )

    }
    else {

      this.style.setProperty(
        '--section-title-border',
        '0'
      )

    }

  }

  firstUpdated():void {

    if (this.text) {

      this.innerHTML = this.text

    }

  }

  protected render():TemplateSpecification {

    return html`
      <slot></slot>
    `

  }

}

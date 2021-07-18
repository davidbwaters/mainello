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
      border-top: 1px solid var(--color-platinum);
      display: block;
      font-size: 10vw;
      padding-bottom: calc(10vh + 5vw);
      padding-top: calc(10vh + 5vw);
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
        font-size: 6vw;
        margin-top: 20vw;
      }
    }
  `


  @property({
    type: String,
    attribute: true
  })
  text:string

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

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
    'c-section-title': SectionTitle,
  }
}

@customElement('c-section-title')

export class SectionTitle extends LitElement {

  static styles = css`
    :host {
      display: block;
      font-size: 10vw;
      padding-bottom: 20vh;
      padding-top: 20vh;
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
      }
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
    `

  }

}

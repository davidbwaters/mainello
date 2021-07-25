//
// component - offset columns
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
    'c-offset-columns': OffsetColumns,
  }
}

interface ComponentImage {
  'url': string,
  'title': string
}

@customElement('c-offset-columns')

export class OffsetColumns extends LitElement {

  static styles = css`
    :host {
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: 1fr;
      gap: 12.4vw 6.2vw;
      margin-bottom: calc(10vh + 5vw);
      margin-left: auto;
      margin-right: auto;
      margin-top: calc(10vh + 5vw);
      max-width: var(--wrapper-width);
      width: 87.6%;
    }


    @media (min-width: 768px) {

      :host {
        grid-template-columns: 1fr 1fr;
        margin-top: calc(10vh + 5vw + 30vh);
      }

    }

    ::slotted(*) {
      max-width: 100%;
    }

    @media (min-width: 768px) {

      ::slotted(*:nth-child(odd)) {
        margin-top: var(--offset-columns-odd);
      }

      ::slotted(*:nth-child(even)) {
        margin-top: var(--offset-columns-even);
      }

    }
  `

  @property({
    type: Array,
    attribute: true
  })
  items:Array<ComponentImage>


  @property({
    type: Boolean,
    attribute: true
  })
  reverse:boolean

  connectedCallback():void {

    super.connectedCallback()

    this.reverse = JSON.parse(
      this.getAttribute('reverse')
    )

    const offset = '-30vh'

    if (this.reverse) {

      this.style.setProperty(
        '--offset-columns-even',
        offset
      )

      this.style.setProperty(
        '--offset-columns-odd',
        '0'
      )

    }
    else {

      this.style.setProperty(
        '--offset-columns-even',
        '0'
      )

      this.style.setProperty(
        '--offset-columns-odd',
        offset
      )

    }

  }

  protected render():TemplateSpecification {

    return html`
      <slot></slot>
    `

  }

}

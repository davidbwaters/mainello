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
      display: block;
    }

    .c-offset-columns__inner {
      box-sizing: border-box;
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: 1fr;
      gap: 10vh 10vh;
      padding-bottom: calc(10vh + 5vw);
      margin-left: auto;
      margin-right: auto;
      padding-top: calc(10vh + 5vw);
      max-width: var(--wrapper-width);
      padding-left: 6.4vw;
      padding-right: 6.4vw;
    }


    @media (min-width: 768px) {

      .c-offset-columns__inner {
        grid-template-columns: 1fr 1fr;
        padding-top: calc(30vh);
      }

    }

    ::slotted(*) {
      max-width: 100%;
    }

    @media (min-width: 768px) {

      ::slotted(*:nth-child(odd)) {
        margin-bottom: calc(var(--offset-columns-odd) / -1);
        margin-top: var(--offset-columns-odd);

      }

      ::slotted(*:nth-child(even)) {
        margin-bottom: calc(var(--offset-columns-even) * -1);
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

    const offset = '-15vh'

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
      <div class='c-offset-columns__inner'>
        <slot></slot>
      </div>
    `

  }

}

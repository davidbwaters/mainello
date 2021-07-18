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
      grid-template-columns: 1fr 1fr;
      gap: 12.4vw 6.2vw;
      margin-bottom: calc(var(--spacing-9) * 2);
      margin-left: auto;
      margin-right: auto;
      margin-top: calc((var(--spacing-9) * 2) + 30vh);
      width: 87.6%;
    }

    :host > :nth-child(odd) {
      margin-top: -30vh;
    }

    :host([reverse=true]) > :nth-child(even) {
      margin-top: -30vh;
    }

    :host([reverse=true]) > :nth-child(odd) {
      margin-top: 0vh;
    }

    img {
      max-width: 100%;
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


  protected render():TemplateSpecification {

    return html`
      ${this.items.map(item =>

        html`
          <div class='c-offset-columns__image-wrapper'>
            <img
              class='c-offset-columns__image'
              src='${item.url}'
              alt='${item.title}'
            >
          </div>
        `

      )}
    `

  }

}

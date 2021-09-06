//
// component - featured image
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
    'c-blockquote': Blockquote,
  }
}

@customElement('c-blockquote')

export class Blockquote extends LitElement {

  static styles = css`
    :host {
      box-sizing: border-box;
      display: block;
      font-size: var(--font-size-normal);
      margin: auto;
      max-width: var(--wrapper-width);
      overflow: hidden;
      padding: 6.4vw 6.4vw;
    }

    .c-blockquote__quote {
      margin-bottom: var(--spacing-4);
    }

    .c-blockquote__quote-inner {
      color: var(--color-primary);
    }

    .c-blockquote__citation {
      text-align: right;
    }
  `

  @property({
    type: String,
    attribute: true
  })
  quote:string

  @property({
    type: String,
    attribute: true
  })
  citation:string

  protected render():TemplateSpecification {

    return html`
      <div
        class='c-blockquote__quote'
      >
        "<span class='c-blockquote__quote-inner'>
          ${this.quote}
        </span>"

      </div>
      <div class='c-blockquote__citation'>
        ${this.citation}
      </div>
    `

  }

}

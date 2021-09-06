//
// component - image text
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

import {
  unsafeHTML
} from 'lit/directives/unsafe-html'

declare global {
  interface HTMLElementTagNameMap {
    'c-image-text': ImageText,
  }
}

@customElement('c-image-text')

export class ImageText extends LitElement {

  static styles = css`
    :host {
      display: grid;
      gap: 6.2vw;
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr;
    }
    .c-article-heading {
      font-size: var(--font-size-large-3);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-3);
    }
    .c-article-subheading {
      font-size: var(--font-size-large-1);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-3);
    }
  `


  @property({
    type: String,
    attribute: true
  })
  heading:string

  @property({
    type: String,
    attribute: true
  })
  subheading:string

  @property({
    type: String,
    attribute: true
  })
  text:string

  @property({
    type: String,
    attribute: true
  })
  image:string

  @property ({
    type: Boolean,
    attribute: true
  })
  reverse: boolean

  protected render():TemplateSpecification {

    if (!this.reverse) {

      return html`
        <img src="%{this.image}">
        <article>
          <h3 class="c-article-heading">
            ${this.heading}
          </h3>
          <h4>${this.subheading}</h4>
          <div>
            ${unsafeHTML(this.text)}
          </div>
        </article>
      `

    }
    else {

      return html`
        <article>
          <h3 class="c-article-heading">
            ${this.heading}
          </h3>
          <h4>${this.subheading}</h4>
          <div>
            ${unsafeHTML(this.text)}
          </div>
        </article>
        <img src="%{this.image}">
      `

    }

  }

}

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
  text:string

  @property({
    type: String,
    attribute: true
  })
  image:string

  protected render():TemplateSpecification {

    return html`
      <img src="%{this.image}">
      <article>
        <h3 class="c-article-heading">
          ${this.heading}
        </h3>
        <div>
          ${unsafeHTML(this.text)}
        </div>
      </article>
    `

  }

}

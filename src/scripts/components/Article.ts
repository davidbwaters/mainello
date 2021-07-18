//
// component - article
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
    'c-article': Article,
  }
}

@customElement('c-article')

export class Article extends LitElement {

  static styles = css`
    :host {
      display: block;
      padding-bottom: 20vh;
      padding-top: 20vh;
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

  protected render():TemplateSpecification {

    return html`
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

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
      background-color: var(--color-main-background);
      border-bottom: var(--article-border) solid var(
        --color-opaque-dark-subtle
      );
      display: block;
    }

    .c-article__article {
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: var(--wrapper-width);
      padding-bottom: 20vh;
      padding-left: 6.4%;
      padding-right: 6.4%;
      padding-top: 20vh;
    }

    .c-article__heading {
      font-size: var(--font-size-large-3);
      font-weight: var(--font-weight-normal);
      margin-bottom: var(--spacing-6);
      margin-top: 0;
    }

    .c-article__text p {
      line-height: var(--line-height-normal-spaced);
      margin-bottom: 1.4em;
      margin-top: 0;
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
    type: Boolean,
    attribute: true
  })
  border:boolean

  connectedCallback() {

    super.connectedCallback()

    this.border = JSON.parse(
      this.getAttribute('border')
    )


    if (this.border) {

      this.style.setProperty(
        '--article-border',
        '1px'
      )

    }
    else {

      this.style.setProperty(
        '--article-border',
        '0'
      )

    }

  }
  protected render():TemplateSpecification {

    return html`
      <article class="c-article__article">
        <h3 class="c-article__heading">
          ${this.heading}
        </h3>
        <div class="c-article__text">
          ${unsafeHTML(this.text)}
        </div>
      </article>
    `

  }

}

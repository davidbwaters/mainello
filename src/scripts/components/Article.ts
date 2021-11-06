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
} from 'lit/directives/unsafe-html.js'

declare global {
  interface HTMLElementTagNameMap {
    'c-article': Article,
  }
}

@customElement('c-article')

export class Article extends LitElement {

  static styles = css`
    :host {
      align-content: center;
      background-color: var(--color-main-background);
      background-image: var(--article-background);
      background-repeat: no-repeat;
      background-size: cover;
      color: var(--article-color);
      border-bottom: var(--article-border) solid var(
        --color-opaque-dark-subtle
      );
      display: grid;
      min-height: 60vh;
    }

    @media (min-width: 768px) {

      :host(.c-article--split) article {
        display: grid;
        gap: var(--spacing-6);
        grid-template-columns: 1fr 1fr;
      }

    }

    .c-article__article {
      box-sizing: border-box;
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: var(--wrapper-width);
      padding-bottom: 20vh;
      padding-left: 6.4%;
      padding-right: 6.4%;
      padding-top: 20vh;
      width: 100%;
    }

    .c-article__heading {
      font-size: var(--font-size-large-5);
      font-weight: var(--font-weight-normal);
      line-height: var(--line-height-large-5);
      margin-bottom: var(--spacing-6);
      margin-top: 0;
    }

    .c-article__text p {
      line-height: var(--line-height-normal-spaced);
      margin-bottom: 1em;
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

  @property({
    type: Boolean,
    attribute: true
  })
  split:boolean

  @property({
    type: String,
    attribute: true
  })
  background:string

  @property({
    type: Boolean,
    attribute: true
  })
  textLight:boolean

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

    this.split = JSON.parse(this.getAttribute('split'))

    if (this.split) {

      this.classList.add('c-article--split')

    }

  }

  firstUpdated() {


    this.textLight = JSON.parse(
      this.getAttribute('text-light')
    )
    if (this['background']) {

      this.style.setProperty(
        '--article-background',
        'url(' + this['background'] + ')'
      )

      if (this.textLight) {

        this.style.setProperty(
          '--article-color',
          'white'
        )

      }

      this.border = JSON.parse(
        this.getAttribute('border')
      )

    }

  }

  protected render():TemplateSpecification {

    return html`
      <article class="c-article__article">
        ${
          this.heading === 'null'
            ? html``
            : html`
              <h3 class="c-article__heading">
                ${unsafeHTML(this.heading)}
              </h3>
            `
        }
        <div class="c-article__text">
          ${unsafeHTML(this.text
            .replace(/\\n/g, '')
            .replace(/"/g, ''))}
        </div>
      </article>
    `

  }

}

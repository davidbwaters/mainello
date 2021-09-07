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
      background-color: var(--color-main-background-shade-2);
      display: grid;
      gap: 6.2vw;
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr;
      padding-left: var(--spacing-8);
      padding-right: var(--spacing-8);
    }

    :host img {
      align-self: end;
      display: block;
      height: auto;
      mix-blend-mode: luminosity;
      width: 100%;
    }

    .c-article {
      margin-bottom: var(--spacing-8);
      margin-top: var(--spacing-8);
    }

    .c-article-heading {
      font-size: var(--font-size-large-3);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-1);
      margin-top: 0;
    }

    .c-article-subheading {
      font-size: var(--font-size-normal);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-6);
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


  firstUpdated():void {

    this.reverse = JSON.parse(this.getAttribute('reverse'))

  }

  protected render():TemplateSpecification {

    if (!this.reverse) {

      return html`
        <img src="${this.image}">
        <article class="c-article">
          <h3 class="c-article-heading">
            ${this.heading}
          </h3>
          <h4 class="c-article-subheading">
            ${this.subheading}
          </h4>
          <div>
            ${unsafeHTML(this.text)}
          </div>
        </article>
      `

    }
    else {

      return html`
        <article class="c-article">
          <h3 class="c-article-heading">
            ${this.heading}
          </h3>
          <h4 class="c-article-subheading">
            ${this.subheading}
          </h4>
          <div>
            ${unsafeHTML(this.text)}
          </div>
        </article>
        <img src="${this.image}">
      `

    }

  }

}

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
      grid-template-columns: 1fr;
      padding-bottom: var(--spacing-6);
      padding-left: var(--spacing-8);
      padding-top: var(--spacing-6);
      padding-right: var(--spacing-8);
    }



    @media (min-width: 768px) {
      :host {
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      }

    }



    .c-image-text__image {
      align-self: center;
      display: block;
      grid-row: 2 / span 1;
      height: auto;
      mix-blend-mode: luminosity;
      width: 100%;
    }

    @media (min-width: 768px) {

      .c-image-text__image {
        grid-row: 1 / span 1;
        height: auto;
        mix-blend-mode: luminosity;
        width: 100%;
      }

    }

    .c-image-text__article {
      align-self: center;
      display: block;
      grid-row: 1 / span 1;
      margin-bottom: var(--spacing-8);
      margin-top: var(--spacing-8);
    }

    :host(.c-image-text--reverse) .c-image-text__image {
      grid-column: 1 / span 1;
    }

    :host(.c-image-text--reverse) .c-image-text__article {
      grid-column: 1 / span 1
    }



    @media (min-width: 768px) {

      .c-image-text__image {
        grid-column: 4 / span 2;
      }

      .c-image-text__article {
        grid-column: 1 / span 3;
      }

      :host(.c-image-text--reverse) .c-image-text__image {
        grid-column: 1 / span 2;
      }

      :host(.c-image-text--reverse) .c-image-text__article {
        grid-column: 3 / span 3;
      }
    }


    .c-image-text__heading {
      font-size: var(--font-size-large-3);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-1);
      margin-top: 0;
    }

    .c-image-text__subheading {
      font-size: var(--font-size-normal);
      font-weight: var(--font-weight-semibold);
      margin-top: var(--spacing-1);
      margin-bottom: var(--spacing-6);
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

      this.classList.add('c-image-text--reverse')

      return html`
        <img  class='c-image-text__image' src="${this.image}">
        <article class="c-image-text__article">
          <h3 class="c-image-text__heading">
            ${this.heading}
          </h3>
          <h4 class="c-image-text__subheading">
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
        <article class="c-image-text__article">
          <h3 class="c-image-text__heading">
            ${this.heading}
          </h3>
          <h4 class="c-image-text__subheading">
            ${this.subheading}
          </h4>
          <div>
            ${unsafeHTML(this.text)}
          </div>
        </article>
        <img class='c-image-text__image' src="${this.image}">
      `

    }

  }

}

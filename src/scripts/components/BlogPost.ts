//
// component - blog post
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
    'c-blog-post': BlogPost,
  }
}

@customElement('c-blog-post')

export class BlogPost extends LitElement {

  static styles = css`
    :host {
      border-top: 1px solid var(--color-opaque-dark-subtle);
      display: block;
      list-style-type: none;
      padding-bottom: var(--spacing-8);
      padding-top: var(--spacing-8);
    }

    :host(:last-of-type) {
      margin-bottom: var(--spacing-8);
    }

    .c-blog-post__item,
    .c-blog-post__image-item {
      box-sizing: border-box;
      display: grid;
      gap: 6.2vw;
      margin: auto;
      max-width: var(--wrapper-width);
    }


    .c-blog-post__item {
      padding-left: 6.2vw;
      padding-right: 6.2vw;
    }

    @media (min-width: 768px) {

      .c-blog-post__item {
        border-bottom: solid 1px rgba(0,0,0,0.2);
        display: grid;
        gap: var(--spacing-6);
        grid-template-columns: 1fr 4fr;
      }

      .c-blog-post__image-item {
        display: grid;
        gap: var(--spacing-8);
        grid-template-columns: 2fr 4fr;
      }

    }

    .c-blog-post__item:last-child {
      border-bottom: none;
    }

    .c-blog-post__item-date {
      font-size: var(--font-size-small);
      margin-top: 0.9rem;
    }

    .c-blog-post__item-title {
      font-size: var(--font-size-large-3);
      font-weight: var(--font-weight-normal);
      margin-bottom: 0.8em;
      margin-top: 0;
    }

    .c-blog-post__item-text {
      margin-bottom: 1.5em;
    }

    .c-blog-post__featured-image {
      background-image: var(--blog-post-featured-image);
      background-position: center;
      background-size: cover;
      display: block;
      height: 100%;
      margin-bottom: 3em;
      min-height: 20vw;
    }

  `

  @property({
    type: String,
    attribute: true
  })
    date:string

  @property({
    type: String,
    attribute: true
  })
    name:string

  @property({
    type: String,
    attribute: true
  })
    text:string

  @property({
    type: String,
    attribute: true
  })
    content:string

  @property({
    type: String,
    attribute: true
  })
    slug:string

  @property({
    type: String,
    attribute: true
  })
    featuredImage:string

  firstUpdated() {

    this.style.setProperty(
      '--blog-post-featured-image',
      'url(' + this.featuredImage + ')'
    )

  }

  protected render():TemplateSpecification {

    return html`
      <div class="
      ${this.featuredImage && this.featuredImage.length
        ? `c-blog-post__image-item `
        : `c-blog-post__item `
      }">

        ${this.featuredImage && this.featuredImage.length
          ? html`
            <a class="c-blog-post__featured-image"></a>


            <div class="c-blog-post__item-preview">

              <div class="c-blog-post__item-date">
                ${this.date}
              </div>
              <h4 class="c-blog-post__item-title">
                ${this.name}
              </h4>
              <div class="c-blog-post__item-text">
                ${this.text}
              </div>
              <slot></slot>
            </div>

          `
          : html`

            <div class="c-blog-post__item-date">
              ${this.date}
            </div>

            <div class="c-blog-post__item-preview">
              <h4 class="c-blog-post__item-title">
                ${this.name}
              </h4>
              <div class="c-blog-post__item-text">
                ${this.text}
              </div>
              <slot></slot>
            </div>

          `
        }

      </div>
    `

  }

}

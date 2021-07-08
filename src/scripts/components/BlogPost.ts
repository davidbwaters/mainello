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
      border-top: 1px solid var(--color-platinum);
      display: block;
      list-style-type: none;
      padding-bottom: var(--spacing-6);
      padding-left: var(--spacing-5);
      padding-right: var(--spacing-5);
      padding-top: var(--spacing-5);
    }

    .c-blog-post__item {
      display: grid;
      gap: var(--spacing-6);
      grid-template-columns: auto 1fr;
      margin: auto;
      max-width: var(--wrapper-width);
    }

    @media (min-width: 768px) {

      .c-blog-post__item {
        border-bottom: solid 1px rgba(0,0,0,0.2);
        display: grid;
        gap: var(--spacing-6);
        grid-template-columns: 1fr 4fr;
      }

    }

    .c-blog-post__item:last-child {
      border-bottom: none;
    }

    .c-blog-post__item-date {
      font-size: var(--font-size-small);
      margin-top: 0.3rem;
    }

    .c-blog-post__item-title {
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-3);
      margin-top: 0;
    }

    .c-blog-post__item-text {
      margin-bottom: var(--spacing-4);
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

  protected render(): TemplateSpecification {

    return html`
      <div class="c-blog-post__item">
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
          <c-button link="/blog/${this.slug}" small>
            read more
          </c-button>
        </div>

      </div>
    `

  }

}

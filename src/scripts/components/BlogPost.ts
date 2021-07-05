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

import {
  unsafeHTML
} from 'lit/directives/unsafe-html'

import {
  createRef,
  ref
} from 'lit/directives/ref'


declare global {
  interface HTMLElementTagNameMap {
    'c-blog-post': BlogPost,
  }
}

@customElement('c-blog-post')

export class BlogPost extends LitElement {

  static styles = css`
    :host {
      border-bottom: 1px solid var(--color-platinum);
      display: block;
      list-style-type: none;
      padding-bottom: var(--spacing-6);
      padding-left: var(--spacing-5);
      padding-right: var(--spacing-5);
      padding-top: var(--spacing-5);
    }

    .c-blog-post__item {
      border-bottom: solid 1px rgba(0,0,0,0.2);
      display: grid;
      grid-template-columns: 15rem 1fr;
    }

    .c-blog-post__item:last-child {
      border-bottom: none;
    }

    .c-blog-post__item-date {
      font-size: var(--font-size-small);
      margin-top:  var(--spacing-1);
    }

    .c-blog-post__item-title {
      font-size: var(--font-size-large-1);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-3);
      margin-top: 0;
    }

    .c-blog-post__item-text {
      margin-bottom: var(--spacing-4);
    }

    .c-blog-post__content {
      background: white;
      height: 100vh;
      position: absolute;
      top: 100vh;
      transition: all .4s;
      width: 100vw;
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
  title:string

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

  private _contentEl = createRef<HTMLDivElement>()

  private _open = false

  handleToggle = ():void => {

    if (this._open) {

      this._contentEl.value.style.top = '0vh'

    }
    else {

      this._contentEl.value.style.top = '100vh'

    }

  }

  firstUpdated() {

    this._contentEl.value.style.backgroundColor = 'white'
    this._contentEl.value.style.height = '100vh'
    this._contentEl.value.style.position = 'fixed'
    this._contentEl.value.style.top = '100vh'
    this._contentEl.value.style.transition = 'all .4s'
    this._contentEl.value.style.width = '100vw'

    document.body.appendChild(
      this._contentEl.value
    )

  }

  protected render(): TemplateSpecification {

    return html`
      <div class="c-blog-post__item">
        <div class="c-blog-post__item-date">
          ${this.date}
        </div>

        <div class="c-blog-post__item-preview">
          <h4 class="c-blog-post__item-title">
            ${this.title}
          </h4>
          <div class="c-blog-post__item-text">
            ${this.text}
          </div>
          <c-button @click=${this.handleToggle} small>
            read more
          </c-button>
        </div>
        <div
          class="c-blog-post__content"
          ${ref(this._contentEl)}
        >
          ${unsafeHTML(this.content)}
        </div>

      </div>
    `

  }

}

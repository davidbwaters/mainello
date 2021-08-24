//
// component - featured image
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
    'c-featured-image': FeaturedImage,
  }
}

@customElement('c-featured-image')

export class FeaturedImage extends LitElement {

  static styles = css`
    :host {
      border-bottom: solid 1px var(
        --color-opaque-dark-subtle
      );
      display: block;
      height: 80vh;
      overflow: hidden;
    }
    .c-featured-image__wrapper,
    .c-featured-image__wrapper-spaced-small,
    .c-featured-image__wrapper-spaced-large,
    .c-featured-image__image {
      display: block;
      height: 100%;
      width: 100%;
    }
    .c-featured-image__wrapper {

    display: grid;
  }
      margin: auto;
    }
    .c-featured-image__wrapper-spaced-small {
      margin-left: 6.2vw;
      margin-right: 6.2vw;
    }
    .c-featured-image__wrapper-spaced-large {
      margin-left: 20vw;
      margin-right: 20vw;
    }
    ::slotted(*) {
      background-size: cover;
      background-position: center center;
      will-change: transform;
    }
  `

  @property({
    type: String,
    attribute: true
  })
  link:string

  @property({
    type: String,
    attribute: true
  })
  alt:string

  @property({
    type: String,
    attribute: true
  })
  spacing:string

  private _wrapperClass:string

  constructor() {

    super()

    if (this.spacing === 'small') {

      this._wrapperClass = 'c-featured-image__wrapper-spaced-small'

    }
    else if (this.spacing === 'large') {

      this._wrapperClass = 'c-featured-image__wrapper-spaced-large'

    }
    else {

      this._wrapperClass = 'c-featured-image__wrapper'

    }

  }

  firstUpdated() {

    const el = document.createElement('div')
    el.classList.add('c-featured-image__image')
    el.dataset.parallaxMask = ''
    this.appendChild(el)

    el.style.backgroundImage = "url(" + this.link + ")"

  }

  protected render():TemplateSpecification {

    return html`
      <div
        class='${this._wrapperClass}'
      >
        <slot></slot>

      </div>
    `

  }

}

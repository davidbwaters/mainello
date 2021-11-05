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
    .c-featured-image__wrapper-spaced-small {
      margin-bottom: 6.2vw;
      margin-left: 6.2vw;
      margin-right: 6.2vw;
      margin-top: 6.2vw;
    }
    .c-featured-image__wrapper-spaced-large {
      margin-bottom: 18.6vw;
      margin-left: 18.6vw;
      margin-right: 18.6vw;
      margin-top: 18.6vw;
    }
    ::slotted(*) {
      background-color: var(--featured-image-background);
      background-position: center center;
      background-size: var(--featured-image-size);
      background-repeat: no-repeat;
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

  @property({
    type: String,
    attribute: true
  })
  size:string;

  @property({
    type: String,
    attribute: true
  })
  background:string;

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

    if (this.getAttribute('size') === 'contain') {

      this.style.setProperty(
        '--featured-image-size',
        'contain'
      )

    }
    else {

      this.style.setProperty(
        '--featured-image-size',
        'cover'
      )

    }

    this.style.setProperty(
      '--featured-image-background',
      this.getAttribute('background')
    )

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

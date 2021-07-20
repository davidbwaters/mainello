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
    }
    .c-featured-image__image,
    .c-featured-image__image-spaced-small,
    .c-featured-image__image-spaced-large {
      display: block;
      max-width: 100%;
    }
    .c-featured-image__image {
      margin: auto;
    }
    .c-featured-image__image-spaced-small {
      margin-left: 6.2vw;
      margin-right: 6.2vw;
    }
    .c-featured-image__image-spaced-large {
      margin-left: 20vw;
      margin-right: 20vw;
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

      this._wrapperClass = 'c-featured-image__image-spaced-small'

    }
    else if (this.spacing === 'large') {

      this._wrapperClass = 'c-featured-image__image-spaced-large'

    }
    else {

      this._wrapperClass = 'c-featured-image__image'

    }

  }

  protected render():TemplateSpecification {

    return html`
      <img
        src='${this.link}'
        alt='${this.alt}'
        class='${this._wrapperClass}'
      >
    `

  }

}

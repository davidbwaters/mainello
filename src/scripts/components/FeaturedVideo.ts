//
// component - featured video
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
  createRef,
  ref
} from 'lit/directives/ref'

import inViewport from './../lib/inViewport'


declare global {
  interface HTMLElementTagNameMap {
    'c-featured-video': FeaturedVideo,
  }
}

@customElement('c-featured-video')

export class FeaturedVideo extends LitElement {

  static styles = css`
    :host {
      background-color: var(--featured-video-background);
      display: block;
      margin-bottom: calc(5vh + 3.75vw);
      margin-top: calc(5vh + 3.75vw);
    }
    .c-featured-video__video {
      display: block;
      margin: auto;
      max-height: 80vh;
      max-width: 100%;
    }
    .c-featured-video__inner-spaced-small {
      padding-left: 6.2vw;
      padding-right: 6.2vw;
    }
    .c-featured-video__inner-spaced-large {
      padding-left: 20vw;
      padding-right: 20vw;
    }
  `

  video = createRef<HTMLVideoElement>()

  @property({
    type: String,
    attribute: true
  })
  link:string

  @property({
    type: Boolean,
    attribute: true
  })
  loop:boolean

  @property({
    type: String,
    attribute: true
  })
  spacing:string

  @property({
    type: String,
    attribute: true
  })
  type:string

  @property({
    type: String,
    attribute: true
  })
  color:string

  private _wrapperClass:string

  connectedCallback():void {

    super.connectedCallback()

    this.style.setProperty(
      '--featured-video-background',
      this.color
    )

    this.loop = JSON.parse(
      this.getAttribute('loop')
    )

    if (this.spacing === 'small') {

      this._wrapperClass = 'c-featured-video__inner-spaced-small'

    }
    else if (this.spacing === 'large') {

      this._wrapperClass = 'c-featured-video__inner-spaced-large'

    }
    else {

      this._wrapperClass = 'c-featured-video__inner'

    }

    inViewport(this, el => {

      if (el.isIntersecting) {

        this.video.value.muted = true
        this.video.value.autoplay = true
        this.video.value.play()

      }

    })

  }

  protected render():TemplateSpecification {

    return html`
      <div
        class='${this._wrapperClass}'
      >
        <video
          class='c-featured-video__video'
          ?loop=${this.loop}
          ${ref(this.video)}
        >
          <source
            src="${this.link}" type="${this.type}"
          >
        </video>
      </div>
    `

  }

}

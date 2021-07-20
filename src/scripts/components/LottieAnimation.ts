//
// component - nav menu
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

import lottie from 'lottie-web'

import {
  createRef,
  ref
} from 'lit/directives/ref'


declare global {
  interface HTMLElementTagNameMap {
    'c-lottie-animation': LottieAnimation,
  }
}

interface NavLinks {
  title: string;
  link: string;
  active: boolean;
}

@customElement('c-lottie-animation')

export class LottieAnimation extends LitElement {

  static styles = css`

    :host {
      display: grid;
      height: var(--lottie-animation-height);
    }

  `

  @property({
    type: String,
    attribute: true
  })
  filename:string

  @property({
    type: Boolean,
    attribute: true
  })
  open:boolean

  @property({
    type: Number,
    attribute: true
  })
  height:number

  private _animation

  animationEl = createRef<HTMLDivElement>()

  firstUpdated(): void {

    this.style.setProperty(
      '--lottie-animation-height',
      this.height.toString() + 'vh'
    )

    this._animation = lottie.loadAnimation({
      container: this.animationEl.value,
      renderer: 'canvas',
      loop: true,
      autoplay: true,
      path: '/animations/' + this.filename + '.json',
      rendererSettings: {
        preserveAspectRatio: 'none'
      }
    })

    this._animation.goToAndPlay(1, true)

  }

  protected render():TemplateSpecification {

    return html`
      <div
        class='c-lottie-animation__inner'
        ${ref(this.animationEl)}
      >
      </div>

    `

  }

}

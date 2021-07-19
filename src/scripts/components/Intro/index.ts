//
// component - intro
//

import {
  LitElement,
  html
} from 'lit'

import {
  customElement,
  queryAll
} from 'lit/decorators.js'

import {
  ref,
  createRef
} from 'lit/directives/ref.js'

import gsap from 'gsap'
import lottie from 'lottie-web'

import style from './styles'


declare global {
  interface HTMLElementTagNameMap {
    'c-intro': Intro,
  }
}

@customElement('c-intro')

export class Intro extends LitElement {

  static styles = [
    style
  ]

  introEl = createRef<HTMLDivElement>()
  introBgEl = createRef<HTMLDivElement>()
  sketchEl = createRef<HTMLDivElement>()

  @queryAll('.js-intro-block') _introBlockEls

  firstUpdated(): void {

    const navbar = document.querySelector('c-navbar')

    navbar.style.opacity = '0'

    document.body.style.opacity = '1'

    const introEls = [
      ...Array.from(this._introBlockEls),
      this.sketchEl.value
    ]


    const sketchAnimation:any = lottie.loadAnimation({
      container: this.sketchEl.value,
      renderer: 'canvas',
      loop: false,
      autoplay: false,
      path: 'animations/sketch.json'
    })

    const backgroundAnimation:any = lottie.loadAnimation({
      container: this.introBgEl.value,
      renderer: 'canvas',
      loop: false,
      autoplay: false,
      path: 'animations/paint.json',
      rendererSettings: {
        preserveAspectRatio: 'none'
      }
    })

    backgroundAnimation.onComplete = () => {

      gsap.to(introEls, {
        duration: 0.4,
        x: '0%',
        onComplete: () => {

          lottie.setSpeed(3)

          setTimeout(() => {

            sketchAnimation.play()

          }, 400)

        }
      })

    }

    sketchAnimation.onComplete = () => {

      gsap.to(introEls, {
        duration: 0.4,
        y: '-110%'
      })

      gsap.to(this, {
        duration: 0.2,
        opacity: 0,
        onComplete: () => {

          this.style.height = '0'

        }
      })

      gsap.to(navbar, {

        duration: 0.2,
        opacity: 1
      })

      setTimeout(() => {

        this.style.display = 'none'

      }, 1200)


      document.body.style.position = ''

    }

    lottie.setSpeed(2)

    document.body.style.position = 'fixed'
    backgroundAnimation.play()

  }

  protected render():TemplateSpecification {

    return html`
      <div class='c-intro' ${ref(this.introEl)}>
        <div
          class='c-intro__background'
          ${ref(this.introBgEl)}
        ></div>

        <div class='c-intro__grid'>
          <div class='c-intro__block'>
            <div class='c-intro__block-inner js-intro-block' ></div>
          </div>
          <div class='c-intro__block'>
            <div class='c-intro__block-inner js-intro-block' ></div>
          </div>
          <div class='c-intro__block'>
            <div class='c-intro__block-inner js-intro-block' ></div>
          </div>
          <div class='c-intro__block'>
            <div class='c-intro__block-inner js-intro-block' ></div>
          </div>
          <div class='c-intro__block'>
            <div class='c-intro__block-inner js-intro-block' ></div>
          </div>
          <div class='c-intro__block'>
            <div class='c-intro__block-inner js-intro-block' ></div>
          </div>
          <div class='c-intro__block'>
            <div class='c-intro__block-inner js-intro-block' ></div>
          </div>
          <div class='c-intro__block'>
            <div class='c-intro__block-inner js-intro-block' ></div>
          </div>
          <div class='c-intro__block'>
            <div class='c-intro__block-inner js-intro-block' ></div>
          </div>
          <div class='c-intro__block'>
            <div class='c-intro__block-inner js-intro-block' ></div>
          </div>
          <div class='c-intro__block'>
            <div class='c-intro__block-inner js-intro-block' ></div>
          </div>

          <div class='c-sketch-animation'>
            <div
              class='c-sketch-animation__inner'
              ${ref(this.sketchEl)}
            ></div>
          </div>
        </div>
      </div>
    `

  }


}

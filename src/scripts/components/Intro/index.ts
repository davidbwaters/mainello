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


    document.body.style.opacity = '1'

    const introEls = [
      ...Array.from(this._introBlockEls),
      this.sketchEl.value
    ]

    const sketchAnimation:any = lottie.loadAnimation({
      container: this.sketchEl.value,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'animations/sketch.json'
    })

    /*
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
    */

    lottie.setSpeed(1)

    document.body.style.position = 'fixed'


    gsap.to(introEls, {
      duration: 0.4,
      x: '0%',
      onComplete: () => {

        lottie.setSpeed(2)

        setTimeout(() => {

          sketchAnimation.play()

        }, 400)

      }
    })

    const navbar = document
      .querySelector('c-navbar')

    const hero = document
      .querySelector(
        '.c-hero__inner'
      )

    const tagline = document
      .querySelector(
        '.c-hero__tagline'
      )

    const lines = tagline.querySelectorAll('span')
    const cta = document
      .querySelector(
        '.c-hero__cta'
      )

    gsap.set(navbar, {
      opacity: 0
    })

    gsap.set(lines, {
      opacity: 0,
      y: '20%',
      rotateX: '-60deg',
      rotateY: '0deg',
      scale: 0.8
    })

    gsap.set(cta, {
      opacity: 0,
      y: '80%',
      rotateX: '-60deg',
      rotateY: '0deg',
      scale: 0.8
    })


    sketchAnimation.onComplete = () => {

      const timeline = gsap.timeline()

      timeline.to(introEls, {
        duration: 0.6,
        y: '-110%'
      })

      timeline.to(this, {
        duration: 0.8,
        opacity: 0,
        onComplete: () => {

          this.style.opacity = '0'

        }
      }, 0.3)

      timeline.to(navbar, {
        duration: 0.2,
        opacity: 1
      })

      timeline.to(lines, {
        y: '0%',
        x: '0%',
        opacity: 1,
        rotateX: '0deg',
        rotateY: '0deg',
        scale: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power2'
      }, 0.6)

      timeline.to(cta, {
        y: '0%',
        rotateX: '0deg',
        opacity: 1,
        duration: 1.2,
        scale: 1,
        ease: 'power3'
      }, 1.0)

      setTimeout(() => {

        this.style.display = 'none'

      }, 1200)

      document.body.style.position = ''

    }


    sketchAnimation.play()

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

//
// component - contact fab
//

import { LitElement, html, css } from 'lit'

import { customElement } from 'lit/decorators.js'

import { createRef, ref } from 'lit/directives/ref'

import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'


@customElement('c-contact-fab')
export class ContactFab extends LitElement {

  static styles = css`
    :host {
      background-image: url('/icons/mail.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 1.33rem;
      bottom: 0rem;
      display: none;
      height: 6rem;
      overflow: hidden;
      position: fixed;
      right: 0rem;
      transition: opacity .8s;
      width: 6rem;
      will-change: opacity;
      z-index: 9;
    }

    @media (min-width: 320px) {

      :host {
        display: block;
      }

    }

    @media (min-width: 768px) {

      :host {
        display: block;
        height: 6.75rem;
        width: 6.75rem;
      }

    }

    .c-contact-fab__spinning {
      border-radius: 100rem;
      fill: var(--color-eerie-black);
      font-family: var(--font-mono);
      font-size: 2.8rem;
      letter-spacing: .6rem;
      will-change: transform;
    }
  `

  rotateEl = createRef<HTMLDivElement>()

  firstUpdated(): void {

    gsap.registerPlugin(ScrollTrigger)

    const rotateDuration = 16

    const rotate = gsap.to(this.rotateEl.value, {
      rotation: 360,
      duration: rotateDuration,
      onReverseComplete() {

        this.totalTime(rotateDuration * 100)

      },
      repeat: -1,
      ease: 'linear'
    })

    let scrollTop
    let contentHeight
    let progress = 0
    let rounds = 0
    const clamp = gsap.utils.clamp(-50, 50)

    ScrollTrigger.create({
      onUpdate: self => {

        scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop

        contentHeight =
          Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
          ) - window.innerHeight

        rounds = Math.floor(
          contentHeight / window.innerHeight
        )
        progress =
          Math.floor((scrollTop / contentHeight) * 100) *
          rounds

        rotate.timeScale(clamp(self.getVelocity() / 100))
        gsap.to(rotate, {
          timeScale: self.direction,
          duration: 0.3,
          overwrite: true,
          ease: 'power1.inOut'
        })

      }

    })

    gsap.set(this.rotateEl.value, {
      transformOrigin: 'center center',
      force3D: true
    })

  }

  protected render():TemplateSpecification {

    return html`
      <svg
        class="c-contact-fab__spinning"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 500 500"
        ${ref(this.rotateEl)}
      >
        <defs>
          <path
            d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
            id="textcircle"
          ></path>
        </defs>
        <text dy="70" textLength="1240">
          <textPath xlink:href="#textcircle">
            start a project — get in touch —
          </textPath>
        </text>
      </svg>
    `

  }

}

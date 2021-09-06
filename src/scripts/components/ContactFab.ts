//
// component - contact fab
//

import { LitElement, html, css } from 'lit'

import { customElement } from 'lit/decorators.js'

import { createRef, ref } from 'lit/directives/ref'

import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getEventListener } from 'events'


@customElement('c-contact-fab')
export class ContactFab extends LitElement {

  static styles = css`
    :host {
      background-image: url('/images/globe.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 1.69rem;
      bottom: 0rem;
      display: none;
      height: 8rem;
      overflow: hidden;
      position: fixed;
      right: 0rem;
      transition: opacity .8s;
      width: 8rem;
      will-change: opacity;
      z-index: 99;
    }

    @media (min-width: 320px) {

      :host {
        display: block;
      }

    }

    @media (min-width: 768px) {

      :host {
        display: block;
        height: 10rem;
        width: 10rem;
      }

    }

    .c-contact-fab__spinning {
      border-radius: 100rem;
      fill: var(--color-eerie-black);
      font-family: var(--font-normal);
      font-size: 2.2rem;
      letter-spacing: .55rem;
      will-change: transform;
    }
  `

  rotateEl = createRef<HTMLDivElement>()

  firstUpdated(): void {

    const addFab = document.querySelectorAll(
      'c-contact-fab'
    ).length === 1

    if (addFab) {

      document.body.appendChild(this)

    }


    gsap.registerPlugin(ScrollTrigger)

    const rotateDuration = 16

    const rotate = gsap.to(
      this.rotateEl.value,
      {
        rotation: 360,
        duration: rotateDuration,
        onReverseComplete() {

          this.totalTime(rotateDuration * 100)

        },
        repeat: -1,
        ease: 'linear'
      })

    const clamp = gsap.utils.clamp(-50, 50)

    ScrollTrigger.create({

      trigger: '[data-scroll-container]',
      scroller: '[data-scroll-container]',
      onUpdate: self => {

        rotate.timeScale(clamp(self.getVelocity() / 100))
        gsap.to(rotate, {
          timeScale: 1,
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
      <a href="/contact.html">
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
              contact — get in touch — contact — get in touch —
            </textPath>
          </text>
        </svg>
      </a>
    `

  }

}

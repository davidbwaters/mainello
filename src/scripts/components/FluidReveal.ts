//
// component - fluid reveal
//

import {
  LitElement,
  html,
  css
} from 'lit'

import {
  customElement,
  property,
  queryAll
} from 'lit/decorators.js'

import {
  createRef,
  ref
} from 'lit/directives/ref'

import {
  unsafeHTML
} from 'lit/directives/unsafe-html'

import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'


declare global {
  interface HTMLElementTagNameMap {
    'c-fluid-reveal': FluidReveal,
  }
}

interface MediaItem {
  image: string;
  heading: string;
  text: string;
  id: number;
  slug: string
}

@customElement('c-fluid-reveal')

export class FluidReveal extends LitElement {

  static styles = css`

    :host {
      display: block;
      overflow: hidden;
      margin: auto;
      max-width: 1200px;
    }

    .c-fluid-reveal__heading {
      font-weight: var(--font-weight-normal);
      margin: 0;
    }

    @media (max-width: 768px) {

      .c-fluid-reveal__inner {
        display: grid;
        gap: 0 5px;
        grid-template-columns: 1fr 1fr;
      }

      .c-fluid-reveal__item image {
        mask: none !important;
      }

      .c-fluid-reveal__content {
        display: none;
        height: 0;
        opacity: 1 !important;
      }

      .c-fluid-reveal__heading {
        font-size: var(--font-size-large-1);
      }

    }


    @media (min-width: 768px) {

      :host {
        --fluid-reveal-section-height: 110vh;
        height:   calc(var(--items) * var(--fluid-reveal-section-height));
        /* pointer-events: none; */
        z-index: 2;
      }

      .c-fluid-reveal__inner {
        display: block;
        height: 100%;
        min-height: 100vh;
        position: relative;
        width: 100%;
      }

      .c-fluid-reveal__item {
        align-content: center;
        display: grid;
        gap: 6.2vw;
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        margin: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }

      .c-fluid-reveal__item-media {
        box-sizing: border-box;
        display: block;
        height: 100vh;
        overflow: hidden;
        padding-bottom: 10vh;
        padding-top: 10vh;
        top: 0;
        width: 100%;
      }

      .c-fluid-reveal__content {
        align-content: center;
        box-sizing: border-box;
        display: grid;
        gap: var(--spacing-2);
        grid-column: 2 / span 1;
        justify-items: start;
        height: 100vh;
        padding-right: var(--spacing-8);
        will-change: opacity, transform;
        z-index: 2;
      }

      .c-fluid-reveal__heading {
        cursor: text;
        font-size: var(--font-size-large-5);
      }

      .c-fluid-reveal__content p,
      .c-fluid-reveal__content > div {
        cursor: text;
        margin-bottom: var(--spacing-2);
        margin-top: 0;
      }

    }

  `

  wrapper = createRef<HTMLDivElement>()

  @property({
    type: Array,
    attribute: true
  })
  items:Array<MediaItem>

  @property({
    type: Number,
    attribute: true
  })
  animationDuration:number

  @property({
    type: Number,
    attribute: true
  })
  pinDuration:number

  @property({
    type: Number,
    attribute: true
  })
  heightMultiplier:number

  @queryAll('.c-fluid-reveal__item') _fluidRevealEls

  constructor() {

    super()

    this.heightMultiplier = this.heightMultiplier || 2
    this.animationDuration = this.animationDuration || 3
    this.pinDuration = this.pinDuration || 8

  }

  firstUpdated():void {

    this.items.forEach((item, index) => {

      const button = document.createElement('c-button')

      button.setAttribute(
        'link', '/work/' + item.slug + '.html'
      )

      button.setAttribute(
        'text', 'view project'
      )

      button.setAttribute(
        'slot', index.toString()
      )

      this.appendChild(button)

    })


    gsap.registerPlugin(ScrollTrigger)

    const fluidRevealEls:Array<HTMLDivElement> =
      Array.from(
        this._fluidRevealEls
      )

    this.style.setProperty(
      '--items',
      (
        fluidRevealEls.length *
        this.heightMultiplier
      ).toString()
    )


    ScrollTrigger.saveStyles([
      '.c-fluid-reveal__item path',
      '.c-fluid-reveal__item .c-fluid-reveal__media',
      '.c-fluid-reveal__item .c-fluid-reveal__content'
    ])

    ScrollTrigger.matchMedia({
      // desktop
      '(min-width: 800px)': () => {

        //ScrollTrigger.refresh()

        let count = 0

        const tl = gsap.timeline({
          ease: 'none',
          scrollTrigger: {
            trigger: this.wrapper.value,
            start: 'top top ',
            pin: true,
            pinSpacing: true,
            end: 'bottom bottom',
            scrub: 0.2
            //markers: true
          }
        })

        fluidRevealEls.forEach((el:HTMLDivElement) => {

          const wobble:HTMLDivElement = el.querySelector(
            '#wobble-' + count
          )

          const content:HTMLDivElement = el.querySelector(
            '.c-fluid-reveal__content'
          )

          if (count > 1) {

            tl.fromTo(
              wobble,
              {
                xPercent: 110,
                yPercent: 110,
                scale: 1
              },
              {
                duration: this.animationDuration,
                xPercent: -7,
                yPercent: -7,
                scale: 1.2
              },
              '-=' + this.animationDuration
            )

          }
          else {

            tl.fromTo(wobble, {
              xPercent: 110,
              yPercent: 110,
              scale: 1
            },
            {
              duration: this.animationDuration,
              xPercent: -7,
              yPercent: -7,
              scale: 1.2
            })

          }

          tl.fromTo(
            content,
            {
              opacity: 0,
              yPercent: 100
            },
            {
              duration: this.animationDuration,
              opacity: 1,
              yPercent: 0
            },
            '-=' + this.animationDuration
          ).to(el, {
            duration: this.pinDuration
          })

          if (count < fluidRevealEls.length) {

            tl.fromTo(
              content,
              {
                opacity: 1,
                yPercent: 0
              },
              {
                duration: this.animationDuration,
                opacity: 0,
                yPercent: -100
              },
              '-=' + this.animationDuration
            )

          }

          count++

          //ScrollTrigger.update()


        })

        count = 0

      }
    })

  }

  protected render():TemplateSpecification {

    return html`
      <div
        class="c-fluid-reveal__inner"
        ${ref(this.wrapper)}
      >
        ${this.items.map((item, index) =>
          html`
            <div class="c-fluid-reveal__item">
              <svg class="c-fluid-reveal__item-media" viewBox="0 0 1000 1000">
                <image
                  opacity="1"
                  mask="url('#mask-${index}')"
                  preserveAspectRatio="xMidYMid slice"
                  href=${item.image}
                  height="100%"
                  width="100%"
                />

                <mask id="mask-${index}">
                  <path
                    id="wobble-${index}"
                    d="M53.48-414.83C-36.82-373-33.76-278.17-19.91-194c12.17,74,66.56,136.46,2.05,205.61s-109.6,66-153.69,147.16,31,143.15-55,230.15-274,14.62-267,206S-750.66,726.14-680.2,819.76c75,99.68,487.9,207.62,632,282.55,342.19,177.9,764,148.24,902.86-42.68C994.14,867.89,1031.26,327.21,819.11-35.12,647.45-328.3,300.19-406.44,276.48-428.27,223.48-477.07,92.55-432.94,53.48-414.83Z"
                    fill="white"
                  />
                </mask>
              </svg>
              <div class="c-fluid-reveal__content">
                <h3 class="c-fluid-reveal__heading">
                  ${item.heading}
                </h3>
                ${unsafeHTML(item.text)}
                <slot name="${index}"></slot>
              </div>
            </div>
          `
        )}
      </div>

    `

  }

}

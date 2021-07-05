//
// component - scrolling tags
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

import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'


declare global {
  interface HTMLElementTagNameMap {
    'c-scrolling-tags': ScrollingTags,
  }
}


interface ScrollingTag {
  name: string;
}

@customElement('c-scrolling-tags')

export class ScrollingTags extends LitElement {

  static styles = css`
    :host {
      display: grid;
      font-size: 10vw;
      font-weight: var(--font-weight-semibold);
      grid-auto-flow: column;
      grid-column: 1 / span 2;
      justify-content: start;
      padding: var(--spacing-6) 0;
      transform: rotate(.1deg);
      white-space: nowrap;
      will-change: transform;
    }
    @media (min-width: 320px) {
      :host {
        font-size: 8vw;
        grid-column: 2 / span 8;
      }
    }

    @media (min-width: 768px) {
      :host {
        display: grid;
        font-size: 6vw;
        grid-column: 2 / span 14;
      }
    }

    .c-scrolling-tags__inner {
      display: grid;
      grid-auto-flow: column;
      gap: 4vw;
    }

    .c-scrolling-tags__item:nth-child(even) {
      -webkit-text-stroke: 1px currentColor;
      -webkit-text-fill-color: transparent;
    }

    :host(.c-scrolling-tags--reverse) {
      /* justify-content: end; */
      justify-content: end;
    }
  `

  scrollingEl = createRef<HTMLDivElement>()

  @property({
    type: Array,
    attribute: true
  })
  items:Array<ScrollingTag>

  @property({
    type: Boolean,
    attribute: true
  })
  reverse:boolean

  firstUpdated():void {

    if (this.reverse) {

      this.classList.add(
        'c-scrolling-tags--reverse'
      )

    }

    let offset =
      this.scrollingEl.value.clientWidth -
      this.clientWidth

    if (this.reverse) {

      offset = offset * -1

    }

    gsap.registerPlugin(ScrollTrigger)

    gsap.config({
      //force3D: false
    })

    gsap.fromTo(this, {
      x: 0
    }, {
      x: () =>
        -(
          offset
        ) + 'px',
      ease: 'none',
      scrollTrigger: {
        trigger: this,
        invalidateOnRefresh: true,
        scrub: 0.1,
        start: () => 'top 100%',
        end: '+=100%'
      }
    })

  }

  protected render(): TemplateSpecification {

    return html`
      <div
        class="c-scrolling-tags__inner"
        ${ref(this.scrollingEl)}
      >
        ${this.items.map(item =>
          html`
            <span
              class="c-scrolling-tags__item"
            >
              ${item.name}
            </span>
          `
        )}
      </div>

    `

  }

}

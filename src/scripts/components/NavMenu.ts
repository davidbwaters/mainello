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

import gsap from 'gsap'

import {
  createRef,
  ref
} from 'lit/directives/ref'


declare global {
  interface HTMLElementTagNameMap {
    'c-nav-menu': NavMenu,
  }
}

interface NavLinks {
  title: string;
  link: string;
  active: boolean;
}

interface SocialLinks {
  type: string;
  link: string;
}

@customElement('c-nav-menu')

export class NavMenu extends LitElement {

  static styles = css`
    :host,
    .c-nav-menu__wrapper
     {
      position: fixed;
      height: 100%;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 1;
    }

    :host {
      display: block;
      overflow-x: hidden;
      pointer-events: none;
    }

    .c-nav-menu__wrapper {
      align-content: center;
      display: grid;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      position: fixed;
      transition: all .4s;
      will-change: opacity;
      z-index: 9;
    }

    .c-nav-menu__wrapper.is-active {
      opacity: 1;
      pointer-events: initial;
    }

    .c-nav-menu__animation-stripe {
      display: block;
      height: 100%;
      transform: translateX(100vw);
      position: absolute;
      top: 0;
      width: 100%;
      will-change: transform;
    }

    .c-nav-menu__animation-stripe:nth-child(1) {
      background-color: var(--color-primary);
      opacity: 0.25;
      z-index: 6;
    }

    .c-nav-menu__animation-stripe:nth-child(2) {
      background-color: var(--color-primary);
      opacity: 0.5;
      z-index: 5;
    }

    .c-nav-menu__animation-stripe:nth-child(3) {
      background-color: var(--color-primary);
      z-index: 4;
    }

    .c-nav-menu__animation-stripe:nth-child(4) {
      background-color: var(--color-primary-tint-1);
      z-index: 3;
    }

    .c-nav-menu__animation-stripe:nth-child(5) {
      background-color: var(--color-primary-tint-2);
      z-index: 2;
    }

    .c-nav-menu__inner {
      background-color: var(--color-main-background);
      display: grid;
      height: 100%;
      position: absolute;
      width: 100%;
      will-change: transform;
      z-index: 1;
    }

    .c-nav-menu__nav {
      align-content: center;
      display: grid;
      gap: 2vmin;
      justify-content: center;
      justify-items: start;
      position: relative;
      width: 100vw;
      will-change: transform;
    }

    ::slotted(*) {
      color: inherit;
      font-size: var(--font-size-display-1);
      font-size: 10vmin;
      left: 0vw;
      position: relative;
      text-decoration: none;
      -webkit-text-stroke: 1px currentColor;
      -webkit-text-fill-color: rgba(255,255,255,1);
    }

  `

  @property({
    type: Array,
    attribute: true
  })
  navLinks:Array<NavLinks>

  @property({
    type: Boolean,
    attribute: true
  })
  open:boolean

  private _duration = 0.6
  private _stagger = this._duration / 6
  private _menuAnimation
  private _menuAnimationClose
  private _navLinkEls

  menuEl = createRef<HTMLDivElement>()

  handleToggle = ():void => {

    if (!this.open) {

      this.open = true

      this._menuAnimation.progress(0)
      this._menuAnimation.play()

      this.menuEl.value.classList.toggle(
        'is-active'
      )

    }
    else {

      this.open = false

      this._menuAnimationClose.progress(0)
      this._menuAnimationClose.play()

      setTimeout(() => {

        this.menuEl.value.classList.toggle('is-active')

      }, 2000)

    }

  }

  firstUpdated(): void {

    window.addEventListener(
      'toggleNavMenu', this.handleToggle
    )

    const current = window.location.pathname

    this.navLinks.forEach((i, index) => {

      const link = document.createElement('a')
      const inner = document.createElement('span')
      const counter = document.createElement('span')

      inner.dataset.inner = ''
      inner.innerText = i.title

      counter.dataset.counter = ''
      counter.classList.add('u-counter-item')

      link.href = i.link
      link.classList.add(
        'u-link-reverse-outline'
      )

      link.classList.add(
        'u-counter-increment'
      )

      link.classList.add(
        'js-animation-link'
      )

      if (i.link === current) {

        link.classList.add(
          'u-link-fake-underline'
        )

      }

      link.appendChild(counter)
      link.appendChild(inner)
      this.appendChild(link)

    })

    this._navLinkEls = Array.from(
      this.querySelectorAll('.js-animation-link')
    )

    this._navLinkEls[0].classList.add(
      'u-counter-reset'
    )

    const stripes = Array.from(this.menuEl.value
      .querySelectorAll('.js-animation-stripe')
    )

    const navEl = this.menuEl.value
      .querySelector('.js-animation-nav')

    this._menuAnimation = gsap.timeline()

    this._menuAnimation.fromTo(
      [...stripes],
      {
        x: '-100vw',
        duration: this._duration,
        stagger: this._stagger,
        ease: 'pawer3'
      },
      {
        x: '100vw',
        stagger: this._stagger,
        ease: 'pawer3'
      }
    )
    this._menuAnimation.from(
      [navEl, ...this._navLinkEls],
      {
        x: '-100vw',
        duration: this._duration,
        stagger: this._stagger,
        ease: 'pawer3'
      }, '>-1.2'
    )


    this._menuAnimationClose = gsap.timeline()

    this._menuAnimationClose.fromTo(
      [...this._navLinkEls],
      {
        x: '0vw',
        duration: this._duration,
        stagger: this._stagger,
        ease: 'power3'
      }, {
        x: '-4000',
        stagger: this._stagger,
        ease: 'power3'
      }
    )

    this._menuAnimationClose.fromTo(
      [navEl],
      {
        x: '0vw',
        duration: this._duration / 2,
        stagger: this._stagger,
        ease: 'power3'
      }, {
        x: '-100vw',
        stagger: this._stagger,
        ease: 'power3'
      }
    )


    this._menuAnimationClose.fromTo(
      [...stripes],
      {
        x: '100vw',
        duration: this._duration,
        stagger: this._stagger,
        ease: 'pawer3'
      },
      {
        x: '-100vw',
        duration: this._duration,
        stagger: this._stagger,
        ease: 'pawer3'
      }, '>-.8'
    )


  }


  updated():void {

    const current = window.location.pathname

    this._navLinkEls.forEach(link => {

      const href = link.getAttribute('href')

      if (href === current) {

        link.classList.add(
          'u-link-fake-underline'
        )

      }
      else {

        if (link.classList.contains(
          'u-link-fake-underline'
        )) {

          link.classList.remove(
            'u-link-fake-underline'
          )

        }

      }

      this.appendChild(
        link
      )

    })

  }

  disconnectedCallback():void {

    super.disconnectedCallback()

    window.removeEventListener(
      'toggleNavMenu', this.handleToggle
    )

  }

  protected render():TemplateSpecification {

    return html`
      <div
        ${ref(this.menuEl)}
        class='c-nav-menu__wrapper'
      >

          <div class='
            c-nav-menu__animation-stripe
            js-animation-stripe
          '>
          </div>

          <div class='
            c-nav-menu__animation-stripe
            js-animation-stripe
          '>
          </div>

          <div class='
            c-nav-menu__animation-stripe
            js-animation-stripe
          '>
          </div>

          <div class='
            c-nav-menu__animation-stripe
            js-animation-stripe
          '>
          </div>

          <div class='
            c-nav-menu__animation-stripe
            js-animation-stripe
          '>
          </div>

          <div class='
            c-nav-menu__inner
            js-animation-nav
          '>

              <nav class='
                c-nav-menu__nav
              '>

                <slot></slot>

              </nav>

        </div>

      </div>

    `

  }

}

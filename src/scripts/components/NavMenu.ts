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
    'c-nav-menu': NavMenu,
  }
}

interface NavLinks {
  title: string;
  link: string;
  active: boolean;
}

@customElement('c-nav-menu')

export class NavMenu extends LitElement {

  static styles = css`

    .c-nav-menu__animation {
      height: 100%;
      pointer-events: none;
      position: fixed;
      right: 0;
      top: 0;
      width: 100%;
      z-index: 9;
    }

    .c-nav-menu__inner {
      align-content: center;
      display: grid;
      height: 100%;
      justify-content: center;
      left: 0;
      opacity: 0;
      pointer-events: none;
      position: fixed;
      top: 0;
      transition: opacity .8s;
      width: 100%;
      will-change: opacity;
      z-index: 9;
    }

    .c-nav-menu.is-active .c-nav-menu__inner {
      opacity: 1;
      pointer-events: all;
    }

    .c-nav-menu__background {
      background-color: white;
      height: 100%;
      left: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      width: 100%;
    }

    .c-nav-menu__nav {
      display: grid;
      justify-items: start;
    }

    ::slotted(*) {
      color: inherit;
      font-size: var(--font-size-large-4);
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

  private _speed = 1.5
  private _menuAnimation
  private _navLinkEls

  menuEl = createRef<HTMLDivElement>()
  menuAnimationEl = createRef<HTMLDivElement>()

  handleToggle = ():void => {

    if (!this.open) {

      this.open = true

      lottie.setSpeed(this._speed)

      this._menuAnimation.setDirection(1)
      this._menuAnimation.goToAndPlay(1, true)

      setTimeout(() => {

        this.menuEl.value.classList.toggle(
          'is-active'
        )

      }, 200)

    }
    else {

      this.open = false

      lottie.setSpeed(this._speed)

      this._menuAnimation.setDirection(-1)
      this._menuAnimation.goToAndPlay(
        this._menuAnimation.lastFrame,
        true
      )

      setTimeout(() => {

        this.menuEl.value.classList.toggle('is-active')

      }, 1200)

    }

  }

  firstUpdated(): void {

    this._menuAnimation = lottie.loadAnimation({
      container: this.menuAnimationEl.value,
      renderer: 'canvas',
      loop: false,
      autoplay: false,
      path: '/animations/stripes-alt-2.json',
      rendererSettings: {
        preserveAspectRatio: 'none'
      }
    })

    window.addEventListener(
      'toggleNavMenu', this.handleToggle
    )

    const current = window.location.pathname

    this.navLinks.forEach(i => {

      const link = document.createElement('a')

      link.href = i.link
      link.innerText = i.title
      link.classList.add(
        'u-link-reverse-outline'
      )

      if (i.link === current) {

        link.classList.add(
          'u-link-fake-underline'
        )

      }

      this.appendChild(link)

    })

    this._navLinkEls = this.querySelectorAll('a')

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
        class='c-nav-menu'
      >
        <div
          class='c-nav-menu__animation'
          ${ref(this.menuAnimationEl)}
        >
        </div>

        <div class='c-nav-menu__inner'>
          <div class='c-nav-menu__background'>
          </div>

          <nav class='c-nav-menu__nav'>

            <slot></slot>

          </nav>

        </div>
      </div>

    `

  }

}

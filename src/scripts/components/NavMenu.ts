//
// component - nav menu
//

import {
  LitElement,
  html,
  css
} from 'lit'

import {
  customElement
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
    }

    .c-nav-menu__nav-link {
      position: relative;
      text-decoration: none;
    }

  `

  private _open = false

  private _speed = 1.5
  private _menuAnimation

  menuEl = createRef<HTMLDivElement>()
  menuAnimationEl = createRef<HTMLDivElement>()

  handleToggle = ():void => {

    if (!this._open) {

      this._open = true

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

      this._open = false

      lottie.setSpeed(this._speed)

      this._menuAnimation.setDirection(-1)
      this._menuAnimation.goToAndPlay(
        this._menuAnimation.lastFrame,
        true
      )

      setTimeout(() => {

        this.menuEl.value.classList.toggle('is-active')

      }, 800)

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

  }

  disconnectedCallback():void {

    window.removeEventListener(
      'toggleNavMenu', this.handleToggle
    )

  }

  protected render(): TemplateSpecification {

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
          </nav>

        </div>
      </div>

    `

  }

}
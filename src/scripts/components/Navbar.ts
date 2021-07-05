//
// component - navbar
//

import {
  LitElement,
  html,
  css
} from 'lit'

import {
  customElement
} from 'lit/decorators.js'

import {
  createRef,
  ref
} from 'lit/directives/ref'

import lottie from 'lottie-web'


declare global {
  interface HTMLElementTagNameMap {
    'c-navbar': Navbar,
  }
}

@customElement('c-navbar')

export class Navbar extends LitElement {

  static styles = css`
    .c-navbar {
      box-sizing: border-box;
      padding: var(--spacing-2);
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 10;
    }

    @media (min-width: 320px) {

      .c-navbar {
        padding: 2.1vh 2.1vw;
      }

    }

    .c-navbar__inner {
      display: grid;
      grid-auto-columns: min-content;
      grid-auto-flow: column;
      justify-content: space-between;
    }

    .c-navbar__branding {
      display: inline-block;
      width: 80px;
    }

    .c-navbar__menu-button {
      cursor: pointer;
      display: inline-block;
      width: 20px;
    }
  `

  private _open = false

  menuToggleEl = createRef<HTMLDivElement>()

  _menuButtonAnimation

  firstUpdated():void {

    this._menuButtonAnimation = lottie.loadAnimation({
      container: this.menuToggleEl.value,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/animations/nav-button.json'
    })

  }

  _toggleNavMenu():void {

    this.dispatchEvent(new CustomEvent('toggleNavMenu', {
      bubbles: true,
      composed: true
    }))

    if (!this._open) {

      this._open = true

      this._menuButtonAnimation.setDirection(1)
      this._menuButtonAnimation.goToAndPlay(1, true)

    }
    else {

      this._open = false

      this._menuButtonAnimation.setDirection(-1)
      this._menuButtonAnimation.goToAndPlay(
        this._menuButtonAnimation.lastFrame,
        true
      )

    }

  }

  protected render(): TemplateSpecification {

    return html`
      <header
        class='c-navbar'
      >
        <div class='c-navbar__inner'>
          <a class='c-navbar__branding' href='/'>
            <slot></slot>
          </a>
          <a
            class='c-navbar__menu-button js-navbar-button'
            @click=${this._toggleNavMenu}
            ${ref(this.menuToggleEl)}
          >
          </a>
        </div>
      </header>
    `

  }

}

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
    :host {
      box-sizing: border-box;
      padding-bottom: var(--spacing-2);
      padding-left: 6.2vw;
      padding-right: 6.2vw;
      padding-top: var(--spacing-2);
      position: fixed;
      top: 0;
      transition: all .8s;
      width: 100%;
      z-index: 10;
    }

    @media (min-width: 320px) {

      :host {
        padding-bottom: var(--spacing-4);
        padding-top: var(--spacing-4);
      }

    }

    @media (min-width: 480px) {

      :host {
        padding-bottom: var(--spacing-3);
        padding-top: var(--spacing-3);
      }

    }

    .c-navbar__inner {
      align-items: center;
      display: grid;
      grid-auto-columns: min-content;
      grid-auto-flow: column;
      justify-content: space-between;
    }

    .c-navbar__branding {
      display: inline-block;
      width: 4rem;
    }


    @media (min-width: 320px) {

      .c-navbar__branding {
        width: 4.6875rem;
      }

    }

    .c-navbar__menu-button {
      cursor: pointer;
      display: grid;
      width: 1rem;
    }

    @media (min-width: 320px) {

      .c-navbar__menu-button {
        width: 1.25rem;
      }

    }


  `

  menuToggleEl = createRef<HTMLDivElement>()
  open = false

  private _menuButtonAnimation

  firstUpdated():void {

    this._menuButtonAnimation = lottie.loadAnimation({
      container: this.menuToggleEl.value,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/animations/nav-button.json'
    })

  }

  handleToggle():void {

    this.dispatchEvent(new CustomEvent('toggleNavMenu', {
      bubbles: true,
      composed: true
    }))

    if (!this.open) {

      this.open = true

      this._menuButtonAnimation.setDirection(1)
      this._menuButtonAnimation.goToAndPlay(1, true)

    }
    else {

      this.open = false

      this._menuButtonAnimation.setDirection(-1)
      this._menuButtonAnimation.goToAndPlay(
        this._menuButtonAnimation.lastFrame,
        true
      )

    }

  }

  protected render():TemplateSpecification {

    return html`
      <header
        class='c-navbar'
      >
        <div class='c-navbar__inner'>
          <div class='c-navbar__branding'>
            <slot></slot>
          </div>
          <a
            class='c-navbar__menu-button js-navbar-button'
            @click=${this.handleToggle}
            ${ref(this.menuToggleEl)}
          >
          </a>
        </div>
      </header>
    `

  }

}

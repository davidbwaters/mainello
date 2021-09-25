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
} from 'lit/directives/ref.js'

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
      position: fixed;
      top: 0;
      transition: all .8s;
      width: 100%;
      z-index: 10;
    }

    @media (min-width: 320px) {

      :host {
        padding-left: var(--spacing-4);
        padding-right: 0;
      }

    }

    .c-navbar {
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
    }

    .c-navbar__nav {
      align-items: center;
      display: grid;
      gap: var(--spacing-3);
      grid-auto-flow: column;
    }


    .c-navbar__nav a {
      color: inherit;
    }

    .c-navbar__inner {
      align-items: center;
      display: grid;
      grid-auto-columns: auto;
      grid-auto-flow: column;
      justify-content: space-between;
      margin: auto;
      max-width: var(wrapper-width);
      padding-bottom: var(--spacing-4);
      padding-left: 6.5vw;
      padding-right: 6.5vw;
      padding-top: var(--spacing-4);
      top: 0;
    }

    .c-navbar__branding {
      display: inline-block;
      height: auto;
      max-height: 1.5rem;
      width: 4rem;

    }


    @media (min-width: 320px) {

      .c-navbar__branding {
        width: 4.6875rem;
      }

    }

    ::slotted([slot='button']) {
      background-color: transparent;
      box-sizing: content-box;
      border: none;
      border-radius: 5rem;
      cursor: pointer;
      display: grid;
      padding: 6.2vw;
      width: 1rem;
    }

    @media (min-width: 320px) {

      ::slotted([slot='button']) {
        height: 1.25rem;
        padding: var(--spacing-4);
        width: 1.25rem;;
      }

    }


  `

  menuToggleEl:HTMLElement
  open = false

  private _menuButtonAnimation

  firstUpdated():void {

    /*
    const link = document.createElement('a')

    link.innerText = 'contact'
    link.href = '/contact.html'
    link.setAttribute('slot', 'nav')

    this.appendChild(link)

    */

    const button = document.createElement('button')

    button.classList.add(
      'c-navbar__menu-button',
      'js-navbar-button'
    )

    button.setAttribute('slot', 'button')
    button.dataset.cursorMagnetic = 'true'

    this.appendChild(button)

    this.menuToggleEl = button

    this._menuButtonAnimation = lottie.loadAnimation({
      container: this.menuToggleEl,
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
          <div class='c-navbar__nav'>
            <a href='http://mainux.consulting'>
              ux consulting
            </a>
            <slot
              name='button'
              @click=${this.handleToggle}
            >
            </slot>
            <slot
              name='nav'
            >
            </slot>
          </div>
        </div>
      </header>
    `

  }

}

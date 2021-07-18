//
// component - footer
//

import {
  LitElement,
  html,
  css
} from 'lit'

import {
  property,
  customElement
} from 'lit/decorators.js'

import * as p5 from 'p5'

import inViewport from './../lib/inViewport'
import { ContactFab } from './ContactFab'
import { Navbar } from './Navbar'


declare global {
  interface HTMLElementTagNameMap {
    'c-footer': Footer,
  }
}

interface SocialLinks {
  service: string;
  link: string;
}

interface NavLinks {
  title: string;
  link: string;
}

@customElement('c-footer')

export class Footer extends LitElement {

  frameRate = 60

  instance

  private _wrapper:HTMLDivElement

  static styles = css`
    :host {
      background: var(--color-eerie-black);
      color: white;
      display: block;
      margin-top: 20vh;
      overflow: hidden;
      position: relative;
      top: 0;
      width: 100%;
    }

    :host a {
      color: inherit;
    }

    .c-footer__inner {
      align-content: space-between;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 87.6vw;
      justify-content: center;
      min-height: 60vh;
      padding-bottom: 9.3vh;
      padding-top: 12.4vh;
      position: relative;
      width: 100%;
      z-index: 2;
    }

    .c-footer__contact {
      display: grid;
      margin: 0;
      padding-bottom: 12.4vh;
    }

    .c-footer__contact a,
    .c-footer__contact span {
      padding-left: 10.46vw;
      padding-right: 10.46vw;
    }

    .c-footer__line {
      border-bottom: solid 1px var(--color-opaque-light);
    }

    .c-footer__lower {
      display: grid;
      gap: 6.2vh;
      justify-content: space-between;
      padding-top: 12.4vh;
    }

    @media (min-width: 768px) {

      .c-footer__lower {
        gap: var(--spacing-6);
        grid-auto-flow: column;
      }

    }

    .c-footer__logo {
      width: 45px;
    }

    .c-footer__nav {
      display: grid;
      gap: var(--spacing-4);
      grid-auto-flow: column;
    }


    @media (max-width: 768px) {

      .c-footer__nav {
        grid-column: span 2;
        grid-row: 1;
        justify-content: space-between;
      }

    }

    .c-footer__nav-link {
      text-decoration: none;
    }

    .c-footer__nav-link.active {
      text-decoration: underline;
    }

    .c-footer__social {
      display: grid;
      grid-auto-columns: min-content;
      grid-auto-flow: column;
      gap: 1rem;
      justify-self: end;
    }

    @media (max-width: 768px) {

      .c-footer__social {
        grid-area: 2 / 2 / auto / auto;
      }

    }

    .c-footer__social img {
      height: 20px;
      width: 20px;
    }

    ::slotted([slot="background"]) {
      opacity: 0.4;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }

    ::slotted(a) {
      color: inherit;
    }
  `

  @property({
    type: Array,
    attribute: true
  })
  socialLinks:Array<SocialLinks>

  @property({
    type: Array,
    attribute: true
  })
  navLinks:Array<NavLinks>

  @property({
    type: String,
    attribute: true
  })
  logo:string

  private _createWrapper() {

    const el = document.createElement('div')

    el.id = 'c-footer__background'
    el.setAttribute('slot', 'background')

    this.appendChild(el)
    this._wrapper = el

  }

  private _inViewort() {

    inViewport(this._wrapper, el => {

      if (el.isIntersecting) {

        this.frameRate = 30

      }
      else {

        this.frameRate = 1

      }

    })

  }

  sketch = (sketch): void => {

    let theShader

    sketch.preload = () => {

      theShader = sketch.loadShader(
        '/scripts/shaders/fabric.vert',
        '/scripts/shaders/fabric.frag'
      )

    }

    sketch.setup = () => {

      let footerSize = this._wrapper.getBoundingClientRect()

      const canvas = sketch.createCanvas(
        footerSize.width,
        footerSize.height,
        sketch.WEBGL
      )

      sketch.windowResized = () => {

        footerSize = this._wrapper.getBoundingClientRect()

        sketch.resizeCanvas(
          footerSize.width,
          footerSize.height
        )

      }

      sketch.createCanvas(
        footerSize.width,
        footerSize.height
      )

      canvas.parent('c-footer__background')

    }

    sketch.draw = () => {

      sketch.shader(theShader)

      let x

      theShader.setUniform('u_resolution', [
        sketch.width, sketch.height
      ])
      theShader.setUniform('u_time', (
        sketch.millis() / 1000) +
      (Math.abs(sketch.mouseX) / 300)
      )

      sketch.quad(-5, -5, 5, -5, 5, 5, -5, 5)

    }

  }

  firstUpdated(): void {

    this._createWrapper()
    this._inViewort()

    this.instance = new p5(this.sketch)


    const contactFab:ContactFab = document.querySelector(
      'c-contact-fab'
    )

    const navbar:Navbar = document.querySelector(
      'c-navbar'
    )

    let visible = false

    inViewport(this, el => {

      //console.log(el)

      if (el.isIntersecting) {

        visible = true

        if (contactFab) {

          contactFab.style.opacity = '0'

        }

        navbar.classList.toggle('u-transparent')

      }
      else {

        if (visible) {

          visible = false

          if (contactFab) {

            contactFab.style.opacity = '1'

          }

          navbar.classList.toggle('u-transparent')

        }

      }

    })

  }

  protected render():TemplateSpecification {

    return html`
      <slot name="background">
      </slot>

      <div class="c-footer__inner">
        <div class="c-footer__contact">

          <slot name="heading">
          </slot>

        </div>
        <div class="c-footer__line"></div>
        <div class="c-footer__lower">
          <img
            class="c-footer__logo"
            src="${this.logo}"
          >

          <nav class="c-footer__nav">
            ${this.navLinks.map(item =>

              html`
                <a
                  class="c-footer__nav-link"
                  href="${item.link}"
                >
                  ${item.title}
                </a>
              `

            )}
          </nav>

          <div class="c-footer__social">
            ${this.socialLinks.map(item =>

              html`
                <a
                  class="c-footer__social-link"
                  href="${item.link}"
                >
                  <img src="/icons/social/${item.service}.svg">
                </a>
              `

            )}
          </div>
        </div>
      </div>
    `

  }

}


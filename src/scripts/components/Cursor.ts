//
// component - cursor
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

import {
  ref,
  createRef
} from 'lit/directives/ref'

import gsap from 'gsap'

declare global {
  interface HTMLElementTagNameMap {
    'c-cursor': Cursor,
  }
}

interface cursorPosition {
  'cursorX': number,
  'cursorY': number,
  'currentX': number,
  'currentY': number
}

@customElement('c-cursor')

export class Cursor extends LitElement {

  static styles = css`
    :host {
      --cursor-size: 1.5rem;

      display: block;
      height: var(--cursor-size);
      left: calc(var(--cursor-size) / 2 * -1);
      pointer-events: none;
      position: fixed;
      top: calc(var(--cursor-size) / 2 * -1);
      width: var(--cursor-size);
      will-change: transform, opacity;
    }

    .c-cursor__inner {
      background-color: var(--color-platinum);
      border: solid 1px var(--color-dark-gray);
      border-radius: var(--cursor-size);
      height: 100%;
      opacity: 0.4;
      transform: scale(1);
      width: 100%;
      will-change: transform, opacity;
    }
  `

  @property({
    type: Object,
    attribute: true,
    reflect: true
  })
  position:cursorPosition

  @property({
    type: String,
    attribute: true,
    reflect: true
  })
  css:string

  innerEl = createRef<HTMLDivElement>()

  private _set = gsap.quickSetter(this, 'css')
  private _speed = 0.1
  private _delta:number
  private _targets:NodeList

  private _enterStyles = {
    duration: 0.8,
    scale: 1.5,
    opacity: 0.5
  }

  private _leaveStyles = {
    duration: 0.8,
    scale: 1,
    opacity: 1
  }

  setViewport():void {

    this.position.currentX = window.innerWidth / 2
    this.position.currentY = window.innerHeight / 2

  }

  handleEnter(e):void {

    gsap.to(
      this.innerEl.value,
      this._enterStyles
    )

  }

  handleLeave(e):void {

    gsap.to(
      this.innerEl.value,
      this._leaveStyles
    )

  }

  refresh():void {

    if (this._targets) {

      this._targets.forEach(el => {

        el.removeEventListener(
          'mouseenter', this.handleEnter
        )

        el.removeEventListener(
          'mouseleave', this.handleLeave
        )

      })

    }

    this._targets = document.querySelectorAll(
      '.js-cursor-target'
    )

    if (this._targets) {

      this._targets.forEach(el => {

        el.addEventListener(
          'mouseenter', this.handleEnter.bind(this)
        )

        el.addEventListener(
          'mouseleave', this.handleLeave.bind(this)
        )

      })

    }


  }

  constructor() {

    super()

    this.position = {
      currentX: 0,
      currentY: 0,
      cursorX: 0,
      cursorY: 0
    }

    this.setViewport()

    this.position.cursorX =
      this.position.currentX

    this.position.cursorY =
      this.position.currentY

    window.addEventListener(
      'resize', () => {

        this.setViewport()

      }
    )

  }

  firstUpdated():void {

    window.addEventListener('mousemove', e => {

      this.position.cursorX = e.x
      this.position.cursorY = e.y

    })

    gsap.ticker.add(() => {

      this._delta = 1.0 - Math.pow(
        1.0 - this._speed,
        gsap.ticker.deltaRatio()
      )

      this.position.currentX +=
        (this.position.cursorX - this.position.currentX) *
        this._delta

      this.position.currentY +=
        (this.position.cursorY - this.position.currentY) *
        this._delta


      this._set({
        x: this.position.currentX,
        y: this.position.currentY
      })

    })


    this.refresh()

    gsap.set(
      this.innerEl.value,
      { scale: 1 }
    )

  }

  protected render():TemplateSpecification {

    return html`
      <div
        class='c-cursor__inner'
        ${ref(this.innerEl)}
      ></div>
    `

  }

}

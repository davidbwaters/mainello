import { gsap } from 'gsap'
import { EventEmitter } from 'events'
import {
  lerp,
  getMousePos,
  calcWinsize,
  distance
} from './utils'

// Calculate the viewport size
let winsize = calcWinsize()

window.addEventListener(
  'resize',
  () => (winsize = calcWinsize())
)

// Track the mouse position
let mousepos = { x: 0, y: 0 }

window.addEventListener(
  'mousemove',
  ev => (mousepos = getMousePos(ev))
)

export default class ButtonControl extends EventEmitter {

  DOM
  renderedStyles
  state
  rect
  distanceToTrigger
  onResize

  constructor(el) {

    super()

    this.DOM = { el: el }

    this.DOM.text =
      this.DOM.el.querySelector('.c-button__text')

    this.DOM.textinner = this.DOM.el.querySelector(
      '.c-button__text-inner'
    )
    this.DOM.filler = this.DOM.el.querySelector(
      '.c-button__filler'
    )
    // amounts the button will translate
    this.renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.1 },
      ty: { previous: 0, current: 0, amt: 0.1 }
    }
    // button state (hover)
    this.state = {
      hover: false
    }
    // calculate size/position
    this.calculateSizePosition()

    // init events
    this.initEvents()

    // loop fn
    requestAnimationFrame(() => this.render())

  }

  calculateSizePosition():void {

    this.rect = this.DOM.el.getBoundingClientRect()

    // the movement will take place when the distance from
    // the mouse to the center of the button is lower than
    // this value
    this.distanceToTrigger = this.rect.width * 0.7

  }

  initEvents():void {

    this.onResize = () => {

      setTimeout(() => {

        this.calculateSizePosition()

      }, 400)

    }
    window.addEventListener('resize', this.onResize)

  }

  render():void {

    // calculate the distance from the mouse to the center
    // of the button
    const distanceMouseButton = distance(
      mousepos.x + window.scrollX,
      mousepos.y + window.scrollY,
      this.rect.left + this.rect.width / 2,
      this.rect.top + this.rect.height / 2
    )
    // new values for the translations
    let x = 0
    let y = 0

    if (distanceMouseButton < this.distanceToTrigger) {

      if (!this.state.hover) {

        this.enter()

      }
      x =
        (mousepos.x +
          window.scrollX -
          (this.rect.left + this.rect.width / 2)) *
        0.3
      y =
        (mousepos.y +
          window.scrollY -
          (this.rect.top + this.rect.height / 2)) *
        0.3

    }
    else if (this.state.hover) {

      this.leave()

    }

    this.renderedStyles['tx'].current = x
    this.renderedStyles['ty'].current = y

    for (const key in this.renderedStyles) {

      this.renderedStyles[key].previous = lerp(
        this.renderedStyles[key].previous,
        this.renderedStyles[key].current,
        this.renderedStyles[key].amt
      )

    }

    this.DOM.el.style.transform = `translate3d(${this.renderedStyles['tx'].previous}px, ${this.renderedStyles['ty'].previous}px, 0)`
    this.DOM.text.style.transform = `translate3d(${
      -this.renderedStyles['tx'].previous * 0.6
    }px, ${-this.renderedStyles['ty'].previous * 0.6}px, 0)`

    requestAnimationFrame(() => this.render())

  }

  enter():void {

    this.emit('mouseEnter')
    this.state.hover = true
    this.DOM.el.classList.add('c-button--hover')
    gsap.killTweensOf(this.DOM.filler)
    gsap.killTweensOf(this.DOM.textinner)

    gsap
      .timeline()
      .to(this.DOM.filler, 0.5, {
        ease: 'Power3.easeOut',
        startAt: { y: '100%' },
        y: '0%'
      })
      .to(
        this.DOM.textinner,
        0.1,
        {
          ease: 'Power3.easeOut',
          opacity: 0,
          y: '-10%'
        },
        0
      )
      .to(
        this.DOM.textinner,
        0.25,
        {
          ease: 'Power3.easeOut',
          opacity: 1,
          startAt: { y: '30%', opacity: 1 },
          y: '0%'
        },
        0.1
      )

  }

  leave():void {

    this.emit('mouseLeave')
    this.state.hover = false
    this.DOM.el.classList.remove('c-button--hover')

    gsap.killTweensOf(this.DOM.filler)
    gsap.killTweensOf(this.DOM.textinner)

    gsap
      .timeline()
      .to(this.DOM.filler, {
        duration: 0.4,
        ease: 'Power3.easeOut',
        y: '-100%'
      })
      .to(
        this.DOM.textinner,
        {
          duration: 0.4,
          ease: 'Power3.easeOut',
          y: '10%'
        },
        0
      )
      .to(
        this.DOM.textinner,
        {
          duration: 0.4,
          ease: 'Power3.easeOut',
          opacity: 1,
          startAt: { y: '-30%', opacity: 1 },
          y: '0%'
        },
        0.1
      )

  }

}

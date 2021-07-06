//
// main
//

import '../stylesheets/app.scss'
import '../stylesheets/home.scss'

import ASScroll from '@ashthornton/asscroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

async function onInit() {

  await import('./components/Intro')
  await import('./components/Navbar')
  await import('./components/NavMenu')

  await import('./components/Rings')
  await import('./components/Curves')
  await import('./components/ScrollingTags')

  await import('./components/Button')
  await import('./components/FluidReveal')
  await import('./components/BlogPost')

}

function scrollSetup() {

  gsap.registerPlugin(ScrollTrigger)

  const scrollContainer: HTMLElement =
    document.querySelector('.js-scroll-container')

  const isTouch = 'ontouchstart' in document.documentElement

  const asscroll = new ASScroll({
    containerElement: scrollContainer,
    disableRaf: true
  })

  gsap.ticker.add(asscroll.update)

  ScrollTrigger.defaults({
    scroller: asscroll.containerElement
  })

  ScrollTrigger.scrollerProxy(asscroll.containerElement, {
    scrollTop(value) {

      return arguments.length
        ? (asscroll.currentPos = value)
        : asscroll.currentPos

    },
    getBoundingClientRect() {

      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      }

    }
  })

  asscroll.on('update', ScrollTrigger.update)

  ScrollTrigger.addEventListener(
    'refresh', asscroll.resize
  )

  window.addEventListener(

    'enableScroll', () => {

      asscroll.enable()

    }

  )

}

function onRouteChange() {

  scrollSetup()

}

onInit()
onRouteChange()

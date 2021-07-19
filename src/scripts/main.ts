//
// main
//

import '../stylesheets/app.scss'
import '../stylesheets/home.scss'

import ASScroll from '@ashthornton/asscroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

let asscroll

const navMenuEl = document.querySelector(
  'c-nav-menu'
)

async function onInit() {

  setTimeout(() => {

    document.body.style.opacity = '1'

  }, 1000)

  await import('./components/BlogPost')
  await import('./components/Button')
  await import('./components/ContactFab')
  await import('./components/Curves')
  await import('./components/FluidReveal')
  await import('./components/Footer')
  await import('./components/Intro')
  await import('./components/Navbar')
  await import('./components/NavMenu')
  await import('./components/PageHeader')
  await import('./components/Rings')
  await import('./components/ScrollingTags')
  await import('./components/SectionTitle')

  await import('./components/Article')
  await import('./components/FeaturedImage')
  await import('./components/FeaturedVideo')
  await import('./components/ImageRow')
  await import('./components/ImageText')
  await import('./components/LabeledText')
  await import('./components/OffsetColumns')
  await import('./components/Pattern')
  await import('./components/StatColumns')
  await import('./components/DynamicContent')

}

async function handlePageLoad() {

  scrollSetup()
  await onInit()

  setTimeout(() => {

    asscroll.resize()
    ScrollTrigger.refresh()


  }, 1000)

}

function scrollSetup() {

  gsap.registerPlugin(ScrollTrigger)

  const isTouch = 'ontouchstart' in document.documentElement

  asscroll = new ASScroll({
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

  asscroll.enable()

}

function barbaSetup() {

  barba.use(barbaPrefetch)

  barba.hooks.afterEnter(data => {

    console.log('after enter all')
    //handlePageLoad()

    asscroll.disable()

    setTimeout(() => {

      asscroll.enable({
        newScrollElements:
          document.querySelectorAll('[asscroll]'),
        reset: true
      })
      asscroll.resize()

      ScrollTrigger.refresh()

    }, 400)


  })

  barba.init({

    debug: true,
    views: [{
      namespace: 'home',
      afterEnter(data) {

        console.log('after enter home')

      }
    }],
    transitions: [{
      name: 'default-transition',
      leave(data):any {

        if (navMenuEl.open) {

          navMenuEl.handleToggle()

        }

        return gsap.fromTo(data.current.container, {
          opacity: 1
        },
        {
          opacity: 0,
          duration: 0.8
        })

      },
      enter(data):any {

        data.current.container
          .style.position = 'absolute'

        return gsap.fromTo(
          data.next.container,
          {
            opacity: 0
          },
          {
            opacity: 1,
            duration: 0.8
          }
        )

      }
    }]

  })

}


window.addEventListener(

  'load', () => {

    console.log('load')

    //ScrollTrigger.refresh()
    handlePageLoad()

    barbaSetup()

  }

)


//scrollSetup()
//onInit()
//onRouteChange()

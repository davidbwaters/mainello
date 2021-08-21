//
// main
//

import '../stylesheets/app.scss'
import '../stylesheets/home.scss'

import 'intersection-observer'
import ASScroll from '@ashthornton/asscroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

declare global {
  interface Window {
    p5: any
  }
}

let asscroll

const navbarEl = document.querySelector('c-navbar')

async function onInit() {

  Promise.all([
    import('./components/ContactFab'),
    import('./components/Cursor'),
    import('./components/Footer'),
    import('./components/Navbar'),
    import('./components/Rings'),
    import('./components/Intro'),
    import('./components/BlogPost'),
    import('./components/Button'),
    import('./components/FluidReveal'),
    import('./components/LottieAnimation')
  ])

  setTimeout(() => {

    if (document.querySelector('c-intro') === null) {

      document.body.style.opacity = '1'

    }

  }, 1000)

  Promise.all([
    import('./components/NavMenu'),
    import('./components/PageHeader'),
    import('./components/ScrollingTags'),
    import('./components/SectionTitle'),
    import('./components/Article'),
    import('./components/BounceTitle'),
    import('./components/FeaturedImage'),
    import('./components/FeaturedVideo'),
  ])

  Promise.all([
    import('./components/ImageRow'),
    import('./components/ImageText'),
    import('./components/LabeledText'),
    import('./components/LiquidTitle'),
    import('./components/OffsetColumns'),
    import('./components/Pattern'),
    import('./components/StatColumns'),
    import('./components/Toggle'),
    import('./components/WarpText'),
    import('./components/DynamicContent')
  ])

}

async function handlePageLoad() {

  scrollSetup()

  await onInit()

  setTimeout(() => {

    asscroll.resize()
    ScrollTrigger.refresh()
    wrapLinks()
    prepVideos()

  }, 1000)

}

function scrollSetup() {

  const scrollContainer = document.querySelector(
    '[data-scroll-container]'
  )

  gsap.registerPlugin(ScrollTrigger)

  asscroll = new ASScroll({
    disableRaf: true,
    containerElement: scrollContainer
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

  ScrollTrigger.addEventListener('refresh', asscroll.resize)

  asscroll.enable()

}

function prepVideos() {

  const videos = document.querySelectorAll('video')

  if (videos) {


    videos.forEach((vid:HTMLVideoElement) => {

      console.log(vid)
      vid.play()

    })

  }

  const slowVids = document.querySelectorAll('.js-video-slow')

  if (slowVids) {

    slowVids.forEach((vid:HTMLVideoElement) => {

      vid.playbackRate = 0.5

    })

  }

}

function wrapLinks() {

  const links = document.querySelectorAll('a')

  links.forEach(a => {

    if (a.children.length === 0) {

      a.dataset.text = a.innerText

    }

  })

}

function barbaSetup() {

  barba.use(barbaPrefetch)
  barba.hooks.afterEnter(data => {

    console.log('after enter all')
    asscroll.disable()

    setTimeout(() => {

      asscroll.enable({
        newScrollElements:
          document.querySelectorAll('[asscroll]'),
        reset: true
      })
      asscroll.resize()

      ScrollTrigger.refresh()
      prepVideos()

    }, 1000)


  })

  barba.init({
    debug: true,
    timeout: 5000,
    views: [
      {
        namespace: 'home',
        afterEnter(data) {

          console.log('after enter home')

        }
      }
    ],
    transitions: [
      {
        name: 'default-transition',
        leave(data):any {

          if (navbarEl.open) {

            navbarEl.handleToggle()

          }

          return gsap.fromTo(
            data.current.container,
            {
              opacity: 1
            },
            {
              opacity: 0,
              duration: 0.6
            }
          )

        },
        enter(data):any {

          data.current.container.style.position = 'absolute'

          return gsap.fromTo(
            data.next.container,
            {
              opacity: 0
            },
            {
              opacity: 1,
              duration: 0.6
            }
          )

        }
      }
    ]
  })

}

window.addEventListener('load', () => {

  console.log('page load')

  handlePageLoad()

  barbaSetup()

})

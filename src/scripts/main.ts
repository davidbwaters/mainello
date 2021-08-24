//
// main
//

import '../stylesheets/app.scss'
import '../stylesheets/home.scss'

import 'intersection-observer'
import LocomotiveScroll from 'locomotive-scroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'
import 'shader-doodle'

declare global {
  interface Window {
    p5: any
  }
}


interface scrollerElType extends HTMLDivElement {
  scroller: LocomotiveScroll,
}


const navbarEl = document.querySelector('c-navbar')

async function onInit() {

  Promise.all([
    import('./components/ContactFab'),
    import('./components/Cursor'),
    import('./components/Footer'),
    import('./components/Navbar'),
    // import('./components/Rings'),
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
    import('./components/FeaturedVideo')
  ])

  Promise.all([
    import('./components/ImageRow'),
    import('./components/ImageText'),
    import('./components/LabeledContent'),
    import('./components/LiquidTitle'),
    import('./components/OffsetColumns'),
    import('./components/Pattern'),
    import('./components/StatColumns'),
    import('./components/Toggle'),
    import('./components/WarpText'),
    import('./components/DynamicContent')
  ])

}

let scrollerEl:scrollerElType

function scrollSetup() {

  scrollerEl = document.querySelector(
    '[data-scroll-container]'
  )
  scrollerEl.scroller = new LocomotiveScroll({
    el: scrollerEl,
    smooth: true,
    tablet: { smooth: true },
    smartphone: { smooth: true }
  })

  gsap.registerPlugin(ScrollTrigger)

  scrollerEl.scroller.on('scroll', ScrollTrigger.update)
  scrollerEl.scroller.on('scroll', () => {

    const scrollerEl:HTMLDivElement = document
      .querySelector(
        '[data-scroll-container]'
      )

  })

  ScrollTrigger.scrollerProxy(
    '[data-scroll-container]', {
      scrollTop(value) {

        return arguments.length
          ? scrollerEl.scroller.scrollTo(value, 0, 0)
          : scrollerEl.scroller.scroll.instance.scroll.y

      },
      getBoundingClientRect() {

        return {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }

      }
    }
  )


  ScrollTrigger.addEventListener(
    'refresh',
    () => scrollerEl.scroller.update()
  )


  ScrollTrigger.refresh()

}

const addParallax = () => {

  let parallaxEls = Array.from(document.querySelectorAll(
    '[data-parallax-mask]')
  )
  const dyn = document.querySelector('c-dynamic-content')

  if (dyn) {

    parallaxEls = [...parallaxEls, ...Array.from(
      dyn.shadowRoot
        .querySelectorAll('[data-parallax-mask]')
    )]

  }
  console.log(parallaxEls)
  parallaxEls.forEach(el => {

    gsap.set(el, {
      scale: 1.4,
      y: '-20%'
    })
    ScrollTrigger.create({
      trigger: el,
      scroller: scrollerEl,
      start: 'top bottom',
      end: '+80%',
      animation: gsap.to(
        el,
        {
          scale: 1,
          y: '0%'
        }
      ),
      scrub: 2
      // markers: true
    })

  })

}
function prepVideos() {

  const videos = document.querySelectorAll('video')

  if (videos) {


    videos.forEach((vid:HTMLVideoElement) => {

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


async function handlePageLoad() {

  scrollSetup()

  await onInit()

  setTimeout(() => {

    wrapLinks()
    prepVideos()
    addParallax()

  }, 1000)

}

function barbaSetup() {

  barba.use(barbaPrefetch)

  barba.hooks.beforeEnter(data => {

    scrollerEl.scroller.scrollTo('top', { duration: 0 })

  })

  barba.hooks.afterEnter(data => {


    scrollerEl.scroller.scrollTo('top', {
      duration: 0,
      disableLerp: true
    })

    scrollerEl.scroller.update()

    console.log('after enter all')

    setTimeout(() => {

      scrollerEl.scroller.update()

      ScrollTrigger.refresh()

      scrollerEl.scroller.update()

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

//
// main
//

import '../stylesheets/app.scss'
import '../stylesheets/home.scss'

import 'intersection-observer'
import lottie from 'lottie-web'
import LocomotiveScroll from 'locomotive-scroll'
import { gsap } from 'gsap'
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
    import('./components/FeaturedImage'),
    import('./components/FeaturedVideo'),
    import('./components/Diagram')
  ])

  Promise.all([
    import('./components/Blockquote'),
    import('./components/ImageRow'),
    import('./components/ImageText'),
    import('./components/LabeledContent'),
    import('./components/LiquidTitle'),
    import('./components/OffsetColumns'),
    import('./components/Pattern'),
    import('./components/StatColumns'),
    import('./components/Toggle'),
    import('./components/WarpText')
  ])

  Promise.all([
    import('./components/ServicesLists'),

    import('./components/Next'),
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
    () => {

      scrollerEl.scroller.update()

    }
  )

  ScrollTrigger.addEventListener(
    'resize',
    () => {

      ScrollTrigger.refresh()

    }

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
  // console.log(parallaxEls)
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

function handleForms() {


  const contactForm:HTMLFormElement = document

    .querySelector(
      '.js-contact-form'
    )

  if (contactForm) {

    const serialize = function(form) {

      let field
      let l
      const s = []

      if (
        typeof form === 'object' &&
        form.nodeName.toLowerCase() === 'form'
      ) {

        const len = form.elements.length

        for (let i = 0; i < len; i++) {

          field = form.elements[i]
          if (
            field.name &&
            !field.disabled &&
            field.type !== 'button' &&
            field.type !== 'file' &&
            field.type !== 'hidden' &&
            field.type !== 'reset' &&
            field.type !== 'submit'
          ) {

            if (field.type === 'select-multiple') {

              l = form.elements[i].options.length

              for (let j = 0; j < l; j++) {

                if (field.options[j].selected) {

                  s[s.length] =
                    encodeURIComponent(field.name) +
                    '=' +
                    encodeURIComponent(
                      field.options[j].value
                    )

                }

              }

            }
            else if (
              (field.type !== 'checkbox' &&
                field.type !== 'radio') ||
              field.checked
            ) {

              s[s.length] =
                encodeURIComponent(field.name) +
                '=' +
                encodeURIComponent(field.value)

            }

          }

        }

      }
      return s.join('&').replace(/%20/g, '+')

    }

    contactForm.addEventListener('submit', (e) => {

      e.preventDefault()

      const theForm = e.currentTarget

      const target = e.target as HTMLElement

      const formData =
        'form-name=' +
        target.getAttribute('name') +
        '&' +
        serialize(theForm)

      console.log(formData)

      const options = {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded'
        },
        body: formData
      }

      fetch('/', options)
        .then(function(response) {

          console.log(response)

          handleConfirm()

        })
        .catch(function(error) {

          console.log(error)

        })

    })

  }

  const confirmOverlayEl:HTMLDivElement =
   document.querySelector(
     '.js-confirm-overlay'
   )

  const confirmAnimationEl = document.querySelector(
    '.js-confirm-animation'
  )

  const confirmAnimation = lottie.loadAnimation({
    container: confirmAnimationEl,
    renderer: 'canvas',
    loop: false,
    autoplay: false,
    path: '/animations/mail.json',
    rendererSettings: {
      preserveAspectRatio: 'none'
    }
  })

  function handleConfirm() {

    confirmOverlayEl.dataset.hidden = 'false'

    confirmAnimation.goToAndPlay(1, true)

    confirmAnimation.onComplete = () => {

      setTimeout(() => {

        confirmOverlayEl.dataset.hidden = 'true'
        contactForm.reset()

      }, 5000)

    }

  }


  [].slice
    .call(
      document.querySelectorAll('.js-input')
    )
    .forEach(function(inputEl) {

      console.log(inputEl)

      if (inputEl.value.trim() !== '') {

        if (
          inputEl.tagName.toLowerCase() === 'textarea'
        ) {

          inputEl.parentElement.parentElement
            .dataset.filled = true

        }
        else {

          inputEl.parentElement.dataset.filled = true

        }

      }

      inputEl.addEventListener('focus', onInputFocus)
      inputEl.addEventListener('blur', onInputBlur)

    })

  function onInputFocus(e) {

    console.log('oooo')

    if (
      e.target.tagName.toLowerCase() === 'textarea'
    ) {

      e.target.parentElement.parentElement
        .dataset.focus = true
      e.target.parentElement.parentElement
        .dataset.filled = true

    }
    else {

      e.target.parentElement.dataset.focus = true
      e.target.parentElement.dataset.filled = true

    }

  }

  function onInputBlur(e) {

    if (
      e.target.tagName.toLowerCase() === 'textarea'
    ) {

      e.target.parentElement.parentElement
        .dataset.focus = false

      if (e.target.value.trim() === '') {

        e.target.parentElement.parentElement
          .dataset.filled = false

      }

    }
    else {

      e.target.parentElement.dataset.focus = false

      if (e.target.value.trim() === '') {

        e.target.parentElement.dataset.filled = false

      }

    }


  }

}


async function handlePageLoad() {

  scrollSetup()

  await onInit()

  setTimeout(() => {

    handleForms()
    wrapLinks()
    prepVideos()
    addParallax()

  }, 1000)

}

function barbaSetup() {

  barba.use(barbaPrefetch)

  barba.hooks.beforeEnter(data => {

    const cursor = document.querySelector('c-cursor')


    if (cursor) {

      document.body.removeChild(
        cursor
      )

    }

    scrollerEl.scroller.scrollTo('top', { duration: 0 })

    const contactFab = document.querySelector('c-contact-fab')


    if (contactFab) {

      document.body.removeChild(
        contactFab
      )

    }

  })

  barba.hooks.afterEnter(data => {

    const cursor = document.querySelector('c-cursor')

    if (!cursor) {

      document.body.appendChild(
        document.createElement('c-cursor')
      )

    }

    scrollerEl.scroller.scrollTo('top', {
      duration: 0,
      disableLerp: true
    })

    ScrollTrigger.refresh()


    setTimeout(() => {

      ScrollTrigger.refresh()

      prepVideos()

    }, 2000)

    console.log('after enter all')

    handleForms()

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

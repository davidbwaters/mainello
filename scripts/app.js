//
// main
//

import LocomotiveScroll from 'locomotive-scroll'

import gsap from 'gsap'

import lottie from 'lottie-web'

//import ScrollTrigger from 'gsap/ScrollTrigger'


// init

gsap.registerPlugin(ScrollTrigger)


// smooth scroll setup

const smoothScrollSetup = () => {

  const scrollerEl = document.querySelector('.smooth-scroll')
  const scroller = new LocomotiveScroll({
    el: scrollerEl,
    smooth: true
  })

  scroller.on('scroll', ScrollTrigger.update)

  ScrollTrigger.scrollerProxy('.smooth-scroll', {
    scrollTop(value) {

      return arguments.length
        ? scroller.scrollTo(value, 0, 0)
        : scroller.scroll.instance.scroll.y

    },
    getBoundingClientRect() {

      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight
      }

    }

  })

}


// scrolling tags

const scrollingTagsSetup = () => {

  let scrollingTagsEls = document.querySelectorAll(
    '.c-scrolling-tags'
  )

  if (scrollingTagsEls.length) {

    let scrollingTags = gsap.utils.toArray(
      '.c-scrolling-tags'
    )

    scrollingTags.forEach(el => {

      gsap.to(el, {
        x: () =>
          -(
            el.scrollWidth -
            document.documentElement.clientWidth
          ) + 'px',
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          scroller: '.smooth-scroll',
          invalidateOnRefresh: true,
          scrub: .4,
          end: () => '+=' + el.offsetWidth
        }
      })

    })

  }

}


// fluid reveal

const fluidRevealSetup = () => {

  let animateDuration = 2
  let pinDuration = 5

  let wrapper = document.querySelector('.c-fluid-reveal')

  let fluidRevealEls = document.querySelectorAll(
    '.c-fluid-reveal__item'
  )


  fluidRevealEls = Array.from(fluidRevealEls)

  // console.log(fluidRevealEls)

  wrapper.style.setProperty('--items', fluidRevealEls.length)

  ScrollTrigger.refresh()

  ScrollTrigger.saveStyles([
    '.c-fluid-reveal__item path',
    '.c-fluid-reveal__item .c-fluid-reveal__media',
    '.c-fluid-reveal__item .c-fluid-reveal__content'
  ])

  ScrollTrigger.matchMedia({

    // desktop
    '(min-width: 800px)': function() {


      setTimeout(() => {

        let count = 1

        let tl = gsap.timeline({
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            scroller: '.smooth-scroll',
            start: 'top top ',
            pin: true,
            pinSpacing: false,
            end: 'bottom bottom',
            scrub: 0.4,
            markers: true
          }
        })

        fluidRevealEls.forEach(el => {

          let wobble = el.querySelector('#wobble-' + count)
          let media = el.querySelector('.c-fluid-reveal__media')
          let content = el.querySelector('.c-fluid-reveal__content')


          wobble.style = ''
          content.style = ''

          if (count > 1) {

            tl.from(
              wobble,
              {
                duration: animateDuration,
                xPercent: 100,
                yPercent: 100
              },
              '-=' + animateDuration
            )

          }
          else {

            tl.from(wobble, {
              duration: animateDuration,
              xPercent: 100,
              yPercent: 100
            })

          }

          tl.from(
            content,
            {
              duration: animateDuration,
              opacity: 0,
              yPercent: 100
            },
            '-=' + animateDuration
          ).to(el, {
            duration: pinDuration
          })

          if (count < fluidRevealEls.length) {

            tl.to(
              content,
              {
                duration: animateDuration,
                opacity: 0,
                yPercent: -100
              },
              '-=' + animateDuration
            )

          }

          count++


          ScrollTrigger.update()

        })

        count = 1

      }, 2000)


    },


    '(max-width: 800px)': function() {
    }

  })

}


window.addEventListener('DOMContentLoaded', () => {

  setTimeout(() => {

    smoothScrollSetup()

    scrollingTagsSetup()

    fluidRevealSetup()

    ScrollTrigger.refresh()

  }, 500)

})

window.addEventListener('resize', () => {


  setTimeout(() => {

    console.log('rf')

    ScrollTrigger.update()

  }, 500)

})


// nav menu

let navMenuOpen = false
let navMenuSpeed = 1.5
//let navMenuBackgroundSpeed = .1

window.addEventListener('DOMContentLoaded', () => {

  const menuButton = document.querySelector(
    '.c-navbar__menu-button'
  )

  const menuAnimationWrapper = document.querySelector(
    '.c-nav-menu__animation'
  )

  const menuWrapper = document.querySelector('.c-nav-menu')

  //const menuBackground = document.querySelector(
  //  '.c-nav-menu__background'
  //)

  /*
  const menuBackgroundAnimation = lottie.loadAnimation({
    container: menuBackground,
    renderer: 'canvas',
    loop: true,
    autoplay: false,
    path: 'animations/rain.json',
    rendererSettings: {
      preserveAspectRatio: 'none'
    }
  })
  */

  const menuAnimation = lottie.loadAnimation({
    container: menuAnimationWrapper,
    renderer: 'canvas',
    loop: false,
    autoplay: false,
    path: 'animations/stripes-alt-2.json',
    rendererSettings: {
      preserveAspectRatio: 'none'
    }
  })

  const handleNavMenu = () => {

    if (!navMenuOpen) {

      navMenuOpen = true
      lottie.setSpeed(navMenuSpeed)
      menuAnimation.setDirection(1)
      menuAnimation.goToAndPlay(1, true)
      setTimeout(() => {

        menuWrapper.classList.toggle('is-active')

        //lottie.setSpeed(navMenuBackgroundSpeed)
        //menuBackgroundAnimation.play()

      }, 200)

    }
    else {

      navMenuOpen = false
      //menuBackgroundAnimation.stop()
      menuAnimation.setDirection(-1)

      lottie.setSpeed(navMenuSpeed)
      menuAnimation.goToAndPlay(
        menuAnimation.lastFrame,
        true
      )

      setTimeout(() => {

        menuWrapper.classList.toggle('is-active')

      }, 800)

    }

  }

  menuButton.addEventListener('click', handleNavMenu)

})


// love

console.log('♥️')

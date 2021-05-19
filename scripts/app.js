//
// main
//

import gsap from 'gsap'

import lottie from 'lottie-web'

import p5 from 'p5'

import { inViewport } from './modules/inViewport'

import barba from '@barba/core'


// init

gsap.registerPlugin(ScrollTrigger)


// contact fab

const contactFabSetup = () => {


  const contactFab = document.querySelector(
    '.c-contact-fab'
  )

  if (contactFab) {

    const footer = document.querySelector('.c-footer')

    let rotateEl = document.querySelector(
      '.c-contact-fab__spinning'
    )

    let rotateDuration = 16

    let rotate = gsap.to(rotateEl, {
      rotation: 360,
      duration: rotateDuration,
      onReverseComplete() {

        this.totalTime(rotateDuration * 100)

      },
      repeat: -1,
      ease: 'linear'
    })

    let scrollTop
    let contentHeight
    let progress = 0
    let rounds = 0
    let clamp = gsap.utils.clamp(-50, 50)

    ScrollTrigger.create({
      onUpdate: self => {

        scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop
        contentHeight =
          Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
          ) - window.innerHeight
        rounds = Math.floor(
          contentHeight / window.innerHeight
        )
        progress =
          Math.floor((scrollTop / contentHeight) * 100) *
          rounds

        // console.log(
        //  clamp((self.getVelocity() / 100) * 0.5)
        // )

        rotate.timeScale(clamp(self.getVelocity() / 100))
        gsap.to(rotate, {
          timeScale: self.direction,
          duration: 0.3,
          overwrite: true,
          ease: 'power1.inOut'
        })

      }
    })

    gsap.set(rotateEl, {
      transformOrigin: 'center center',
      force3D: true
    })


    let footerVisible = false

    inViewport(footer, el => {

      if (el.isIntersecting) {

        footerVisible = true
        contactFab.classList.toggle('u-transparent')

      }
      else {

        if (footerVisible) {

          contactFab.classList.toggle('u-transparent')

        }

      }

    })

  }

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
          invalidateOnRefresh: true,
          scrub: 0.4,
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

  if (wrapper) {


    let fluidRevealEls = document.querySelectorAll(
      '.c-fluid-reveal__item'
    )

    fluidRevealEls = Array.from(fluidRevealEls)

    // console.log(fluidRevealEls)

    wrapper.style.setProperty(
      '--items',
      fluidRevealEls.length
    )

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
              start: 'top top ',
              pin: true,
              pinSpacing: false,
              end: 'bottom bottom',
              scrub: 0.4
              //markers: true
            }
          })

          fluidRevealEls.forEach(el => {

            let wobble = el.querySelector('#wobble-' + count)
            let media = el.querySelector(
              '.c-fluid-reveal__media'
            )
            let content = el.querySelector(
              '.c-fluid-reveal__content'
            )

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

      '(max-width: 800px)': function() {}
    })

  }

}

// on load
window.addEventListener('DOMContentLoaded', () => {

  setTimeout(() => {

    scrollingTagsSetup()

    fluidRevealSetup()

    contactFabSetup()

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
    path: '/animations/stripes-alt-2.json',
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


// footer

const fabricSketch = sketch => {

  let theShader

  sketch.preload = () => {

    theShader = sketch.loadShader(
      '/scripts/shaders/fabric.vert',
      '/scripts/shaders/fabric.frag'
    )

  }

  sketch.setup = () => {

    const footerInnerEl = document.querySelector(
      '.c-footer__inner'
    )

    let footerSize = footerInnerEl.getBoundingClientRect()

    let canvas = sketch.createCanvas(
      footerSize.width,
      footerSize.height,
      sketch.WEBGL
    )

    sketch.windowResized = () => {

      footerSize = footerInnerEl.getBoundingClientRect()

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

const fabric = new p5(fabricSketch)



// barba

barba.init({
  // ...
})


// love

console.log('♥️')

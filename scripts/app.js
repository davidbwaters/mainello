//
// main
//

console.log('♥️')

import lottie from 'lottie-web'



// nav menu

let navMenuOpen = false
let navMenuSpeed = 1.5
let navMenuBackgroundSpeed = .1


window.addEventListener('DOMContentLoaded', () => {

  const menuButton = document.querySelector(
    '.c-navbar__menu-button'
  )

  const menuAnimationWrapper = document.querySelector(
    '.c-nav-menu__animation'
  )

  const menuWrapper = document.querySelector(
    '.c-nav-menu'
  )

  const menuBackground = document.querySelector(
    '.c-nav-menu__background'
  )

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
      menuAnimation.goToAndPlay(
        1, true
      )
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
        menuAnimation.lastFrame, true
      )

      setTimeout(() => {
        menuWrapper.classList.toggle('is-active')
      }, 800)
    }

  }


  menuButton.addEventListener(
    'click', handleNavMenu
  )

})



// contact fab

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let rotateEl = document.querySelector(
    '.c-contact-fab__spinning'
  )
let rotateDuration = 16

let rotate = gsap.to(rotateEl, {
  rotation: 360,
  duration: rotateDuration,
  onReverseComplete() {
    this.totalTime(rotateDuration * 100) // loop in reverse
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
    rounds = Math.floor(contentHeight / window.innerHeight)
    progress =
      Math.floor((scrollTop / contentHeight) * 100) * rounds

    // console.log(clamp((self.getVelocity() / 100) * 0.5))
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



// scrolling tags


window.addEventListener('DOMContentLoaded', () => {

  let scrollingTagsEls = document.querySelectorAll(
    '.c-scrolling-tags'
  )

  if (scrollingTagsEls.length) {

    let scrollingTags = gsap.utils
      .toArray('.c-scrolling-tags')

    scrollingTags.forEach(el => {

      gsap.to(el, {
        x: () => -(
          el.scrollWidth -
          document.documentElement.clientWidth
        ) + 'px',
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          invalidateOnRefresh: true,
          scrub: 1,
          end: () => '+=' + el.offsetWidth
        }
      })

    })

  }

})




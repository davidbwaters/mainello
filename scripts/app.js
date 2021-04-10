//
// main
//

console.log('♥️')

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let rotateEl = document.querySelector(
    '.c-contact-fab__spinning'
  ),
  rotateDuration = 16

let rotate = gsap.to(rotateEl, {
  rotation: 360,
  duration: rotateDuration,
  onReverseComplete() {
    this.totalTime(rotateDuration * 100) // loop in reverse
  },
  repeat: -1,
  ease: 'linear'
})

let scrollTop,
  contentHeight,
  progress = 0,
  rounds = 0,
  clamp = gsap.utils.clamp(-50, 50)

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

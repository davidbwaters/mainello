//
// main
//

import gsap from 'gsap'

import lottie from 'lottie-web'

import p5 from 'p5'

import { inViewport } from './modules/inViewport'

import barba from '@barba/core'

import barbaPrefetch from '@barba/prefetch'


// scrolltrigger init

gsap.registerPlugin(ScrollTrigger)


// intro animation

const introSetup = () => {

  let introWrapper = document.querySelector(
    '.c-intro'
  )

  let introBackground = document.querySelector(
    '.c-intro__background'
  )

  let sketchAnimationInner = document.querySelector(
    '.c-sketch-animation__inner'
  )

  let introBlocks = [
    ...document.querySelectorAll(
      '.c-intro__block-inner'
    ),
    sketchAnimationInner
  ]

  if (introWrapper) {

    let sketchAnimation = lottie.loadAnimation({
      container: sketchAnimationInner,
      renderer: 'canvas',
      loop: false,
      autoplay: false,
      path: 'animations/sketch.json'
    })

    sketchAnimation.onComplete = () => {

      gsap.to(introBlocks, {
        duration: 0.4,
        y: '-110%',
        onComplete: () => {
        }
      })

      gsap.to(introWrapper, {
        duration: 0.2,
        opacity: 0
      })

      setTimeout(() => {

        introWrapper.style.display = 'none'

      }, 1200)


      document.body.style.position = ''

    }

    let backgroundAnimation = lottie.loadAnimation({
      container: introBackground,
      renderer: 'canvas',
      loop: false,
      autoplay: false,
      path: 'animations/paint.json',
      rendererSettings: {
        preserveAspectRatio: 'none'
      }
    })

    backgroundAnimation.onComplete = () => {

      gsap.to(introBlocks, {
        duration: 0.4,
        x: '0%',
        onComplete: () => {

          lottie.setSpeed(3)

          setTimeout(() => {

            sketchAnimation.play()

          }, 400)

        }
      })

    }

    lottie.setSpeed(2)

    document.body.style.position = 'fixed'
    backgroundAnimation.play()


  }

}


// rings animation

const ringsSetup = () => {

  let ringsWrapper = document.querySelector('#c-rings__inner')

  let ringsFrameRate

  if (ringsWrapper) {

    let ringsCanvas = ringsWrapper.getBoundingClientRect()

    ringsFrameRate = 60

    let ringsSketch = (sketch) => {

      let nPoints = 10
      let nCircles = 10
      let minRadius
      let maxRadius

      let noiseScale

      let t = 0
      let speed = 0.045

      sketch.setup = () => {

        let canvas = sketch.createCanvas(
          ringsCanvas.width,
          ringsCanvas.height
        )

        function setSize() {

          if (sketch.width < sketch.height) {

            noiseScale = sketch.width * 0.12
            maxRadius = sketch.width * 0.45

          }
          else {

            noiseScale = sketch.height * 0.12
            maxRadius = sketch.height * 0.45

          }

        }

        sketch.windowResized = () => {

          ringsCanvas = ringsWrapper.getBoundingClientRect()

          sketch.resizeCanvas(
            ringsCanvas.width,
            ringsCanvas.height
          )

          setSize()

        }

        canvas.parent('c-rings__inner')
        sketch.pixelDensity(sketch.displayDensity())
        setSize()

        minRadius = 0
        sketch.background(255)

      }

      sketch.draw = () => {

        sketch.frameRate(ringsFrameRate)
        sketch.noStroke()
        sketch.fill(255, 40)
        sketch.rect(0, 0, sketch.width, sketch.height)

        sketch.translate(
          sketch.width / 2, sketch.height / 2
        )
        sketch.noFill()
        sketch.stroke(114, 180, 174)

        for (let i = 0; i < nCircles; i++) {

          sketch.strokeWeight(
            sketch.map(i, 0, nCircles, 1, 5)
          )

          let radius = sketch
            .map(i, 0, nCircles, minRadius, maxRadius)

          sketch.beginShape()

          for (let j = 0; j < nPoints + 3; j++) {

            let jj = j

            if (j >= nPoints) {

              jj -= nPoints

            }

            let x = (
              radius +
              sketch.noise(t / nPoints + jj) * noiseScale) *
              sketch.cos((sketch.TWO_PI / nPoints) * jj)

            let y = (
              radius +
              sketch.noise(t / nPoints + jj) * noiseScale) *
              sketch.sin((sketch.TWO_PI / nPoints) * jj)

            sketch.curveVertex(x, y)

          }
          sketch.endShape()

        }

        //t += speed

        let velocity =
        sketch.abs(
          sketch.winMouseX - sketch.pwinMouseX
        ) / 150

        //console.log(velocity)

        t += speed + velocity

      }

    }

    let rings = new p5(ringsSketch)

    inViewport(ringsWrapper, el => {

      if (el.isIntersecting) {

        ringsFrameRate = 30

      }
      else {

        ringsFrameRate = 1

      }

    })

  }

}


// curves animation

const curvesSetup = () => {

  let curvesFrameRate

  let curvesInner = document.querySelector(
    '#c-curves__inner'
  )

  if (curvesInner) {

    let curveSketch = sketch => {

      sketch.setup = () => {

        let width = sketch.windowWidth
        let height = sketch.windowHeight

        let canvas = sketch.createCanvas(
          width,
          height
        )

        sketch.windowResized = () => {

          sketch.resizeCanvas(
            sketch.windowWidth,
            sketch.windowHeight
          )

        }

        canvas.parent('c-curves__inner')

        sketch.strokeWeight(1)
        sketch.noFill()
        sketch.background(255)

      }

      sketch.drawPerlinCurve = (
        x, y, phase, step, numCurveVertices
      ) => {

        sketch.push()
        //sketch.stroke(114,180,174, 60)
        sketch.stroke(220, 60)

        let noiseScale = 0.0025

        sketch.beginShape()

        for (let i = 0; i < numCurveVertices; i++) {

          sketch.curveVertex(x, y)
          let angle =
              sketch.TWO_PI *
              sketch.noise(
                x * noiseScale,
                y * noiseScale,
                phase * noiseScale
              )
          x += sketch.cos(angle) * step
          y += sketch.sin(angle) * step

        }

        sketch.endShape()

        sketch.pop()

      }

      sketch.applyFade = () => {

        sketch.push()
        sketch.fill(255, 90)
        //sketch.rect(0, 0, sketch.width, sketch.height)
        sketch.pop()

      }

      sketch.draw = () => {

        sketch.frameRate(curvesFrameRate)
        let STEP = 30
        let numCurveVertices = sketch.floor(
          sketch.width * 1.5 / STEP
        )
        //sketch.applyFade()
        sketch.background(255, 99)

        sketch.push()
        sketch.scale(1)

        let phase = sketch.frameCount / 2
        for (let y = 0; y < sketch.height; y += 30) {

          sketch.drawPerlinCurve(
            sketch.width +
            50, y, phase, STEP, numCurveVertices
          )

        }
        sketch.pop()

      }

    }

    let curves = new p5(curveSketch)

  }

  if (curvesInner) {

    inViewport(curvesInner, el => {

      if (el.isIntersecting) {

        curvesFrameRate = 30

      }
      else {

        curvesFrameRate = 1

      }

    })

  }

}


// contact fab

const contactFabSetup = () => {

  let contactFab = document.querySelector(
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

  let scrollingTags = gsap.utils.toArray(
    '.js-scrolling-tags'
  )

  if (scrollingTags.length) {

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


// autoplay videos

const playInViewSetup = () => {

  const playInViewVids = document.querySelectorAll('.js-play-in-view')

  if (playInViewVids) {

    playInViewVids.forEach(video => {

      let visible

      inViewport(video, el => {

        if (el.isIntersecting) {

          video.muted = true
          video.loop = true
          video.autoplay = true
          video.play()

        }

      })

    })

  }

}


// parallax

const parallaxSetup = () => {

  let parallaxEls = gsap.utils.toArray(
    '.js-parallax'
  )

  if (parallaxEls) {

    let windowHeight = document
      .body
      .getBoundingClientRect()
      .height

    window.addEventListener('resize', () => {

      windowHeight = document
        .body
        .getBoundingClientRect()
        .height

    })

    parallaxEls.forEach(el => {

      gsap.to(el, {
        y: windowHeight * -0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          // start: "top bottom",
          // end: "bottom top",
          scrub: true
        }
      })

    })

  }

}


// nav menu

let navMenuOpen = false

const navMenuSetup = () => {

  let navMenuSpeed = 1.5

  const menuAnimationWrapper = document.querySelector(
    '.js-nav-menu-animation'
  )

  const menuWrapper = document.querySelector(
    '.js-nav-menu'
  )

  const menuButton = document.querySelector(
    '.js-navbar-button'
  )


  const menuButtonAnimation = lottie.loadAnimation({
    container: menuButton,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/animations/nav-button.json'
  })

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

      menuButtonAnimation.setDirection(1)
      menuButtonAnimation.goToAndPlay(1, true)

      setTimeout(() => {

        menuWrapper.classList.toggle('is-active')

      }, 200)

    }
    else {

      navMenuOpen = false

      lottie.setSpeed(navMenuSpeed)

      menuAnimation.setDirection(-1)
      menuAnimation.goToAndPlay(
        menuAnimation.lastFrame,
        true
      )

      menuButtonAnimation.setDirection(-1)
      menuButtonAnimation.goToAndPlay(
        menuButtonAnimation.lastFrame,
        true
      )

      setTimeout(() => {

        menuWrapper.classList.toggle('is-active')

      }, 800)

    }

  }

  menuButton.addEventListener('click', handleNavMenu)

  return handleNavMenu

}


// footer

const footerSetup = () => {

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


}


// home setup all

let homeSetupAll = () => {

  introSetup()
  ringsSetup()
  curvesSetup()

}


// handle load

const handlePageLoad = () => {

  setTimeout(() => {

    scrollingTagsSetup()
    fluidRevealSetup()
    contactFabSetup()
    parallaxSetup()
    playInViewSetup()

    ScrollTrigger.refresh()

  }, 500)

}


// barba

const barbaSetup = () => {

  barba.use(barbaPrefetch)

  barba.hooks.afterEnter(data => {

    console.log('after enter all')
    handlePageLoad()

  })

  barba.init({

    debug: true,
    views: [{
      namespace: 'home',
      afterEnter(data) {

        console.log('after enter home')
        homeSetupAll()

      }
    }],
    transitions: [{
      name: 'default-transition',
      leave(data) {

        if (navMenuOpen) {

          toggleNavMenu()

        }

        return gsap.to(data.current.container, {
          opacity: 0
        })

      },
      enter(data) {

        return gsap.from(data.next.container, {
          opacity: 0
        })

      }
    }]

  })

}


// toggle nav menu

const toggleNavMenu = navMenuSetup()


// on load

window.addEventListener('DOMContentLoaded', () => {

  footerSetup()
  barbaSetup()

})


// resize

window.addEventListener('resize', () => {

  setTimeout(() => {

    console.log('rf')

    ScrollTrigger.update()

  }, 500)

})


// love

console.log('♥️')

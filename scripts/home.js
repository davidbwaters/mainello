//
// home
//

import gsap from 'gsap'
import lottie from 'lottie-web'
import p5 from 'p5'


// intro animation

document.body.style.position = 'fixed'

let introWrapper = document.querySelector(
  '.c-intro'
)
let introBackground = document.querySelector(
  '.c-intro__background'
)

// let animationBlock = document.querySelector(
//   '.c-sketch-animation'
// )

let animationWrapper = document.querySelector(
  '.c-sketch-animation__inner'
)

let introBlocks = document.querySelectorAll(
  '.c-intro__block-inner'
)

introBlocks = [
  ...introBlocks,

  animationWrapper
]

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

const animation = lottie.loadAnimation({
  container: animationWrapper,
  renderer: 'canvas',
  loop: false,
  autoplay: false,
  path: 'animations/sketch.json'
})

lottie.setSpeed(1.5)

backgroundAnimation.play()

backgroundAnimation.onComplete  = () => {

  gsap.to(introBlocks, {
    duration: 0.8,
    x: '0%',
    onComplete: () => {

      setTimeout(() => {
        animation.play()
      }, 1000)

    }
  })

}


animation.onComplete = () => {


  setTimeout(() => {


    gsap.to(introBlocks, {
      duration: 0.8,
      y: '-110%',
      onComplete: () => {

        gsap.to(introWrapper, {
          duration: 0.8,
          opacity: 0
        })


        setTimeout(() => {
          introWrapper.style.display = 'none'
        }, 1200)

      }
    })

    document.body.style.position = ''
  }, 0)
}


// rings animation

let ringsWrapper = document.querySelector('#c-rings')
let ringsCanvas = ringsWrapper.getBoundingClientRect()

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

    sketch.windowResized = () => {
      ringsCanvas = ringsWrapper.getBoundingClientRect()

      sketch.resizeCanvas(
        ringsCanvas.width,
        ringsCanvas.height
      )
    }

    canvas.parent('c-rings');
    sketch.pixelDensity(sketch.displayDensity())

    if (sketch.width < sketch.height) {
      noiseScale = sketch.width * 0.12
      maxRadius = sketch.width * 0.35
    } else {
      noiseScale = sketch.height * 0.12
      maxRadius = sketch.height * 0.35
    }

    minRadius = 0
    sketch.background(0)
  }

  sketch.draw = () => {
    sketch.noStroke()
    sketch.fill(255, 60)
    sketch.rect(0, 0, sketch.width, sketch.height)

    sketch.translate(sketch.width / 2, sketch.height / 2)
    sketch.noFill()
    sketch.stroke(114, 180, 174)

    for (let i = 0; i < nCircles; i++) {
      sketch.strokeWeight(sketch.map(i, 0, nCircles, 1, 5))

      let radius = sketch.map(i, 0, nCircles, minRadius, maxRadius)

      sketch.beginShape()

      for (let j = 0; j < nPoints + 3; j++) {
        let jj = j

        if (j >= nPoints)
          // Last three povars to close the shape smoothly
          jj -= nPoints

        let x =
          (radius + sketch.noise(t / nPoints + jj) * noiseScale) *
          sketch.cos((sketch.TWO_PI / nPoints) * jj)

        let y =
          (radius + sketch.noise(t / nPoints + jj) * noiseScale) *
          sketch.sin((sketch.TWO_PI / nPoints) * jj)

        sketch.curveVertex(x, y)
      }
      sketch.endShape()
    }

    //t += speed

    let velocity = sketch.abs(sketch.winMouseX - sketch.pwinMouseX) / 150

    console.log(velocity)

    t += speed + velocity
  }

  // Interaction with keyboard
  sketch.keyPressed = () => {
    if (sketch.keyCode== sketch.UP_ARROW) {
      noiseScale += 50
    } else if (sketch.keyCode== sketch.DOWN_ARROW) {
      noiseScale -= 50
    } else if (sketch.keyCode== sketch.LEFT_ARROW) {
      minRadius -= 10
    } else if (sketch.keyCode== sketch.RIGHT_ARROW) {
      minRadius += 10
    }

    // Predefined settings
    if (sketch.key == '1') {
      noiseScale = -900
      minRadius = 80
    } else if (sketch.key == '2') {
      noiseScale = -450
      minRadius = 0
    } else if (sketch.key == '3') {
      noiseScale = 350
      minRadius = -110
    } else if (sketch.key == '4') {
      noiseScale = 470
      minRadius = -60
    } else if (sketch.key == '5') {
      noiseScale = 700
      minRadius = -200
    } else if (sketch.key == '0') {
      noiseScale = 50
      minRadius = 0
    }
  }

  // Interaction with mouse/touch
  sketch.mousePressed = () => {
    if (sketch.mouseY < sketch.height / 3) {
      noiseScale += 50
    } else if (sketch.mouseY > (sketch.height / 3) * 2) {
      noiseScale -= 50
    } else if (
      sketch.mouseY > sketch.height / 3 &&
      sketch.mouseY < (sketch.height / 3) * 2 &&
      sketch.mouseX < sketch.width / 2
    ) {
      minRadius -= 10
    } else if (
      sketch.mouseY > sketch.height / 3 &&
      sketch.mouseY < (sketch.height / 3) * 2 &&
      sketch.mouseX > sketch.width / 2
    ) {
      minRadius += 10
    }
  }
}

let rings = new p5(ringsSketch)


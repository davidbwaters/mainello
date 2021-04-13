//
// home
//

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import lottie from 'lottie-web'
import p5 from 'p5'


// intro animations

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

let sketchAnimationWrapper = document.querySelector(
  '.c-sketch-animation__inner'
)

let introBlocks = document.querySelectorAll(
  '.c-intro__block-inner'
)

introBlocks = [
  ...introBlocks,

  sketchAnimationWrapper
]


// background animation

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

lottie.setSpeed(2)
backgroundAnimation.play()

backgroundAnimation.onComplete  = () => {

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


// sketch animation

const sketchAnimation = lottie.loadAnimation({
  container: sketchAnimationWrapper,
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


// rings animation

let ringsWrapper = document.querySelector('#c-rings__inner')
let ringsCanvas = ringsWrapper.getBoundingClientRect()
let ringsFrameRate = 60

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
      } else {
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

    //console.log(velocity)

    t += speed + velocity
  }

}

let rings = new p5(ringsSketch)


ScrollTrigger.create({
  trigger: '#hero',
  start: 'bottom top',
  end: 'bottom top',
  scrub: true,
  //onLeave: ringsSketch.frameRate(1),
  onEnter: () => {
    ringsFrameRate = 1
  },
  onEnterBack: () => {
    ringsFrameRate = 60
  }
})


// curves animation

let curveSketch = sketch => {

	sketch.setup = () => {

		let width = sketch.windowWidth
    let height = sketch.windowHeight

    let canvas = sketch.createCanvas(
      width,
      height
    )

    canvas.parent('c-curves__inner')

    sketch.frameRate(20)
		sketch.strokeWeight(1)
		sketch.noFill()
		sketch.background(255)
	}


	sketch.drawPerlinCurve = (x, y, phase, step, numCurveVertices) => {
		sketch.push()
		//sketch.stroke(114,180,174, 60)
    sketch.stroke(220, 60)
		let noiseScale = 0.002

		sketch.beginShape()

		for (let i = 0; i < numCurveVertices; i++) {
			sketch.curveVertex(x, y)
			let angle =
					sketch.TWO_PI *
					sketch.noise(
						x * noiseScale, y * noiseScale, phase * noiseScale
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
				sketch.width + 50, y, phase, STEP, numCurveVertices
			)
		}
		sketch.pop()
	}
}

let curves = new p5(curveSketch)

//
// main
//

import '../stylesheets/app.scss'
import '../stylesheets/home.scss'

async function homeSetup() {

  // intro animation
  await import('./components/Intro')
  await import('./components/Navbar')
  await import('./components/NavMenu')

  await import('./components/Rings')
  await import('./components/Curves')
  await import('./components/ScrollingTags')
  await import('./components/FluidReveal')

}

homeSetup()

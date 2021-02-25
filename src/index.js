/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import confetti from 'canvas-confetti';


new RiveAnimation({
  src: '/rive/mainello.riv',
  canvas: document.querySelector('.c-mondrian__column-main-canvas'),
  autoplay: true,
  alignment: new CanvasAlignment({
    fit: 'contain',
    alignment: 'center',
  }),
})
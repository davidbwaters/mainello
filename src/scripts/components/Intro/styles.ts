//
// intro - styles
//

import {
  css
} from 'lit'

export default css`
  :host {
    display: block;
    height: 100%;
    max-height: 100vh;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 90;
  }

  .c-intro {
    align-content: center;
    background-color: var(--color-opaque-light);
    display: grid;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    position: absolute;
    transition: all .8s;
    will-change: background-color, opacity;
    width: 100%;
    z-index: 10;
  }

  .c-intro__background {
    height: 100vmax;
    transition: all .8s;
    width: 180vmax;
    will-change: background-color, opacity;
    z-index: 0;
  }

  .c-intro__grid {
    display: grid;
    gap: 2px;
    grid-template-columns:
      0.5fr
      0.5fr;
    grid-template-rows:
      0.2fr
      0.135fr
      0.165fr
      0.165fr
      0.135fr
      0.2fr;
    min-height: 100vh;
    overflow-x: hidden;
    width: 100%;
  }

  @media (min-width: 320px) {
    .c-intro__grid {
      display: grid;
      grid-template-columns:
        0.05fr
        0.076fr
        0.125fr
        0.125fr
        0.125fr
        0.166fr
        0.083fr
        0.124fr
        0.076fr
        0.05fr;
      grid-template-rows:
        0.05fr
        0.148fr
        0.125fr
        0.17fr
        0.17fr
        0.137fr
        0.15fr
        0.05fr;
    }
  }

  @media (min-width: 768px) {

    .c-intro__grid {
      display: grid;
      grid-template-columns:
        0.021fr
        0.041fr
        0.0635fr
        0.041fr
        0.034fr
        0.05fr
        0.15fr
        0.1fr
        0.1fr
        0.15fr
        0.05fr
        0.034fr
        0.041fr
        0.0635fr
        0.041fr
        0.021fr;
      grid-template-rows:
        0.083fr
        0.167fr
        0.083fr
        0.167fr
        0.167fr
        0.083fr
        0.167fr
        0.083fr;
    }
  }

  .c-intro .c-intro__grid {
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .c-intro__block {
    overflow: hidden;
    position: relative;
    will-change: background-color, transform;
  }

  .c-intro__block-inner {
    background-color: white;
    content: '';
    display: block;
    height: 100%;
    transform: translateX(-120%);
    width: 100%;
  }

  .c-intro__block:nth-child(1) {
    grid-row: 1 / span 1;
    grid-column: 1 / span 2;
  }
  .c-intro__block:nth-child(2) {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
  }
  .c-intro__block:nth-child(3) {
    grid-row: 2 / span 2;
    grid-column: 2 / span 1;
  }
  .c-intro__block:nth-child(4) {
    grid-row: 3 / span 2;
    grid-column: 1 / span 1;
  }
  .c-intro__block:nth-child(5) {
    grid-row: 4 / span 1;
    grid-column: 2 / span 1;
  }
  .c-intro__block:nth-child(6) {
    grid-row: 6 / span 1;
    grid-column: 1 / span 1;
  }
  .c-intro__block:nth-child(7) {
    grid-row: 6 / span 1;
    grid-column: 2 / span 1;
  }
  .c-intro__block:nth-child(8) {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
  }
  .c-intro__block:nth-child(9) {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
  }
  .c-intro__block:nth-child(10) {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
  }
  .c-intro__block:nth-child(11) {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
  }

  @media (min-width: 320px) {
    .c-intro__block:nth-child(1) {
      grid-row: 1 / span 5;
      grid-column: 1 / span 2;
    }
    .c-intro__block:nth-child(2) {
      grid-row: 6 / span 3;
      grid-column: 1 / span 2;
    }
    .c-intro__block:nth-child(3) {
      grid-row: 1 / span 5;
      grid-column: 3 / span 1;
    }
    .c-intro__block:nth-child(4) {
      grid-row: 1 / span 4;
      grid-column: 4 / span 4;
    }
    .c-intro__block:nth-child(5) {
      grid-row: 6 / span 3;
      grid-column: 3 / span 5;
    }
    .c-intro__block:nth-child(6) {
      grid-row: 1 / span 3;
      grid-column: 8 / span 3;
    }
    .c-intro__block:nth-child(7) {
      grid-row: 4/ span 1;
      grid-column: 8 / span 2;
    }
    .c-intro__block:nth-child(8) {
      grid-row: 4 / span 1;
      grid-column: 10 / span 1;
    }
    .c-intro__block:nth-child(9) {
      grid-row: 5 / span 4;
      grid-column: 8 / span 2;
    }
    .c-intro__block:nth-child(10) {
      grid-row: 5 / span 4;
      grid-column: 10 / span 2;
    }
    .c-intro__block:nth-child(11) {
      grid-row: 5 / span 1;
      grid-column: 4 / span 4;
    }
  }

  @media (min-width: 768px) {
    .c-intro__block:nth-child(1) {
      grid-row: 1 / span 6;
      grid-column: 1 / span 4;
    }
    .c-intro__block:nth-child(2) {
      grid-row: 7 / span 2;
      grid-column: 1 / span 4;
    }
    .c-intro__block:nth-child(3) {
      grid-row: 1 / span 6;
      grid-column: 5 / span 2;
    }
    .c-intro__block:nth-child(4) {
      grid-row: 1 / span 4;
      grid-column: 7 / span 4;
    }
    .c-intro__block:nth-child(5) {
      grid-row: 7 / span 2;
      grid-column: 5 / span 6;
    }
    .c-intro__block:nth-child(6) {
      display: none;
    }
    .c-intro__block:nth-child(7) {
      grid-row: 1 / span 3;
      grid-column: 11 / span 6;
    }
    .c-intro__block:nth-child(8) {
      grid-row: 4 / span 1;
      grid-column: 11 / span 4;
    }
    .c-intro__block:nth-child(9) {
      grid-row: 4 / span 1;
      grid-column: 15 / span 2;
    }
    .c-intro__block:nth-child(10) {
      grid-row: 5 / span 4;
      grid-column: 11 / span 4;
    }
    .c-intro__block:nth-child(11) {
      grid-row: 5 / span 4;
      grid-column: 15 / span 2;
    }
  }

  .c-sketch-animation {
    display: grid;
    grid-row: 5 / span 1;
    grid-column: 1 / span 2;
    overflow: hidden;
    position: relative;
    transition: all .8s;
    will-change: background-color, opacity;
  }

  @media (min-width: 320px) {

    .c-sketch-animation {
      grid-row: 5 / span 1;
      grid-column: 4 / span 4;
    }

  }

  @media (min-width: 768px) {

    .c-sketch-animation {
      grid-row: 5 / span 2;
      grid-column: 7 / span 4;
    }

  }

  .c-sketch-animation__inner {
    background-color: white;
    box-sizing: border-box;
    height: 100%;
    left: 0%;
    position: absolute;
    top: 0%;
    transform: translateX(-120%);
    width: 100%;
  }

`

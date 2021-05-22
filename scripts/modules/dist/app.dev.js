"use strict";

var _lottieWeb = _interopRequireDefault(require("lottie-web"));

var _gsap = _interopRequireDefault(require("gsap"));

var _locomotiveScroll = _interopRequireDefault(require("locomotive-scroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
// main
//
// contact fab
//import ScrollTrigger from 'gsap/ScrollTrigger'
console.log('♥️'); // nav menu

var navMenuOpen = false;
var navMenuSpeed = 1.5; //let navMenuBackgroundSpeed = .1

window.addEventListener('DOMContentLoaded', function () {
  var menuButton = document.querySelector('.c-navbar__menu-button');
  var menuAnimationWrapper = document.querySelector('.c-nav-menu__animation');
  var menuWrapper = document.querySelector('.c-nav-menu'); //const menuBackground = document.querySelector(
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

  var menuAnimation = _lottieWeb["default"].loadAnimation({
    container: menuAnimationWrapper,
    renderer: 'canvas',
    loop: false,
    autoplay: false,
    path: 'animations/stripes-alt-2.json',
    rendererSettings: {
      preserveAspectRatio: 'none'
    }
  });

  var handleNavMenu = function handleNavMenu() {
    if (!navMenuOpen) {
      navMenuOpen = true;

      _lottieWeb["default"].setSpeed(navMenuSpeed);

      menuAnimation.setDirection(1);
      menuAnimation.goToAndPlay(1, true);
      setTimeout(function () {
        menuWrapper.classList.toggle('is-active'); //lottie.setSpeed(navMenuBackgroundSpeed)
        //menuBackgroundAnimation.play()
      }, 200);
    } else {
      navMenuOpen = false; //menuBackgroundAnimation.stop()

      menuAnimation.setDirection(-1);

      _lottieWeb["default"].setSpeed(navMenuSpeed);

      menuAnimation.goToAndPlay(menuAnimation.lastFrame, true);
      setTimeout(function () {
        menuWrapper.classList.toggle('is-active');
      }, 800);
    }
  };

  menuButton.addEventListener('click', handleNavMenu);
}); // scrolltrigger + loco setup

_gsap["default"].registerPlugin(ScrollTrigger);

var locoScroll = new _locomotiveScroll["default"]({
  el: document.querySelector('.js-smooth-scroll'),
  smooth: true
});
locoScroll.on('scroll', ScrollTrigger.update);
ScrollTrigger.scrollerProxy('.js-smooth-scroll', {
  scrollTop: function scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect: function getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  } //pinType: document.querySelector('.js-smooth-scroll')
  //.style.transform ? 'transform' : 'fixed'

}); // gsap scrolltrigger

var rotateEl = document.querySelector('.c-contact-fab__spinning');
var rotateDuration = 16;

var rotate = _gsap["default"].to(rotateEl, {
  rotation: 360,
  duration: rotateDuration,
  onReverseComplete: function onReverseComplete() {
    this.totalTime(rotateDuration * 100); // loop in reverse
  },
  repeat: -1,
  ease: 'linear'
});

var scrollTop;
var contentHeight;
var progress = 0;
var rounds = 0;

var clamp = _gsap["default"].utils.clamp(-50, 50);

ScrollTrigger.create({
  onUpdate: function onUpdate(self) {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    contentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;
    rounds = Math.floor(contentHeight / window.innerHeight);
    progress = Math.floor(scrollTop / contentHeight * 100) * rounds; // console.log(clamp((self.getVelocity() / 100) * 0.5))

    rotate.timeScale(clamp(self.getVelocity() / 100));

    _gsap["default"].to(rotate, {
      timeScale: self.direction,
      duration: 0.3,
      overwrite: true,
      ease: 'power1.inOut'
    });
  }
});

_gsap["default"].set(rotateEl, {
  transformOrigin: 'center center',
  force3D: true
}); // scrolling tags


window.addEventListener('DOMContentLoaded', function () {
  var scrollingTagsEls = document.querySelectorAll('.c-scrolling-tags');

  if (scrollingTagsEls.length) {
    var scrollingTags = _gsap["default"].utils.toArray('.c-scrolling-tags');

    scrollingTags.forEach(function (el) {
      _gsap["default"].to(el, {
        x: function x() {
          return -(el.scrollWidth - document.documentElement.clientWidth) + 'px';
        },
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          scroller: '.js-smooth-scroll',
          invalidateOnRefresh: true,
          scrub: 1,
          end: function end() {
            return '+=' + el.offsetWidth;
          }
        }
      });
    });
  }
});
window.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    var animateDuration = 2;
    var pinDuration = 5;
    var wrapper = document.querySelector('.c-fluid-reveal');
    var inner = document.querySelector('.c-fluid-reveal__inner');
    var fluidRevealEls = document.querySelectorAll('.c-fluid-reveal__item');
    fluidRevealEls = Array.from(fluidRevealEls);
    wrapper.style.setProperty('--items', fluidRevealEls.length);
    ScrollTrigger.saveStyles(['.c-fluid-reveal__item path', '.c-fluid-reveal__item .c-fluid-reveal__media', '.c-fluid-reveal__item .c-fluid-reveal__content']);
    ScrollTrigger.matchMedia({
      // desktop
      '(min-width: 800px)': function minWidth800px() {
        setTimeout(function () {
          var count = 1;

          var tl = _gsap["default"].timeline({
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              scroller: '.js-smooth-scroll',
              start: 'top top ',
              pin: true,
              pinSpacing: false,
              end: 'bottom bottom',
              scrub: 0.4 //markers: true

            }
          });

          fluidRevealEls.forEach(function (el) {
            var wobble = el.querySelector('#wobble-' + count);
            var media = el.querySelector('.c-fluid-reveal__media');
            var content = el.querySelector('.c-fluid-reveal__content');
            wobble.style = '';
            content.style = '';

            if (count > 1) {
              tl.from(wobble, {
                duration: animateDuration,
                xPercent: 100,
                yPercent: 100
              }, '-=' + animateDuration);
            } else {
              tl.from(wobble, {
                duration: animateDuration,
                xPercent: 100,
                yPercent: 100
              });
            }

            tl.from(content, {
              duration: animateDuration,
              opacity: 0,
              yPercent: 100
            }, '-=' + animateDuration).to(el, {
              duration: pinDuration
            });

            if (count < fluidRevealEls.length) {
              tl.to(content, {
                duration: animateDuration,
                opacity: 0,
                yPercent: -100
              }, '-=' + animateDuration);
            }

            count++;
            ScrollTrigger.update();
          });
          count = 1;
        }, 2000);
      },
      '(max-width: 800px)': function maxWidth800px() {}
    });
  }, 500);
});
ScrollTrigger.addEventListener("refresh", function () {
  return locoScroll.update();
});
window.addEventListener('resize', function () {
  setTimeout(function () {
    console.log('rf');
    ScrollTrigger.update();
  }, 500);
});
//
// in viewport detection
//

export function inViewport(el, callback, options = {}) {

  return new IntersectionObserver(entries => {

    entries.forEach(entry => callback(entry))

  }, options).observe(el)

}

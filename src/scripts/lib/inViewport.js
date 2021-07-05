//
// in viewport detection
//

export default function inViewport(
  el, callback, options = {}
) {

  return new IntersectionObserver(entries => {

    entries.forEach(entry => callback(entry))

  }, options).observe(el)

}

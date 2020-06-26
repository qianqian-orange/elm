import Vue from 'vue'

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      io.unobserve(img)
    }
  })
})

Vue.directive('lazy', {
  bind(el, binding) {
    el.dataset.src = binding.value
    io.observe(el)
  },
})

export default io

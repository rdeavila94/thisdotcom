function AnimatedParent (element, animatedChildren) {
  this.element = element
  this.animatedChildren = animatedChildren
}

function AnimatedChild (element, animationName) {
  this.element = element
  this.animationName = ' ' + animationName
}

const animatedLine = new AnimatedChild(document.querySelector('#header-line'), 'u-line--animated')
const sectionAbout = new AnimatedParent(document.querySelector('#section-about'), [animatedLine])

// remove this event listener once they've scrolled all the way down
document.addEventListener('scroll', e => {
  const windowHeight = window.innerHeight
  const windowDistance = window.pageYOffset

  if (sectionAbout.element.offsetHeight > windowHeight - windowDistance + 200) {
    sectionAbout.element.className = 'section-about fade-in'
    sectionAbout.animatedChildren.forEach(child => {
      child.element.className += child.animationName
    })
  }
})

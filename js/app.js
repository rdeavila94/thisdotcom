// Constructors for objects to facilitate animations nested within a fade in section
function AnimatedParent(element, animatedChildren) {
  this.element = element
  this.animatedChildren = animatedChildren
}

function AnimatedChild(element, animationName) {
  this.element = element
  this.animationName = ' ' + animationName
}

const sectionAboutDistance = document.querySelector('.section-header').offsetHeight
const sectionTechnicalDistance = document.querySelector('.section-about').offsetHeight + sectionAboutDistance

// To avoid repeating the trigger on subsequent scrolls that satisfy the trigger
let aboutTriggered = false
let technicalTriggered = false

// How far into sections to trigger the fade in
const offsetTrigger = 200

// How long the fade in animation is configured to last on the CSS side
const fadeInAnimationDelay = 500

const animatedLine = new AnimatedChild(document.querySelector('#header-line'), 'u-line--animated')
const sectionAbout = new AnimatedParent(document.querySelector('#section-about'), [animatedLine])

const typeAnimate = document.querySelector('#type-animate')

const animatedHr = new AnimatedChild(document.querySelector('#animated-hr'), 'u-line-slice--animated')
const popupHeader = new AnimatedChild(document.querySelector('#popup-header'), 'pop-up')
const sectionTechnical = new AnimatedParent(document.querySelector('#section-technical'), [animatedHr, popupHeader])

// Function to create a 'typing' animation
const writeText = (message, writeSpeed = 100, element = typeAnimate) => {
  for (let i = 0; i < message.length; i++) {
    setTimeout(() => {
      element.textContent += message.charAt(i)
    }, writeSpeed * i)
  }
}

// We have to use a named function in order to have the ability to remove the handler
const onscroll = e => {
  const windowHeight = window.innerHeight
  const windowDistance = window.pageYOffset

  if (sectionAboutDistance < windowHeight + windowDistance - offsetTrigger && !aboutTriggered) {
    sectionAbout.element.className = 'section-about fade-in'
    sectionAbout.animatedChildren.forEach(child => {
      child.element.className += child.animationName
    })
    aboutTriggered = true
  }

  if (sectionTechnicalDistance < windowHeight + windowDistance - offsetTrigger && !technicalTriggered) {
    sectionTechnical.element.className = 'section-technical__content fade-in'
    sectionTechnical.animatedChildren.forEach(child => {
      child.element.className += child.animationName
    })
    setTimeout(() => writeText('Java + Node'), fadeInAnimationDelay * 2)
    technicalTriggered = true
  }

  if (aboutTriggered && technicalTriggered) {
    document.removeEventListener('scroll', onscroll)
  }
}
// remove this event listener once they've scrolled all the way down
document.addEventListener('scroll', onscroll)

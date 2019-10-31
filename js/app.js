function AnimatedElement(element, animationClass, replacingClass = undefined) {
  this.element = element
  this.animationClass = animationClass
  this.replacingClass = replacingClass
}

AnimatedElement.prototype.animate = function () {
  this.replacingClass ? this.element.classList.replace(this.replacingClass, this.animationClass) : this.element.classList.add(this.animationClass)
}

let windowHeight = window.innerHeight

// To avoid repeating the trigger on subsequent scrolls that satisfy the trigger
let greetingTriggered = false
let bioTriggered = false
let compTriggered = false
let technicalTriggered = false
let cardTriggered = false

const greeting = new AnimatedElement(document.querySelector('#greeting'), 'come-in-left', 'hidden')
const name = new AnimatedElement(document.querySelector('#name'), 'u-flip-in', 'hidden')
const uLine = new AnimatedElement(document.querySelector('#header-line'), 'u-line--animated', 'hidden')
const bioCol = new AnimatedElement(document.querySelector('#bio-col'), 'col-fade-in-left', 'hidden')
const compCol = new AnimatedElement(document.querySelector('#comp-col'), 'col-fade-in-right', 'hidden')
const animatedHr = new AnimatedElement(document.querySelector('#animated-hr'), 'title-box__line--animated', 'hidden')
const popupHeader = new AnimatedElement(document.querySelector('#popup-header'), 'pop-up', 'hidden')
const java = new AnimatedElement(document.querySelector('#java'), 'title-box__animate-left', 'hidden')
const javascript = new AnimatedElement(document.querySelector('#javascript'), 'title-box__animate-right', 'hidden')
const card1 = new AnimatedElement(document.querySelector('#col-card-1'), 'col-fade-in-left', 'hidden')
const card2 = new AnimatedElement(document.querySelector('#col-card-2'), 'col-fade-in-right', 'hidden')

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
  if (!greetingTriggered && greeting.element.getBoundingClientRect().top < windowHeight) {
    greetingTriggered = true
    greeting.animate()
    name.animate()
    uLine.animate()
  }

  if (greetingTriggered && !bioTriggered && bioCol.element.getBoundingClientRect().top < windowHeight) {
    bioTriggered = true
    bioCol.animate()
  }

  if (bioTriggered && !compTriggered && compCol.element.getBoundingClientRect().top < windowHeight - 100) {
    compTriggered = true
    compCol.animate()
  }

  if (compTriggered && !technicalTriggered && popupHeader.element.getBoundingClientRect().top < windowHeight) {
    technicalTriggered = true
    animatedHr.animate()
    popupHeader.animate()
    java.animate()
    javascript.animate()
  }

  if (technicalTriggered && !cardTriggered && card1.element.getBoundingClientRect().top < windowHeight) {
    cardTriggered = true
    card1.animate()
    card2.animate()
  }

  if (greetingTriggered && bioTriggered && compTriggered && technicalTriggered && cardTriggered) {
    document.removeEventListener('scroll', onscroll)
  }
}

// remove this event listener once they've scrolled all the way down
document.addEventListener('scroll', onscroll)

window.addEventListener('resize', () => {
  windowHeight = window.innerHeight
}, false)

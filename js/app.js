function AnimatedElement(element, animationClass, replacingClass = undefined) {
  this.element = element
  this.animationClass = animationClass
  this.replacingClass = replacingClass
}

// For older browsers that don't yet support replace
if (!DOMTokenList.prototype.replace) {
  DOMTokenList.prototype.replace = function (oldClass, newClass) {
    this.remove(oldClass)
    this.add(newClass)
  }
}

AnimatedElement.prototype.animate = function () {
  this.replacingClass ? this.element.classList.replace(this.replacingClass, this.animationClass) : this.element.classList.add(this.animationClass)
}

let windowHeight = window.innerHeight

// this will be used in case we want to kick off an animation deeper into the scroll
const animationMargin = 100

// To avoid repeating the trigger on subsequent scrolls that satisfy the trigger
let greetingTriggered = false
let bioTriggered = false
let compTriggered = false
let technicalTriggered = false
let poststampTriggered = false
let cardTriggered = false

const greeting = new AnimatedElement(document.querySelector('#greeting'), 'come-in-left', 'u-hidden')
const richard = new AnimatedElement(document.querySelector('#name'), 'flip-in', 'u-hidden')
const uLine = new AnimatedElement(document.querySelector('#header-line'), 'u-line--animated', 'u-hidden')
const bioCol = new AnimatedElement(document.querySelector('#bio-col'), 'col-fade-in-left', 'u-hidden')
const compCol = new AnimatedElement(document.querySelector('#comp-col'), 'col-fade-in-right', 'u-hidden')
const animatedHr = new AnimatedElement(document.querySelector('#animated-hr'), 'title-box__line--animated', 'u-hidden')
const popupHeader = new AnimatedElement(document.querySelector('#popup-header'), 'pop-up', 'u-hidden')
const java = new AnimatedElement(document.querySelector('#java'), 'title-box__animate-left', 'u-hidden')
const node = new AnimatedElement(document.querySelector('#node'), 'title-box__animate-right', 'u-hidden')
const and = new AnimatedElement(document.querySelector('#and'), 'fade-in', 'u-hidden')
const poststamp = new AnimatedElement(document.querySelector('#poststamp'), 'poststamp__overlay--animated')
const card1 = new AnimatedElement(document.querySelector('#col-card-1'), 'col-fade-in-left', 'u-hidden')
const card2 = new AnimatedElement(document.querySelector('#col-card-2'), 'col-fade-in-right', 'u-hidden')

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
    richard.animate()
    uLine.animate()
  }

  if (greetingTriggered && !bioTriggered && bioCol.element.getBoundingClientRect().top < windowHeight) {
    bioTriggered = true
    bioCol.animate()
  }

  if (bioTriggered && !compTriggered && compCol.element.getBoundingClientRect().top < windowHeight - animationMargin) {
    compTriggered = true
    compCol.animate()
  }

  if (compTriggered && !technicalTriggered && popupHeader.element.getBoundingClientRect().top < windowHeight - animationMargin) {
    technicalTriggered = true
    animatedHr.animate()
    popupHeader.animate()
    setTimeout(() => {
      java.animate()
      node.animate()
      and.animate()
    }, 500)
  }

  if (technicalTriggered && !poststampTriggered && poststamp.element.getBoundingClientRect().top < windowHeight) {
    poststampTriggered = true
    poststamp.animate()
  }

  if (poststampTriggered && !cardTriggered && card1.element.getBoundingClientRect().top < windowHeight - animationMargin) {
    cardTriggered = true
    card1.animate()
    card2.animate()
  }

  // if the last animation has kicked off, remove the event listener
  if (cardTriggered) {
    document.removeEventListener('scroll', onscroll)
  }
}

document.addEventListener('scroll', onscroll)

// recalculate the windows height in case the user resizes their window
window.addEventListener('resize', () => {
  windowHeight = window.innerHeight
}, false)

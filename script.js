// BLOB EFFECT
const blob = document.getElementById('blob')

document.body.onpointermove = (event) => {
  const { clientX, clientY } = event

  blob.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 2000, fill: 'forwards' }
  )
}
//LETTER HOVER EFFECT
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

document.querySelectorAll('.hvr').forEach((element) => {
  element.onmouseover = (event) => {
    let iterations = 0

    const interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split('')
        .map((_, index) => {
          if (index < iterations) {
            return event.target.dataset.value[index]
          }
          return String.fromCharCode(65 + Math.floor(Math.random() * 26))
        })
        .join('')

      if (iterations >= event.target.dataset.value.length)
        clearInterval(interval)

      iterations += 1 / 3
    }, 30)
  }
})

// NAVBAR OVERLAY HAMBURGER CLICK ACTION
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger')
  const overlay = document.getElementById('overlay')
  const closeBtn = document.getElementById('close-btn')
  const overlayLinks = document.querySelectorAll('.overlay_left a')

  function open() {
    overlay.style.top = '0'
  }
  function close() {
    console.log('close')
    overlay.style.top = '-100%'
  }
  hamburger.addEventListener('click', open)

  closeBtn.addEventListener('click', close)

  overlayLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      close()
      setTimeout(() => {
        const targetId = link.getAttribute('href').substring(1)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' })
        }
      }, 1000)
    })
  })
})

// MODAL
const openModalBtn = document.getElementById('openModalBtn')
const modal = document.getElementById('myModal')
const closeModalBtn = document.getElementById('close')

openModalBtn.addEventListener('click', function () {
  modal.style.display = 'flex'
  document.body.style.overflow = 'hidden'
})

closeModalBtn.addEventListener('click', function () {
  modal.style.display = 'none'
  document.body.style.overflow = 'auto'
})

window.addEventListener('click', function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
})

// FORM GOOGLE SHEET SUBMISSION
const scriptURL =
  'https://script.google.com/macros/s/AKfycbz1lf-F7rEvDZWAUZ7u_jM7Z-O3fP9qAw72_sMF0DCGTSQ-iZZKP_2HZl2Afw41frqz/exec'

function handleFormSubmission(formId, submitButtonId) {
  const form = document.getElementById(formId)
  const submitButton = document.getElementById(submitButtonId)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    submitButton.disabled = true

    let requestBody = new FormData(form)
    fetch(scriptURL, { method: 'POST', body: requestBody })
      .then((response) => {
        if (response.ok) {
          alert('Success! Form submitted successfully.')
          form.reset()
        } else {
          alert('Error! Failed to submit form.')
        }
        submitButton.disabled = false
      })
      .catch((error) => {
        alert('Error!', error.message)
        submitButton.disabled = false
      })
  })
}

handleFormSubmission('form1', 'submit1')
handleFormSubmission('form2', 'submit2')

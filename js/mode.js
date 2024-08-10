const body = document.querySelector('body')
const darkBtn = document.getElementById('dark-btn')
const lightBtn = document.getElementById('light-btn')

function modeTogle() {
  body.classList.toggle('dark-mode')
  lightBtn.classList.toggle('hidden')
  darkBtn.classList.toggle('hidden')
  localStorage.setItem(
    'theme',
    body.classList.contains('dark-mode') ? 'dark' : 'light'
  )
}

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode')
  lightBtn.classList.remove('hidden')
  darkBtn.classList.add('hidden')
}

darkBtn.addEventListener('click', modeTogle)
lightBtn.addEventListener('click', modeTogle)

import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body
  const themeSwitcher = document.getElementById('theme-switcher-input') as HTMLInputElement

  themeSwitcher.addEventListener('change', () => {
    if (body.classList.contains('darkmode')) {
      body.classList.remove('darkmode')
    } else {
      body.classList.add('darkmode')
    }
  })
})
import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body
  const themeSwitcher = document.getElementById('theme-switcher-input') as HTMLInputElement

  const selectRegionButton = document.getElementById('select-region-button') as HTMLButtonElement
  const caret = document.getElementById('caret') as HTMLElement
  const selectRegionList = document.getElementById('select-region-list') as HTMLUListElement

  selectRegionButton.addEventListener('click', () => {
    selectRegionList.classList.toggle('select-menu-active')
    caret.classList.toggle('caret-active')
  })

  document.addEventListener('click', (e) => {
    const target = e.target as any
    if (target !== selectRegionButton) {
      if (target.classList.contains('select-menu-el')){
        const selected = selectRegionButton.querySelector('.selected') as HTMLParagraphElement
        selected.textContent = target.textContent
        selectRegionList.querySelectorAll('.select-menu-el').forEach(el => {
          el.classList.remove('select-menu-el-active')
        })
        target.classList.add('select-menu-el-active')
      }
      selectRegionList.classList.remove('select-menu-active')
      caret.classList.remove('caret-active')
    }
  })

  themeSwitcher.addEventListener('change', () => {
    if (body.classList.contains('darkmode')) {
      body.classList.remove('darkmode')
    } else {
      body.classList.add('darkmode')
    }
  })
})
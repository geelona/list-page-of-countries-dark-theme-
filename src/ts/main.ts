import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body
  const themeSwitcher = document.getElementById('theme-switcher-input') as HTMLInputElement

  const countrySearchInput = document.getElementById('country-search-input') as HTMLInputElement
  const countrySearchSubmit = document.getElementById('country-search-submit') as HTMLButtonElement

  const selectRegionButton = document.getElementById('select-region-button') as HTMLButtonElement
  const caret = document.getElementById('caret') as HTMLElement
  const selectRegionList = document.getElementById('select-region-list') as HTMLUListElement

  const countryCardContainer = document.querySelector('.country-card-container') as HTMLDivElement

  countrySearchSubmit.addEventListener('click', () => {
    const nameFilter = countrySearchInput.value
    const selected = selectRegionButton.querySelector('.selected') as HTMLSpanElement
    
    renderCountries(selected.textContent, nameFilter)
  })

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
        renderCountries(target.textContent, countrySearchInput.value)
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

  function countryToHTML(country: any) {
    return `
    <div class="card">
      <img class="card-img-top" src="${country.flags.png}" alt="${country.name.common} flag image">
      <div class="card-body">
        <h5 class="card-title">${country.name.common}</h5>
        <p class="card-text">Population: ${country.population}</p>
        <p class="card-text">Region: ${country.region}</p>
        <p class="card-text">Capital: ${country.capital}</p>
      </div>
    </div>
  `
  }

  async function renderCountries(regionFilter: string | null = '', nameFilter: string | null = '') {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const data = await response.json()

    if (regionFilter === 'All' || regionFilter === 'Region') {
      regionFilter = ''
    }

    let countries: string[] = []

    if (regionFilter && nameFilter) {
      countries = data.filter((country: any) => {
        return country.region === regionFilter && country.name.common.toLowerCase().includes(nameFilter.toLowerCase())
      }).map((country: any) => countryToHTML(country))
    }
    else if (regionFilter) {
      countries = data.filter((country: any) => {
        return country.region === regionFilter
      }).map((country: any) => countryToHTML(country))
    }
    else if (nameFilter) {
      countries = data.filter((country: any) => {
        return country.name.common.toLowerCase().includes(nameFilter.toLowerCase())
      }).map((country: any) => countryToHTML(country))
    }
    else {
      countries = data.map((country: any) => countryToHTML(country))
    }

    countryCardContainer.innerHTML = ''
    countryCardContainer.insertAdjacentHTML('afterbegin', countries.join(''))
  }
  renderCountries()

})
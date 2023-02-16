const  pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')
let searchPokemon = 1
const btnShiny = document.querySelector('.btn-shiny')
let isShiny = false

const fetchPokemon = async (pokemon)=> {
    const Apiresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(Apiresponse.status === 200) {
        const data = await Apiresponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    const data = await fetchPokemon(pokemon)
  
    if (data) {
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id
  
      const sprites = data['sprites']['versions']['generation-v']['black-white']['animated']
      if (isShiny) {
        pokemonImage.src = sprites['front_shiny']
      } else {
        pokemonImage.src = sprites['front_default']
      }

      pokemonImage.addEventListener('error', () => {
          pokemonImage.alt = 'Apartir desse momento a api nao carrega mais as imagens, mals :<'
          pokemonImage.src = ''
      })
  
      input.value = ''
      searchPokemon = data.id
    } else {
      pokemonName.innerHTML = 'not found ';
      pokemonNumber.innerHTML = ''
      pokemonImage.src = ''
      pokemonImage.alt = ''
    }
   
  }
  


  btnNext.addEventListener('click', () => {
    searchPokemon += 1
    isShiny = false // volta para a forma padrão
    renderPokemon(searchPokemon)
  })
  
  btnPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1
      isShiny = false // volta para a forma padrão
      renderPokemon(searchPokemon)
    }
  })

renderPokemon(searchPokemon)

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
}) 



btnShiny.addEventListener('click', () => {
    isShiny = !isShiny
    renderPokemon(searchPokemon)
})










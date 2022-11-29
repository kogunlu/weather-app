const apiKey = '1VdEXvl3YsOlGL9l9UejzXOD5OmZZvYv'
const searchBar = document.querySelector('#search-bar')
const submitBtn = document.querySelector('#submitBtn')
const cityNameSpan = document.querySelector('#city-name-span')
const selectionBar = document.querySelector('#selectionBar')
const detailsBtn = document.querySelector('#details-btn')
const mainDiv = document.querySelector('#main-div-1')


// For initial screen
let cityName = 'istanbul'
let locationKey

let data 

fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}&details=true`)
.then(resp => resp.json())
.then(json => {

    locationKey = json[0].Key
    const countryNameEnglish = json[0].Country.EnglishName
    const cityNameEnglish = json[0].EnglishName

    cityNameSpan.textContent = `${cityNameEnglish}, ${countryNameEnglish}`

    console.log("location key => " + locationKey)
    return locationKey

}).then(locationKey => {
    return (fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`)
    .then(resp => resp.json())
    .then(json => {
        data = json[0]

        currentWeather(data)
    })
)}
)


// Allan's suggestion part


// async function fetchWeather(){
//     const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}&details=true`)

//     const json = response.json()
//         const countryNameEnglish = json[0].Country.EnglishName
//         const cityNameEnglish = json[0].EnglishName
    
//         cityNameSpan.textContent = `${cityNameEnglish}, ${countryNameEnglish}`

// }

// fetchWeather()



// --------------------------------------------------------------------------
//Details button

detailsBtn.addEventListener('click', e => {
    e.preventDefault()

    if(detailsBtn.textContent !== "X"){
        selectionBar.style.display = 'flex'

        detailsBtn.textContent = "X"
        detailsBtn.classList = "flex flex-col justify-center items-center nav-text-color mb-1 font-bold underline underline-offset-2"
    }else{
        selectionBar.style.display = 'none'
        detailsBtn.innerHTML = '<svg class="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>'
    }
    
})

// --------------------------------------------------------------------------
//For new searches

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    detailsBtn.style.display = 'none'
    selectionBar.style.display = 'flex'

    const writenCityName = searchBar.value
        cityName = writenCityName.toLowerCase()

    searchBar.value = ""


// api request for given city name to obtain location key + show it on the header + re-create main page

fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}&details=true`)
.then(resp => resp.json())
.then(json => {

    console.log(json)

    const locationKey = json[0].Key
    const countryNameEnglish = json[0].Country.EnglishName
    const cityNameEnglish = json[0].EnglishName

    cityNameSpan.textContent = `${cityNameEnglish}, ${countryNameEnglish}`
    console.log(locationKey)



})
})



// --------------------------------------------------------------------------
// Rendering incoming data
function currentWeather(data){

    console.log(data)

    const singleCardDiv = document.createElement('div')

    const singleCardImg = document.createElement('img')
        singleCardImg.src = `./images/${data.WeatherIcon}`
            singleCardDiv.appendChild(singleCardImg)
    
    const singleCardText = document.createElement('p')
        singleCardText.textContent = `${data.weatherText}`
            singleCardDiv.appendChild(singleCardText)

    const singleCardTempature = document.createElement('p')
        singleCardTempature.textContent = `${data.tempature.value} ${data.tempature.unit}`
            singleCardDiv.appendChild(singleCardTempature)


    mainDiv.appendChild(singleCardDiv)
        
}           



const apiKey = '8jbLGyvGrkbeiQ33FP9Qd1GFkdNjus2E'
const apiKeyYedek = '1VdEXvl3YsOlGL9l9UejzXOD5OmZZvYv'
const searchBar = document.querySelector('#search-bar')
const submitBtn = document.querySelector('#submitBtn')
const cityNameSpan = document.querySelector('#city-name-span')
const selectionBar = document.querySelector('#selectionBar')
const detailsBtn = document.querySelector('#details-btn')
const mainDiv = document.querySelector('#main-div-1')
const logo = document.querySelector('#logo')


// For initial screen
let cityName = 'istanbul'
let locationKey
let data 

function findRelatedIcon(number){
    let result

    switch (number) {
        case 1:
            result = "pe-7w-sun"
        break;

        case 2, 3, 4, 5, 6:
            result = "pe-7w-cloud-sun"
        break;   

        case 7, 8, 38:
            result = "pe-7w-cloud"
        break;

        case 11:
            result = "pe-7w-fog"
        break;   

        case 12, 18, 19:
            result = "pe-7w-rain-alt"
        break;

        case 13, 14, 20, 21:
            result = "pe-7w-rain-sun"
        break;   
         
        case 16, 17:
            result = "pe-7w-lightning-rain-sun"
        break;

        case 22, 24:
            result = "pe-7w-snow-alt"
        break;  

        case 23:
            result = "pe-7w-snow-alt-sun"
        break;

        case 15:
            result = "pe-7w-light"
        break;   

        case 25, 29:
            result = "pe-7w-snow-alt-sun"
        break;

        case 26:
            result = "pe-7w-rain-alt"
        break;   
        
        case 30:
            result = "pe-7w-thermometer-full"
        break;

        case 31:
            result = "pe-7w-thermometer-0"
        break;   
         
        case 32:
            result = "pe-7w-cloud-wind"
        break;

        case 33, 34:
            result = "pe-7w-sun"
        break;  

        case 35, 36, 37:
            result = "pe-7w-cloud-sun"
        break;

        case 39, 40:
            result = "pe-7w-rain-alt"
        break;   

        case 41, 42, 43:
            result = "pe-7w-lightning-rain"
        break;

        case 44:
            result = "pe-7w-snow-alt"
        break;   
        
        default:
            result = "pe-7w-sun"
            break;
    }

    return result
}


// --------------------------------------------------------------------------
//Fetching current wheather for given city

function fetchCurrentWeather(cityName){
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
        showCurrentWeather(data)
    })
)}
)
}


// --------------------------------------------------------------------------
//Fetching past 6 hours wheather data

function fetchPastSixHours(cityName){

    
    fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}&details=true`)
    .then(resp => resp.json())
    .then(json => {

    const locationKey = json[0].Key
    const countryNameEnglish = json[0].Country.EnglishName
    const cityNameEnglish = json[0].EnglishName

    cityNameSpan.textContent = `${cityNameEnglish}, ${countryNameEnglish}`
    console.log(locationKey)


    return locationKey
    }).then(locationKey => {
        fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}/historical?apikey=${apiKey}&details=true`)
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
        })
    })
}


// fetchPastSixHours('istanbul')



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

fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}&details=true`)
.then(resp => resp.json())
.then(json => {

    console.log("now =>" +json)

    const locationKey = json[0].Key
    const countryNameEnglish = json[0].Country.EnglishName
    const cityNameEnglish = json[0].EnglishName

    cityNameSpan.textContent = `${cityNameEnglish}, ${countryNameEnglish}`
    console.log(locationKey)


    return cityName
})
.then(cityName => {
    fetchCurrentWeather(cityName)

})

})



// --------------------------------------------------------------------------
// Rendering incoming data for current status
function showCurrentWeather(data){

   const selectedIcon = findRelatedIcon(data.WeatherIcon)

    console.log(data)

    if(mainDiv.innerHTML !== ""){
        mainDiv.innerHTML = ""
    }
    const todayAsObj = new Date();
        const year = todayAsObj.getFullYear()
        const month = todayAsObj.getMonth() + 1
        const day = todayAsObj.getDate()
        const time = todayAsObj.toLocaleTimeString()
    

    
    const singleCardDiv = document.createElement('div')
        const timeDiv = document.createElement('div')
        const statusDiv = document.createElement('div')

    const singleCardDate = document.createElement('p')
        singleCardDate.textContent = `${month}.${day}.${year}`
        singleCardDate.style.fontSize = "1.5em"
            timeDiv.appendChild(singleCardDate)


    const singleCardTime = document.createElement('p')
        singleCardTime.textContent = time
        singleCardTime.style.fontSize = "1em"
            timeDiv.appendChild(singleCardTime)        


        const singleCardImg = document.createElement('i')
            singleCardImg.classList = `${selectedIcon} pe-5x`
                statusDiv.appendChild(singleCardImg)
    
    const singleCardText = document.createElement('p')
        singleCardText.textContent = `${data.WeatherText}`
            statusDiv.appendChild(singleCardText)

    const singleCardTempature = document.createElement('p')
        const weatherValue = Math.round(data.Temperature.Metric.Value)
            singleCardTempature.textContent = `${weatherValue} ${data.Temperature.Metric.Unit}`
                statusDiv.appendChild(singleCardTempature)

    singleCardDiv.appendChild(timeDiv)
    singleCardDiv.appendChild(statusDiv)

    mainDiv.appendChild(singleCardDiv)


    mainDiv.classList = "w-10/12 h-full flex flex-col justify-center items-center"
        singleCardDiv.classList = "h-full w-10/12 mt-3 mb-1 flex flex-col justify-start items-center border bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-200"
            timeDiv.classList = "h-1/6 w-full pt-5 flex flex-col justify-start items-center"
            statusDiv.classList = "h-5/6 w-full pt-5 flex flex-col justify-start items-center gap-2 "


    singleCardDate.classList = "font-bold"        
    singleCardTime.classList = "font-light italic "
    singleCardText.classList = "font-medium"        
    singleCardTempature.classList = "font-medium"    
}           




// --------------------------------------------------------------------------

//this will be the original, below one will be deleted later
// window.addEventListener("DOMContentLoaded", (e) => {
//     fetchCurrentWeather("istanbul")
    
// })

//this will be deleted when project is done
const myObj =
{
    "LocalObservationDateTime": "2022-11-30T10:48:00+03:00",
    "EpochTime": 1669794480,
    "WeatherText": "Mostly cloudy",
    "WeatherIcon": 6,
    "HasPrecipitation": false,
    "PrecipitationType": null,
    "IsDayTime": true,
    "Temperature": {
        "Metric": {
            "Value": 15.7,
            "Unit": "C",
            "UnitType": 17
        },
        "Imperial": {
            "Value": 60,
            "Unit": "F",
            "UnitType": 18
        }
    },
    "MobileLink": "http://www.accuweather.com/en/tr/izmir/318290/current-weather/318290?lang=en-us",
    "Link": "http://www.accuweather.com/en/tr/izmir/318290/current-weather/318290?lang=en-us"
}
window.addEventListener("DOMContentLoaded", (e) => {
    showCurrentWeather(myObj)
    
})


logo.addEventListener('click', e => {
    window.location.reload()
} )
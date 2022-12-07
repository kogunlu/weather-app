const apiKey = '1VdEXvl3YsOlGL9l9UejzXOD5OmZZvYv'
// const apiKeyYedek = '8jbLGyvGrkbeiQ33FP9Qd1GFkdNjus2E'
const searchBar = document.querySelector('#search-bar')
const submitBtn = document.querySelector('#submitBtn')
const cityNameSpan = document.querySelector('#city-name-span')
const selectionBar = document.querySelector('#selectionBar')
const detailsBtn = document.querySelector('#details-btn')
const mainDiv = document.querySelector('#main-div-1')
const logo = document.querySelector('#logo')
const mainBody = document.querySelector('#main-body')
const fiveDaysBtn = document.querySelector('#fiveDays')
const todayBtn = document.querySelector('#today')


// For initial screen
let cityName = 'istanbul'
let locationKey
let data 

// --------------------------------------------------------------------------

function findRelatedIcon(number){
    let result

    switch (number) {
        case 1:
            result = "pe-7w-sun"
        break;

        case 2: case 3: case 4: case 5: case 6:
            result = "pe-7w-cloud-sun"
        break;   

        case  7: case 8: case 38:
            result = "pe-7w-cloud"
        break;

        case 11:
            result = "pe-7w-fog"
        break;   

        case 12: case 18: case 19:
            result = "pe-7w-rain-alt"
        break;

        case 13: case 14:
            result = "pe-7w-rain-sun"
        break;   

        case  20: case 21:
            result = "pe-7w-rain-sun"
        break;   
         
        case 16: case 17:
            result = "pe-7w-lightning-rain-sun"
        break;

        case 22: case 24:
            result = "pe-7w-snow-alt"
        break;  

        case 23:
            result = "pe-7w-snow-alt-sun"
        break;

        case 15:
            result = "pe-7w-light"
        break;   

        case 25: case 29:
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

        case 33: case 34:
            result = "pe-7w-sun"
        break;  

        case 35: case 36: case 37:
            result = "pe-7w-cloud-sun"
        break;

        case 39: case 40:
            result = "pe-7w-rain-alt"
        break;   

        case 41: case 42: case 43:
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
//Fetching current weather for given city

function fetchCurrentWeather(cityName){
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}&details=true`)
.then(resp => resp.json())
.then(json => {

    locationKey = json[0].Key
    const countryNameEnglish = json[0].Country.EnglishName
    const cityNameEnglish = json[0].EnglishName

    cityNameSpan.textContent = `${cityNameEnglish}, ${countryNameEnglish}`

    console.log("location key => " + locationKey)
    return locationKey

}).then(locationKey => {
    return (fetch(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`)
    .then(resp => resp.json())
    .then(json => {
        
        data = json[0]
        showCurrentWeather(data)

        return locationKey
    })
)}
).then(locationKey => {
    return (fetchFollowingDaysWeather(locationKey))
})
}

// --------------------------------------------------------------------------
// Rendering coming data for current status
function showCurrentWeather(data){
    
   const selectedIcon = findRelatedIcon(data.WeatherIcon)


    if(mainDiv.innerHTML !== ""){
        mainDiv.innerHTML = ""
    }
    const todayAsObj = new Date();
        const year = todayAsObj.getFullYear()
        const month = todayAsObj.getMonth() + 1
        const day = todayAsObj.getDate()
        const time = todayAsObj.toLocaleTimeString()
    

    
    const singleCardDiv = document.createElement('div')
    singleCardDiv.id = "singleDayCard"
        const timeDiv = document.createElement('div')
        const statusDiv = document.createElement('div')

    const singleCardDivTop = document.createElement('div')
        singleCardDivTop.id = "singleTop"
        singleCardDivTop.classList = "h-3/6 w-full flex flex-col justify-start items-center"    

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
            singleCardTempature.textContent = `${weatherValue} °${data.Temperature.Metric.Unit}`
                statusDiv.appendChild(singleCardTempature)


    singleCardDivTop.appendChild(timeDiv)
    singleCardDivTop.appendChild(statusDiv)
    singleCardDiv.appendChild(singleCardDivTop)


    mainDiv.appendChild(singleCardDiv)


    mainDiv.classList = "w-full h-full flex flex-col justify-center items-center"
        singleCardDiv.classList = "h-full w-11/12 mt-2 mb-1 flex flex-col justify-around items-center border bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-200"
            timeDiv.classList = "h-1/6 w-full pt-5 flex flex-col justify-start items-center"
            statusDiv.classList = "h-2/6 w-full pt-5 flex flex-col justify-start items-center gap-2 "


    singleCardDate.classList = "font-bold"        
    singleCardTime.classList = "font-light italic "
    singleCardText.classList = "font-semibold"        
    singleCardTempature.classList = "font-bold"    


}           

function fetchFollowingDaysWeather(locationKey){
    fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&details=true&metric=true`)
    .then(resp => resp.json())
    .then(json => {

        showFollowingDaysWeather(json)
    })
}

// --------------------------------------------------------------------------
    
function showFollowingDaysWeather(followingDaysData){
    const data = followingDaysData.DailyForecasts
    const cardDiv = document.querySelector("#singleDayCard")


    const followingDaysDiv = document.createElement('div')
    const followingDaysTextDiv = document.createElement('div')
        const topText = document.createElement('p')
        topText.textContent = "Following 5 days' weather"
        followingDaysTextDiv.appendChild(topText)

        topText.classList = "text-center underline font-bold"
        followingDaysDiv.classList = "w-full flex justify-center items-center"
        

    const followingDaysDivTop = document.createElement('div')
    const followingDaysDivBottom = document.createElement('div')

    

    for(let i = 0; i < 5; i++){
        const followingDaySpan = document.createElement('span')

        let todayAsObj = new Date();
        let month = todayAsObj.getMonth() + 1
        let day = todayAsObj.getDate() + i + 1
        

        if(month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10){
            if(day > 31 ){
                day = 1
                month +=1
            }
        }else if(month === 2){
            if(day > 28){
                day = 1
                month +=1
            }
        }else if(month === 12){
            if(day > 31){
                day = 1
                month = 1
            }
        }else {
            if(day >30){
                day = i + 1 
                month += 1
            }
        }
        
        const followingDayDateDiv = document.createElement('div')


        const followingDayDate = document.createElement('p')
        followingDayDate.textContent = `${month}.${day}`
            if(i === 0){
                followingDayDate.textContent = "Tomorrow"
            }
        followingDayDate.style.fontSize = "1em"
        followingDayDate.classList = "text-center underline font-bold"

        followingDayDateDiv.appendChild(followingDayDate)
            followingDayDateDiv.classList = "w-full flex items-center justify-center"
        followingDaySpan.appendChild(followingDayDate)

        const selectedIcon = findRelatedIcon(data[i].Day.Icon)
        

        const followingDayImg = document.createElement('i')
            followingDayImg.classList = `${selectedIcon} pe-3x font-bold`
                followingDaySpan.appendChild(followingDayImg)

        const followingDayTemperature = document.createElement('p')
        const weatherValue = Math.round(data[i].Temperature.Maximum.Value)
        const weatherValueMin = Math.round(data[i].Temperature.Minimum.Value)
            followingDayTemperature.textContent = `${weatherValue} °${data[i].Temperature.Maximum.Unit} / ${weatherValueMin} °${data[i].Temperature.Minimum.Unit} `
            followingDayTemperature.classList = "font-semibold"
                followingDaySpan.appendChild(followingDayTemperature)  
                
                followingDaySpan.classList = "flex flex-col items-center justify-center"    

        if(i < 3){

            followingDaysDivTop.appendChild(followingDaySpan)

        }else{
            followingDaysDivBottom.appendChild(followingDaySpan)
        }

    }            

    

    followingDaysDiv.classList = "h-3/6 w-full flex flex-col justify-evenly items-center"
        followingDaysDiv.id = "followingDaysBottom"
    followingDaysDivTop.classList = "h3/6 w-full flex flex-row justify-around items-center"
    followingDaysDivBottom.classList = "h3/6 w-full flex flex-row justify-evenly items-center"

    followingDaysDiv.appendChild(followingDaysTextDiv)
    followingDaysDiv.appendChild(followingDaysDivTop)
    followingDaysDiv.appendChild(followingDaysDivBottom)
    cardDiv.appendChild(followingDaysDiv)
}


// -----------------------Fetching 10 days data ---------------------------------------------
// Because of api provider, can not access the 10 days data

// let locationKey2 = 318290


function fetchFiveDays(){
    fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&details=true&metric=true`)
    .then(resp => resp.json())
    .then(json => {
        showFollowingDaysWeather(json)

        document.querySelector('#singleTop').remove()

    })
}



// --------------------------------------------------------------------------

// --------------------------------------------------------------------------

//this will be deleted when project is done
// const myObj =
// {
//     "LocalObservationDateTime": "2022-11-30T10:48:00+03:00",
//     "EpochTime": 1669794480,
//     "WeatherText": "Mostly cloudy",
//     "WeatherIcon": 25,
//     "HasPrecipitation": false,
//     "PrecipitationType": null,
//     "IsDayTime": true,
//     "Temperature": {
//         "Metric": {
//             "Value": 15.7,
//             "Unit": "C",
//             "UnitType": 17
//         },
//         "Imperial": {
//             "Value": 60,
//             "Unit": "F",
//             "UnitType": 18
//         }
//     },
//     "MobileLink": "http://www.accuweather.com/en/tr/izmir/318290/current-weather/318290?lang=en-us",
//     "Link": "http://www.accuweather.com/en/tr/izmir/318290/current-weather/318290?lang=en-us"
// }

// ----------------------BUTTONS----------------------------------


detailsBtn.addEventListener('click', e => {
    e.preventDefault()

    if(detailsBtn.textContent !== "X"){
        selectionBar.classList = "w-full flex flex-row justify-around items-center nav-button-color h-8 visible"

        detailsBtn.textContent = "X"
        detailsBtn.classList = "flex flex-col justify-center items-center nav-text-color mb-1 font-bold underline underline-offset-2 hover:cursor-n-resize"
    }else{
        selectionBar.classList = "w-full flex flex-row justify-around items-center nav-button-color h-8 hidden"
        detailsBtn.innerHTML = '<svg class="fill-current w-4 h-4 hover:cursor-s-resize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>'
    }
    
})

fiveDaysBtn.addEventListener('click', e => {
    e.preventDefault()

    document.querySelector('#singleTop').remove()
    document.querySelector('#followingDaysBottom').remove()

        fetchFiveDays()
    

})

todayBtn.addEventListener('click', e => {
    e.preventDefault()

    fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}&details=true`)
    .then(resp => resp.json())
    .then(json => {



        
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
//For new searches

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    detailsBtn.style.display = 'none'
    selectionBar.style.display = 'flex'

    const writtenCityName = searchBar.value
        cityName = writtenCityName.toLowerCase()

    if(cityName === "izmir"){
        mainBody.classList = "h-full flex flex-col items-center justify-center bg-[url('./images/izmir.jpeg')] opacity-90"
    }else if(cityName === "ankara"){
        mainBody.classList = "h-full flex flex-col items-center justify-center bg-[url('./images/ankara.webp')] opacity-90"
    }else{
        mainBody.classList = "h-full flex flex-col items-center justify-center bg-[url('./images/istanbul.jpeg')] opacity-90"
    }

    searchBar.value = ""

fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}&details=true`)
.then(resp => resp.json())
.then(json => {



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
// -----------------------BUTTONS END-------------------------------------------

window.addEventListener("DOMContentLoaded", (e) => {
      //showCurrentWeather(myObj)

    fetchCurrentWeather(cityName)
    
})


logo.addEventListener('click', e => {
    window.location.reload()
} )
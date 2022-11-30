const apiKey = '1VdEXvl3YsOlGL9l9UejzXOD5OmZZvYv'
const apiKeyYedek = '8jbLGyvGrkbeiQ33FP9Qd1GFkdNjus2E'
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

        return locationKey
    })
)}
).then(locationKey => {
    return (fetchFollowingDaysWeather(locationKey))
})
}

// --------------------------------------------------------------------------
// Rendering incoming data for current status
function showCurrentWeather(data){
    
   const selectedIcon = findRelatedIcon(data.WeatherIcon)

    console.log(data)
    console.log(data.WeatherIcon)
    console.log(selectedIcon)

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

// ------------------------------------------------------------------------Sample data for following days

// const myObjFollowingDays = 
// {
//     "Headline": {
//         "EffectiveDate": "2022-11-30T19:00:00+03:00",
//         "EffectiveEpochDate": 1669824000,
//         "Severity": 4,
//         "Text": "Expect showery weather Wednesday evening through Thursday afternoon",
//         "Category": "rain",
//         "EndDate": "2022-12-01T19:00:00+03:00",
//         "EndEpochDate": 1669910400,
//         "MobileLink": "http://www.accuweather.com/en/tr/izmir/318290/daily-weather-forecast/318290?unit=c&lang=en-us",
//         "Link": "http://www.accuweather.com/en/tr/izmir/318290/daily-weather-forecast/318290?unit=c&lang=en-us"
//     },
//     "DailyForecasts": [
//         {
//             "Date": "2022-11-30T07:00:00+03:00",
//             "EpochDate": 1669780800,
//             "Sun": {
//                 "Rise": "2022-11-30T08:08:00+03:00",
//                 "EpochRise": 1669784880,
//                 "Set": "2022-11-30T17:51:00+03:00",
//                 "EpochSet": 1669819860
//             },
//             "Moon": {
//                 "Rise": "2022-11-30T13:59:00+03:00",
//                 "EpochRise": 1669805940,
//                 "Set": "2022-12-01T00:59:00+03:00",
//                 "EpochSet": 1669845540,
//                 "Phase": "First",
//                 "Age": 6
//             },
//             "Temperature": {
//                 "Minimum": {
//                     "Value": 12.8,
//                     "Unit": "C",
//                     "UnitType": 17
//                 },
//                 "Maximum": {
//                     "Value": 18.9,
//                     "Unit": "C",
//                     "UnitType": 17
//                 }
//             },
//             "RealFeelTemperature": {
//                 "Minimum": {
//                     "Value": 11.2,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Cool"
//                 },
//                 "Maximum": {
//                     "Value": 18.8,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Pleasant"
//                 }
//             },
//             "RealFeelTemperatureShade": {
//                 "Minimum": {
//                     "Value": 11.2,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Cool"
//                 },
//                 "Maximum": {
//                     "Value": 17.6,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Pleasant"
//                 }
//             },
//             "HoursOfSun": 2.8,
//             "DegreeDaySummary": {
//                 "Heating": {
//                     "Value": 2,
//                     "Unit": "C",
//                     "UnitType": 17
//                 },
//                 "Cooling": {
//                     "Value": 0,
//                     "Unit": "C",
//                     "UnitType": 17
//                 }
//             },
//             "AirAndPollen": [
//                 {
//                     "Name": "AirQuality",
//                     "Value": 0,
//                     "Category": "Good",
//                     "CategoryValue": 1,
//                     "Type": "Ozone"
//                 },
//                 {
//                     "Name": "Grass",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Mold",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Ragweed",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Tree",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "UVIndex",
//                     "Value": 2,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 }
//             ],
//             "Day": {
//                 "Icon": 12,
//                 "IconPhrase": "Showers",
//                 "HasPrecipitation": true,
//                 "PrecipitationType": "Rain",
//                 "PrecipitationIntensity": "Light",
//                 "ShortPhrase": "Cloudy",
//                 "LongPhrase": "Cloudy",
//                 "PrecipitationProbability": 55,
//                 "ThunderstormProbability": 11,
//                 "RainProbability": 55,
//                 "SnowProbability": 0,
//                 "IceProbability": 0,
//                 "Wind": {
//                     "Speed": {
//                         "Value": 7.4,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 113,
//                         "Localized": "ESE",
//                         "English": "ESE"
//                     }
//                 },
//                 "WindGust": {
//                     "Speed": {
//                         "Value": 22.2,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 134,
//                         "Localized": "SE",
//                         "English": "SE"
//                     }
//                 },
//                 "TotalLiquid": {
//                     "Value": 0.6,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Rain": {
//                     "Value": 0.6,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Snow": {
//                     "Value": 0,
//                     "Unit": "cm",
//                     "UnitType": 4
//                 },
//                 "Ice": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "HoursOfPrecipitation": 1.5,
//                 "HoursOfRain": 1.5,
//                 "HoursOfSnow": 0,
//                 "HoursOfIce": 0,
//                 "CloudCover": 89,
//                 "Evapotranspiration": {
//                     "Value": 1,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "SolarIrradiance": {
//                     "Value": 1346.7,
//                     "Unit": "W/m²",
//                     "UnitType": 33
//                 }
//             },
//             "Night": {
//                 "Icon": 7,
//                 "IconPhrase": "Cloudy",
//                 "HasPrecipitation": false,
//                 "ShortPhrase": "Cloudy",
//                 "LongPhrase": "Cloudy",
//                 "PrecipitationProbability": 87,
//                 "ThunderstormProbability": 17,
//                 "RainProbability": 87,
//                 "SnowProbability": 0,
//                 "IceProbability": 0,
//                 "Wind": {
//                     "Speed": {
//                         "Value": 11.1,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 126,
//                         "Localized": "SE",
//                         "English": "SE"
//                     }
//                 },
//                 "WindGust": {
//                     "Speed": {
//                         "Value": 27.8,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 138,
//                         "Localized": "SE",
//                         "English": "SE"
//                     }
//                 },
//                 "TotalLiquid": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Rain": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Snow": {
//                     "Value": 0,
//                     "Unit": "cm",
//                     "UnitType": 4
//                 },
//                 "Ice": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "HoursOfPrecipitation": 0,
//                 "HoursOfRain": 0,
//                 "HoursOfSnow": 0,
//                 "HoursOfIce": 0,
//                 "CloudCover": 85,
//                 "Evapotranspiration": {
//                     "Value": 0.3,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "SolarIrradiance": {
//                     "Value": 0,
//                     "Unit": "W/m²",
//                     "UnitType": 33
//                 }
//             },
//             "Sources": [
//                 "AccuWeather"
//             ],
//             "MobileLink": "http://www.accuweather.com/en/tr/izmir/318290/daily-weather-forecast/318290?day=1&unit=c&lang=en-us",
//             "Link": "http://www.accuweather.com/en/tr/izmir/318290/daily-weather-forecast/318290?day=1&unit=c&lang=en-us"
//         },
//         {
//             "Date": "2022-12-01T07:00:00+03:00",
//             "EpochDate": 1669867200,
//             "Sun": {
//                 "Rise": "2022-12-01T08:09:00+03:00",
//                 "EpochRise": 1669871340,
//                 "Set": "2022-12-01T17:51:00+03:00",
//                 "EpochSet": 1669906260
//             },
//             "Moon": {
//                 "Rise": "2022-12-01T14:26:00+03:00",
//                 "EpochRise": 1669893960,
//                 "Set": "2022-12-02T02:07:00+03:00",
//                 "EpochSet": 1669936020,
//                 "Phase": "WaxingGibbous",
//                 "Age": 7
//             },
//             "Temperature": {
//                 "Minimum": {
//                     "Value": 9.4,
//                     "Unit": "C",
//                     "UnitType": 17
//                 },
//                 "Maximum": {
//                     "Value": 16.1,
//                     "Unit": "C",
//                     "UnitType": 17
//                 }
//             },
//             "RealFeelTemperature": {
//                 "Minimum": {
//                     "Value": 8.7,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Chilly"
//                 },
//                 "Maximum": {
//                     "Value": 14.1,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Cool"
//                 }
//             },
//             "RealFeelTemperatureShade": {
//                 "Minimum": {
//                     "Value": 8.7,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Chilly"
//                 },
//                 "Maximum": {
//                     "Value": 13.8,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Cool"
//                 }
//             },
//             "HoursOfSun": 1.9,
//             "DegreeDaySummary": {
//                 "Heating": {
//                     "Value": 5,
//                     "Unit": "C",
//                     "UnitType": 17
//                 },
//                 "Cooling": {
//                     "Value": 0,
//                     "Unit": "C",
//                     "UnitType": 17
//                 }
//             },
//             "AirAndPollen": [
//                 {
//                     "Name": "AirQuality",
//                     "Value": 0,
//                     "Category": "Good",
//                     "CategoryValue": 1,
//                     "Type": "Ozone"
//                 },
//                 {
//                     "Name": "Grass",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Mold",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Ragweed",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Tree",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "UVIndex",
//                     "Value": 1,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 }
//             ],
//             "Day": {
//                 "Icon": 18,
//                 "IconPhrase": "Rain",
//                 "HasPrecipitation": true,
//                 "PrecipitationType": "Rain",
//                 "PrecipitationIntensity": "Light",
//                 "ShortPhrase": "Rain tapering to drizzle",
//                 "LongPhrase": "Mostly cloudy with rain tapering to drizzle",
//                 "PrecipitationProbability": 91,
//                 "ThunderstormProbability": 17,
//                 "RainProbability": 91,
//                 "SnowProbability": 0,
//                 "IceProbability": 0,
//                 "Wind": {
//                     "Speed": {
//                         "Value": 16.7,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 121,
//                         "Localized": "ESE",
//                         "English": "ESE"
//                     }
//                 },
//                 "WindGust": {
//                     "Speed": {
//                         "Value": 38.9,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 130,
//                         "Localized": "SE",
//                         "English": "SE"
//                     }
//                 },
//                 "TotalLiquid": {
//                     "Value": 7.6,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Rain": {
//                     "Value": 7.6,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Snow": {
//                     "Value": 0,
//                     "Unit": "cm",
//                     "UnitType": 4
//                 },
//                 "Ice": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "HoursOfPrecipitation": 4.5,
//                 "HoursOfRain": 4.5,
//                 "HoursOfSnow": 0,
//                 "HoursOfIce": 0,
//                 "CloudCover": 93,
//                 "Evapotranspiration": {
//                     "Value": 0.8,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "SolarIrradiance": {
//                     "Value": 1184.3,
//                     "Unit": "W/m²",
//                     "UnitType": 33
//                 }
//             },
//             "Night": {
//                 "Icon": 12,
//                 "IconPhrase": "Showers",
//                 "HasPrecipitation": false,
//                 "ShortPhrase": "Mostly cloudy, showers around",
//                 "LongPhrase": "Mostly cloudy with a couple of showers",
//                 "PrecipitationProbability": 25,
//                 "ThunderstormProbability": 1,
//                 "RainProbability": 25,
//                 "SnowProbability": 0,
//                 "IceProbability": 0,
//                 "Wind": {
//                     "Speed": {
//                         "Value": 9.3,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 140,
//                         "Localized": "SE",
//                         "English": "SE"
//                     }
//                 },
//                 "WindGust": {
//                     "Speed": {
//                         "Value": 25.9,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 134,
//                         "Localized": "SE",
//                         "English": "SE"
//                     }
//                 },
//                 "TotalLiquid": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Rain": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Snow": {
//                     "Value": 0,
//                     "Unit": "cm",
//                     "UnitType": 4
//                 },
//                 "Ice": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "HoursOfPrecipitation": 0,
//                 "HoursOfRain": 0,
//                 "HoursOfSnow": 0,
//                 "HoursOfIce": 0,
//                 "CloudCover": 57,
//                 "Evapotranspiration": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "SolarIrradiance": {
//                     "Value": 0,
//                     "Unit": "W/m²",
//                     "UnitType": 33
//                 }
//             },
//             "Sources": [
//                 "AccuWeather"
//             ],
//             "MobileLink": "http://www.accuweather.com/en/tr/izmir/318290/daily-weather-forecast/318290?day=2&unit=c&lang=en-us",
//             "Link": "http://www.accuweather.com/en/tr/izmir/318290/daily-weather-forecast/318290?day=2&unit=c&lang=en-us"
//         },
//         {
//             "Date": "2022-12-02T07:00:00+03:00",
//             "EpochDate": 1669953600,
//             "Sun": {
//                 "Rise": "2022-12-02T08:10:00+03:00",
//                 "EpochRise": 1669957800,
//                 "Set": "2022-12-02T17:51:00+03:00",
//                 "EpochSet": 1669992660
//             },
//             "Moon": {
//                 "Rise": "2022-12-02T14:51:00+03:00",
//                 "EpochRise": 1669981860,
//                 "Set": "2022-12-03T03:13:00+03:00",
//                 "EpochSet": 1670026380,
//                 "Phase": "WaxingGibbous",
//                 "Age": 8
//             },
//             "Temperature": {
//                 "Minimum": {
//                     "Value": 9.4,
//                     "Unit": "C",
//                     "UnitType": 17
//                 },
//                 "Maximum": {
//                     "Value": 16.1,
//                     "Unit": "C",
//                     "UnitType": 17
//                 }
//             },
//             "RealFeelTemperature": {
//                 "Minimum": {
//                     "Value": 11,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Cool"
//                 },
//                 "Maximum": {
//                     "Value": 16.2,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Cool"
//                 }
//             },
//             "RealFeelTemperatureShade": {
//                 "Minimum": {
//                     "Value": 11,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Cool"
//                 },
//                 "Maximum": {
//                     "Value": 15.5,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Cool"
//                 }
//             },
//             "HoursOfSun": 4.9,
//             "DegreeDaySummary": {
//                 "Heating": {
//                     "Value": 5,
//                     "Unit": "C",
//                     "UnitType": 17
//                 },
//                 "Cooling": {
//                     "Value": 0,
//                     "Unit": "C",
//                     "UnitType": 17
//                 }
//             },
//             "AirAndPollen": [
//                 {
//                     "Name": "AirQuality",
//                     "Value": 0,
//                     "Category": "Good",
//                     "CategoryValue": 1,
//                     "Type": "Ozone"
//                 },
//                 {
//                     "Name": "Grass",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Mold",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Ragweed",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Tree",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "UVIndex",
//                     "Value": 2,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 }
//             ],
//             "Day": {
//                 "Icon": 14,
//                 "IconPhrase": "Partly sunny w/ showers",
//                 "HasPrecipitation": true,
//                 "PrecipitationType": "Rain",
//                 "PrecipitationIntensity": "Light",
//                 "ShortPhrase": "Partly sunny with a shower",
//                 "LongPhrase": "Times of clouds and sun with a passing shower",
//                 "PrecipitationProbability": 80,
//                 "ThunderstormProbability": 16,
//                 "RainProbability": 80,
//                 "SnowProbability": 0,
//                 "IceProbability": 0,
//                 "Wind": {
//                     "Speed": {
//                         "Value": 7.4,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 149,
//                         "Localized": "SSE",
//                         "English": "SSE"
//                     }
//                 },
//                 "WindGust": {
//                     "Speed": {
//                         "Value": 22.2,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 153,
//                         "Localized": "SSE",
//                         "English": "SSE"
//                     }
//                 },
//                 "TotalLiquid": {
//                     "Value": 1.2,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Rain": {
//                     "Value": 1.2,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Snow": {
//                     "Value": 0,
//                     "Unit": "cm",
//                     "UnitType": 4
//                 },
//                 "Ice": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "HoursOfPrecipitation": 1,
//                 "HoursOfRain": 1,
//                 "HoursOfSnow": 0,
//                 "HoursOfIce": 0,
//                 "CloudCover": 59,
//                 "Evapotranspiration": {
//                     "Value": 1,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "SolarIrradiance": {
//                     "Value": 2180.5,
//                     "Unit": "W/m²",
//                     "UnitType": 33
//                 }
//             },
//             "Night": {
//                 "Icon": 36,
//                 "IconPhrase": "Intermittent clouds",
//                 "HasPrecipitation": false,
//                 "ShortPhrase": "Partly cloudy",
//                 "LongPhrase": "Partly cloudy",
//                 "PrecipitationProbability": 11,
//                 "ThunderstormProbability": 0,
//                 "RainProbability": 11,
//                 "SnowProbability": 0,
//                 "IceProbability": 0,
//                 "Wind": {
//                     "Speed": {
//                         "Value": 3.7,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 96,
//                         "Localized": "E",
//                         "English": "E"
//                     }
//                 },
//                 "WindGust": {
//                     "Speed": {
//                         "Value": 11.1,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 103,
//                         "Localized": "ESE",
//                         "English": "ESE"
//                     }
//                 },
//                 "TotalLiquid": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Rain": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Snow": {
//                     "Value": 0,
//                     "Unit": "cm",
//                     "UnitType": 4
//                 },
//                 "Ice": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "HoursOfPrecipitation": 0,
//                 "HoursOfRain": 0,
//                 "HoursOfSnow": 0,
//                 "HoursOfIce": 0,
//                 "CloudCover": 53,
//                 "Evapotranspiration": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "SolarIrradiance": {
//                     "Value": 0,
//                     "Unit": "W/m²",
//                     "UnitType": 33
//                 }
//             },
//             "Sources": [
//                 "AccuWeather"
//             ],
//             "MobileLink": "http://www.accuweather.com/en/tr/izmir/318290/daily-weather-forecast/318290?day=3&unit=c&lang=en-us",
//             "Link": "http://www.accuweather.com/en/tr/izmir/318290/daily-weather-forecast/318290?day=3&unit=c&lang=en-us"
//         },
//         {
//             "Date": "2022-12-03T07:00:00+03:00",
//             "EpochDate": 1670040000,
//             "Sun": {
//                 "Rise": "2022-12-03T08:11:00+03:00",
//                 "EpochRise": 1670044260,
//                 "Set": "2022-12-03T17:51:00+03:00",
//                 "EpochSet": 1670079060
//             },
//             "Moon": {
//                 "Rise": "2022-12-03T15:16:00+03:00",
//                 "EpochRise": 1670069760,
//                 "Set": "2022-12-04T04:17:00+03:00",
//                 "EpochSet": 1670116620,
//                 "Phase": "WaxingGibbous",
//                 "Age": 9
//             },
//             "Temperature": {
//                 "Minimum": {
//                     "Value": 9.4,
//                     "Unit": "C",
//                     "UnitType": 17
//                 },
//                 "Maximum": {
//                     "Value": 17.2,
//                     "Unit": "C",
//                     "UnitType": 17
//                 }
//             },
//             "RealFeelTemperature": {
//                 "Minimum": {
//                     "Value": 10.7,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Cool"
//                 },
//                 "Maximum": {
//                     "Value": 17.9,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Pleasant"
//                 }
//             },
//             "RealFeelTemperatureShade": {
//                 "Minimum": {
//                     "Value": 10.7,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Cool"
//                 },
//                 "Maximum": {
//                     "Value": 16.4,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Cool"
//                 }
//             },
//             "HoursOfSun": 3.4,
//             "DegreeDaySummary": {
//                 "Heating": {
//                     "Value": 5,
//                     "Unit": "C",
//                     "UnitType": 17
//                 },
//                 "Cooling": {
//                     "Value": 0,
//                     "Unit": "C",
//                     "UnitType": 17
//                 }
//             },
//             "AirAndPollen": [
//                 {
//                     "Name": "AirQuality",
//                     "Value": 0,
//                     "Category": "Good",
//                     "CategoryValue": 1,
//                     "Type": "Ozone"
//                 },
//                 {
//                     "Name": "Grass",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Mold",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Ragweed",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Tree",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "UVIndex",
//                     "Value": 2,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 }
//             ],
//             "Day": {
//                 "Icon": 6,
//                 "IconPhrase": "Mostly cloudy",
//                 "HasPrecipitation": false,
//                 "ShortPhrase": "Clouds giving way to some sun",
//                 "LongPhrase": "Mostly cloudy in the morning followed by sun through high clouds",
//                 "PrecipitationProbability": 3,
//                 "ThunderstormProbability": 0,
//                 "RainProbability": 3,
//                 "SnowProbability": 0,
//                 "IceProbability": 0,
//                 "Wind": {
//                     "Speed": {
//                         "Value": 7.4,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 28,
//                         "Localized": "NNE",
//                         "English": "NNE"
//                     }
//                 },
//                 "WindGust": {
//                     "Speed": {
//                         "Value": 18.5,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 7,
//                         "Localized": "N",
//                         "English": "N"
//                     }
//                 },
//                 "TotalLiquid": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Rain": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Snow": {
//                     "Value": 0,
//                     "Unit": "cm",
//                     "UnitType": 4
//                 },
//                 "Ice": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "HoursOfPrecipitation": 0,
//                 "HoursOfRain": 0,
//                 "HoursOfSnow": 0,
//                 "HoursOfIce": 0,
//                 "CloudCover": 83,
//                 "Evapotranspiration": {
//                     "Value": 1,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "SolarIrradiance": {
//                     "Value": 1780,
//                     "Unit": "W/m²",
//                     "UnitType": 33
//                 }
//             },
//             "Night": {
//                 "Icon": 36,
//                 "IconPhrase": "Intermittent clouds",
//                 "HasPrecipitation": false,
//                 "ShortPhrase": "Increasing clouds",
//                 "LongPhrase": "Increasing clouds",
//                 "PrecipitationProbability": 3,
//                 "ThunderstormProbability": 0,
//                 "RainProbability": 3,
//                 "SnowProbability": 0,
//                 "IceProbability": 0,
//                 "Wind": {
//                     "Speed": {
//                         "Value": 5.6,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 13,
//                         "Localized": "NNE",
//                         "English": "NNE"
//                     }
//                 },
//                 "WindGust": {
//                     "Speed": {
//                         "Value": 16.7,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 353,
//                         "Localized": "N",
//                         "English": "N"
//                     }
//                 },
//                 "TotalLiquid": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Rain": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Snow": {
//                     "Value": 0,
//                     "Unit": "cm",
//                     "UnitType": 4
//                 },
//                 "Ice": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "HoursOfPrecipitation": 0,
//                 "HoursOfRain": 0,
//                 "HoursOfSnow": 0,
//                 "HoursOfIce": 0,
//                 "CloudCover": 86,
//                 "Evapotranspiration": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "SolarIrradiance": {
//                     "Value": 0,
//                     "Unit": "W/m²",
//                     "UnitType": 33
//                 }
//             },
//             "Sources": [
//                 "AccuWeather"
//             ],
//             "MobileLink": "http://www.accuweather.com/en/tr/izmir/318290/daily-weather-forecast/318290?day=4&unit=c&lang=en-us",
//             "Link": "http://www.accuweather.com/en/tr/izmir/318290/daily-weather-forecast/318290?day=4&unit=c&lang=en-us"
//         },
//         {
//             "Date": "2022-12-04T07:00:00+03:00",
//             "EpochDate": 1670126400,
//             "Sun": {
//                 "Rise": "2022-12-04T08:12:00+03:00",
//                 "EpochRise": 1670130720,
//                 "Set": "2022-12-04T17:51:00+03:00",
//                 "EpochSet": 1670165460
//             },
//             "Moon": {
//                 "Rise": "2022-12-04T15:40:00+03:00",
//                 "EpochRise": 1670157600,
//                 "Set": "2022-12-05T05:22:00+03:00",
//                 "EpochSet": 1670206920,
//                 "Phase": "WaxingGibbous",
//                 "Age": 10
//             },
//             "Temperature": {
//                 "Minimum": {
//                     "Value": 7.2,
//                     "Unit": "C",
//                     "UnitType": 17
//                 },
//                 "Maximum": {
//                     "Value": 16.7,
//                     "Unit": "C",
//                     "UnitType": 17
//                 }
//             },
//             "RealFeelTemperature": {
//                 "Minimum": {
//                     "Value": 7.3,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Chilly"
//                 },
//                 "Maximum": {
//                     "Value": 18.3,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Pleasant"
//                 }
//             },
//             "RealFeelTemperatureShade": {
//                 "Minimum": {
//                     "Value": 7.3,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Chilly"
//                 },
//                 "Maximum": {
//                     "Value": 16.6,
//                     "Unit": "C",
//                     "UnitType": 17,
//                     "Phrase": "Pleasant"
//                 }
//             },
//             "HoursOfSun": 9.4,
//             "DegreeDaySummary": {
//                 "Heating": {
//                     "Value": 6,
//                     "Unit": "C",
//                     "UnitType": 17
//                 },
//                 "Cooling": {
//                     "Value": 0,
//                     "Unit": "C",
//                     "UnitType": 17
//                 }
//             },
//             "AirAndPollen": [
//                 {
//                     "Name": "AirQuality",
//                     "Value": 0,
//                     "Category": "Good",
//                     "CategoryValue": 1,
//                     "Type": "Ozone"
//                 },
//                 {
//                     "Name": "Grass",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Mold",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Ragweed",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "Tree",
//                     "Value": 0,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 },
//                 {
//                     "Name": "UVIndex",
//                     "Value": 2,
//                     "Category": "Low",
//                     "CategoryValue": 1
//                 }
//             ],
//             "Day": {
//                 "Icon": 1,
//                 "IconPhrase": "Sunny",
//                 "HasPrecipitation": false,
//                 "ShortPhrase": "Plenty of sunshine",
//                 "LongPhrase": "Plenty of sunshine",
//                 "PrecipitationProbability": 2,
//                 "ThunderstormProbability": 0,
//                 "RainProbability": 2,
//                 "SnowProbability": 0,
//                 "IceProbability": 0,
//                 "Wind": {
//                     "Speed": {
//                         "Value": 5.6,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 349,
//                         "Localized": "N",
//                         "English": "N"
//                     }
//                 },
//                 "WindGust": {
//                     "Speed": {
//                         "Value": 16.7,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 308,
//                         "Localized": "NW",
//                         "English": "NW"
//                     }
//                 },
//                 "TotalLiquid": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Rain": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Snow": {
//                     "Value": 0,
//                     "Unit": "cm",
//                     "UnitType": 4
//                 },
//                 "Ice": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "HoursOfPrecipitation": 0,
//                 "HoursOfRain": 0,
//                 "HoursOfSnow": 0,
//                 "HoursOfIce": 0,
//                 "CloudCover": 3,
//                 "Evapotranspiration": {
//                     "Value": 1.5,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "SolarIrradiance": {
//                     "Value": 3615.8,
//                     "Unit": "W/m²",
//                     "UnitType": 33
//                 }
//             },
//             "Night": {
//                 "Icon": 34,
//                 "IconPhrase": "Mostly clear",
//                 "HasPrecipitation": false,
//                 "ShortPhrase": "Mainly clear",
//                 "LongPhrase": "Mainly clear",
//                 "PrecipitationProbability": 3,
//                 "ThunderstormProbability": 0,
//                 "RainProbability": 3,
//                 "SnowProbability": 0,
//                 "IceProbability": 0,
//                 "Wind": {
//                     "Speed": {
//                         "Value": 9.3,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 55,
//                         "Localized": "NE",
//                         "English": "NE"
//                     }
//                 },
//                 "WindGust": {
//                     "Speed": {
//                         "Value": 14.8,
//                         "Unit": "km/h",
//                         "UnitType": 7
//                     },
//                     "Direction": {
//                         "Degrees": 322,
//                         "Localized": "NW",
//                         "English": "NW"
//                     }
//                 },
//                 "TotalLiquid": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Rain": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "Snow": {
//                     "Value": 0,
//                     "Unit": "cm",
//                     "UnitType": 4
//                 },
//                 "Ice": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "HoursOfPrecipitation": 0,
//                 "HoursOfRain": 0,
//                 "HoursOfSnow": 0,
//                 "HoursOfIce": 0,
//                 "CloudCover": 26,
//                 "Evapotranspiration": {
//                     "Value": 0,
//                     "Unit": "mm",
//                     "UnitType": 3
//                 },
//                 "SolarIrradiance": {
//                     "Value": 0,
//                     "Unit": "W/m²",
//                     "UnitType": 33
//                 }
//             },
//             "Sources": [
//                 "AccuWeather"
//             ],
//             "MobileLink": "http://www.accuweather.com/en/tr/izmir/318290/daily-weather-forecast/318290?day=5&unit=c&lang=en-us",
//             "Link": "http://www.accuweather.com/en/tr/izmir/318290/daily-weather-forecast/318290?day=5&unit=c&lang=en-us"
//         }
//     ]
// }



// --------------------------------------------------------------------------

function fetchFollowingDaysWeather(locationKey){
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&details=true&metric=true`)
    .then(resp => resp.json())
    .then(json => {

        showFollowingDaysWeather(json)
    })
}

// --------------------------------------------------------------------------
    
function showFollowingDaysWeather(followingDaysData){
    const data = followingDaysData.DailyForecasts
    const cardDiv = document.querySelector("#singleDayCard")

    console.log(data)

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
        followingDayDate.classList = "text-center underline font-medium"

        followingDayDateDiv.appendChild(followingDayDate)
            followingDayDateDiv.classList = "w-full flex items-center justify-center"
        followingDaySpan.appendChild(followingDayDate)

        const selectedIcon = findRelatedIcon(data[i].Day.Icon)
        

        const followingDayImg = document.createElement('i')
            followingDayImg.classList = `${selectedIcon} pe-3x`
                followingDaySpan.appendChild(followingDayImg)

        const followingDayTemperature = document.createElement('p')
        const weatherValue = Math.round(data[i].Temperature.Maximum.Value)
        const weatherValueMin = Math.round(data[i].Temperature.Minimum.Value)
            followingDayTemperature.textContent = `${weatherValue} °${data[i].Temperature.Maximum.Unit} / ${weatherValueMin} °${data[i].Temperature.Minimum.Unit} `
                followingDaySpan.appendChild(followingDayTemperature)  
                
                followingDaySpan.classList = "flex flex-col items-center justify-center"    

        if(i < 3){

            followingDaysDivTop.appendChild(followingDaySpan)

        }else{
            followingDaysDivBottom.appendChild(followingDaySpan)
        }

    }            

    

    followingDaysDiv.classList = "h-3/6 w-full flex flex-col justify-evenly items-center"
    followingDaysDivTop.classList = "h3/6 w-full flex flex-row justify-around items-center"
    followingDaysDivBottom.classList = "h3/6 w-full flex flex-row justify-evenly items-center"

    followingDaysDiv.appendChild(followingDaysTextDiv)
    followingDaysDiv.appendChild(followingDaysDivTop)
    followingDaysDiv.appendChild(followingDaysDivBottom)
    cardDiv.appendChild(followingDaysDiv)
}






// --------------------------------------------------------------------------


// --------------------------------------------------------------------------

//this will be deleted when project is done
const myObj =
{
    "LocalObservationDateTime": "2022-11-30T10:48:00+03:00",
    "EpochTime": 1669794480,
    "WeatherText": "Mostly cloudy",
    "WeatherIcon": 25,
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

// ----------------------BUTTONS----------------------------------


detailsBtn.addEventListener('click', e => {
    e.preventDefault()

    if(detailsBtn.textContent !== "X"){
        selectionBar.style.display = 'flex'

        detailsBtn.textContent = "X"
        detailsBtn.classList = "flex flex-col justify-center items-center nav-text-color mb-1 font-bold underline underline-offset-2 hover:cursor-n-resize"
    }else{
        selectionBar.style.display = 'none'
        detailsBtn.innerHTML = '<svg class="fill-current w-4 h-4 hover:cursor-s-resize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>'
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
// -----------------------BUTTONS END-------------------------------------------

window.addEventListener("DOMContentLoaded", (e) => {
      showCurrentWeather(myObj)

    //fetchCurrentWeather(cityName)
    
})


logo.addEventListener('click', e => {
    window.location.reload()
} )
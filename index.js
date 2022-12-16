const searchBar = document.querySelector('#search-bar')
const submitBtn = document.querySelector('#submitBtn')
const cityNameSpan = document.querySelector('#city-name-span')
const selectionBar = document.querySelector('#selectionBar')
const detailsBtn = document.querySelector('#details-btn')
const mainDiv = document.querySelector('#main-div-1')
const logo = document.querySelector('#logo')
const mainBody = document.querySelector('#main-body')
const threeDaysBtn = document.querySelector('#threeDays')
const todayBtn = document.querySelector('#today')


// For initial screen
let selectedCity = 'istanbul'
// --------------------------------------------------------------------------

function findRelatedIcon(number){
    let result

    switch (number) {
        case 1000:
            result = "pe-7w-sun"
        break;

        case 1003:
            result = "pe-7w-cloud-sun"
        break;   

        case 1006: case 1009:
            result = "pe-7w-cloud"
        break;

        case 1030: case 1147:
            result = "pe-7w-fog"
        break;   

        case 1063:
            result = "pe-7w-rain-alt"
        break;

        case 1063:
            result = "pe-7w-rain-sun"
        break;   

        case  1150: case 1153: case 1180: case 1183: case 1186: case 1189:
            result = "pe-7w-rain-sun"
        break;   
         
        case 1261: case 1264:  
            result = "pe-7w-lightning-rain-sun"
        break;

        case 22: case 24: case 1168: case 1171:
            result = "pe-7w-snow-alt"
        break;  

        case 1066: case 1069: case 1072:
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

        case 1240: case 1252:
            result = "pe-7w-rain-alt"
        break;   

        case 1087: case 1192: case 1195: case 1198: case 1201: case 1243: case 1246: case 1273: case 1276: 
            result = "pe-7w-lightning-rain"
        break;

        case 1114: case 1117: case 1204: case 1207: case 1210: case 1213: case 1216: case 1219: case 1222: case 1225: case 1237: case 1255: case 1258: case 1279: case 1282:
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
async function fetchCurrentWeather(selectedCity='istanbul'){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'befdda097fmsh5166c116454dc48p13e7aejsn9099d5daf525',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    const resp = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${selectedCity}`, options)
    const json = await resp.json()


    const countryNameEnglish = await json.location.country
    const cityNameEnglish = await json.location.name

    cityNameSpan.textContent = `${cityNameEnglish}, ${countryNameEnglish}`
    
        
    cityNameSpan.textContent = `${cityNameEnglish}, ${countryNameEnglish}`
    
        
    return json
}




// --------------------------------------------------------------------------
// Rendering coming data for current status
 async function showCurrentWeather(data){

   const selectedIcon = findRelatedIcon(data.current.condition.code)
   


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

            //this img part will be reviewed
        const singleCardImg = document.createElement('i')
            singleCardImg.classList = `${selectedIcon} pe-5x`
                statusDiv.appendChild(singleCardImg)
    
    const singleCardText = document.createElement('p')
        singleCardText.textContent = `${data.current.condition.text}`
            statusDiv.appendChild(singleCardText)

    const singleCardTempature = document.createElement('p')
        const weatherValue = Math.round(data.current.temp_c)
            singleCardTempature.textContent = `${weatherValue} °C`
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
// --------------------------------------------------------------------------


async function fetchFollowingDaysWeather(selectedCity){
    
const optionsFollowing = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'befdda097fmsh5166c116454dc48p13e7aejsn9099d5daf525',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

    const resp = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${selectedCity}&days=3`, optionsFollowing)

    const json = await resp.json()
    return json

}
    

// --------------------------------------------------------------------------
    
function showFollowingDaysWeather(followingDaysData){
    const data = followingDaysData.forecast.forecastday


    const cardDiv = document.querySelector("#singleDayCard")


    const followingDaysDiv = document.createElement('div')
    const followingDaysTextDiv = document.createElement('div')
        const topText = document.createElement('p')
        topText.textContent = "Following 3 days' weather"
        followingDaysTextDiv.appendChild(topText)

        topText.classList = "text-center underline font-bold"
        followingDaysDiv.classList = "w-full flex justify-center items-center"
        


    const followingDaysDivBottom = document.createElement('div')

    

    for(let i = 0; i < 3; i++){
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

        //will review later icon
        const selectedIcon = findRelatedIcon(data[i].day.condition.code)

        

        const followingDayImg = document.createElement('i')
            followingDayImg.classList = `${selectedIcon} pe-3x font-bold`
                followingDaySpan.appendChild(followingDayImg)

        const followingDayTemperature = document.createElement('p')
        const weatherValue = Math.round(data[i].day.maxtemp_c)
        const weatherValueMin = Math.round(data[i].day.mintemp_c)
            followingDayTemperature.textContent = `${weatherValue} °C / ${weatherValueMin} °C`
            followingDayTemperature.classList = "font-semibold"
                followingDaySpan.appendChild(followingDayTemperature)  
                
                followingDaySpan.classList = "flex flex-col items-center justify-center"    

        
            followingDaysDivBottom.appendChild(followingDaySpan)
        

    }            

    

    followingDaysDiv.classList = "h-3/6 w-full flex flex-col justify-evenly items-center"
        followingDaysDiv.id = "followingDaysBottom"
    followingDaysDivBottom.classList = "h3/6 w-full flex flex-row justify-evenly items-center"

    followingDaysDiv.appendChild(followingDaysTextDiv)
    followingDaysDiv.appendChild(followingDaysDivBottom)
    cardDiv.appendChild(followingDaysDiv)
}


// -----------------------Fetching next 3 days ---------------------------------------------

async function fetchThreeDays(selectedCity = "istanbul"){
    
    const optionsFollowing = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'befdda097fmsh5166c116454dc48p13e7aejsn9099d5daf525',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
    };

    const resp = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${selectedCity}&days=3`, optionsFollowing)

    const json = await resp.json()
    return json


}


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

threeDaysBtn.addEventListener('click', e => {
    e.preventDefault()

    document.querySelector('#singleTop').remove()
    

})

todayBtn.addEventListener('click', e => {
    e.preventDefault()

    fetchCurrentWeather(selectedCity).then(json => showCurrentWeather(json))
    fetchFollowingDaysWeather(selectedCity).then(json => showFollowingDaysWeather(json))
    
})


// --------------------------------------------------------------------------
//For new searches

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    detailsBtn.style.display = 'none'
    selectionBar.style.display = 'flex'

    const writtenCityName = searchBar.value
        selectedCity = writtenCityName.toLowerCase()

    if(selectedCity === "izmir"){
        mainBody.classList = "h-full flex flex-col items-center justify-center bg-[url('./images/izmir.jpeg')] opacity-90"
    }else if(selectedCity === "ankara"){
        mainBody.classList = "h-full flex flex-col items-center justify-center bg-[url('./images/ankara.webp')] opacity-90"
    }else{
        mainBody.classList = "h-full flex flex-col items-center justify-center bg-[url('./images/istanbul.jpeg')] opacity-90"
    }

    searchBar.value = ""

    fetchCurrentWeather(selectedCity).then(json => showCurrentWeather(json))
    fetchFollowingDaysWeather(selectedCity).then(json => showFollowingDaysWeather(json))

})
// -----------------------BUTTONS END-------------------------------------------

window.addEventListener("DOMContentLoaded", (e) => {

    fetchCurrentWeather(selectedCity).then(json => showCurrentWeather(json))
    fetchFollowingDaysWeather(selectedCity).then(json => showFollowingDaysWeather(json))
    
})


logo.addEventListener('click', e => {
    window.location.reload()
} )
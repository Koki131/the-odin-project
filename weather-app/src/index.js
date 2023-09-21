import "./style.css";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

let isCelsius = true;

const day = function(forecast, index) {
    
    const date = forecast[index].date;
    const day = forecast[index].day;
    const hour = forecast[index].hour;

    const dayObj = {

        condition: day.condition,
        mintempC: day.mintemp_c,
        mintempF: day.mintemp_f,
        maxtempC: day.maxtemp_c,
        maxtempF: day.maxtemp_f,
        rain: day.daily_chance_of_rain,
        snow: day.daily_chance_of_snow,
        windKph: day.maxwind_kph,
        windMph: day.maxwind_mph,

    };

    function Hour(condition, rain, snow, time, tempC, tempF, windKph, windMph) {

        this.condition = condition;
        this.rain = rain;
        this.snow = snow;
        this.time = time;
        this.tempC = tempC;
        this.tempF = tempF;
        this.windKph = windKph;
        this.windMph = windMph;



        return { condition, rain, snow, time, tempC, tempF, windKph, windMph };

    }

    const hourArr = [];

    for (let i = 0; i < hour.length; i++) {

        hourArr.push(new Hour(hour[i].condition, hour[i].chance_of_rain, hour[i].chance_of_snow, hour[i].time, hour[i].temp_c, hour[i].temp_f, hour[i].wind_kph, hour[i].wind_mph));


    }


    return { date, dayObj, hourArr };

}



const getWeatherData = async function(city) {

    const API_KEY = "839f0fc855c24abebd4135419230402";

    try {
        const request = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=yes&alerts=no`, {mode: "cors"});
   
        const response = await request.json();

    
    
        const current = response.current;
        const forecast = response.forecast;
        const currentLocation = response.location;

        const weatherObj = {
    
            currentCity: currentLocation.name,
            currentCountry: currentLocation.country,
            humidity: current.humidity,
            condition: current.condition.text,
            conditionIcon: current.condition.icon,
            tempC: current.temp_c,
            tempF: current.temp_f,
            feelsLikeC: current.feelslike_c,
            feelsLikeF: current.feelslike_f,
            isDay: current.is_day,
            windKph: current.wind_kph,
            windMph: current.wind_mph,
            windDir: current.wind_dir,
            forecast: forecast.forecastday
    
        };
    
        return weatherObj;

    } catch (error) {
        
        alert("Invalid Location");
    
    }


}





const displayWeather = function() {

    const inputContainer = document.querySelector(".input-container");
    const generateData = inputContainer.querySelector("#form-submit");
    const location = inputContainer.querySelector("#location");




    generateData.addEventListener("click", async function(event) {

            event.preventDefault();

            try {
                
                const weather = await getWeatherData(location.value);
                const forecast = weather.forecast;

                const days = [];

                for (let i = 0; i < forecast.length; i++) {
                    days[i] = day(forecast, i);
                }
                

                generateDayElements(days);
                generateCurrentElements(weather);
                console.log(days);


            } catch (e) {
                console.error(e);
            }

        });
}

const generateDayElements = function(days) {

    const dayContainerDivs = [];

    const dayForecast = document.querySelector("#daily-forecast");
    const hourForecast = document.querySelector("#hourly-forecast");
    dayForecast.textContent = "";
    const leftArrow = document.querySelector("#left-arrow");
    const rightArrow = document.querySelector("#right-arrow");
    leftArrow.textContent = "";
    rightArrow.textContent = "";

    const leftChevron = document.createElement("i");
    leftChevron.classList.add("fa-solid", "fa-chevron-left");
    leftArrow.appendChild(leftChevron);
    const rightChevron = document.createElement("i");
    rightChevron.classList.add("fa-solid", "fa-chevron-right");
    rightArrow.appendChild(rightChevron);

    let dayClicked = days[0];
    
    for (let day of days) {
        
        let start = 0;
        let end = 6;

        const dayObj = day.dayObj;
        const condition = dayObj.condition;

        const div = document.createElement("div");
        div.id = "day-container";

        dayContainerDivs.push(div);
        dayContainerDivs[0].classList.add("active");

        generateHourElements(days[0], 0, 6, hourForecast);
        
        div.addEventListener("click", function() {

            dayClicked = day;

            generateHourElements(day, 0, 6, hourForecast);
            
            dayContainerDivs.forEach(d => {
                d.classList.remove("active");
            });

            div.classList.add("active");


        });


        rightArrow.addEventListener("click", function() {

            
            if (end === dayClicked.hourArr.length) {
                start = 0;
                end = 6;
            } else {
                start = end;
                end += 6;
            }

            generateHourElements(dayClicked, start, end, hourForecast);
    
        });
        
        leftArrow.addEventListener("click", function() {
    
    
            if (start === 0) {
                end = dayClicked.hourArr.length;
                start =  end - 6;
            } else {
                end = start;
                start = end - 6;
            }
    
    
            generateHourElements(dayClicked, start, end, hourForecast);
    
        });


        const dateCondDiv = document.createElement("div");
        dateCondDiv.id = "day-condition-div";

        const date = document.createElement("p");
        date.textContent = day.date;
        
        const icon = new Image();
        icon.src = "https:" + condition.icon;
        
        const text = document.createElement("p");
        text.textContent = condition.text;

        dateCondDiv.append(date, icon, text);

        const conditionsDiv = document.createElement("div");
        conditionsDiv.id = "day-conditions-div";

        const tempDiv = document.createElement("div");
        tempDiv.id = "day-temp-div";
        
        const minTemp = document.createElement("p");
        const maxTemp = document.createElement("p");    
        minTemp.classList.add("temp");
        maxTemp.classList.add("temp");  

        const elementsDiv = document.createElement("div");
        elementsDiv.id = "day-elements-div";
        
        const rain = document.createElement("p");
        const snow = document.createElement("p");

        
        const windDiv = document.createElement("div");
        windDiv.id = "day-wind-div";
        
        const wind = document.createElement("p");
        wind.classList.add("wind");

        minTemp.textContent = dayObj.mintempC + "\u00B0C";
        maxTemp.textContent = dayObj.maxtempC + "\u00B0C";
        rain.innerHTML = "<i class='fa-solid fa-cloud-rain'></i> " + dayObj.rain + " %";
        snow.innerHTML = "<i class='fa-solid fa-snowflake'></i> " + dayObj.snow + " %";
        wind.innerHTML = "<i class='fa-solid fa-wind'></i> " + dayObj.windKph + " kph";


        tempDiv.append(minTemp, maxTemp);
        elementsDiv.append(rain, snow);
        windDiv.append(wind);

        conditionsDiv.append(tempDiv, windDiv, elementsDiv);
        div.append(dateCondDiv, conditionsDiv);

        dayForecast.append(div);


    }


}


const generateHourElements = function(day, start, end, hourForecast) {

    hourForecast.textContent = "";

    for (let i = start; i < end; i++) {

        const hour = day.hourArr[i];
        const condition = hour.condition;


        const hourContainerDiv = document.createElement("div");
        hourContainerDiv.id = "hour-forecast-container-div";

        const dateAndConditionDiv = document.createElement("div");
        dateAndConditionDiv.id = "hour-date-condition-div";

        const snowRaindTempWindContainerDiv = document.createElement("div");
        snowRaindTempWindContainerDiv.id = "hour-snow-rain-wind-container-div";

        const snowRainDiv = document.createElement("div");
        snowRainDiv.id = "hour-snow-rain-div";

        const tempWindDiv = document.createElement("div");
        tempWindDiv.id = "hour-temp-wind-div";

        snowRaindTempWindContainerDiv.append(snowRainDiv, tempWindDiv);

        const time = document.createElement("p");
        time.textContent = hour.time;
        const conditionIcon = new Image();
        conditionIcon.src = "https:" + condition.icon;
        const conditionText = document.createElement("p");
        conditionText.textContent = condition.text;
        dateAndConditionDiv.append(time, conditionIcon, conditionText);

        const rain = document.createElement("p");
        const snow = document.createElement("p");
        snowRainDiv.append(rain, snow);
        
        const temp = document.createElement("p");
        temp.classList.add("temp");
        const wind = document.createElement("p");
        wind.classList.add("wind");

        if (isCelsius) {
            rain.innerHTML = "<i class='fa-solid fa-cloud-rain'></i> " + hour.rain + " %";
            snow.innerHTML = "<i class='fa-solid fa-snowflake'></i> " + hour.snow + " %";
            temp.textContent = hour.tempC + "\u00B0C";
            wind.innerHTML = "<i class='fa-solid fa-wind'></i> " + hour.windKph + " kph";
        } else {
            rain.innerHTML = "<i class='fa-solid fa-cloud-rain'></i> " + hour.rain + " %";
            snow.innerHTML = "<i class='fa-solid fa-snowflake'></i> " + hour.snow + " %";
            temp.textContent = hour.tempF + "\u00B0F";
            wind.innerHTML = "<i class='fa-solid fa-wind'></i> " + hour.windMph + " mph";
        }

        
        tempWindDiv.append(temp, wind); 

        hourContainerDiv.append(dateAndConditionDiv, snowRaindTempWindContainerDiv);

        hourForecast.append(hourContainerDiv);
    }



}

const generateCurrentElements = function(weather) {

    const names = ["city", "country", "icon", "temp", "feels-like", "condition", "humidity", "wind", "windDir"];
    const divs = [];
    const current = document.querySelector("#current-container");

    current.textContent = "";


    const placeHolder1 = document.createElement("div");
    const currentWeather = document.createElement("div");
    currentWeather.id = "current-weather-div";
    const placeHolder2 = document.createElement("div");


    const nameContainer = document.createElement("div");
    nameContainer.id = "name-container";

    const iconContainer = document.createElement("div");
    iconContainer.id = "icon-container";
    const units = document.createElement("div");
    units.id = "unit-div";
    const unitF = document.createElement("a");
    unitF.href = "#";
    unitF.textContent = "F";

    unitF.addEventListener("click", function(event) {
        event.preventDefault();
        unitC.classList.remove("active");
        unitF.classList.add("active");
        if (isCelsius) {
            changeUnits("F");
            isCelsius = false;
        }
    });

    const unitC = document.createElement("a");
    unitC.classList.add("active");
    unitC.href = "#";
    unitC.textContent = "C";

    unitC.addEventListener("click", function(event) {
        event.preventDefault();
        unitF.classList.remove("active");
        unitC.classList.add("active");
        if (!isCelsius) {
            changeUnits("C");
            isCelsius = true;
        }
    });
    
    units.append(unitF, unitC);

    const tempContainer = document.createElement("div");
    tempContainer.id = "temp-container";


    const miscContainer = document.createElement("div");
    miscContainer.id = "misc-container";



    for (let i = 0; i < names.length; i++) {
        const div = document.createElement("div");
        div.id = names[i];
        divs[i] = div;

    }
        
    const weatherIcon = new Image();
    weatherIcon.src = "https:" + weather.conditionIcon;


    const country = document.createElement("h1");
    const city = document.createElement("h1");
    const currentTemp = document.createElement("h1");
    const feelslikeTemp = document.createElement("h3");
    const condition = document.createElement("h3");
    const humidity = document.createElement("h3");
    const wind = document.createElement("h3");
    const windDir = document.createElement("h3");

    divs[0].append(city);
    divs[1].append(country);
    divs[2].append(weatherIcon);
    divs[3].append(currentTemp);
    divs[4].append(feelslikeTemp);
    divs[5].append(condition);
    divs[6].append(humidity);
    divs[7].append(wind);
    divs[8].append(windDir);
    
    nameContainer.append(divs[0], divs[1]);
    iconContainer.append(divs[2], divs[5], units);
    tempContainer.append(divs[3], divs[4]);
    miscContainer.append(divs[6], divs[7], divs[8]);
    
    country.textContent = weather.currentCountry;
    city.textContent = weather.currentCity + ", ";
    currentTemp.textContent = weather.tempC + "\u00B0C";
    currentTemp.classList.add("temp");
    
    feelslikeTemp.textContent = weather.feelsLikeC + "\u00B0C";
    feelslikeTemp.classList.add("temp");

    condition.textContent = weather.condition;
    humidity.innerHTML = "<i class='fa-solid fa-droplet'></i> " + weather.humidity + " %";
    wind.innerHTML = "<i class='fa-solid fa-wind'></i>" + weather.windKph + " kph";
    wind.classList.add("wind");

    windDir.innerHTML = "<i class='fa-regular fa-compass'></i> " + weather.windDir;

    currentWeather.append(nameContainer, iconContainer, tempContainer, miscContainer);
    current.append(placeHolder1, currentWeather, placeHolder2);



}

const changeUnits = function(unit) {

    const temp = document.querySelectorAll(".temp");
    const wind = document.querySelectorAll(".wind");

    if (unit === "F") {

        // C × (9/5) + 32
        temp.forEach(elem => {
            
            let tempNum = elem.textContent.split("\u00B0")[0];
            let toFarenheit = parseFloat(tempNum) * (9 / 5) + 32;
            
            elem.textContent = toFarenheit.toFixed(1) + "\u00B0F"; 

        });

        wind.forEach(elem => {

            let windMph = elem.textContent.trim().split(" ")[0];
            let toMph = parseFloat(windMph) / 1.6093;

            elem.innerHTML = "<i class='fa-solid fa-wind'></i> " + toMph.toFixed(1) + " mph";

        });
    
    } else {

        temp.forEach(elem => {

            //  5/9 x (F-32)
            let tempNum = elem.textContent.split("\u00B0")[0];
            let toFarenheit = (parseFloat(tempNum) - 32) * 5 / 9;
            
            elem.textContent = toFarenheit.toFixed(1) + "\u00B0C"; 

        });

        wind.forEach(elem => {

            let windKph = elem.textContent.trim().split(" ")[0];
            let toKph = parseFloat(windKph) * 1.6093;

            elem.innerHTML = "<i class='fa-solid fa-wind'></i> " + toKph.toFixed(1) + " kph";

        });
    
    }

}


displayWeather();

async function api() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    let data = await res.json();
    country(data);
}

async function country(data) {
    data.forEach(async (country) => {
        const countryName = country.name.common;
        const flag = country.flags.svg;
        const capital = country.capital[0] || "N/A";
        const region = country.region;
        const code = country.cca2;

        const mainPage = document.getElementById("mainCon");
        const main = document.createElement("div");
        main.setAttribute("class", "col-3");
        mainPage.appendChild(main);

        main.innerHTML = `
            <div class="card m-3 c-card" id="card" style="width: 18rem;">
                <h5 class="m-0 text-center bg-dark text-light p-3">${countryName}</h5>
                <img src="${flag}" class="card-img-top" alt="${countryName} flag">
                <div class="card-body">
                    <p class="card-text text-center">Capital: ${capital}</p>
                    <p class="card-text text-center">Region: ${region}</p>
                    <p class="card-text text-center">Country Code: ${code}</p>
                    <button onclick='getWeather("${capital}")' class="btn btn-primary container">Click Weather</button>
                    <p class="card-text text-center" id="weather-${capital}"></p>
                </div>
            </div>`;
    });
}

async function getWeather(capital) {
    let api = "67d05297f2f22ba2769a7d2029ff13d7";
    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api}`
    );
    const weatherData = await weatherResponse.json();
    const mainWeather = weatherData.weather[0].main;
    const temp = weatherData.main.temp;
    const weatherName = weatherData.name;

    const weatherParagraph = document.getElementById(`weather-${capital}`);
    weatherParagraph.textContent = `Weather in ${weatherName}: ${mainWeather}, Temp: ${temp}`;
    weatherParagraph.textContent = "";
}

api();
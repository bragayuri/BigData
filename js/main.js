// Constant used to connect with the API. Key and URL
const api = {
  key: "654912909a5fa64047f51105b4fbc8aa",
  base: "https://api.openweathermap.org/data/2.5/",
};
// Getting the search box from the html View.
const searchbar = document.querySelector(".searchbox");

// Adding listener to the search bar. Once enter is pressed setQuery function is requested.
searchbar.addEventListener("keypress", setQuery, validation);

// Function to get the Input value from the search bar. It will then call the get Result function passing the input.
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbar.value);
  }
}

function validation(evt) {
  if ((evt.searchbar = "")) {
    searchbar.innerHTML = "<h2> Type something</h2>";
  }
}
//Function to query to the API. It concatenate the constants and Input. It then sends to the API and return a Json Object.

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    // Then displayResults will be called.
    .then(displayResults);
}
// Display Results receives as a paramenter the Json Object
function displayResults(weather) {
  // This console LOg prints the Json on the Concole to enable the Object to be visible and easier to identify it key value pairs.
  console.log(weather);
  // This function will change background image according to the Temperature displayed.
  changeBackground(weather);
  // Sending values to the View. First connect to the HTML file.
  let city = document.querySelector(".location .city");
  // Then using the DOM inner text I send the values to the view.
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  // Creating a variable to get the Date.
  let now = new Date();
  //Connecting with the View hml
  let date = document.querySelector(".location .date");
  // Passing the values using the dateBulder function.
  date.innerText = dateBuilder(now);
  //Connecting with the View
  let temp = document.querySelector(".current .temp");
  //Inserting the values from the Json to the View html.
  temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°C</span>`;
  //Connecting to the View
  let weather_el = document.querySelector(".current .weather");
  // Passing the value from the Json.
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `Min: ${weather.main.temp_min.toFixed(
    0
  )}°C / Max: ${weather.main.temp_max.toFixed(0)}°C`;

  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerText = `Feels like: ${weather.main.feels_like.toFixed(0)}°C `;

  let wind = document.querySelector(".wind");
  wind.innerText = `Wind Speed: ${weather.wind.speed}`;

  let humidity = document.querySelector(".humidity");
  humidity.innerText = `Humidity: ${weather.main.humidity} %`;
}
// This function changes the background according to the Temperature.
function changeBackground(weather) {
  if (weather.main.temp >= "20.00") {
    document.body.style.backgroundImage = "url('/img/sunny.jpg')";
  } else if (weather.main.temp < "19.00" && weather.main.temp > "1.00") {
    document.body.style.backgroundImage = "url('/img/cloudy.jpg')";
  } else if (weather.main.temp <= "0.00") {
    document.body.style.backgroundImage = "url('/img/snow.jpg')";
  }
}
// This function will Set Strings to the Date function.It will get the current date and return the String format.
function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Paassing the strings to the variables.
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

//JQuery to provide effects.

$(document).ready(function () {
  $(".searchbox").click(function () {
    $(".temp").fadeIn();
  });
});

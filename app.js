const api = {
    key:"772ac6606e5eb8eecce36edac789ac2a",
    url: `https://api.openweathermap.org/data/2.5/weather`
}

const city = document.getElementById("city");
const date = document.getElementById("date");
const tempImg = document.getElementById("temp-img");
const temp = document.getElementById("temp");
const weather =document.getElementById("weather")
const range =document.getElementById("range")
const video =document.querySelector('video')




function updateImage(data) {
    const temp = toCelcius(data.main.temp);
    let src = 'images/temp-mid.png';
    if (temp > 26) {
      src = 'images/temp-high.png';
    } else if (temp < 20) {
      src = 'images/temp-low.png';
    }
    tempImg.src = src;
  }
  function updateVideo(data){
      const temp = data.weather[0].main;
      if(temp === "Rain"){
        video.src ="images/rainy.mp4"
      }else if(temp === "Clouds"){
        video.src ="images/cloudy.mp4"
      }else if(temp === "Clear"){
        video.src ="images/sunny.mp4"
      }
  }





async function search(query){
    try {
         const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
         const data = await response.json();
         console.log(data);
         city.innerHTML = `${data.name}, ${data.sys.country}`;
         data.date = new Date().toLocaleDateString();
         temp.innerHTML = `${toCelcius(data.main.temp)}c`;
         weather.innerHTML = data.weather[0].description;
         range.innerHTML = `${toCelcius(data.main.temp_min)}c / ${toCelcius(data.main.temp_max)}c`
         updateImage(data)
         updateVideo(data)

         

    }catch(err){
        console.log(err)
        alert("hubo un error")
    }
}

function toCelcius(kelvin){
  return Math.round(kelvin - 273.15)
}

function onSubmit(event){
    event.preventDefault();
    search(searchBox.value)
}


const form = document.getElementById("searchForm");
const searchBox = document.getElementById("searchBox");

form.addEventListener("submit", onSubmit, true)
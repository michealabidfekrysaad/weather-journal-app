/* Global Variables */
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = ',us&units=metric&appid=0fb86048a0bec4f712eb19df09e70bc7';

document.getElementById('generate').addEventListener('click', performAction);
function performAction(e) {
  const zipCode = document.getElementById('zip').value;
  if (!zipCode) {
    alert('Please enter zip code')
    return null

  }
  getWeather(baseURL, zipCode, apiKey).then((data) => {
    let feeling = document.getElementById('feelings').value;
    // console.log(newDate);
    postData('/addData', { date: newDate, temp: data.main.temp, feeling: feeling })
  }).then((req, res) => {
    updateUI();
  }).catch(err => console.log(err));
}

// to get weather api
const getWeather = async (baseURL, zipCode, apiKey) => {

  const res = await fetch(baseURL + zipCode + apiKey)
  try {

    const data = await res.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
}


const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    // console.log(newData);
    return newData;
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = `<span class="white">Date is</span> : ${allData.date}`;
    document.getElementById('temp').innerHTML = `<span class="white">Temp is</span> : ${allData.temp} Celcius`;
    if (allData.feeling) {
      document.getElementById('content').innerHTML = `<span class="white">My feeling</span> : ${allData.feeling}`;
    } else {
      document.getElementById('content').innerHTML = ""
    }
  } catch (error) {
    console.log("error", error);
  }
}
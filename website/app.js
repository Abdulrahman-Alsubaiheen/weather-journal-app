/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// const API_Key = '6747d09c54361a4d24e74617a2659285';
const API_Key = '&appid=6747d09c54361a4d24e74617a2659285&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


// ~~~~~~ Event listener ~~~~~~
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zip =  document.getElementById('zip').value;
    const feelings =  document.getElementById('feelings').value;
  
    getData(baseUrl , zip , API_Key)
    .then(function(data){
      postData('/data', {date: newDate, feelings: feelings , temp: data.main.temp} );
    })
    .then(
      updateUI()
    )
  }

// ~~~~~~ ( GET ) Web API Data ~~~~~~
const getData = async (url, zip, API_Key) => {
    const response = await fetch(`${url}${zip}${API_Key}`)
    try {
      const data = await response.json();
      return data;
    } catch (err) {
      console.log('error', err);
    }
  }


// ~~~~~~ ( POST ) data ~~~~~~
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
  };

// ~~~~~~ ( update UI ) ~~~~~~

const updateUI = async () => {
    const request = await fetch('/data');
    try{
      const Data = await request.json();
      document.getElementById('date').innerHTML = Data.date;
      document.getElementById('temp').innerHTML = Data.temp;
      document.getElementById('content').innerHTML = Data.feelings;
  
    }catch(error){
      console.log("error", error);
    }
  }
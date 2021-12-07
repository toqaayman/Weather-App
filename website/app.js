/* Global Variables */
// API Variables
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const APIkey = '&appid=ea7935e255aea6c0cf3c4fd429449da6';

// Generate Buttonelement and event listener
const generate = document.getElementById('generate');
generate.addEventListener('click', getWeatherData);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

//fetch the Weather Data from API
async function getWeatherData(event) {
    event.preventDefault();

    // Elements in DOM
    const feelings = document.getElementById('feelings').value;
    const zip = document.getElementById('zip').value;

    // Obtain weather from API URL
    const URL = `${API_URL}${zip}${APIkey}&units=imperial`
    let response = await fetch(URL);
    try {
        let userdata = await response.json();
        userdata.date = newDate;
        userdata.feelings = feelings;
        await weatherPOST('/', userdata);
        updatedata();
    } catch (error) {
        console.error('ERROR', error); // handle the error
    }
};

//Async GET from server
const weatherGET = async function(url = ''){
    const response = await fetch(url);
    try {
        const userdata = await response.json(); //change to JSON
        return userdata;
    } catch (error) {
        console.log('ERROR', error); // handle the error
    }
};

//Async POST to server
const weatherPOST = async function(url = '', data = {}){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data) 
        // by using JSON.stringify we turn data into json format, also matching body datatype with header's "Content-Type"
    });
};

//after get and send the temp, select the elements in the HTML and update its content
const updatedata = async () => {
    let projectData = await weatherGET('/ALL');
    document.getElementById('date').innerHTML = `Date: ${projectData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${projectData.temp}`;
    document.getElementById('content').innerHTML = `Feeling: ${projectData.feelings}`;
};
import { React, useState } from "react";
import "./App.css";
import axios from 'axios';

function App() {
  const [location, setLocation] = useState("");
  const appid = "0f9ba72fe8cb5b0c6a0270cd9308c1f4";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appid}`
  const [Data, setData] = useState(null); // Initialize Data with null instead of an empty string

  const searchLocation = (e) => {
    e.preventDefault();

    axios.get(url).then((res) => {
      setData(res.data);
      setLocation('');
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <div className="app">
      <input
        className="Search-bar"
        placeholder="Enter city"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <button type="button" value='submit' onClick={searchLocation} className="btn">Submit</button>
      
      {/* Add a conditional check before accessing Data properties */}
      {Data && (
        <div className="mid-page">
          <div>
            <p>{Data.name}</p>
            <h1>{Math.floor(Data.main.temp - 273)}°C</h1>
          </div>
          <div>
            <h4>{Data.weather[0].main}</h4> {/* Update weather to weather[0] */}
          </div>
        </div>
      )}
      
      {Data && (
        <div className="bottom">
          <div>
            <h3>{Math.floor(Data.main.temp - 273)}°C</h3>
            <p>Feels Like</p>
          </div>
          <div>
            <h3>{Data.main.humidity}%</h3>
            <p>Humidity</p>
          </div>
          <div>
            <h3>{Data.wind.speed}MPH</h3>
            <p>Winds</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

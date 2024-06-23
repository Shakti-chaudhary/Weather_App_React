import React, { useState } from "react";
import "./WCard.css";
import windIcon from "../../assets/wind.png";
import humidityIcon from "../../assets/humidity.png";

function Navbar() {
  // Variables
  const apiKey = "2ee9a323e1b35335a8091c873209eb2f";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

  // States
  const [searchInput, setSearchInput] = useState("");
  const [cityName, setCityName] = useState("");
  const [hasError, setHasError] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState(
    "https://img.icons8.com/fluency/96/cloud.png"
  );

  // Functions
  const handleSearch = () => {
    let trimSearchValue = searchInput.trim();
    if (trimSearchValue.length > 0) {
      searchWeather(trimSearchValue);
    }
    setSearchInput("");
  };

  async function searchWeather(searchCity) {
    const response = await fetch(apiUrl + searchCity + `&appid=${apiKey}`);
    if (response.ok) {
      const data = await response.json();

      setHasError(false);
      setHasData(true);
      setCityName(data.name);
      setTemp(Math.round(data.main.temp));
      setHumidity(data.main.humidity);
      setWind(Math.round(data.wind.speed));

      let iconCode = data.weather[0].icon;
      setWeatherIcon(`https://openweathermap.org/img/wn/${iconCode}@4x.png`);
    } else {
      console.clear();
    }

    if (response.status == 404) {
      setHasError(true);
      setHasData(false);
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="search">
          <input
            type="text"
            placeholder="enter city name"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="error" style={{ display: hasError ? "block" : "none" }}>
          <p>Invalid city name</p>
        </div>
        <div
          className="weather"
          style={{ display: hasData ? "block" : "none" }}
        >
          <img
            width="150"
            height="150"
            src={weatherIcon}
            alt="weatherIcon"
            className="weather-icon"
          />
          <h1 className="temp">{temp} °C</h1>
          <h2 className="city">{cityName ? cityName : "No City"}</h2>
          <div className="details">
            <div className="details-part">
              <img src={humidityIcon} />
              <div>
                <p className="humidity">{humidity} %</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="details-part">
              <img src={windIcon} />
              <div>
                <p className="wind">{wind} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

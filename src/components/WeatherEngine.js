import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard/component";

const WeatherEngine = ({ location }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // we could use this wasy but its not dry code
  // const [city, setCity] = useState("");
  // const [temp, setTemp] = useState("");
  // const [condition, setCondition] = useState("");
  // const [country, setCountry] = useState("");

  //So using the below code to keep it dry
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null,
  });

  const getWeather = async (q) => {
    setQuery("");
    setLoading(true);
    try {
      const apiRes = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&APPID=040882313c0582a6a59eb451bef5684d`
      );
      const resJSON = await apiRes.json();
      setWeather({
        temp: resJSON.main.temp,
        condition: resJSON.weather[0].main,
        country: resJSON.sys.country,
        city: resJSON.name,
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getWeather(query);
  };

  //this hook will make the code run only once the component is mounted and never agin
  useEffect(() => {
    getWeather(location);
  }, [location]);

  return (
    <div>
      {!loading && !error ? (
        <div>
          <WeatherCard
            temp={weather.temp}
            condition={weather.condition}
            city={weather.city}
            country={weather.country}
          />
          <form>
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={(e) => handleSearch(e)}>Search</button>
          </form>
        </div>
      ) : loading ? (
        <div style={{ color: "black" }}>Loading </div>
      ) : !loading && error ? (
        <div style={{ color: "black" }}>
          There has been an error!
          <br />
          <button onClick={() => setError(false)}> Reset! </button>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherEngine;

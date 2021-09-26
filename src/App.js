import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "a7df53972a1ed5c9bc47ebe662517113";

class App extends React.Component {
  constructor() {
    super();
    this.initialState = {
      temperature: "",
      city: "",
      country: "",
      humidity: "",
      description: "",
      error: null
    };
    this.state = this.initialState;
    this.resetWeather = this.resetWeather.bind(this);
  }
  resetWeather(e) {
    e.preventDefault();
    this.setState(this.initialState);
    e.target.form[0].value = "";
    e.target.form[1].value = "";
  }
  getWeather = async (e) => {
    e.preventDefault();
    let city = e.target.elements.city.value;
    let country = e.target.elements.country.value;
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();
    if (city && country) {
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
      city = "";
      country = "";
    } else {
      this.setState(this.initialState);
    };
  };
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Title />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} resetWeather={this.resetWeather}/>
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

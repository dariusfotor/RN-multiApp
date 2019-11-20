import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";
import axios from "axios";

export default class location extends Component {
  constructor() {
    super();
    this.state = {
      lat: "",
      long: "",
      city: "",
      country: "",
      temp: "",
      temp_max: "",
      temp_min: "",
      wind: "",
      celsius: "",
      cell_max: "",
      cell_min: "",
      sunrise: "",
      sunset: "",
      sunriseTime: "",
      sunsetTime: "",
      description: ""
    };
  }

  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures."
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("location allowed");
      } else {
        console.log("location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
    Geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        console.log(lat);
        this.setState({
          lat: lat,
          long: long
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  requestLocation = async () => {
    const latitude = this.state.lat;
    const longitude = this.state.long;
    console.log(latitude);
    const response = await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=dcd7897dae0a3a3e3b5903fff33b33ec`
      )
      .catch(error => {
        console.log(error);
      });
    console.log(response.data);
    const city = response.data.name;
    const country = response.data.sys.country;
    const temp = response.data.main.temp;
    const temp_max = response.data.main.temp_max;
    const temp_min = response.data.main.temp_min;
    const wind = response.data.wind.speed;
    const sunrise = response.data.sys.sunrise;
    const sunset = response.data.sys.sunset;
    const description = response.data.weather[0].description;
    const cell = Math.round(temp - 273.15);
    const cell_max = Math.round(temp_max - 273.15);
    const cell_min = Math.round(temp_min - 273.15);
    const sunriseTime = new Date(sunrise * 1000).toLocaleString();
    const sunsetTime = new Date(sunset * 1000).toLocaleString();
    this.setState({ city: city });
    this.setState({ country: country });
    this.setState({ temp: temp });
    this.setState({ temp_max: temp_max });
    this.setState({ temp_min: temp_min });
    this.setState({ description: "Oro apibudinimas:" + " " + description });
    this.setState({ sunriseTime: "Saule pakyla " + " " + sunriseTime });
    this.setState({ sunsetTime: "Saule leidziasi " + " " + sunsetTime });
    this.setState({ wind: "Vejas " + " " + wind + "m/s" });
    this.setState({ celsius: "Temperatura" + " " + cell + "C" });
    this.setState({ cell_max: "Max Temp." + " " + cell_max + "C" });
    this.setState({ cell_min: "Min Temp." + " " + cell_min + "C" });
  };

  render() {
    return (
      <View styles={styles.container}>
        <Button title="Nustatyti vieta" onPress={this.requestLocation} />
        {}
        <View style={styles.resultsContainer}>
          <Text style={styles.cityCountry}>
            {this.state.city} {this.state.country}
          </Text>
          <Text style={styles.resultsTxt}>{this.state.description}</Text>
          <Text style={styles.resultsTxt}>{this.state.celsius}</Text>
          <Text style={styles.resultsTxt}>{this.state.wind}</Text>
          <Text style={styles.resultsTxt}>{this.state.cell_max}</Text>
          <Text style={styles.resultsTxt}>{this.state.cell_min}</Text>
          <Text style={styles.resultsTxt}>{this.state.sunriseTime}</Text>
          <Text style={styles.resultsTxt}>{this.state.sunsetTime}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderStartColor: "blue"
  },
  resultsContainer: {
    backgroundColor: "#557A95",
    paddingVertical: 20
  },
  resultsTxt: {
    fontSize: 20,
    marginTop: 5,
    textAlign: "center",
    color: "white"
  },
  cityCountry: {
    textAlign: "center",
    fontSize: 30,
    color: "white"
  }
});

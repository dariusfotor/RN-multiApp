import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import axios from "axios";

export class weather extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      country: "",
      choosenCity: "",
      choosenCountry: "",
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
  weather = async () => {
    const countryState = this.state.choosenCountry;
    const cityState = this.state.choosenCity;
    const response = await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityState},${countryState}&APPID=dcd7897dae0a3a3e3b5903fff33b33ec`
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
  eraseFields = () => {
    this.setState({
      choosenCity: "",
      choosenCountry: ""
    });
  };

  render() {
    console.log(this.state.description);
    return (
      <ScrollView>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.cityInput}
            value={this.state.choosenCity}
            onChangeText={text => {
              this.setState({ choosenCity: text });
            }}
            placeholder="Irasyti miesta"
            placeholderTextColor="white"
          />
          <TextInput
            style={styles.countryInput}
            value={this.state.choosenCountry}
            onChangeText={text => {
              this.setState({ choosenCountry: text });
            }}
            placeholder="Irasyti sali (trumpinys pvz Uk)"
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.eraseInfoBtn}
            onPress={this.eraseFields}
          >
            <Text style={styles.infoBtnTxt}>Isvalyti laukelius</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.getInfoBtn} onPress={this.weather}>
            <Text style={styles.infoBtnTxt}>Gauti informacija</Text>
          </TouchableOpacity>
        </View>
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
      </ScrollView>
    );
  }
}

export default weather;

const styles = StyleSheet.create({
  cityInput: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    margin: 10,
    fontSize: 23,
    borderWidth: 1,
    borderRadius: 10,
    color: "white"
  },
  inputsContainer: {
    paddingTop: 15,
    backgroundColor: "#989ea3"
  },
  countryInput: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    margin: 10,
    fontSize: 23,
    borderWidth: 1,
    borderRadius: 10,
    color: "white"
  },
  cityCountry: {
    textAlign: "center",
    fontSize: 30,
    color: "white"
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#989ea3"
  },
  eraseInfoBtn: {
    height: 40,
    width: 300,
    borderRadius: 10,
    backgroundColor: "#c45118",
    marginVertical: 5
  },
  getInfoBtn: {
    height: 40,
    width: 300,
    borderRadius: 10,
    backgroundColor: "#57a34e",
    marginVertical: 5
  },
  infoBtnTxt: {
    fontFamily: "Roboto-Bold",
    fontSize: 22,
    marginTop: 3,
    alignSelf: "center",
    color: "white"
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
  }
});

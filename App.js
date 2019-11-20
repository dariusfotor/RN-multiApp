import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./components/homescreen";
import Calculator from "./components/calculator";
import Currency from "./components/currency";
import Weather from "./components/weather";
import location from "./components/location";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Calculator: { screen: Calculator },
  Currency: { screen: Currency },
  Weather: { screen: Weather },
  location: { screen: location }
});

const AppContainer = createAppContainer(MainNavigator);

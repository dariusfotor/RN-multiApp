import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export class homescreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchBtn}
          onPress={() => this.props.navigation.navigate("Calculator")}
        >
          <Text style={styles.btnTxt}>Skaiciuotuvas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchBtn}
          onPress={() => this.props.navigation.navigate("Currency")}
        >
          <Text style={styles.btnTxt}>Valiutu kursai</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchBtn}
          onPress={() => this.props.navigation.navigate("Weather")}
        >
          <Text style={styles.btnTxt}>Orai</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchBtn}
          onPress={() => this.props.navigation.navigate("location")}
        >
          <Text style={styles.btnTxt}>Orai pagal vieta</Text>
        </TouchableOpacity>

        <Text style={styles.copyright}>Created by Darius Ruzgys</Text>
      </View>
    );
  }
}

export default homescreen;
const styles = StyleSheet.create({
  copyright: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Roboto-Light"
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  touchBtn: {
    height: 50,
    width: 300,
    borderRadius: 10,
    backgroundColor: "#c45118",
    marginVertical: 10
  },
  btnTxt: {
    fontFamily: "Roboto-Bold",
    fontSize: 25,
    marginTop: 5,
    alignSelf: "center",
    color: "white"
  }
});

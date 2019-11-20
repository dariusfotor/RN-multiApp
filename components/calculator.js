import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: null,
      second: null,
      total: null,
    };
  }

  plus = () => {
    const {first, second} = this.state;
    const totalSum = Number(first) + Number(second);
    console.log(totalSum);
    this.setState({total: totalSum});
  };
  minus = () => {
    const {first, second} = this.state;
    const totalSum = Number(first) - Number(second);
    console.log(totalSum);
    this.setState({total: totalSum});
  };
  subtract = () => {
    const {first, second} = this.state;
    const totalSum = Number(first) * Number(second);
    console.log(totalSum);
    this.setState({total: totalSum});
  };
  divide = () => {
    const {first, second} = this.state;
    const totalSum = Number(first) / Number(second);
    console.log(totalSum);
    this.setState({total: totalSum});
  };
  eraseFields = () => {
    this.setState({first: '', second: '', total: ''});
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Pirmas skaicius"
            value={this.state.first}
            onChangeText={text => {
              this.setState({first: text.replace(/[^0-9.]/g, '')});
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Antras skaicius"
            value={this.state.second}
            onChangeText={text => {
              this.setState({second: text.replace(/[^0-9.]/g, '')});
            }}
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.btnSize} onPress={this.plus}>
              <Text style={styles.btnTxt}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSize} onPress={this.minus}>
              <Text style={styles.btnTxt}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSize} onPress={this.subtract}>
              <Text style={styles.btnTxt}>*</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSize} onPress={this.divide}>
              <Text style={styles.btnTxt}>/</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.total}>Is viso: {this.state.total}</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.eraseInfoBtn}
              onPress={this.eraseFields}>
              <Text style={styles.infoBtnTxt}>Isvalyti</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  input: {
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d6d7da',
  },
  total: {
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#d6d7da',
    fontSize: 30,
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
  },
  eraseInfoBtn: {
    height: 40,
    width: 300,
    borderRadius: 10,
    backgroundColor: '#c45118',
    marginVertical: 5,
  },
  infoBtnTxt: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    marginTop: 3,
    alignSelf: 'center',
    color: 'white',
  },
  btnContainer: {
    alignItems: 'center',
    padding: 5,
  },
  btnSize: {
    backgroundColor: '#57a34e',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTxt: {
    fontSize: 50,
  },
});

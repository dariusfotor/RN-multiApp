import React, {Component} from 'react';
import {
  View,
  Text,
  Picker,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      amountEur: '',
      currency: {},
      choosenValue: '',
      choosenIndex: '',
      result: '',
      data: '',
    };
  }

  async componentDidMount() {
    const response = await axios.get('http://api.openrates.io/latest');
    const list = response.data.rates;
    const date = response.data.date;
    this.setState({data: date});
    this.setState({currency: list});
    if (this.state.amountEur !== '' && this.state.choosenValue !== '') {
      this.calculate();
    }
  }

  calculate = () => {
    const amountEur = this.state.amountEur;
    const choosenValue = this.state.choosenValue;
    const result = Number(amountEur) * Number(choosenValue);
    console.log(result);
    this.setState({result: result});
    if (this.state.amountEur === '' && this.state.choosenValue === '') {
      alert('uzpildykite laukelius');
    }
  };
  eraseFields = () => {
    this.setState({amountEur: '', choosenValue: '', result: ''});
  };

  render() {
    const currArr = Object.entries(this.state.currency);
    const sortCurr = currArr.sort();
    console.log(this.state.currency);
    return (
      <View>
        <Text style={styles.currencyTitle}>Valiutos kursai</Text>
        <Text style={styles.dataUpdate}>
          Kursas atnaujintas {this.state.data}
        </Text>
        <View style={styles.converter}>
          <TextInput
            style={styles.eurInput}
            value={this.state.amountEur}
            onChangeText={number => {
              this.setState({amountEur: number.replace(/[^0-9.]/g, '')});
            }}
            placeholder="Kiekis Eur"
            placeholderTextColor="white"
          />
          <Picker
            style={styles.picker}
            selectedValue={this.state.choosenValue}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({choosenValue: itemValue, choosenIndex: itemIndex})
            }>
            <Picker.Item label="Valiuta" value="" />
            {sortCurr.map(([key, value]) => (
              <Picker.Item label={key} value={value} key={key} />
            ))}
          </Picker>
        </View>
        <View style={styles.btnConvertEraseContainer}>
          <TouchableOpacity
            style={styles.btnConvertErase}
            onPress={this.calculate}>
            <Text style={styles.ConvertEraseTxt}>Konvertuoti</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnConvertErase}
            onPress={this.eraseFields}>
            <Text style={styles.ConvertEraseTxt}>Isvalyti</Text>
          </TouchableOpacity>
          <Text style={styles.result}>Is viso: {this.state.result}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currencyTitle: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    margin: 10,
    fontSize: 30,
    textTransform: 'uppercase',
  },
  dataUpdate: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Roboto-Light',
  },
  eurInput: {
    width: 150,
    height: 50,
    backgroundColor: '#c45118',
    textAlign: 'center',
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: 'Roboto-Light',
  },
  picker: {
    width: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#c45118',
    textAlign: 'center',
    color: 'white',
    textTransform: 'uppercase',
  },
  converter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  btnConvertEraseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnConvertErase: {
    height: 30,
    width: 160,
    borderRadius: 10,
    backgroundColor: '#82aef5',
    marginVertical: 10,
    fontFamily: 'Roboto-Light',
  },
  ConvertEraseTxt: {
    marginTop: 5,
    alignSelf: 'center',
    color: 'white',
  },
  result: {
    padding: 5,
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
  },
  netErr: {
    color: 'red',
  },
});

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
var data = ['','','','','','','','',''];
// Class BOARD
class Board extends React.Component {
  renderSquare() {
      var s = data.map(function(val, key){
        return <Square value={key} key={key}/>
      })
    return s;
  }
  render(){
    return (<View style={styles.board}>
        {this.renderSquare()}
      </View>)
  }
}

// Class SQUARE
class Square extends React.Component {
  _onPressButton(k){
    Alert.alert("Posición: " + (k+1))
  }
  render() {
    let turno = data[this.props.value]
    return (
          <View style={styles.square}>
            <Button
            onPress={() => this._onPressButton(this.props.value)}
            title={"Press"}
            color="#841584"
          />
          </View>
    );
  }
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired
}

//APP
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.board}>
        <Board />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  board: {
    position: 'absolute',
    backgroundColor: 'green',
    left: '50%',
    marginLeft: -150,
    width: 300,
    height: 300,
    top: '50%',
    marginTop: -150,
    borderRadius: 6,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 0,
    margin: 0
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'pink',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  }
});

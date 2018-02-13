import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Alert, TouchableHighlight, AppRegistry } from 'react-native';
var squares = Array(9).fill(null);
var tiro = 'X';
var count = 0;
// Class BOARD
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    }
  }
  setSquareValue = (value, pos) => {
    squares[pos] = value;
    this.setState(previousState => {
        return { squares: squares };
    });
    this.calculateWinner(squares)
  }
  calculateWinner(s){
    const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
  }
  renderSquare() {
    var _this = this;
    var s = this.state.squares.map(function(val, key){
        return <Square value={val} pos={key} key={key} setSquareValue={_this.setSquareValue}/>
      })
    return s;
  }
  render(){
    const winner = this.calculateWinner(squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
      Alert.alert(status)
    } 
    return (<View style={styles.board}>
        {this.renderSquare()}
      </View>)
  }
}

// Class SQUARE
class Square extends Component {
  constructor(props){
    super(props);
  }
  _onPressButton(k){
    count = count + 1;
    if(count % 2 === 0){
        tiro = 'X';
    }else{
        tiro = 'O';
    }

    if(typeof this.props.setSquareValue(tiro, k) === 'function'){
      this.props.setSquareValue(tiro, k);
    }
  }
  render() {
    return (
          <View style={styles.square}>
          <TouchableHighlight style={styles.button} onPress={() => this._onPressButton(this.props.pos)}>
            <Text style={styles.textButton}>{this.props.value}</Text>
          </TouchableHighlight>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  button: {
      width: 100,
      height: 100,
      alignItems: 'center',
      backgroundColor: '#2196F3',
      borderRadius: 6,
      display: 'flex',
      justifyContent: 'center'
    },
  textButton: {
    fontSize: 40
  }
});

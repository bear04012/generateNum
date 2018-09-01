import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactCountdownClock from 'react-countdown-clock';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
      gameover: false,
      box: 0,
      time: 120,
      paused: true,
    }

    this.shuffleArray = this.shuffleArray.bind(this);
    this.gameover = this.gameover.bind(this);
    this.gameStart = this.gameStart.bind(this);
  }

  shuffleArray() {
    let ary = [];
    this.state.list.forEach((val) => ary.push(val));
    for (let i = ary.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = ary[i];
      ary[i] = ary[j];
      ary[j] = temp;
    }
    this.setState(prev => {
      return {
        list: ary,
        box:prev.box+1
      }
    });
  }

  gameStart() {
    let ary = [];
    this.state.list.forEach((val) => ary.push(val));
    for (let i = ary.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = ary[i];
      ary[i] = ary[j];
      ary[j] = temp;
    }
    this.setState(prev => {
      return {
        list: ary,
        paused:false
      }
    });
  }
  gameover() {
    this.setState({ gameover: true})
  }

  render() {
    const boards = this.state.list.map((val, i) => {
      return (
        <div className={"box"} key={i}>
          {val}
        </div>
      )
    })
    return (
      <div className="App">
        {this.state.gameover &&
          <div className="gameover">
            Game Over
            <div>If you want to restart, just refresh the page</div>
          </div>
        }
        
        <div className="board">
          {boards}
        </div>
        <div className="utils">
          <div className="count">{`box: ${this.state.box}`}</div>
          {this.state.paused ? <button className="start" onClick={this.gameStart}>Start</button> : <button className="reset" onClick={this.shuffleArray}>Reset</button>}
          <ReactCountdownClock seconds={this.state.time}
            color="blue"
            alpha={0.9}
            size={100}
            paused={this.state.paused}
            onComplete={this.gameover}
          />
        </div>
        
      </div>
    );
  }
}

export default App;

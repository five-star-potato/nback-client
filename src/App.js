import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import BoardContainer from './components/BoardContainer';
import GamePadContainer from './components/GamePadContainer';
import HUDContainer from './components/HUDContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid" style={{ paddingTop: "1em"}} >
        <HUDContainer />
        <BoardContainer />
        <GamePadContainer />
      </div>
    );
  }
}

export default App;

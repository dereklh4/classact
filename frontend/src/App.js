import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WebSocketInstance from './services/WebSocket'

class App extends Component {
  constructor(props) {
    super(props);
    //just testing connecting via websockets
    WebSocketInstance.connect()
    alert("ClassAct testing: Connected to websocket at " + WebSocketInstance.socketRef.url)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

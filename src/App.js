import React, { Component } from 'react';
import './App.css';
import DirSelect2 from './DirSelect/dirSelect';

class App extends Component {

  render() {
    return (<div className="App">
      <header className="App-header">
        <h1 className="App-title">Carlton's Scripts</h1>
      </header>
      <DirSelect2/>
    </div>);
  }
}

export default App;

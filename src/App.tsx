import * as React from 'react';
import './App.css';
import './components/style/antd.min.css'
import Icon from  './components/icon';
import Button from "./components/button";
import Badge from './components/badge'

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
          <Icon type="book" />
        </p>
        <Button type='danger' icon='search'>Antd</Button>
        <Badge count={18}><a href="#">花里胡哨</a></Badge>
      </div>
    );
  }
}

export default App;

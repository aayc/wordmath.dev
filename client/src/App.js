import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      equation: "",
    }
  }

  compute = (eq_string) => {
    fetch("/compute?eq=" + encodeURIComponent(eq_string))
      .then(res => res.json())
      .then(names => {
        console.log("RECEIVED: " + JSON.stringify(names));
      })
  }

  handleEquationChange = (e) => {
    this.setState({ equation: e.target.value });
  }

  render() {
    const { equation } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input type="text" 
            onChange={this.handleEquationChange}
            value={equation}
            placeholder="test me"/>
          <button onClick={() => this.compute(equation)}>Compute</button>
        </header>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import compute_icon from './compute-icon.svg'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    
    this.WORD_LIMIT = 7

    this.state = {
      equation: "",
      
      wikipedia: [],
      twitter: [],
      google_news: [],
    }
  }

  compute = (eq_string) => {
    if (eq_string === "") return;

    fetch("/compute?eq=" + encodeURIComponent(eq_string))
      .then(res => res.json())
      .then(results => {
        console.log("RESULTS: " + JSON.stringify(results))
        this.setState({ 
          wikipedia: results["wikipedia"].split(" "),
          google_news: results["google_news"].split(" "),
          twitter: results["twitter"].split(" ")
        })
      })
  }

  handleEquationChange = (e) => {

    this.setState({ equation: e.target.value.toLowerCase().replace(/\d/g, "") });
  }

  range = (a, b) => {
    let v = []
    for (let i = a; i < b; i++) {
      v.push(i)
    }
    return v;
  }

  render() {
    const { equation, words, google_news, twitter, wikipedia } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <br /><br /><br /><br /><br /><br />
          <div style={{marginTop: "-250px"}}>
            <form onSubmit={(e) => { e.preventDefault(); this.compute(equation); }}>
            <input type="text"
              id="input-equation"
              onChange={this.handleEquationChange}
              value={equation}
              placeholder="love + hate" />
            </form>
          </div>
          <br /><br />
          <div>
          <center>
          <table id="results">
            <tr>
            <th style={{textAlign: "left"}}>google news</th>
            <th style={{textAlign: "center"}}>twitter</th>
            <th style={{textAlign: "right"}}>wikipedia</th>
            </tr>
            { this.range(0, this.WORD_LIMIT).map(i => {
                return (
                  <tr>
                    <td style={{textAlign: "left"}}>{i < google_news.length ? google_news[i] : ""}</td>
                    <td style={{textAlign: "center"}}>{i < twitter.length ? twitter[i] : ""}</td>
                    <td style={{textAlign: "right"}}>{i < wikipedia.length ? wikipedia[i] : ""}</td>
                  </tr>
                )
            })
            }
          </table>
          </center>
          </div>
        </header>
      </div>
    );
  }
}

export default App;

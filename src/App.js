import React from "react";
import logo from "./logo.png";
import robot from "./rocket.svg";
import { Table } from "reactstrap";
import { Button } from "reactstrap";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";

import axios from "axios";

import "./App.css";

class App extends React.Component {
  state = {
    message: "",
    x: null,
    y: null,
    direction: null,
    placed: false
  };

  handleSubmit(e) {
    console.log("Submitted");
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:8080/robot/command",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      mode: "no-cors",
      data: this.state.message
    }).then(response => {
      if (response.status === 200) {
        // this.setState({ x: JSON.parse(response.body).x });
        // var respBody = JSON.parse(response);
        // console.log(respBody);
        // alert("Script Submitted.");
        console.log(response);
        console.log(response.data);
        this.setState({
          x: response.data.x,
          y: response.data.y,
          direction: response.data.direction,
          placed: true
        });
        console.log(this.state.direction);
        this.resetForm();
      } else {
        alert("Script failed");
        console.log(response);
      }
    });
  }

  resetForm() {
    this.setState({ message: "" });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to robot controller</h1>
        </header>
        <form
          id="contact-form"
          onSubmit={this.handleSubmit.bind(this)}
          method="POST"
        >
          <div className="form-group">
            <label htmlFor="message"></label>
            <textarea
              className="form-control"
              rows="5"
              id="message"
              value={this.state.message}
              onChange={this.onMessageChange.bind(this)}
            />
          </div>
          <Button type="submit" className="btn-primary" color="primary">
            Submit
          </Button>
        </form>

        <table>
          <tbody>
            {Array.from({ length: 5 }, (v1, y1) => (
              <tr key={y1}>
                {Array.from({ length: 5 }, (v2, x1) => (
                  <Cell
                    x={x1}
                    y={y1}
                    robotX={this.state.x}
                    robotY={this.state.y}
                  ></Cell>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value });
  }
}

class Cell extends React.Component {
  x;
  y;

  robotX;
  robotY;

  constructor(x, y, robotX, robotY) {
    super();
    this.x = x;
    this.y = y;
    this.robotX = robotX;
    this.robotY = robotY;
  }

  render() {
    return (
      <td className="cell">
        <img src={robot} className="App-robot" alt="robot" />
      </td>
    );
  }
}

export default App;

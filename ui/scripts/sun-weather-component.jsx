import React from 'react';
import axios from 'axios';

var createReactClass =
    require("create-react-class")

var SunWeatherComponent =
    createReactClass({
      getInitialState: function() {
        return {
          sunrise: undefined,
          sunset: undefined,
          temperature: undefined,
          requests: 0
        };
      },
      componentDidMount: function() {
        axios.get('/data').then((response) => {
          const json = response.data;
          this.setState({
            sunrise: json.sunInfo.sunrise,
            sunset: json.sunInfo.sunset,
            temperature: json.temperature,
            requests: json.requests
          })
        });
      },
      render: function() {
        return (
          <div>
            <div>Sunrise time: {this.state.sunrise}</div>
            <div>Sunset time: {this.state.sunset}</div>
            <div>Current temperature: {this.state.temperature}</div>
            <div>Number requests: {this.state.requests}</div>
          </div>);
      }
    });

  /*
  componentDidMount = () => ;
  render = () => {
    return (
      <table>
        <tbody>
          <tr>
            <td>Sunrise time</td>
            <td>{this.state.sunrise}</td>
          </tr>
          <tr>
            <td>Sunset time</td>
            <td>{this.state.sunset}</td>
          </tr>
          <tr>
            <td>Current temperature</td>
            <td>{this.state.temperature}</td>
          </tr>
          <tr>
            <td>Number of requests </td>
            <td>{this.state.requests}</td>
          </tr>
        </tbody>
      </table>
    );
  }
  */

export default SunWeatherComponent;

import React, { Component } from "react";

import Octicon, {Key } from "@githubprimer/octicons-react";

import API from '../../lib/API';
import AuthContext from '../../contexts/AuthContext';
import FinancialCalculatorMath from  '../../lib/FinancialCalculatorMath';
import * as financejs from 'financejs';

class FutureValueForm extends Component {
  static contextType = AuthContext;

  state = {
    userID: "",
    presentValue: "",
    rate: "",
    periods: "",
    years: "",
    isLoading: true,
    error: "",
    result1: 0.0
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
   event.preventDefault();
   const {userID, presentValue, rate, periods, years, isLoading, error } = this.state;

    // console.log("FutureValueForm handleSubmit ==> ", {state});

    // this.props.onSubmit(userID, presentValue, rate, periods, years, isLoading, error);

    var dataForAirtable = {
      userID: this.context.user.id,
      presentValue: parseFloat(this.state.presentValue),
      periods: parseFloat(this.state.periods),
      rate: parseFloat(this.state.rate),
      years: parseFloat(this.state.years)
    }

    console.log(`${typeof rate} ${typeof years}`);
    console.log(`${typeof dataForAirtable.rate} ${typeof dataForAirtable.years}`);

    const fc = new financejs();
    const ciResult = fc.CI(dataForAirtable.rate, dataForAirtable.periods, dataForAirtable.presentValue, dataForAirtable.years);
    console.log(`Result FC LIB CI: ${ciResult}`);

    // Exampleof using a math function
    this.setState({ result1: ciResult });

    console.log(`Demonstrate X+Y math lib: ${FinancialCalculatorMath.adds(years, rate)}`);
    console.log(dataForAirtable)

    API.FinancialCalculators.post(this.context.authToken, dataForAirtable).then(function(response) {
      // return response.data;
      console.log(response)
    })
  }

  render() {

    const {
      // userID,
      presentValue,
      rate,
      periods,
      years,
      // isLoading,
      // error
      result1
    } = this.state;

    return (
      <div className="FutureValueForm">
        <div className="Results">
          <h3>CI Results = {result1.toFixed(2)}</h3>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Octicon icon={Key} />
                     Present Value ($)
                  </span>
                </div>
                <input
                  className="form-control"
                  id="presentValue"
                  type="number"
                  name="presentValue"
                  placeholder="Present Value"
                  value={presentValue}
                  onChange={this.handleInputChange}
                  min="1"
                  required
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Octicon icon={Key} />
                  Interest Rate (%)
                  </span>
                </div>
                <input
                  className="form-control"
                  id="rate"
                  type="number"
                  step="any"
                  name="rate"
                  placeholder="Interest Rate (%)"
                  value={rate}
                  onChange={this.handleInputChange}
                  min="0.01"
                  max="100"
                  required
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Octicon icon={Key} />
                    Period
                  </span>
                </div>
                <input
                  className="form-control"
                  id="periods"
                  type="number"
                  name="periods"
                  placeholder="Period"
                  value={periods}
                  onChange={this.handleInputChange}
                  min="1"
                  max="365"
                  required
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Octicon icon={Key} />
                  Years
                  </span>
                </div>
                <input
                  className="form-control"
                  id="years"
                  type="number"
                  name="years"
                  placeholder="Years"
                  value={years}
                  onChange={this.handleInputChange}
                  min="1"
                  max="100"
                  required
                />
              </div>

              <button className="btn btn-primary" type="submit">
                Calculate Compound Interest (CI)
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FutureValueForm;
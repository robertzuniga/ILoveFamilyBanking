import React, { Component } from "react";

import Octicon, {Key } from "@githubprimer/octicons-react";

import API from '../../lib/API';
import AuthContext from '../../contexts/AuthContext';

class FutureValueForm extends Component {
  static contextType = AuthContext;

  state = {
    userID: "",
    presentValue: "",
    rate: "",
    periods: "",
    years: "",
    isLoading: true,
    error: ""
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
      presentValue: parseInt(this.state.presentValue),
      periods: parseInt(this.state.periods),
      rate: parseInt(this.state.rate),
      years: parseInt(this.state.years)
    }
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
      years
      // isLoading,
      // error
    } = this.state;

    return (
      <div className="FutureValueForm">
        <div className="card">
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Octicon icon={Key} />
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
                CREATE AirtableDb entry
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FutureValueForm;
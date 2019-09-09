import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';

import FutureValueForm from '../../components/FutureValueForm/FutureValueForm'
import API from '../../lib/API';
import AuthContext from '../../contexts/AuthContext';


class FinancialCalculator extends Component {

  static contextType = AuthContext;

  state = {
    isLoading: true,
    error: "",
    airtableData: {}
  }

//   handleSubmit = event => {
//     const {userID,presentValue, rate,periods, years, isLoading, error } = this.state;
 
//     //  console.log("FutureValueForm handleSubmit ==> ", {props});
 
//      this.props.onSubmit(userID,presentValue, rate,periods, years, isLoading, error);
//      event.preventDefault();

// // POST to Airtable

//    }
//////////////////////////////////////////////////////////////////////////////////////////////

  handleSubmit = event => {
    // event.preventDefault();

    // function postData(url = "", data = {}) {
    //   // Default options are marked with *
    //   return fetch(url, {
    //     method: "POST", // *GET, POST, PUT, DELETE, etc.
    //     mode: "cors", // no-cors, cors, *same-origin
    //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: "same-origin", // include, *same-origin, omit
    //     headers: {
    //       "Content-Type": "application/json"
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: JSON.stringify(data) // body data type must match "Content-Type" header
    //   }).then(response => response.json()); // parses JSON response into native JavaScript objects
    // }

    // //run a post to /api/calculations with an object of the above values
    // if (this.context.user.id) {
    //   var userInput = {
    //     user_id: this.context.user.id,
    //     present_value: parseInt(this.state.presentValue),
    //     rate: parseInt(this.state.rate),
    //     periods: parseInt(this.state.periods),
    //     years: parseInt(this.state.years)
    //   };

    //   // console.log(this.context.user.id)
    //   // console.log(userInput)

    //   postData("/api/calculations", userInput)
    //     .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
    //     .catch(error => console.error(error));
    // } else {
    //   alert("you are not logged in");
    // }
    // console.log("<== Successfull Create Data in Airtable ==> ");
    // console.log(this.context.user.id);
    // console.log(parseInt(this.state.presentValue));
    // console.log(parseInt(this.state.rate));
    // console.log(parseInt(this.state.periods));
    // console.log(parseInt(this.state.years));

    // API.FinancialCalculators.post(this.context.authToken).then(function(response) {
    //   // return response.data;
    //   console.log(response)
    // })
  };








//////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    var that = this;
    // fetch('/api/financialCalculators')
    // .then(function(response) {
    //   return response.json();
    // })
    // .then(function(myJson) {
    //   console.log(JSON.stringify(myJson));
    //   that.setState({
    //     airtableData : myJson.fields
    //   })
    // });

    API.FinancialCalculators.getAll(this.context.authToken).then(function(response) {
      return response.data;
      // console.log(response)
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
      that.setState({
        airtableData : myJson
      })
    });
  }

  render() {
    return (
      <div className='FinancialCalculator'>
        <div className='row'>
          <div className='col'>
            {/* {this.state.isLoading
             ? <div className='alert alert-success'>Loading...</div>
              : this.state.error
              ? <div className='alert alert-danger'>{this.state.error}</div>
              : <div>
                  <p>Awesome, the financialCalculator is accessed...</p>
                  <p><em>{this.state.financialcalculators[0].message}</em></p>
                </div>} */}

              <h1>Financial Calculators</h1>
              {/* loop through airtabledata here to display each record for the logged in user */}
              
          </div>

          <div className='row'>
            <div className='col'>
              <FutureValueForm onSubmit={this.handleSubmit} />
            </div>
          </div>


        </div>
      </div>
    );
  }
}

export default FinancialCalculator;

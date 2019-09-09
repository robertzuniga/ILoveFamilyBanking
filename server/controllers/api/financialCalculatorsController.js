const financialCalculatorsController = require('express').Router();

const { JWTVerifier } = require('../../lib/passport');
const db = require('../../models');

// financialCalculatorsController.get('/', JWTVerifier, (req, res) => {
//   db.financialcalculators.findAll()
//     .then(financialCalculators => res.json(financialCalculators))
//     .catch(err => console.log(err));
// });

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(
  "appfX5sQa53WlKBDg"
);

//////////////////////////////////////////////////////////////////////
// Create => Post : Server (calculationController.js) to AirTable db
//////////////////////////////////////////////////////////////////////

// Create Financial Calculator records

financialCalculatorsController.post("/", (req, res) => {
  //req.body contains present value / rate / periods / years
  console.log(req.body)

  var user_id = req.body.userID
  var presentValue = req.body.presentValue;
  var rate = req.body.rate;
  var periods = req.body.periods;
  var years = req.body.years;

  base("Financial Calculator").create(
    {
      user_id: user_id,
      present_value: presentValue,
      rate: rate,
      periods: periods,
      years: years
    },
    function (err, record) {
      if (err) {
        console.error("controller.post ==>", err);
        return;
      }
      console.log(record.getId());
    }
  );
});

//////////////////////////////////////////////////////////////////////
// Read => Get : Server (calculationController.js) to AirTable db
//////////////////////////////////////////////////////////////////////

// myRetrieve a Financial Calculator record

financialCalculatorsController.get("/", JWTVerifier, (req, res) => {
  // console.log(req.user.dataValues.id)

  var airtableRecords = [];
  var userAirtableRecords = [];

  base('Financial Calculator').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 99,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function (record) {
      // console.log('Retrieved', record.get('user_id'));
      // console.log('Retrieved', record.id);
      // console.log(record.fields)
      airtableRecords.push(record.fields)
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

  }, function done(err) {
    if (err) { console.error(err); return; } 
    else {
      // console.log(airtableRecords)
      for ( var i = 0; i < airtableRecords.length; i++){
        if (airtableRecords[i].user_id === req.user.dataValues.id) {
          userAirtableRecords.push(airtableRecords[i])
        }
      }

      res.send(userAirtableRecords)
    }
    
  })
    
  
  // .then(
  
  //   base("Financial Calculator").find(recordID, function (err, response) {

  //     if (err) {
  //       console.error("myRetrieve ==> ", err);
  //       return;
  //     }
  //     console.log("you found", response.id);
  //     res.send(response)
  //   });
  // )

 

});

//////////////////////////////////////////////////////////////////////
// Update => Put : Server (calculationController.js) to AirTable db
//////////////////////////////////////////////////////////////////////

//my Update Financial Calculator records
// make sure to use a put request
// base('Financial Calculator').update("recvzk8qUIcZEXrHG", {
//   "User ID": 1,
//   "Present Value": 50000,
//   "Rate": 0.1,
//   "Periods": 4,
//   "Years": 5
// }, function(err, record) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(record.get('User ID'));
// });

//////////////////////////////////////////////////////////////////////
// Delete => Destroy : Server (calculationController.js) to AirTable db
//////////////////////////////////////////////////////////////////////

// my Delete Record
//make sure to use a delete request
// base('Financial Calculator').destroy('recvzk8qUIcZEXrHG', function(err, deletedRecord) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Deleted record', deletedRecord.id);
// });

module.exports = financialCalculatorsController;
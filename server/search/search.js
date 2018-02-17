require('dotenv').config();
const axios = require('axios');
const xmlString = require('./XMLString');

module.exports = {
  search: ( req, res, next ) => {
    const db = req.app.get('db');

    //unpack the req object.
    let { location, amount, cashDeal, moveIn, rate } = req.body; 
    
    //correct the formating to be a string all uppercase. for MLS
    //location = location.toUpperCase().replace(/ /g, '%20'); 
    
    //checks the location to see if it is a zip code. (will not work outside USA)
    let locationType = ( location*1 )?'postal_code':'city';

    //calculates the maximum list price depending on wether or not they are moving in and/or paying cash.
    let listPriceMax = (cashDeal == 1)?(amount):((moveIn == 1)?(Math.ceil(amount/.03)):(Math.ceil(amount/.2)));
    
    //create results array. [[top 10 cap rate],[top 10 cash yield],[top 10 cash flow]]
    let resultArr = [[],[],[]];
    var stack = [];

    let s = `SELECT *
    FROM rew_properties
    WHERE ${locationType} = ${location} AND list_price <= ${listPriceMax};`

    // db.get_properties([ location, locationType, listPriceMax ])
    db.query(s)
      .then( (responce) => {
        var properties = responce.slice();//makes a coppy of the array
        properties.map( (x, i, a) => {
  
          let { city, list_price, state, street_name, street_number, street_suffix } = x; //unpack address data for the home

          street_name = street_name.replace(/ /g, '+'); 
          city = city.replace(/ /g, '+');
          
          //ping zillow for their rent estamate and link back to Zillow, set it to the property object
          stack.push(axios.get(`http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${process.env.ZWS_ID}&address=${street_number}+${street_name}+${street_suffix}&citystatezip=${city}%2C+${state}&rentzestimate=true`))
        })

        Promise.all(stack).then( arr => {
          arr.map( (y, i) => {
            properties[i].rZestamate = xmlString.stringSlicer( y.data, '<rentzestimate><amount currency="USD">', '<' );
  
            properties[i].ZillowLink = xmlString.stringSlicer( y.data, '<homedetails>', '<' );

            function precisionRound(number, precision) {
              var factor = Math.pow(10, precision);
              return Math.round(number * factor) / factor;
            }

            //Calculate mortgage payment and set to property object.
            if ( cashDeal == 0 ) {
              properties[i].payment = Math.round(((properties[i].list_price-amount)*((rate/12)*(((rate/12)+1)**360)))/(((1+(rate/12))**360)-1));
            } else {
              properties[i].payment = 0;
            }
  
            //Calculate the cap rate.
            properties[i].capRate = precisionRound(properties[i].rZestamate*12/properties[i].list_price, 4);
  
            //Calculate cash yield.
            if( cashDeal == 0 ) {
              properties[i].cashYield = precisionRound((properties[i].rZestamate*12*.7)/((properties[i].rZestamate*12*.3)+amount), 2);
            } else {
              properties[i].cashYield = precisionRound((properties[i].rZestamate*12*.7)/((properties[i].rZestamate*12*.3)+properties[i].list_price), 2);
            }
            
            //Calculate cash flow.
            properties[i].cashFlow = precisionRound((properties[i].rZestamate*12*.7)-(properties[i].payment*12), 2);
  
            //put into results array for cap rate if it is in the top 10
            if ( resultArr[0].length < 10 && !isNaN(properties[i].capRate)) {
              resultArr[0].push(properties[i])
            } else if ( resultArr[0].length == 10 && !isNaN(properties[i].capRate)) {
              resultArr[0].sort( ( a, b ) => {
                if ( a.capRate > b.capRate ) { return -1 }
                else if ( a.capRate < b.capRate ) { return 1 }
                else { return 0 }
              });
              if (resultArr[0][9].capRate < properties[i].capRate) {
                resultArr[0].splice(9, 1, properties[i])
              }
            }
  
            //put into results array for cash yield if it is in the top 10
            if ( resultArr[0].length < 10 && !isNaN(properties[i].cashYield)) {
              resultArr[1].push(properties[i])
            } else if ( resultArr[0].length == 10 && !isNaN(properties[i].cashYield)) {
              resultArr[1].sort( ( a, b ) => {
                if ( a.cashYield > b.cashYield ) { return -1 }
                else if ( a.cashYield < b.cashYield ) { return 1 }
                else { return 0 }
              });
              if (resultArr[1][9].cashYield < properties[i].cashYield) {
                resultArr[1].splice(9, 1, properties[i])
              }
            }
  
            //put into results array for cash flow if it is in the top 10
            if (resultArr[0].length < 10 && !isNaN(properties[i].cashFlow)) {
              resultArr[2].push(properties[i])
            } else if (resultArr[0].length == 10 && !isNaN(properties[i].cashFlow)) {
              resultArr[2].sort( ( a, b ) => {
                if ( a.cashFlow > b.cashFlow ) { return -1 }
                else if ( a.cashFlow < b.cashFlow ) { return 1 }
                else { return 0 }
              });
              if (resultArr[2][9].cashFlow < properties[i].cashFlow) {
                resultArr[2].splice(9, 1, properties[i])
              }
            }

            console.log(resultArr);
          })
          
          resultArr[0].sort( ( a, b ) => {
            if ( a.capRate > b.capRate ) { return -1 }
            else if ( a.capRate < b.capRate ) { return 1 }
            else { return 0 }
          });

          resultArr[1].sort( ( a, b ) => {
            if ( a.cashYield > b.cashYield ) { return -1 }
            else if ( a.cashYield < b.cashYield ) { return 1 }
            else { return 0 }
          });

          resultArr[2].sort( ( a, b ) => {
            if ( a.cashFlow > b.cashFlow ) { return -1 }
            else if ( a.cashFlow < b.cashFlow ) { return 1 }
            else { return 0 }
          });
        
          res.status(200).send( resultArr );
        })
      })
  }
}
  
      //Below is the code needed to get this to work with FlexMLS. It needs acsess to the API which costs $479 anualy to get the code that is needed in the headder of the request.
    // axios.get(`https://sparkapi.com/v1/listings?_filter=${locationType}+Eq+%27${location}%27+And+%28PropertyType+Eq+%27A%27+Or+PropertyType+Eq+%27B%27%29+And+ListPrice+Le+${listPriceMax}&_select=City,ListPrice,PostalCode,StateOrProvince,StreetDirPrefix,StreetDirSuffix,StreetName,StreetNumber,StreetSuffix`, {
    //     XSparkApiUserAgent: "SparkAPIExamples",
    //     Authorization: "OAuth MY_OAUTH2_ACCESS_TOKEN"
    //   }
    // ).then( (res) => {
    //   var properties = res.data.D.Results.slice();//makes a coppy of the array
    //   properties.map( (x) => {

    //     let { City, ListPrice, PostalCode, StateOrProvince, StreetDirPrefix, StreetDirSuffix, StreetName, StreetNumber, StreetSuffix } = x; //unpack address data for the home
        
    //     //ping zillow for their rent estamate and link back to Zillow, set it to the property object
    //     axios.get(`http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${process.env.ZWS_ID}&address=${StreetNumber}+${StreetName}+${StreetSuffix}&citystatezip=${City}%2C+${StateOrProvince}&rentzestimate=true`).then((zRes) => {
    //       x.rZestamate = zRes.data.response.results.result.rentzestimate.amount['#text'];

    //       x.ZillowLink = zRes.data.response.results.result.links.homedetails
    //     })

    //     //Calculate mortgage payment and set to property object.
    //     if ( cashDeal == 0 ) {
    //       x.payment = ((ListPrice-amount)*((rate/12)*(((rate/12)+1)**360)))/(((1+(rate/12))**360)-1);
    //     } else {
    //       x.payment = 0;
    //     }

    //     //Calculate the cap rate.
    //     x.capRate = x.rZestamate*12/ListPrice;

    //     //Calculate cash yield.
    //     x.cashYield = (x.rZestamate*12*.7)/((x.rZestamate*12*.3)+amount);

    //     //Calculate cash flow.
    //     x.cashFlow = (x.rZestamate*12*.7)-(x.payment*12);

    //     //put into results array for cap rate if it is in the top 10
    //     if ( resultArr[0].length < 10 ) {
    //       resultArr[0].push(x)
    //     } else {
    //       resultArr[0].sort( ( a, b ) => {
    //         if ( a.capRate > b.capRate ) { return -1 }
    //         else if ( a.capRate < b.capRate ) { return 1 }
    //         else { return 0 }
    //       });
    //       if (resultArr[0][9].capRate < x.capRate) {
    //         resultArr[0].splice(9, 1, x)
    //       }
    //     }

    //     //put into results array for cash yield if it is in the top 10
    //     if ( resultArr[1].length < 10 ) {
    //       resultArr[1].push(x)
    //     } else {
    //       resultArr[1].sort( ( a, b ) => {
    //         if ( a.cashYield > b.cashYield ) { return -1 }
    //         else if ( a.cashYield < b.cashYield ) { return 1 }
    //         else { return 0 }
    //       });
    //       if (resultArr[1][9].cashYield < x.cashYield) {
    //         resultArr[1].splice(9, 1, x)
    //       }
    //     }

    //     //put into results array for cash flow if it is in the top 10
    //     if ( resultArr[2].length < 10 ) {
    //       resultArr[2].push(x)
    //     } else {
    //       resultArr[2].sort( ( a, b ) => {
    //         if ( a.capRate > b.capRate ) { return -1 }
    //         else if ( a.capRate < b.capRate ) { return 1 }
    //         else { return 0 }
    //       });
    //       if (resultArr[2][9].capRate < x.capRate) {
    //         resultArr[2].splice(9, 1, x)
    //       }
    //     }

    //   })
    // })

    






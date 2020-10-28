const axios = require('axios')
const fs = require('fs')

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var currentDate = yyyy+"-"+mm+"-"+dd;
console.log(currentDate);

axios({
    "method":"GET",
    "url":`https://api-football-v1.p.rapidapi.com/v2/fixtures/date/${currentDate}`,
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
    "x-rapidapi-key":"d960781258mshe8ac4e5c6c305bdp1fb92cjsn5a2797992d5d",
    "useQueryString":true
    }
    })
    .then((response)=>{
        var i = 0;
        while(response.data.api.fixtures[i] !== undefined){
            const homeName = response.data.api.fixtures[i].homeTeam.team_name
            const awayName = response.data.api.fixtures[i].awayTeam.team_name
            const fixture_id = response.data.api.fixtures[i].fixture_id
            const writeData = `${homeName} - ${awayName} fixture id = ${fixture_id}`
           
            fs.appendFile('fixture.txt', writeData+"\r\n", function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
            i++;
        }
    

    })
    .catch((error)=>{
      console.log(error)
    })
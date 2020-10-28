const axios = require("axios");
const express = require('express');
const TelegramBot = require('node-telegram-bot-api')
var admin = require('firebase-admin')

const token = '1290276588:AAESdHSwFp2N4OiTjZTI8RHH3jGp_xfT0Qc'

const bot = new TelegramBot(token, {polling: true});


const appExpress = express();
appExpress.use(express.json());
appExpress.use(express.urlencoded({extended:true}));

var h = 0;

//{name : "Redlands United FC",number : 215079,predicLevel : 1.1,predic : "1.5 Üst"}       SADECE 1.5 ÜST 1.5 ÜST 1.5 ÜST

Matches = [
  {name : "Istanbul Basaksehir", number : 238307, predicLevel : 1.2, predic : "1.5 Üst",control : false},
  {name : "Heracles", number : 243403, predicLevel : 1.2, predic : "1.5 Üst",control : false},
  {name : "Udinese", number : 235702, predicLevel : 1.2, predic : "1.5 Üst",control : false},
  {name : "Sogndal", number : 141786, predicLevel : 1.2, predic : "1.5 Üst",control : false},
  {name : "JBK", number : 219548, predicLevel : 1.2, predic : "1.5 Üst",control : false},
  {name : "Borussia Dortmund", number : 238298, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "Waalwijk", number : 243414, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "Roda", number : 243401, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "Vegalta Sendai", number : 195383, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "Sanfrecce Hiroshima", number : 195457, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "Torino", number : 235701, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "Benevento", number : 235696, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "Parma", number : 235692, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "HB", number : 179363, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "KFUM Oslo", number : 141703, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "Grorud", number : 141880, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "Raufoss", number : 141753, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "Freiburg II", number : 233462, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "Lokomotive Leipzig", number : 222253, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "BFC Dynamo", number : 222257, predicLevel : 1.3, predic : "1.5 Üst",control : false},
  {name : "FC Tokyo", number : 195463, predicLevel : 1.4, predic : "1.5 Üst",control : false},
  {name : "Beijing Guoan", number : 259562, predicLevel : 1.4, predic : "1.5 Üst",control : false},
  {name : "Cagliari", number : 235690, predicLevel : 1.4, predic : "1.5 Üst",control : false},
  {name : "Krylya Sovetov II", number : 177694, predicLevel : 1.4, predic : "1.5 Üst",control : false},
  {name : "AFC Fylde", number : 250003, predicLevel : 1.4, predic : "1.5 Üst",control : false},
  {name : "SV Rodinghausen", number : 258848, predicLevel : 1.4, predic : "1.5 Üst",control : false},
  {name : "Carl Zeiss Jena", number : 222254, predicLevel : 1.4, predic : "1.5 Üst",control : false},
  {name : "Al Tadhamon", number : 253868, predicLevel : 1.4, predic : "1.5 Üst",control : false},
  {name : "Yarmouk", number : 253874, predicLevel : 1.4, predic : "1.5 Üst",control : false},
  {name : "Shabab", number : 253870, predicLevel : 1.4, predic : "1.5 Üst",control : false},
  {name : "Krasnodar", number : 238293, predicLevel : 1.5, predic : "1.5 Üst",control : false},
  {name : "Juventus", number : 238304, predicLevel : 1.5, predic : "1.5 Üst",control : false},
  {name : "Manchester United", number : 238306, predicLevel : 1.5, predic : "1.5 Üst",control : false},
  {name : "VfL Osnabruck", number : 252143, predicLevel : 1.5, predic : "1.5 Üst",control : false},
  {name : "BK Hacken", number : 255966, predicLevel : 1.5, predic : "1.5 Üst",control : false},
  {name : "Wisla Krakow", number : 237349, predicLevel : 1.5, predic : "1.5 Üst",control : false},
  {name : "ADO Den Haag", number : 243405, predicLevel : 1.5, predic : "1.5 Üst",control : false},
  {name : "Brescia", number : 237307, predicLevel : 1.5, predic : "1.5 Üst",control : false},
  {name : "Øygarden", number : 141677, predicLevel : 1.5, predic : "1.5 Üst",control : false},
  {name : "Fortuna Düsseldorf II", number : 258849, predicLevel : 1.5, predic : "1.5 Üst",control : false}


]

//var app = admin.initializeApp();
//Credential :  $env:GOOGLE_APPLICATION_CREDENTIALS='C:\Users\Ferhat\Desktop\JavascriptDers\NodeJsDersleri\PrebotWorks\prebot-project-firebase-adminsdk-5jhvo-8edbbb6b1b.json'
/* var serviceAccount = require('C:/Users/Ferhat/Desktop/JavascriptDers/NodeJsDersleri/PrebotWorks/prebot-project-firebase-adminsdk-5jhvo-8edbbb6b1b.json');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://prebot-project.firebaseio.com/'
});

var db = admin.database();

var ref = db.ref("/liveMatches");
var liveRef = db.ref("/dailyMatches");
var refPast = db.ref("/pastMatches"); */
var chat_id;

 bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  chat_id = chatId

  // send a message to the chat acknowledging receipt of their message
  //bot.sendMessage(chatId, 'Bot Çalıştı');
  console.log("Sistem Çalışıyor..");
});


let dayMatchesArray = ["asddsa"];
let dayMatchesIdArray = ["123"];
let x;

setInterval(function(){  

    axios({
        "method":"GET",
        "url":"https://api-football-v1.p.rapidapi.com/v2/fixtures/live",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
        "x-rapidapi-key":"d960781258mshe8ac4e5c6c305bdp1fb92cjsn5a2797992d5d",
        "useQueryString":true
        },"params":{
        "timezone":"Europe/Istanbul"
        }
        })
        .then((response)=>{
            var i = 0;
          while(response.data.api.fixtures[i] !== undefined){
    
            const homeTeamName = response.data.api.fixtures[i].homeTeam.team_name;
            const awayTeamName = response.data.api.fixtures[i].awayTeam.team_name;
            const homeTeamScore = response.data.api.fixtures[i].goalsHomeTeam;
            const awayTeamScore = response.data.api.fixtures[i].goalsAwayTeam;
            const matchDisplay = response.data.api.fixtures[i].elapsed;
            const matchCountry = response.data.api.fixtures[i].league.country;
            const matchLeague = response.data.api.fixtures[i].league.name;

    
            for(h=0;h<=Matches.length-1;h++){

                if(homeTeamName == Matches[h].name){
    
                  const predictionLevel = Matches[h].predicLevel;
                     
                    if(prediction(matchDisplay,homeTeamScore,awayTeamScore,predictionLevel)){
        
                      if(!(arraySearch(homeTeamName))){
    
                          statisticsControl(Matches[h].number,homeTeamName,awayTeamName,matchDisplay,Matches[h].predic,matchCountry,matchLeague,homeTeamScore,awayTeamScore)
                        
                      }
                      
                    }
                 
                   if(arraySearch(homeTeamName) && (matchDisplay >= 89)){
                     if(Matches[h].control == false){
                      databaseUpdate(homeTeamName,awayTeamName,Matches[h].predic,homeTeamScore,awayTeamScore,predictionLevel,""+matchCountry+" "+matchLeague,matchDisplay);
                     }
                    
                  } 
    
                }
    
              }
    
    
            i++;
          }
          
        })
        .catch((error)=>{
          console.log(error)
        })

}, 60000);


appExpress.listen(5000, ()=> {
    console.log("5000 portunda server ayakta");
  }) 
  
  function prediction(min,homeS,awayS,value)  {
    
      switch(value){
        case 1.1 : preMin = 50; break;
        case 1.2 : preMin = 50; break;
        case 1.3 : preMin = 40; break;
        case 1.4 : preMin = 35; break;
        case 1.5 : preMin = 35; break;
        default : return null;
      }
      if(homeS+awayS == 1){
        preMin += 25;
      }
      if(value == 1.4 || value == 1.5 || value == 1.3 || value == 1.1 || value == 1.2){
        if((min >= preMin) && ((homeS+awayS) < 2)){
          return true;
        }
      }
    return false;
  }

  function matchesArrayAdd(homeTeamN,awayTeamN,p,minu,cntry,lig) {

      

                 /*  var message = {
                    notification: {
                      title: `${homeTeamN} - ${awayTeamN}  ${p}`,
                      body: 'Canlı Tahmin...'
                    },
                    topic: topic
                  }; */
                  
                  // Send a message to devices subscribed to the provided topic.
                  /* admin.messaging().send(message)
                    .then((response) => {
                      // Response is a message ID string.
                      console.log('Successfully sent message:', response);
                    })
                    .catch((error) => {
                      console.log('Error sending message:', error);
                  }); */
                  
                 /*  liveRef.child(random_id).set({
                    homeTeam : homeTeamN,
                    awayTeam : awayTeamN,
                    prediction : p,
                    minute : ""+minu,
                    league : lig,
                    result : "Playing.."
                  });    */         
  
}

  function arraySearch(homeTeamN) {

    let geciciMac; 
    
   for(k=0;k<dayMatchesArray.length;k++){
    if(dayMatchesArray[k] == homeTeamN){
      geciciMac = homeTeamN;
      x=k;
      break;
    }
      

    }
    if(homeTeamN == geciciMac){
      
      return true;
    }else{
      
      return false;
    }
   
    
  }

  function databaseUpdate(homeTeamN,awayTeamN,p,homeS,awayS,predictionLvl,ligName,minu) {

    let matchId = dayMatchesIdArray[x];

    if(predictionLvl == 1.1 || predictionLvl == 1.2){

      if((homeS+awayS) >= 3 ){

        bot.sendMessage(chat_id,`${homeTeamN} - ${awayTeamN}  ${p}  Kontrol Dakikası : ${minu} Kazandı`)

         //ref.child(matchId).remove();

         var today = new Date();
         var dd = String(today.getDate()).padStart(2, '0');
         var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
         var yyyy = today.getFullYear();

         today = dd + '/' + mm + '/' + yyyy;

         /* refPast.child(matchId).set({
           homeTeam : homeTeamN,
           awayTeam : awayTeamN,
           prediction : p,
           league : ligName,
           minute : ""+minu,
           result : "Kazandı",
           date : today
         });

         

         liveRef.child(matchId).set({
           homeTeam : homeTeamN,
           awayTeam : awayTeamN,
           prediction : p,
           league : ligName,
           minute : ""+minu,
           result : "Kazandı"
         }); */


      }else{
        
      /*  ref.child(matchId).remove();
       refPast.child(matchId).set({
         homeTeam : homeTeamN,
         awayTeam : awayTeamN,
         prediction : p,
         league : ligName,
         minute : ""+minu,
         result : "Kaybetti"
         
       });
       liveRef.child(matchId).set({
         homeTeam : homeTeamN,
         awayTeam : awayTeamN,
         prediction : p,
         league : ligName,
         minute : ""+minu,
         result : "Kaybetti"
       }); */
       
      }


    }

    if(predictionLvl == 1.4 || predictionLvl == 1.5  || predictionLvl == 1.3){
     if((homeS+awayS) >= 2 ){

        bot.sendMessage(chat_id,`${homeTeamN} - ${awayTeamN}  ${p}  Kontrol Dakikası : ${minu} Kazandı`)

       /*  ref.child(matchId).remove();
        refPast.child(matchId).set({
          homeTeam : homeTeamN,
          awayTeam : awayTeamN,
          prediction : p,
          league : ligName,
          minute : ""+minu,
          result : "Kazandı"
        });
        liveRef.child(matchId).set({
         homeTeam : homeTeamN,
         awayTeam : awayTeamN,
         prediction : p,
         league : ligName,
         minute : ""+minu,
         result : "Kazandı"
       }); */

       
     }else{
      /* ref.child(matchId).remove();
      refPast.child(matchId).set({
        homeTeam : homeTeamN,
        awayTeam : awayTeamN,
        prediction : p,
        league : ligName,
        minute : ""+minu,
        result : "Kaybetti"
      });
      liveRef.child(matchId).set({
       homeTeam : homeTeamN,
       awayTeam : awayTeamN,
       prediction : p,
       league : ligName,
       minute : ""+minu,
       result : "Kaybetti"
     }); */
     
     }
  
   }

   Matches[h].control = true;

}


function statisticsControl(fixtureId,hom,awa,mi,pr,country,lig,homScor,awaScor) {

  axios({
      "method":"GET",
      "url":`https://aping.bilyoner.com/mobile/match-card/${fixtureId}/livestatistics`
      })
      .then((response)=>{

            dayMatchesArray.push(hom);
            const random_id = ref.push().key;
            dayMatchesIdArray.push(random_id);

            const list = response.data.livePeriodStatistics[0];

        if(list === undefined){
          /* ref.child(random_id).set({
            homeTeam : hom,
            awayTeam : awa,
            prediction : pr,
            minute : ""+mi,
            league : lig,
            country : country,
            result : "Canlı.."
          });  */

        bot.sendMessage(chat_id,`${hom} - ${awa}  ${pr}  Tahmin Dakikası : ${mi} ${country} ${lig} `)
        }else{

          var istatistikDegeri = 0
          var toplamSut = parseInt(list.statistics[1].homeTeamValue) + parseInt(list.statistics[1].awayTeamValue)
          var toplamKorner = parseInt(list.statistics[5].homeTeamValue) + parseInt(list.statistics[5].awayTeamValue)
          var toplamKirmiziKart = parseInt(list.statistics[10].homeTeamValue) + parseInt(list.statistics[10].awayTeamValue)

          console.log("Toplam Şut "+toplamSut);
          console.log("Toplam Korner : "+toplamKorner);
          console.log("Toplam Kırmızı Kart :"+toplamKirmiziKart);

          if(homScor+awaScor == 1){
            toplamSut = toplamSut/2
            toplamKorner = toplamKorner/2
           
          }
          if(homScor+awaScor == 2){
            toplamSut = toplamSut/3
            toplamKorner = toplamKorner/3
           
          }


          if(toplamSut > 5 || toplamSut == 0){
            istatistikDegeri += 1
          }
          if(toplamKorner > 1 || toplamKorner == 0){
            istatistikDegeri += 1
          }
          if((toplamKirmiziKart==0) || (toplamKirmiziKart==1) || (toplamKirmiziKart==3) || (toplamKirmiziKart==5)){
            istatistikDegeri += 1
          }
          console.log("Deger : "+istatistikDegeri);
          if(istatistikDegeri > 1){

           /*  ref.child(random_id).set({
              homeTeam : hom,
              awayTeam : awa,
              prediction : pr,
              minute : ""+mi,
              league : lig,
              country : country,
              result : "Canlı.."
            });  */

          bot.sendMessage(chat_id,`${hom} - ${awa}  ${pr}  Tahmin Dakikası : ${mi} ${country} ${lig} `)

          }else{
            
            let matchId = dayMatchesIdArray[x];

            ref.child(matchId).remove();
            Matches[h].control = true;
          }

          
        }

        console.log("Home Team :"+hom);
        console.log("Away Team :"+awa);
        console.log("Sonuc :"+list);

        
      
          

          

      })
      .catch((error)=>{
        console.log(error)
      })
  
}








/* function statisticsControl(fixtureId,hom,awa,mi,pr,country,lig) {

    axios({
        "method":"GET",
        "url":`https://api-football-v1.p.rapidapi.com/v2/statistics/fixture/${fixtureId}/`,
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
        "x-rapidapi-key":"d960781258mshe8ac4e5c6c305bdp1fb92cjsn5a2797992d5d",
        "useQueryString":true
        }
        })
        .then((response)=>{

            dayMatchesArray.push(hom);
            const random_id = ref.push().key;
            dayMatchesIdArray.push(random_id);


            console.log("homeTeamname :"+hom);
            console.log("awayTeamname :"+awa);
            console.log("Predi :"+pr);

            console.log(response.data.api.statistics);

             if(response.data.api.statistics === [] || response.data.api.results.length == 0 || response.data.api.results === undefined){
               
            } 

            if(response.data.api.results > 0 ){

                const toplam_sut = parseInt(response.data.api.statistics['Shots on Goal'].home) + parseInt(response.data.api.statistics['Shots on Goal'].away)
                const toplam_faul = parseInt(response.data.api.statistics.Fouls.home) + parseInt(response.data.api.statistics.Fouls.away)
                const toplam_kirmizi_kart = parseInt(response.data.api.statistics['Red Cards'].home) + parseInt(response.data.api.statistics['Red Cards'].away)
                const toplam_korner = parseInt(response.data.api.statistics['Corner Kicks'].home) + parseInt(response.data.api.statistics['Corner Kicks'].away)
                var tahmin_degiskeni = 0;
                console.log("toplam sut"+toplam_sut+" "+"toplam faul "+toplam_faul+""+"toplam kart"+toplam_kirmizi_kart+""+"toplam korner"+toplam_korner);

                if(toplam_sut > 5 || toplam_sut === NaN){
                    tahmin_degiskeni += 1;
                }
                if(toplam_faul > 3 || toplam_faul === NaN){
                    tahmin_degiskeni += 1;
                }
                if(!(toplam_kirmizi_kart%2==0) || toplam_kirmizi_kart === NaN){
                    tahmin_degiskeni += 1;
                }
                if(toplam_korner > 5 || toplam_korner === NaN){
                    tahmin_degiskeni += 1;
                }
                if(tahmin_degiskeni > 2){
                    
                    ref.child(random_id).set({
                        homeTeam : hom,
                        awayTeam : awa,
                        prediction : pr,
                        minute : ""+mi,
                        league : lig,
                        country : country,
                        result : "Canlı.."
                      }); 

                    bot.sendMessage(chat_id,`${hom} - ${awa}  ${pr}  Tahmin Dakikası : ${mi} ${country} ${lig} istatikli tahmin dolu`)
                }
            }else{
            
                    ref.child(random_id).set({
                        homeTeam : hom,
                        awayTeam : awa,
                        prediction : pr,
                        minute : ""+mi,
                        league : lig,
                        country : country,
                        result : "Canlı.."
                      }); 

                bot.sendMessage(chat_id,`${hom} - ${awa}  ${pr}  Tahmin Dakikası : ${mi} ${country} ${lig} istatikli tahmin boş`)
            }

        })
        .catch((error)=>{
          console.log(error)
        })
    
} */
var dotenv = require("dotenv").config();
const Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");


// var seatGeek = new seatGeek(keys.seatGeek);
var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb.id;
var seatGeek = keys.seatGeek.id;

var action = process.argv[2];
var value = process.argv.slice(3).join("+");
var performer = process.argv.slice(3).join("-");

switch (action) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        console.log("Let's jam!");
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        console.log("Wheeeeew!");
        break;
}


function movie(){
axios.get("http://www.omdbapi.com/?t="+ value +"&apikey="+omdb)
  .then(function(response) {
      const movieData = response.data;
    console.log(`Title: ${movieData.Title}
Year: ${movieData.Year}
IMDB Rating: ${movieData.imdbRating}
Rotten Tomatoes Rating: ${movieData.Ratings[1].Value}
Country: ${movieData.Country}
Language: ${movieData.Language}
Plot: ${movieData.Plot}`);

}).catch(function(err) {
    if (err.response){
        console.log(err);
    }
})
}

function concert(){
    axios.get(`https://api.seatgeek.com/2/events?performers.slug=${performer}&client_id=${seatGeek}`)
    .then(function(response) {
        const venueInfo = response.data.events[0].venue;
        const date = moment(response.data.events[0].datetime_local).format('L');
        console.log(`Venue: ${venueInfo.name}
Location: ${venueInfo.address}
Date: ${date}`);
        }).catch(function(err) {
        if (err.response){
            console.log(err);
        }
    })

}
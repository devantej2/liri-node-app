// Importing needed packages

var dotenv = require("dotenv").config();
const Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb.id;
var seatGeek = keys.seatGeek.id;

var action = process.argv[2];
var movie = process.argv.slice(3).join("+");
var song = process.argv.slice(3).join(" ")
var performer = process.argv.slice(3).join("-");

// Setting default song to display if no song is entered
if (!song) {
    song = "The Sign";
}

// Setting default movie to display if no title is entered
if (!movie){
    movie = "Mr. Nobody";
}

// Conditions for desired function to be ran
switch (action) {
    case "concert-this":
        getConcert();
        break;

    case "spotify-this-song":
        getSong();
        break;

    case "movie-this":
        getMovie();
        break;

    case "do-what-it-says":
        doThis();
        break;
}

// Function retrieves info from OMDB API based on the movie title
function getMovie() {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=" + omdb)
        .then(function (response) {
            const movieData = response.data;
            console.log(`Title: ${movieData.Title}
Year: ${movieData.Year}
IMDB Rating: ${movieData.imdbRating}
Rotten Tomatoes Rating: ${movieData.Ratings[1].Value}
Country: ${movieData.Country}
Language: ${movieData.Language}
Plot: ${movieData.Plot}`);

        }).catch(function (err) {
            if (err.response) {
                console.log(err);
            }
        })
}

// concert-this function to retrieve info from SeatGeek
function getConcert() {
    return axios.get(`https://api.seatgeek.com/2/events?performers.slug=${performer}&client_id=${seatGeek}`)
        .then(function (response) {
            const venueInfo = response.data.events[0].venue;
            const date = moment(response.data.events[0].datetime_local).format('L');
            console.log(`Venue: ${venueInfo.name}
Location: ${venueInfo.address}
Date: ${date}`);
        }).catch(function (err) {
            if (err.response) {
                console.log(err);
            }
        });
}

// Function that retrieves data from Spotify API based on the song entered
function getSong() {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (let i = 0; i < 10; i++) {
            const songInfo = data.tracks.items[i]
            console.log(`Artist(s): ${songInfo.artists[0].name}
            Song: ${songInfo.name}
            Preview: ${songInfo.preview_url}
            Album: ${songInfo.album.name}`);
        }
    });

}

// Function reads the text in random.txt and parses the text into an array
// Uses index 0 and 1 to run 1 of the 3 above functions
function doThis() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.split(", ");

        if (data[0] === "spotify-this-song") {
            song = data[1];
            getSong();
        } else if (data[0] === "concert-this") {
            performer = data[1];
            getConcert();

        } else if (data[0] === "movie-this") {
            movie = data[1];
            getMovie();
        }

    });

}
# liri-node-app

LIRI is like iPhone's SIRI. However, instead of using voice recognition, like SIRI, Liri
interprets language and returns data. 

LIRI takes in 1 of 4 commands for its first argument:

1. `concert-this``<artist/band name>`

    - Searches the SeatGeek Artist Events API for an artist and renders relevant information: Venue name & location and date of the event

2. `movie-this``<movie name>`

    - Retrieves data from the OMDB API for that displays the following for the desired movie: Title, release year, ratings, actors, plot, etc.

3. `spotify-this-song` `<song name>`

    - Uses the Spotify API to retrieve the information associated with the song name: artist name, album for the song, preview link, and name of song

4. `do-what-it-says` 

    - Calls on 1 of 3 functions listed above, depending on what command is in the random.txt file



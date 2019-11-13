console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.seatGeek = {
  id: process.env.SeatGeek_ID,
  secret: process.env.SeatGeek_SECRET
};

exports.omdb = {
  id: process.env.OMDB_ID
}
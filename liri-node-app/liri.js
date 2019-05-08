var axios = require ('axios');
var Spotify = require ('node-spotify-api');
var keys = require('./keys.js');
var fs = require('fs');
var spotify = new Spotify (keys.spotify)
var BandsInTownEvents = require ('bandsintown');

// Create an interface for accepting commands and arguments
// Interact with the bandsintown API and print results
var command = process.argv[2];
var argument = process.argv[3];
var argument2 = process.argv[4];

var commandList = {
    'spotify-this-song': spotifyThisSong,
    'movie-this': movieThis,
    'concert-this': concertThis,
    'do-what-it-says': doWhatItSays
};

if (commandList[command]) {
    commandList[command](argument);
    }
    else {
        console.log('Unrecognized command')
    }

// Interact with the spotify API and print results
function spotifyThisSong(song){
    spotify
        .search({
            type: 'track',
            query: song,
        })
        .then(function (data){
            
            var searchResults = data.tracks.items;
                console.log('===============');
                
                console.log("Artist: " + searchResults.artists.name);
                // console.log('Preview: ${track.preview_url}');
                console.log("\nSong Name: " + searchResults.name);
                // console.log('Track name: ${track.name}');
                console.log("\nPreview URL: " + searchResults.preview_url);
                // console.log('Artist name: ${track.artist[0].name}');
                console.log("\nAlbum Name: ", searchResults.album.name);
                // // console.log('Album name: ${track.album.name}');    
                // console.log("Album Name", tracks.album.name);   
               
            })
        
        .catch(function(err){
            console.error(err);
        });    
    };



// Interact with omdb API and print results
function movieThis(movieName) {
    axios({
        method:'get',
          url:"http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy"  
    })
        .then (function (response){
            console.log("===============================");
            console.log("Movie Title: ", response.data.Title);
            console.log("\nRelease Year: ", response.data.Year);
            console.log("\n IMDB Rating: ", response.data.imdbRating);
            console.log("===============================");
        });
}
// Interact with the bandsintown API and print results
 function concertThis(artist){
      axios({
          method:'get',
          url:"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
})
        .then(function(response){
     
            

     console.log("===============================");
     console.log("Venue Name" , response.EventData.venue.name);
     console.log("\nVenue Location: " + response.EventData.venue.city + "," + response.EventData.venue.country + "\nDate of the Event: ");
     
     console.log("===============================");
});
 }
 function doWhatItSays(content){
 
 var textfile;

fs.readFile('./random.txt', function read (err, data){
    if (err){
        throw err;
    }
    textfile = data;

    console.log(content);
});
axios({
    method:'get',
    url:"https://rest.bandsintown.com/artists/" + content + "/events?app_id=codingbootcamp"
})

 }
switch (argument){
    case "spotify-this-song":
    spotifyThisSong(radom.txt);

case "concert-This":
concertThis(argument2);

case "movie-This":
movieThis(argument2);

case "do-what-it-says":
doWhatItSays();
};
//////////////////////////////////////////////This is for testing only //////////////////////////////////////////////

var zipCode = "03867";
var radius = 20;
var date = "11/09/2017";
// IMPORTANT: the date must be within 6 days from current day, else returns an error.

// if we want to remove the date field from the form & only allow searches for the current day, use this instead
// var d = new Date();
// // this pulls in todays date
// var today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

// this calls the whole getMovies function, which includes api call & creates the movieInfo array of objects
// this should be moved into biz logic file & attached to the onclick for the form submit button
getMovies(zipCode, radius, date, function (moviesInfo) {
    // add all the jquery outputs for movie info here > movie title / theater & show times
    console.log(moviesInfo);
});
//////////////////////////////////////////////This is for testing only //////////////////////////////////////////////

// this function passes in the variable data for zipCode, radius & date, which is pulled from input fields on form
// the callback returns the moviesInfo object


function getMovies(zipCode, radius, date, callback) {

    // this is how the date comes in from the form from looking at wireframe mockup
    // 10/31/2017
    // needs to be formated 2017-10-31
    var day = date.split("/")[1];
    var month = date.split("/")[0];
    var year = date.split("/")[2];



    var queryURL = "http://data.tmsapi.com/v1.1/movies/showings";
    queryURL += '?' + $.param({
        'startDate': year + '-' + month + '-' + day,
        'zip': zipCode,
        'radius': radius,
        'units': "mi",
        'api_key': "rb8hzag4f93j2f86dbqbcrn5"
    });

    console.log(queryURL);


    $.ajax({
        url: queryURL,
        method: 'GET',
        success: function (res) {
            var movies = res.map(function (movie) {
                var obj = {};
                obj.title = movie.title;
                obj.theatre = movie.showtimes[0].theatre.name;
                obj.date = movie.showtimes[0].dateTime.split('T')[0];
                obj.time = movie.showtimes[0].dateTime.split('T')[1];
                obj.ticketURI = movie.showtimes[0].ticketURI;
                return obj;
            });
            // this variable returns 3 movies
            var moviesInfo= movies.slice(0,3);
            // console.log(moviesInfo);

            // this is the callback, it returns the movies object from above
            callback(moviesInfo);
        },
        // if an error happens, what is it
        error: function (err) {
            console.log("an error callback was called");
            console.log(err);
        }
    });
}
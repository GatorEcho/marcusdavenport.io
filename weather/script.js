$(document).ready(function() {
    var lat = "";
    var lon = "";
    var celsius = false;
    var dt = new Date();
    var offset = (dt.getTimezoneOffset()/60 * 1000);
    var minutes = "";
    //countries that don't use celsius
    var holdouts = ["BS", "BZ", "GU", "KY", "PW", "PR", "US", "VI"];
    var firstRun = true;
    //prefix for icons
    var iconPre = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/";

    //-----Declarations of supporting functions-----//

    //function to convert fahrenheit to celsius for metric users
    var celCon = function(num) {
        if (celsius) {
            return (num - 32) * (5 / 9);
        }
        return num;
    };
    //function to convert mph to kph for metric users
    var kmCon = function(num) {
        if (celsius) {
            return Math.round((num * 1.60934)) + " kph";
        }
        return Math.round(num) + " mph";
    };
    //function to determine day names
    var calcDay = function(num) {
        if (num > 6) {
            num -= 7;
        }
        switch (num) {
            case 0:
                return "Sun";
            case 1:
                return "Mon";
            case 2:
                return "Tue";
            case 3:
                return "Wed";
            case 4:
                return "Thu";
            case 5:
                return "Fri";
            case 6:
                return "Sat";
        }
    };
    //function to determine month names
    var calcMonth = function(num) {
        switch (num) {
            case 0:
                return "Jan";
            case 1:
                return "Feb";
            case 2:
                return "Mar";
            case 3:
                return "Apr";
            case 4:
                return "May";
            case 5:
                return "Jun";
            case 6:
                return "Jul";
            case 7:
                return "Aug";
            case 8:
                return "Sep";
            case 9:
                return "Oct";
            case 10:
                return "Nov";
            case 11:
                return "Dec";
        }
    };
    //function to capitalize sentences
    var capCase = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    //-----End of supporting function declarations-----//

    //reload is the primary function that draws most of the page based on location data
    //it calls OpenWeather API on each redraw rather than creating 20ish variables
    //to store the API response data
    var reload = function() {
        //api call to get current conditions
        $.get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&cnt=6&APPID=1a0075ceb23c8596e0371403a7831774", function(response) {
            //default to celsius if not a holdout country
            if(!holdouts.indexOf(response.country) && firstRun){
              $('#f-button').css('background-color', 'gray');
              $('#c-button').css('background-color', '#FF4081');
              $('#unit').html('&degC');
              celsius = true;
              firstRun = false;
            }
            $('#city').text(response.name);
            //add conditions description to info box
            $('#conditions').text(capCase(response.weather[0].description));
            //add humidity to info box
            $('#humidity').text("Humidity: " + response.main.humidity + "%");
            //add sunrise/set to info box
            var rise = new Date(response.sys.sunrise * 1000);
            var set = new Date(response.sys.sunset * 1000);

            minutes = ("0" + rise.getMinutes()).slice(-2);
            $('#rise').text('Sunrise: ' + rise.getHours() + ":" + minutes);

            minutes = ("0" + set.getMinutes()).slice(-2);
            $('#set').text('Sunset: ' + set.getHours() + ":" + minutes);
            //add wind speed to info box
            $('#wind').text('Wind: ' + kmCon(response.wind.speed));
            //set current temperature
            $('#temp').text(Math.round(celCon(response.main.temp)));
            //set main icon and color palette
            //use night settings if it is past sunset or before sunrise
            if (Date.now()/1000 > (response.sys.sunset - offset) || Date.now()/1000 < (response.sys.sunrise -offset)) {

                switch (response.weather[0].main) {
                    case "Atmosphere":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Fog-Moon.svg");
                        $('body').css('background-color', '#7986cb');
                        $('#weather-box').css('border-color', '#cfd8d');
                        break;
                    case "Clear":
                        $('#weather-icon').attr('src', iconPre + "Moon.svg");
                        $('body').css('background-color', '#283593');
                        $('#weather-box').css('border-color', '#cfd8dc');
                        break;
                    case "Clouds":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Moon.svg");
                        $('body').css('background-color', '#455a64');
                        $('#weather-box').css('border-color', '#cfd8dc');
                        break;
                    case "Drizzle":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Drizzle-Moon-Alt.svg");
                        $('body').css('background-color', '#455a64');
                        $('#weather-box').css('border-color', '#18ffff');
                        break;
                    case "Extreme":
                        $('#weather-icon').attr('src', iconPre + "hazard.png");
                        $('body').css('background-color', '#212121');
                        $('#weather-box').css('border-color', '#b71c1c');
                        break;
                    case "Haze":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Fog-Moon.svg");
                        $('body').css('background-color', '#7986cb');
                        $('#weather-box').css('border-color', '#cfd8d');
                        break;
                    case "Rain":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Drizzle-Moon-Alt.svg");
                        $('body').css('background-color', '#455a64');
                        $('#weather-box').css('border-color', '#18ffff');
                        break;
                    case "Snow":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Snow-Moon-Alt.svg");
                        $('body').css('background-color', '#455a64');
                        $('#weather-box').css('border-color', '#82b1ff');
                        break;
                    case "Thunderstorm":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Lightning-Moon.svg");
                        $('body').css('background-color', '#263238');
                        $('#weather-box').css('border-color', '#ffd600');
                        break;
                  default:
                        $('#weather-icon').attr('src', iconPre + "Shades.svg");
                        $('body').css('background-color', '#283593');
                        $('#weather-box').css('border-color', '#cfd8dc');
                        break;
                }
                //otherwise use day icons
            } else {
                switch (response.weather[0].main) {
                    case "Atmosphere":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Fog-Sun.svg");
                        $('body').css('background-color', '#4db6ac');
                        $('#weather-box').css('border-color', '#cfd8d');
                        break;
                    case "Clear":
                        $('#weather-icon').attr('src', iconPre + "Sun.svg");
                        $('body').css('background-color', '#4fc3f7');
                        $('#weather-box').css('border-color', '#ffb300');
                        break;
                    case "Clouds":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Sun.svg");
                        $('body').css('background-color', '#4fc3f7');
                        $('#weather-box').css('border-color', '#cfd8d');
                        break;
                    case "Drizzle":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Drizzle-Sun-Alt.svg");
                        $('body').css('background-color', '#78909c');
                        $('#weather-box').css('border-color', '#18ffff');
                        break;
                    case "Extreme":
                        $('#weather-icon').attr('src', iconPre + "hazard.png");
                        $('body').css('background-color', '#212121');
                        $('#weather-box').css('border-color', '#b71c1c');
                        break;
                    case "Haze":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Fog-Sun.svg");
                        $('body').css('background-color', '#4db6ac');
                        $('#weather-box').css('border-color', '#cfd8d');
                        break;
                    case "Rain":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Drizzle-Sun-Alt.svg");
                        $('body').css('background-color', '#78909c');
                        $('#weather-box').css('border-color', '#18ffff');
                        break;
                    case "Snow":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Snow-Sun-Alt.svg");
                        $('body').css('background-color', '#78909c');
                        $('#weather-box').css('border-color', '#82b1ff');
                        break;
                    case "Thunderstorm":
                        $('#weather-icon').attr('src', iconPre + "Cloud-Lightning-Sun.svg");
                        $('body').css('background-color', '#455a64');
                        $('#weather-box').css('border-color', '#ffd600');
                        break;
                  default:
                        $('#weather-icon').attr('src', iconPre + "Shades.svg");
                        $('body').css('background-color', '#4fc3f7');
                        $('#weather-box').css('border-color', '#ffb300');
                        break;
                }
            }
        });
        //api call to get 5 day forecast
        $.get("https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon + "&units=imperial&cnt=6&APPID=1a0075ceb23c8596e0371403a7831774", function(response) {
            //set min/max forecast for current day
            $('#hi-lo').text("Hi: " + Math.round(celCon(response.list[0].temp.max)) + " | Lo: " + Math.round(celCon(response.list[0].temp.min)));
            for (var i = 1; i <= 5; i++) {
                //set min/max forecasted temps for each day
                $("#mini-temp" + i).text(Math.round(celCon(response.list[i].temp.max)) + "/" + Math.round(celCon(response.list[i].temp.min)));
                //set icons based on forecasted conditions
                switch (response.list[i].weather[0].main) {
                    case "Atmosphere":
                        $('#mini-icon' + i).attr('src', iconPre + "Cloud-Fog.svg");
                        break;
                    case "Clear":
                        $('#mini-icon' + i).attr('src', iconPre + "Sun.svg");
                        break;
                    case "Clouds":
                        $('#mini-icon' + i).attr('src', iconPre + "Cloud.svg");
                        break;
                    case "Drizzle":
                        $('#mini-icon' + i).attr('src', iconPre + "Cloud-Drizzle-Alt.svg");
                        break;
                    case "Extreme":
                        $('#mini-icon' + i).attr('src', iconPre + "hazard.png");
                        break;
                    case "Rain":
                        $('#mini-icon' + i).attr('src', iconPre + "Cloud-Drizzle-Alt.svg");
                        break;
                    case "Snow":
                        $('#mini-icon' + i).attr('src', iconPre + "Cloud-Snow-Alt.svg");
                        break;
                    case "Thunderstorm":
                        $('#mini-icon' + i).attr('src', iconPre + "Cloud-Lightning.svg");
                        break;
                }

                //add day, month, and time to info-panel
                minutes = ("0" + dt.getMinutes()).slice(-2);
                $('#date').text(calcDay(dt.getDay()) + ", " + dt.getDate() + " " + calcMonth(dt.getMonth()) + " '" + dt.getFullYear().toString().substr(2, 2) + " " + dt.getHours() + ":" + minutes);
                //hide loading image
                $('#loader').css('display', 'none');
                //the primary container is hidden on load
                //display after all components are in place
                $('#container').css('display', 'block');



            }
        });
    };
    //-----End of the primary funtion-----//

    //-----Location functions-----//

    //callback function for ip-location
    var ipLocation = function(callback) {
        $.getJSON("https://ip-api.com/json", function(response) {
            callback(response);
        });
    };
    //function for geolocation success
    var showPosition = function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log("Location set by geolocation")
            //draw page
        reload();
    };
    //funciton for geolocation failure
    var showError = function(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                break;
        }
        //fall back to ip-location on geolocation failure
        ipLocation(function(response) {
            lat = response.lat;
            lon = response.lon;
            console.log("Geolocation is not supported by this browser or disallowed. Location set by IP lookup.");
            //draw page
            reload();
        });
    };

    //-----End of Location function declarations-----//
    //-----Begin page load-----//

    //attempt to use geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        //fall back to IP location if geolocation is unavailable
        ipLocation(function(response) {
            lat = response.lat;
            lon = response.lon;
            console.log("Geolocation is not supported by this browser or  disallowed. Location set by IP lookup.");
            //draw page
            reload();
        });
    }

    //-----These are static elements that do not change with F/C toggle,
    //temp, or conditions-----//

    //Determine the day of the week for the mini days
    for (var i = 1; i <= 5; i++) {
        if (dt.getDay() + i > 6) {
            $('#mini-day' + i).text(calcDay(dt.getDay() + (i - 7)));
        } else {
            $('#mini-day' + i).text(calcDay(dt.getDay() + i));
        }
    }

    //Show and hide info panel
    $('#info-button').click(function() {
        if ($('#info-panel').height() === 0) {
            $('#info-panel').css('height', '375');
            $('#info-button').css('transform', 'rotate(225deg)');
        } else {
            $('#info-panel').css('height', '0');
            $('#info-button').css('transform', 'rotate(45deg)');
        }
        //switch between imperial and metric
        $('.switch').click(function() {
            if ($('#f-button').css('background-color') == 'rgb(255, 64, 129)') {
                $('#f-button').css('background-color', 'gray');
                $('#c-button').css('background-color', '#FF4081');
                $('#unit').html('&degC');
                celsius = true;
            } else {
                $('#c-button').css('background-color', 'gray');
                $('#f-button').css('background-color', '#FF4081');
                $('#unit').html('&degF');
                celsius = false;
            }
            reload();
        });
    });
});

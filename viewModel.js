
$(function() {

// var ViewModel = function() {
  var viewModel = {
    title: 'Weather Application', 
    location: ko.observableArray(),
    geoLocation: {},
    weather: {},
    city: ko.observable(),
    country: ko.observable()
  }


  function getGeolocation() {   
      if (navigator.geolocation) { 
        return navigator.geolocation.getCurrentPosition(function(position) { 
        viewModel.geoLocation.latitude = position.coords.latitude;
        viewModel.geoLocation.longitude = position.coords.longitude;
        callWeatherAPI();
      })
      } else {
       console.log("Geolocation is not supported by this browser.");
      }
    }

  var callWeatherAPI = ko.pureComputed(function() {
      var url = 'https://fcc-weather-api.glitch.me/api/current?lon=' + viewModel.geoLocation.longitude + '&lat=' + viewModel.geoLocation.latitude;         
       $.get(url, function(data) {
        console.log('Response', data); 
        viewModel.weather.city = data.name,
        viewModel.city(data.name),
        viewModel.country(data.sys.country),
        // $('#city').text('city: ' + data.name)
        viewModel.weather.country = data.sys.country,
        viewModel.weather.description = data.weather.description,
        viewModel.weather.main = data.weather.main,
        viewModel.weather.windSpeed = data.wind.speed    
        console.log('WHEATHER', viewModel.weather);
      })
    });
  
    getGeolocation();

// };

// Pass the viewModel as param
ko.applyBindings(viewModel)

});
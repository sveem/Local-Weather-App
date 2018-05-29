
$(function() {

  var viewModel = {
    title: 'Local Weather App', 
    geoLocation: { // temp. geolocation
      latitude: this.latitude || 52.2296756, 
      longitude: this.longitude || 21.012228699999998
    },
    city: ko.observable(),
    country: ko.observable(),
    description: ko.observable(),
    temperature: ko.observable(),
    wind: ko.observable(),
    icon: ko.observable(),
    degrees: ko.observable('C'),
    toggleDegrees: function () {
      this.degrees() === 'C' ?
      calculateFahrenheit(this.temperature()) :
      calculateCelsius(this.temperature())
    },
    image: ko.observable("/assets/sunny-day.jpg"),
  };

  var weatherConditions = {
    'sunny day': '/assets/sunny-day.jpg',
    'broken clouds': '/assets/broken-clouds.jpg' 
  }

  function calculateFahrenheit(celsius) {
    var fahrenheit = celsius * (9/5) + 32;
    viewModel.degrees('F');
    viewModel.temperature(fahrenheit.toFixed())    
  };

  function calculateCelsius(fahrenheit) {
    var celsius = ((fahrenheit - 32) * 5)/9;
    viewModel.degrees('C');
    viewModel.temperature(celsius.toFixed())    
  };

  function getGeolocation() {   
    if (navigator.geolocation) { 
      return navigator.geolocation.getCurrentPosition(function (position) { 
      viewModel.geoLocation.latitude = position.coords.latitude;
      viewModel.geoLocation.longitude = position.coords.longitude;
      callWeatherAPI();
      });
    } 
  }

   changeBackgroundImage = function(description) {
     if (description === 'broken clouds') {viewModel.image = '/assets/broken-clouds.jpg'}  
   }

  var callWeatherAPI = ko.pureComputed(function() {
    var url = 'https://fcc-weather-api.glitch.me/api/current?lon=' + viewModel.geoLocation.longitude + '&lat=' + viewModel.geoLocation.latitude;         
      $.get(url, function(data) {
        console.log('Response', data); ; 
        viewModel.city(data.name);
        viewModel.country(data.sys.country);
        viewModel.description(data.weather[0].description);
        viewModel.temperature(data.main.temp);
        viewModel.wind(data.wind.speed + ' knots');
        viewModel.icon(data.weather[0].icon);
      })

    });
  
    getGeolocation();
   
ko.applyBindings(viewModel)

});
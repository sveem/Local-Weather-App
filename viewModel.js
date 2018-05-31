$(function () {

  var viewModel = {
    title: 'Local Weather App',
    geoLocation: {
      latitude: this.latitude || 52.2296756,
      longitude: this.longitude || 21.012228699999998
    },
    city: ko.observable(),
    country: ko.observable(),
    location: ko.observable(),
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
    image: ko.observable('/assets/sunny-day.jpg'),
    visible: ko.observable(false),
    spinner: ko.observable(true)
  };

  function weatherConditions(id) {
    var backgroundImage;
    if (id < 531) {
      backgroundImage = '/assets/light-rain.jpg'
    }
    if (id > 531 && id <= 622) {
      backgroundImage = '/assets/snow.jpg'
    }
    if (id === 800) {
      backgroundImage = '/assets/clear-sky.jpg'
    }
    if (id > 800) {
      backgroundImage = '/assets/broken-clouds.jpg'
    }
    return backgroundImage;
  }

  function calculateFahrenheit(celsius) {
    var fahrenheit = celsius * (9 / 5) + 32;
    viewModel.degrees('F');
    viewModel.temperature(fahrenheit.toFixed())
  };

  function calculateCelsius(fahrenheit) {
    var celsius = ((fahrenheit - 32) * 5) / 9;
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

  var callWeatherAPI = ko.pureComputed(function () {
    var url = 'https://fcc-weather-api.glitch.me/api/current?lon=' + viewModel.geoLocation.longitude + '&lat=' + viewModel.geoLocation.latitude;
    // viewModel.spinner(true);
    $.get(url, function (data) {
      console.log('Response', data);
      viewModel.spinner(false);
      viewModel.city(data.name);
      viewModel.country(data.sys.country);
      viewModel.location(viewModel.city() + ', ' + viewModel.country());
      viewModel.description(data.weather[0].description);
      viewModel.temperature((data.main.temp).toFixed());
      viewModel.wind(data.wind.speed + ' knots');
      viewModel.icon(data.weather[0].icon);
      viewModel.image(weatherConditions(data.weather[0].id));
      viewModel.spinner(false);
      viewModel.visible(true);
    })
  });

  getGeolocation();

  ko.applyBindings(viewModel)

});
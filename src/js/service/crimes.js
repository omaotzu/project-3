angular
  .module('pncApp')
  .service('crimes', Crimes);

Crimes.$inject = ['$http'];
function Crimes($http) {
  this.getCrimes = function getCrimes(lat, lon) {
    return $http
            .get('/api/crimes', {params: {lat, lon}})
            .then((response) => {
              console.log(response.data);
              console.log(response.data.length);
              // asb - anti social behaviour
              response.data.antiSocial = [];
              response.data.burglary = [];
              response.data.bikeTheft = [];
              response.data.drugs = [];
              response.data.robbery = [];
              response.data.vehicle = [];
              response.data.violent = [];

              response.data.forEach((crime) => {
                if(crime.category.includes('anti-social-behaviour')) response.data.antiSocial.push(crime);
                if(crime.category.includes('burglary')) response.data.burglary.push(crime);
                if(crime.category.includes('bicycle-theft')) response.data.bikeTheft.push(crime);
                if(crime.category.includes('drugs')) response.data.drugs.push(crime);
                if(crime.category.includes('robbery')) response.data.robbery.push(crime);
                if(crime.category.includes('vehicle-crime')) response.data.vehicle.push(crime);
                if(crime.category.includes('violent-crime')) response.data.violent.push(crime);
              });
              return response.data;
            });
  };
}

// angular
//   .module('darkSkies')
//   .service('PropsShow', PropsShow);
//
// PropsShowCtrl.$inject = ['$http'];
//
// function PropsShowCtrl($http, listing_id){
//   const vm = this;
//   const listing_id = ;
//
//   $http.get('/api/properties/:listing_id', {params: vm.listing_id})
//     .then((response) => {
//       console.log('SEARCHING');
//       vm.selected = response.data;
//       console.log(vm.selected);
//     });
//
// function Darksky($http) {
//   this.getWeather = function getWeather(lat, lng) {
//     return $http
//       .get('/api/weather/', {params: {lat, lng}   })
//       .then((response) => {
//         const data = response.data;

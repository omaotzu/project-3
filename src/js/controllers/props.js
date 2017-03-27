angular
  .module('pncApp')
  .controller('PropsIndexCtrl', PropsIndexCtrl)
  .controller('PropsShowCtrl', PropsShowCtrl);




PropsIndexCtrl.$inject = ['$http'];
function PropsIndexCtrl($http) {
  const vm = this;
  vm.results = [];
  getProps();

  function getProps(){
    $http.get('/api/properties')
      .then((response) => {
        vm.results = response.data;
        console.log(vm.results);
      });
  }
}


PropsShowCtrl.$inject = ['$http'];
function PropsShowCtrl($http){
  const vm = this;
  // const listing_id = null;

  $http.get('/api/properties/:listing_id')
    .then((response) => {
      console.log('SEARCHING');
      vm.selected = response.data;
      console.log(vm.selected);
    });
}

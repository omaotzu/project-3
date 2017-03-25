angular
  .module('pncApp')
  .controller('PropsIndexCtrl', PropsIndexCtrl);




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

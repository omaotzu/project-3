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


PropsShowCtrl.$inject = ['$http', '$resource', '$stateParams'];
function PropsShowCtrl($http, $resource, $stateParams){
  const vm = this;
  const Property = $resource('/api/properties/:id', { id: '@id' });

  vm.selected = Property.get($stateParams);
  console.log(vm.selected);

}

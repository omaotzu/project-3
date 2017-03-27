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


PropsShowCtrl.$inject = ['$http', '$stateParams'];
function PropsShowCtrl($http, $stateParams){
  const vm = this;


  vm.listingId = $stateParams.listing_id;
  showProp();
  function showProp(){
    $http.get('/api/properties/:listing_id', { params: { listing_id: vm.listingId } })
      .then((response) => {
        console.log('SEARCHING');
        vm.selected = response.data;
        console.log(vm.selected);
      });
  }
}

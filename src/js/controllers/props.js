angular
  .module('pncApp')
  .controller('PropsIndexCtrl', PropsIndexCtrl);



PropsIndexCtrl.$inject = ['$http'];
function PropsIndexCtrl($http) {
  const vm = this;

  getProps();

  function getProps(){
    $http.get('/api/properties')
      .then((response) => {
        console.log(response);
      });
  }
}

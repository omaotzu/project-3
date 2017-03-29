angular
  .module('pncApp')
  .controller('PropsIndexCtrl', PropsIndexCtrl)
  .controller('PropsShowCtrl', PropsShowCtrl);

PropsIndexCtrl.$inject = ['$http'];
function PropsIndexCtrl($http) {
  const vm = this;
  vm.results = [];
  vm.area = null;
  vm.beds = null;

  function getProps(){
    $http.get('/api/properties', { params: {area: vm.area, minimum_beds: vm.beds, maximum_beds: vm.beds}})
      .then((response) => {
        vm.results = response.data;
        // console.log(vm.results);
      });
  }
  vm.getProps = getProps;
}

PropsShowCtrl.$inject = ['User', 'GroupProperty', '$http', '$stateParams'];
function PropsShowCtrl(User, GroupProperty, $http, $stateParams){
  const vm = this;
  vm.listingId = $stateParams.listing_id;
  // console.log(vm.listingId);
  showProp();

  function showProp(){
    $http.get('/api/properties/:listingId', { params: { listingId: vm.listingId } })
      .then((response) => {
        vm.selected = response.data;
        // console.log(vm.selected);
      });
  }

  function storeProp(){
    const newProperty = {
      listingId: vm.listingId
    };

    GroupProperty
      .save(newProperty)
      .$promise
      .then((property) => {
        console.log(property);
        vm.newProperty = {};
      });

    // console.log($stateParams);
    // vm.user = $auth.getPayload().userId;
    // vm.group = $auth.getPayload().group;
    // console.log(vm.group);
    // User.get(vm.user);
    // console.log('Logged in User ID', vm.user);
    // console.log('Logged in User ID group', vm.user.group);
    // vm.group = User.get($stateParams);
    // console.log(vm.group);
    // vm.user.group.push($stateParams);
    // $http.get(`/api/users/${vm.user}`)
    //   .then((response) => {
    //     vm.user = response.data;
    //     console.log('Response User', vm.user);
    //     vm.user.group.properties.push($stateParams);
    //   });

  }
  vm.store = storeProp;
}

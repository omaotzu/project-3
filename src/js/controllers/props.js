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


PropsShowCtrl.$inject = ['User', 'GroupProperty', '$http', '$stateParams', '$auth'];
function PropsShowCtrl(User, GroupProperty, $http, $stateParams, $auth){
  const vm = this;
  vm.listingId = $stateParams.listing_id;
  showProp();

  function showProp(){
    $http.get('/api/properties/:listing_id', { params: { listing_id: vm.listingId } })
      .then((response) => {
        vm.selected = response.data;
        console.log(vm.selected);
      });
  }

  function storeProp(){
    const newProperty = {
      listingId: vm.listingId
    };

    GroupProperty
      .save(newProperty)
      .$promise
      // in our config/routes/post(addCommentRoute) we passed the comment through from our API so we can grab that and use it here
      .then((property) => {
        console.log(property);
        // vm.post.properties.push(property);
        // and now just empty out the property area so that it looks like it's vanished and looks fresh for another property
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

angular
  .module('pncApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl)
  .controller('GroupsNewCtrl', GroupsNewCtrl)
  .controller('GroupsShowCtrl', GroupsShowCtrl)
  .controller('GroupsEditCtrl', GroupsEditCtrl);

GroupsIndexCtrl.$inject = ['Group'];
function GroupsIndexCtrl(Group) {
  const vm = this;
  vm.all = Group.query();
}

GroupsNewCtrl.$inject = ['Group', 'User', '$state', '$auth'];
function GroupsNewCtrl(Group, User, $state, $auth) {
  const vm = this;
  vm.group = {};


  function groupsCreate() {
    if(vm.groupsNewForm.$valid) {
      vm.group.users = $auth.getPayload().userId;
      vm.user = $auth.getPayload().userId;
      console.log(vm.group);
      console.log(vm.user);
      console.log(User.get(vm.user));

      Group
        .save(vm.group)
        .$promise
        .then(() => $state.go('groupsIndex'));
    }
  }
  vm.create = groupsCreate;
}

GroupsShowCtrl.$inject = ['Group', '$stateParams', '$state', '$http', '$scope'];
function GroupsShowCtrl(Group, $stateParams, $state, $http, $scope) {
  const vm = this;
  vm.group = {};

  Group.get($stateParams)
    .$promise
    .then((data) => {
      console.log(data.properties);
      vm.group = data;
    });

  function groupsDelete() {
    console.log($stateParams);
    vm.group
      .$remove()
      .then(() => $state.go('groupsIndex'));
  }
  vm.delete = groupsDelete;

  function groupsPropIndex(listingId){
    // console.log(listingId);
    // $http.get('/api/groups/properties', {params: { listingId}})
    // .then((response) => {
    //   vm.selected = response.data;
    //   console.log(vm.selected);
    // });
  }
  vm.propIndex = groupsPropIndex;
}

GroupsEditCtrl.$inject = ['Group', '$stateParams', '$state'];
function GroupsEditCtrl(Group, $stateParams, $state) {
  const vm = this;
  vm.group = Group.get($stateParams);
  console.log($stateParams);

  function groupsUpdate() {
    vm.group
      .$update()
      .then(() => $state.go('groupsShow', $stateParams));
  }
  vm.update = groupsUpdate;
}

angular
  .module('pncApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl)
  .controller('GroupsNewCtrl', GroupsNewCtrl)
  .controller('GroupsHomeCtrl', GroupsHomeCtrl)
  .controller('GroupsEditCtrl', GroupsEditCtrl)
  .controller('GroupsPropsShowCtrl', GroupsPropsShowCtrl);

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

      Group
        .save(vm.group)
        .$promise
        .then(() => $state.go('groupsIndex'));
    }
  }
  vm.create = groupsCreate;
}

GroupsHomeCtrl.$inject = ['Group', '$stateParams', '$state', '$http'];
function GroupsHomeCtrl(Group, $stateParams, $state, $http) {
  const vm = this;
  vm.group = {};
  vm.listingIds = [];

  Group.get($stateParams)
    .$promise
    .then((data) => {
      vm.group = data;
      let ids = [];

      vm.group.properties.forEach((property) => {
        ids.push(property.listingId);
      });

      ids = ids.join(',');

      $http.get('/api/groups/:id/properties', { params: { listing_id: ids } })
        .then((response) => {
          vm.selected = response.data;
          console.log(vm.selected);
        });

    });

  function groupsDelete() {
    vm.group
      .$remove()
      .then(() => $state.go('groupsIndex'));
  }
  vm.delete = groupsDelete;

}

GroupsPropsShowCtrl.$inject = ['Group', 'GroupProperty','$stateParams', '$state', '$http'];
function GroupsPropsShowCtrl(Group, GroupProperty, $stateParams, $state, $http) {
  const vm = this;
  vm.listingId = $stateParams.listing_id;

  Group.get($stateParams)
    .$promise
    .then((data) => {
      vm.group = data;
      groupsShowProp();
    });

  function groupsShowProp(){
    $http.get('/api/groups/:id/properties/:listing_id', { params: { listing_id: vm.listingId, id: vm.group.id} })
      .then((response) => {
        vm.gps = response.data;

      });
  }
}

GroupsEditCtrl.$inject = ['Group', '$stateParams', '$state'];
function GroupsEditCtrl(Group, $stateParams, $state) {
  const vm = this;
  vm.group = Group.get($stateParams);

  function groupsUpdate() {
    vm.group
      .$update()
      .then(() => $state.go('groupsHome', $stateParams));
  }
  vm.update = groupsUpdate;
}

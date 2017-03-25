angular
  .module('pncApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl)
  .controller('GroupsNewCtrl', GroupsNewCtrl)
  .controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsIndexCtrl.$inject = ['Group'];
function GroupsIndexCtrl(Group) {
  const vm = this;
  vm.all = Group.query();
}

GroupsNewCtrl.$inject = ['Group', '$state'];
function GroupsNewCtrl(Group, $state) {
  const vm = this;
  vm.group = {};

  function groupsCreate() {
    if(vm.groupsNewForm.$valid) {
      Group
        .save(vm.group)
        .$promise
        .then(() => $state.go('groupsIndex'));
    }
  }
  vm.create = groupsCreate;
}

GroupsShowCtrl.$inject = ['Group', '$stateParams', '$state'];
function GroupsShowCtrl(Group, $stateParams, $state) {
  const vm = this;
  vm.group = Group.get($stateParams);

  function groupsDelete() {
    vm.group
      .$remove()
      .then(() => $state.go('register'));
  }
  vm.delete = groupsDelete;
}

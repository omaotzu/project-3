angular
  .module('pncApp')
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersShowCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersShowCtrl(User, $stateParams, $state) {
  const vm = this;
  vm.user = User.get($stateParams);

  function usersDelete() {
    vm.user
      .$remove()
      .then(() => $state.go('register'));
  }
  vm.delete = usersDelete;
}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;
  vm.user = User.get($stateParams);

  function usersUpdate() {
    vm.user
      .$update()
      .then(() => $state.go('usersShow', $stateParams));
  }
  vm.update = usersUpdate;
}

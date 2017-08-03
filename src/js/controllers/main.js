angular
  .module('pncApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'User'];
function MainCtrl($rootScope, $state, $auth, User){
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;


  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    if($state.current.name === 'login' && err.status === 401) {
      vm.message = 'Incorrect login credentials';
    }else if (err.status === 401 && $state.current.name !== 'login')  {
      $state.go('login');
      vm.message = err.data.message;
    }
  });

  $rootScope.$on('$stateChangeSuccess', () => {
    vm.uiRouterState = $state.current.name;
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) {
      vm.currentUserId = $auth.getPayload().userId;
      User
        .query()
        .$promise
        .then((response) => {
          vm.user = response.find(obj => obj.id === vm.currentUserId);
          if (!vm.user.group) vm.currentUserGroupId = null;
          if (vm.user.group) vm.currentUserGroupId = vm.user.group.id;

        });
    }
  });

  function logout(){
    $auth.logout();
    $state.go('login');
  }
  vm.logout = logout;
}

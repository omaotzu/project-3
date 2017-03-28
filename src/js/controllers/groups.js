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

GroupsNewCtrl.$inject = ['Group', 'User', 'filterFilter', '$state', '$auth', '$scope'];
function GroupsNewCtrl(Group, User, filterFilter, $state, $auth, $scope) {
  const vm = this;
  vm.group = {};
  vm.group.users = [];
  vm.allUsers = User.query();

  function filterUsers() {
    const params = { username: vm.q };
    vm.filtered = filterFilter(vm.allUsers, params);
  }

  $scope.$watch(() => vm.q, filterUsers);

  function addUsers(user) {
    console.log('VM GROUP', vm.group);
    console.log('USER', user);
    console.log('VM GROUP USERS', vm.group.users);
    if(!vm.group.users.includes(user)) vm.group.users.push(user.id);
    vm.filtered = {};
    console.log('TO ADD CHOSEN USERS',vm.group.users);

  }
  vm.addUsers = addUsers;


  function groupsCreate() {
    // if(vm.groupsNewForm.$valid) {
    console.log('USER ID LOGGED IN', $auth.getPayload().userId);
      // User
      //   .get({ id: $auth.getPayload().userId })
      //   .$promise
      //   .then((response) => {
      //     vm.group.user.push(response);
      //     console.log('RESPONSE', response);
      //   });


      // vm.group.users = $auth.getPayload().userId;
      // vm.user = $auth.getPayload().userId;

      Group
        .save(vm.group)
        .$promise
        .then(() => $state.go('groupsIndex'));
    // }
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

      $http.get('/api/groups/:id/properties', { params: { id: vm.group.id, listing_id: ids } })
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

GroupsPropsShowCtrl.$inject = ['Group', 'GroupProperty','GroupPropertyNote', '$stateParams', '$state', '$http'];
function GroupsPropsShowCtrl(Group, GroupProperty, GroupPropertyNote, $stateParams, $state, $http) {
  const vm = this;

  // GroupProperty.get($stateParams)
  // .$promise
  // .then((data) => {
  //   console.log(data);
  // });
  // //
  // // console.log(vm.prop);
  // //
  // //
  vm.listingId = $stateParams.listing_id;

  Group.get($stateParams)
    .$promise
    .then((data) => {
      vm.group = data;
      groupsShowProp();
    });

  function groupsShowProp(){
    $http.get('/api/groups/:id/properties/:listing_id', { params: { id: vm.group.id, listing_id: vm.listingId} })
      .then((response) => {
        vm.gps = response.data;
      });
  }
  function addNote() {
    GroupPropertyNote
    .save({ id: vm.group.id, listing_id: vm.listingId }, vm.newNote)
    .$promise
    .then((note) => {

      console.log(vm.group.properties);
      vm.group.properties.notes.push(note);
      vm.newNote = {};
    });
  }
  vm.addNote = addNote;


  function deleteProperty(property) {
    console.log(property);
    GroupProperty
    .delete({ listing_id: vm.listingId, id: vm.group.id })
    .$promise
    .then(() => {
      $state.go('groupsHome', { id: vm.group.id });
    });
  }
  vm.deleteProperty = deleteProperty;
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

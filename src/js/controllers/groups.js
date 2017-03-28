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
  vm.listingId = $stateParams.listing_id;

  Group.get($stateParams)
    .$promise
    .then((data) => {
      vm.group = data;
      groupsShowProp();
      vm.prop = vm.group.properties.find(obj => obj.listingId === vm.listingId);
      // console.log(vm.thisProp);
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
      vm.prop.notes.push(note);
      vm.newNote = {};
    });
  }
  vm.addNote = addNote;

  function deleteNote(note){
    console.log('CLICKED');
    GroupPropertyNote
    .delete({ id: vm.group.id, listing_id: vm.listingId, noteId: note.id })
        .$promise
        .then(() => {
          const index = vm.prop.notes.indexOf(note);
          vm.prop.notes.splice(index, 1);
        });
  }
  vm.deleteNote = deleteNote;

  function deleteProperty() {
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

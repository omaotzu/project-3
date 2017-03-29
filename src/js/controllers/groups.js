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
  vm.chosenUsers = [];
  vm.allUsers = User.query();
  const authUserId = $auth.getPayload().userId;

  function filterUsers() {
    const params = { username: vm.q };
    vm.filtered = filterFilter(vm.allUsers, params);
  }

  $scope.$watch(() => vm.q, filterUsers);

  function addUser(user) {
    if(!vm.group.users.includes(user.id) && user.id !== authUserId) vm.group.users.push(user.id);
    if(!vm.chosenUsers.includes(user) && user.id !== authUserId) vm.chosenUsers.push(user);
    vm.filtered = {};
  }
  vm.addUser = addUser;

  function removeUser(user) {
    const index = vm.chosenUsers.indexOf(user);
    vm.group.users.splice(index, 1);
    vm.chosenUsers.splice(index, 1);
  }
  vm.removeUser = removeUser;

  function groupsCreate() {
    if(vm.groupsNewForm.$vlid) {
      vm.chosenUsers = [];
      console.log('USER ID LOGGED IN', $auth.getPayload().userId);
      if(!vm.group.users.includes(authUserId)) vm.group.users.push(authUserId);
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

      if(ids) $http.get('/api/groups/:id/properties', { params: { id: vm.group.id, listing_id: ids } })
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

GroupsPropsShowCtrl.$inject = ['Group', 'GroupProperty','GroupPropertyNote', 'GroupPropertyImage', '$stateParams', '$state', '$http'];
function GroupsPropsShowCtrl(Group, GroupProperty, GroupPropertyNote, GroupPropertyImage, $stateParams, $state, $http) {
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

    GroupPropertyNote
    .delete({ id: vm.group.id, listing_id: vm.listingId, noteId: note.id })
        .$promise
        .then(() => {
          const index = vm.prop.notes.indexOf(note);
          vm.prop.notes.splice(index, 1);
        });
  }
  vm.deleteNote = deleteNote;

  function addImage() {
    GroupPropertyImage
    .save({ id: vm.group.id, listing_id: vm.listingId }, vm.newImage)
    .$promise
    .then((image) => {
      vm.prop.images.push(image);
      vm.newImage = {};
    });
  }
  vm.addImage = addImage;

  function deleteImage(image){

    GroupPropertyImage
    .delete({ id: vm.group.id, listing_id: vm.listingId, imageId: image.id })
        .$promise
        .then(() => {
          const index = vm.prop.images.indexOf(image);
          vm.prop.images.splice(index, 1);
        });
  }
  vm.deleteImage = deleteImage;

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

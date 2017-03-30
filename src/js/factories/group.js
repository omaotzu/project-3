angular
  .module('pncApp')
  .factory('Group', Group)
  .factory('GroupUser', GroupUser)
  .factory('GroupProperty', GroupProperty)
  .factory('GroupPropertyImage', GroupPropertyImage)
  .factory('GroupPropertyNote', GroupPropertyNote);

Group.$inject = ['$resource'];
function Group($resource) {
  return new $resource('/api/groups/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

GroupUser.$inject = ['$resource'];
function GroupUser($resource) {
  return new $resource('/api/groups/:id/users/:userId', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

GroupProperty.$inject = ['$resource'];
function GroupProperty($resource) {
  return new $resource('/api/groups/:id/properties/:listingId', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

GroupPropertyImage.$inject = ['$resource'];
function GroupPropertyImage($resource) {
  return new $resource('/api/groups/:id/properties/:listingId/images/:imageId', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

GroupPropertyNote.$inject = ['$resource'];
function GroupPropertyNote($resource) {
  return new $resource('/api/groups/:id/properties/:listingId/notes/:noteId', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

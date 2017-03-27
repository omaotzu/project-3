angular
  .module('pncApp')
  .factory('Group', Group)
  .factory('GroupProperty', GroupProperty);

Group.$inject = ['$resource'];
function Group($resource) {
  return new $resource('/api/groups/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

GroupProperty.$inject = ['$resource'];
function GroupProperty($resource) {
  return new $resource('/api/groups/properties/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

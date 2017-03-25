angular
  .module('pncApp')
  .factory('Group', Group);

Group.$inject = ['$resource'];
function Group($resource) {
  return new $resource('/api/groups/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

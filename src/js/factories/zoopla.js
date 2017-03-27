angular
  .module('pncApp')
  .factory('Prop', Prop);

Prop.$inject = ['$resource'];
function Prop($resource) {
  return new $resource('/api/properties/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

angular
  .module('pncApp')
  .config(Interceptors);

Interceptors.$inject = ['$httpProvider'];
function Interceptors ($httpProvider) {
  $httpProvider.interceptors.push('ErrorHandler');
}

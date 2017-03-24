angular
  .module('pncApp')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/register';
  $authProvider.loginUrl = '/login';
}

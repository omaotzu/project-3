angular
  .module('pncApp')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';

  $authProvider.github({
    clientId: 'd51f7c5a24894af212c4',
    url: '/api/oauth/github'
  });
}

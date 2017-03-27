angular
  .module('pncApp')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';

  $authProvider.github({
    clientId: '1f8ffbfc3e534e0afb14',
    url: '/api/oauth/github'
  });
}

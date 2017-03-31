angular
  .module('pncApp')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';

  $authProvider.github({
    clientId: '921da1b5e03bf34c8fb3',
    url: '/api/oauth/github'
  });
}

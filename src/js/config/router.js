angular
  .module('pncApp')
  .controller(Router);

Router.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
function Router($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('register', {
      url: '/register',
      template: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    })
    .state('login', {
      url: '/login',
      template: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    });

  $urlRouterProvider.otherwise('/');

}

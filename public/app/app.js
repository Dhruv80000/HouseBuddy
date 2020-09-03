var app = angular.module("mainApp",['appRoutes', 'regcontroller', 'userServices', 'mainController', 'authServices', 'emailApp', 'userApp']);

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});


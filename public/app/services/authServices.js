var app = angular.module('authServices', []);

app.factory('Auth', function($http, AuthToken) {
    var authFactory = {};   
    authFactory.loginowner = function(ownerloginData) {
        return $http.post('/api/authenticate', ownerloginData).then(function(data){
            AuthToken.setToken(data.data.token);
            return data;
        });
    }
    
    authFactory.isLoggedIn = function() {
        if (AuthToken.getToken()) {
            return true; 
        } else {
            return false;
        }
    }
    authFactory.getUser = function() {

        if (AuthToken.getToken()) {
            return $http.post('/api/me'); 
        } else {
            $q.reject({ message: 'User has no token' }); 
        }
    }

    authFactory.logout = function() {
        AuthToken.setToken(); 
    }

    return authFactory;
});

app.factory('AuthToken', function($window) {
    var authTokenFactory = {};

    authTokenFactory.setToken = function(token) {
        if (token) {
            $window.localStorage.setItem('token', token);
        } else {
            $window.localStorage.removeItem('token');
        }
    };
    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    };

    return authTokenFactory;
});

app.factory('AuthInterceptors', function(AuthToken) {
    var authInterceptorsFactory = {}; 
    authInterceptorsFactory.request = function(config) {
        
        var token = AuthToken.getToken(); 
        
        if (token) config.headers['x-access-token'] = token; 
        return config; 
    
    };
    return authInterceptorsFactory; 

});
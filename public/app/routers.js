var app = angular.module("appRoutes", ['ngRoute', 'userServices']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'app/views/pages/home.html'
    })

    .when('/about', {
        templateUrl: 'app/views/pages/about.html'
    })

    .when('/login', {
        templateUrl: 'app/views/pages/login.html',
        authenticated: false
    })

    .when('/register', {
        templateUrl: 'app/views/pages/register.html',
        controller: 'regCtrl',
        controllerAs: 'register',
        authenticated: false
    })

    .when('/logout', {
        templateUrl: 'app/views/pages/logout.html',
        authenticated: true
    })

    .when('/profile',{
        templateUrl: 'app/views/pages/profile.html',
        authenticated: true
    })

    .when('/activate/:token', {
        templateUrl: 'app/views/pages/activation/activate.html',
        controller: 'emailCtrl',
        controllerAs: 'email',
        authenticated: false
    })

    .when('/resend', {
        templateUrl: 'app/views/pages/activation/resend.html',
        controller: 'resendCtrl',
        controllerAs: 'resend',
        authenticated: false
    })

    .when('/resetemail', {
        templateUrl: 'app/views/pages/reset/email.html',
        controller: 'resetemailCtrl',
        controllerAs: 'resetemail',
        authenticated: false
    })

    .when('/resetpassword', {
        templateUrl: 'app/views/pages/reset/password.html',
        controller: 'passwordCtrl',
        controllerAs: 'password',
        authenticated: false
    }) 

    .when('/reset/:token', {
        templateUrl: 'app/views/pages/reset/newpassword.html',
        controller: 'resetCtrl',
        controllerAs: 'reset',
        authenticated: false
    })

    .when('/owner', {
        templateUrl: 'app/views/pages/management/owner.html',
        controller: 'ownerCtrl',
        controllerAs: 'owner',
        authenticated: true,
        typeh: 'OwnerH'
    })

    .when('/tenant', {
        templateUrl: 'app/views/pages/management/tenant.html',
        controller: 'tenantCtrl',
        controllerAs: 'tenant',
        authenticated: true,
        typeh: 'tenantH'
    })

    .when('/edit/:mobile', {
        templateUrl: 'app/views/pages/management/edit.html',
        controller: 'editCtrl',
        controllerAs: 'edit',
        authenticated: true,
    })

    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode({ enabled: true, requireBase: false });
});

app.run(['$rootScope', 'Auth', '$location', 'User', function($rootScope, Auth, $location, User) {

    $rootScope.$on('$routeChangeStart', function(event, next, current) {

        if (next.$$route.authenticated === true) {
            if (!Auth.isLoggedIn()) {
                event.preventDefault();
                $location.path('/');
            } else if (next.$$route.typeh) {
                User.getTypeh().then(function(data) {
                    console.log(data);
                    if (next.$$route.typeh !== data.data.typeh) {
                        event.preventDefault();
                        $location.path('/');
                    } 
                });
            }
        } else if (next.$$route.authenticated === false) {
            if (Auth.isLoggedIn()) {
                event.preventDefault(); 
                $location.path('/profile'); 
            }
        }
    });
}]);

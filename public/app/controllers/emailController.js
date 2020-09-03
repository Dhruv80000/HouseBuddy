var app = angular.module("emailApp", ['userServices']);

app.controller("emailCtrl", function($routeParams, User, $timeout, $location) {

    app = this;

    User.activateAccount($routeParams.token).then(function(data) {
       
        app.errorMsg = false; 

        if (data.data.success) {
            app.successMsg = data.data.message + '...Redirecting'; 

            $timeout(function() {
                $location.path('/login');
            }, 2000);
        } else {
            app.errorMsg = data.data.message + '...Redirecting'; 

            $timeout(function() {
                $location.path('/login');
            }, 2000);
        }
    }); 
});

app.controller("resendCtrl", function(User){

    app = this;

    app.checkCredentials = function(loginData) {
        app.disabled = true;
        app.successmsg = false;
        app.errormsg = false;
        User.checkCredentials(app.loginData).then(function(data) {

            if (data.data.success) {
                User.resendLink(app.loginData).then(function(data) {
                    if(data.data.success){
                        app.successmsg = data.data.message;
                    }
                })
            } else{
                app.disabled = false;
                app.errormsg = data.data.message;
            }
        });
    }
});

app.controller("resetemailCtrl", function(User, $timeout, $location){
    app = this;

    app.sendemail = function(userData, valid) {
        app.errormsg = false;
        app.loading = true; 
        app.successmsg = false;
        app.disabled = true;
      
        if(valid){
            User.sendemail(app.userData.mobile).then(function(data) {
                app.loading = false;

                if (data.data.success) {
                    app.successmsg = data.data.message + '...Redirecting'; 
                    $timeout(function() {
                        $location.path('/login');
                    }, 2000); 
                } else {
                    app.disabled = false;
                    app.errormsg = data.data.message;
                }
            });
        } else {
            app.disabled = false;
            app.loading = false;
            app.errormsg = 'Please enter a valid mobile'; 
        }
    }
});

app.controller("passwordCtrl", function(User){
    app = this;

    app.sendPassword = function(resetData, valid) {
        app.errormsg = false;
        app.loading = true; 
        app.successmsg = false;
        app.disabled = true;

        if(valid){
            User.sendPassword(app.resetData).then(function(data) {
                
                app.loading = false;

                if (data.data.success) {
                    app.successmsg = data.data.message; 
                } else {
                    app.disabled = false;
                    app.errormsg = data.data.message;
                }
            });
        } else {
            app.disabled = false;
            app.loading = false;
            app.errormsg = 'Please enter a valid username'; 
        } 
    }
});

app.controller("resetCtrl", function(User, $routeParams, $scope, $timeout, $location){
    app = this;
    app.hide = true;

    app.inputType = "password";
	app.showPass = "fa fa-eye";
	
	app.showPassword = function() {
		if($scope.firstPassword != null){
			if(app.inputType == "password"){
				app.inputType = "text";
				app.showPass = "fa fa-eye-slash";
			}else{
				app.inputType = "password";
				app.showPass = "fa fa-eye";
			}
		}
    }
    User.resetUser($routeParams.token).then(function(data) {
        if(data.data.success){
            app.hide = false;
            app.successmsg = 'Please enter a new password';
            $scope.email = data.data.user.email;
        } else{
            app.errormsg = data.data.message;
        }
    });

    app.savePassword = function(regData, valid, confirmed) {
        app.errormsg = false;
        app.successmsg = false;
        app.disabled = true; 
        app.loading = true; 

        if (valid && confirmed) {
            app.regData.email = $scope.email;
            User.savePassword(app.regData).then(function(data) {
                app.loading = false;

                if (data.data.success) {
                    app.successmsg = data.data.message + '...Redirecting'; 
                    $timeout(function() {
                        $location.path('/login');
                    }, 2000);
                } else {
                    app.disabled = false; 
                    app.errormsg = data.data.message; 
                }
            });
        } else {
            app.loading = false; 
            app.disabled = false; 
            app.errormsg = 'Please ensure form is filled out properly'; 
        }
    };
});

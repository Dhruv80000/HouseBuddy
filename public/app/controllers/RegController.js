var app = angular.module("regcontroller", ['userServices']);

app.controller('regCtrl', function($scope, User, $location, $timeout){
    var app = this;

    $scope.names = ["Flat", "P.G."];

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
    
    $scope.ownerTab = 'active';
    app.phase1 = true;

    app.ownerPhase = function(){
        $scope.ownerTab = 'active';
        $scope.tenentTab = 'default'; 
        $scope.brokerTab = 'default'; 
        app.phase1 = true; 
        app.phase2 = false; 
        app.phase3 = false; 
        app.errormsg = false;
    }

    app.tenentPhase = function(){
        $scope.ownerTab = 'default';
        $scope.tenentTab = 'active'; 
        $scope.brokerTab = 'default'; 
        app.phase1 = false; 
        app.phase2 = true; 
        app.phase3 = false; 
        app.errormsg = false;
    }

    app.brokerPhase = function(){
        $scope.ownerTab = 'default';
        $scope.tenentTab = 'default'; 
        $scope.brokerTab = 'active'; 
        app.phase1 = false; 
        app.phase2 = false; 
        app.phase3 = true; 
        app.errormsg = false;
    }

    app.owner = function(ownerRegData, valid){
        app.loading = true;
        app.errormsg = false;
        app.disabled = true;
        console.log(app.ownerRegData);

        if(valid){
            User.createowner(app.ownerRegData).then(function(data){
                if(data.data.success){
                    app.loading = false;
                    app.successmsg = data.data.message +' Redirecting...';
    
                    $timeout(function(){
                        $location.path('/');
                        //app.ownerRegData = "";
                      //  app.successmsg = false;
                    },2000);
                }else{
                    app.loading = false;
                    app.disabled = false;
                    app.errormsg = data.data.message;
                }
            });
        } else{
            app.loading = false;
            app.disabled = false;
            app.errormsg = "Please ensure form is filled properly";
        } 
    }

    app.tenant = function(tenantRegData){
        app.loading = true;
        app.errormsg = false;  
        app.disabled = true; 
        User.createtenant(app.tenantRegData).then(function(data){
            
            if(data.data.success){
                app.loading = false;
                app.successmsg = data.data.message +' Redirecting...';

                $timeout(function(){
                    $location.path('/');
                    app.tenantRegData = "";
                    app.successmsg = false;
                },2000);
            }else{
                app.loading = false;
                app.disabled = false;
                app.errormsg = data.data.message;
            }
        });
    }

    app.broker = function(brokerRegData){
        app.loading = true;
        app.errormsg = false;
        User.createbroker(app.brokerRegData).then(function(data){
            
            if(data.data.success){
                app.loading = false;
                app.successmsg = data.data.message +' Redirecting...';

                $timeout(function(){
                    $location.path('/');
                    app.brokerRegData = "";
                    app.successmsg = false;
                },2000);
            }else{
                app.loading = false;
                app.errormsg = data.data.message;
            }
        });
    }

    app.checkEmail = function(ownerRegData){
        app.checkingEmail = true;
        app.emailMsg = false;
        app.emailInvalid = false;

        User.checkEmail(app.ownerRegData).then(function(data){
            if(data.data.success){
                app.checkingEmail = false;
                app.emailInvalid = false;
                app.emailMsg = data.data.message;
            }else{
                app.emailInvalid = true;
                app.emailMsg = data.data.message;
            }
        });
    }

    app.checkMobile = function(ownerRegData){
        app.checkingMobile = true;
        app.mobileMsg = false;
        app.mobileInvalid = false;

        User.checkMobile(app.ownerRegData).then(function(data){
            if(data.data.success){
                app.checkingMobile = false;
                app.mobileInvalid = false;
                app.mobileMsg = data.data.message;
            }else{
                app.mobileInvalid = true;
                app.mobileMsg = data.data.message;
            }
        });
    }

    app.checkIdcard = function(ownerRegData){
        app.checkingidcard = true;
        app.idcardMsg = false;
        app.idcardInvalid = false;

        User.checkIdcard(app.ownerRegData).then(function(data){
            if(data.data.success){
                app.checkingidcard = false;
                app.idcardInvalid = false;
                app.idcardMsg = data.data.message;
            }else{
                app.mobileInvalid = true;
                app.idcardMsg = data.data.message;
            }
        });
    }

    app.checkEmailt = function(tenantRegData){
        app.checkingEmailt = true;
        app.emailMsgt = false;
        app.email2Invalid = false;

        User.checkEmailt(app.tenantRegData).then(function(data){
            if(data.data.success){
                app.checkingEmailt = false;
                app.email2Invalid = false;
                app.emailMsgt = data.data.message;
            }else{
                app.email2Invalid = true;
                app.emailMsgt = data.data.message;
            }
        });
    }

    app.checkMobilet = function(tenantRegData){
        app.checkingMobilet = true;
        app.mobileMsgt = false;
        app.mobile2Invalid = false;

        User.checkMobilet(app.tenantRegData).then(function(data){
            if(data.data.success){
                app.checkingMobilet = false;
                app.mobile2Invalid = false;
                app.mobileMsgt = data.data.message;
            }else{
                app.mobile2Invalid = true;
                app.mobileMsgt = data.data.message;
            }
        });
    }

    app.checkIdcardt = function(tenantRegData){
        app.checkingidcardt = true;
        app.idcardMsgt = false;
        app.idcard2Invalid = false;

        User.checkIdcardt(app.tenantRegData).then(function(data){
            if(data.data.success){
                app.checkingidcardt = false;
                app.idcard2Invalid = false;
                app.idcardMsgt = data.data.message;
            }else{
                app.idcard2Invalid = true;
                app.idcardMsgt = data.data.message;
            }
        });
    }

    app.checkEmailb = function(brokerRegData){
        app.checkingEmailb = true;
        app.emailMsgb = false;
        app.email3Invalid = false;

        User.checkEmailb(app.brokerRegData).then(function(data){
            if(data.data.success){
                app.checkingEmailb = false;
                app.email3Invalid = false;
                app.emailMsgb = data.data.message;
            }else{
                app.email3Invalid = true;
                app.emailMsgb = data.data.message;
            }
        });
    }

    app.checkMobileb = function(brokerRegData){
        app.checkingMobileb = true;
        app.mobileMsgb = false;
        app.mobile3Invalid = false;

        User.checkMobileb(app.brokerRegData).then(function(data){
            if(data.data.success){
                app.checkingMobileb = false;
                app.mobile3Invalid = false;
                app.mobileMsgb = data.data.message;
            }else{
                app.mobile3Invalid = true;
                app.mobileMsgb = data.data.message;
            }
        });
    }

    app.checkIdcardb = function(brokerRegData){
        app.checkingidcardb = true;
        app.idcardMsgb = false;
        app.idcard3Invalid = false;

        User.checkIdcardb(app.brokerRegData).then(function(data){
            if(data.data.success){
                app.checkingidcardb = false;
                app.idcard3Invalid = false;
                app.idcardMsgb = data.data.message;
            }else{
                app.idcard3Invalid = true;
                app.idcardMsgb = data.data.message;
            }
        });
    }
});

app.directive('match', function() {
    return {
        restrict: 'A', 
        controller: function($scope) {      
            
            $scope.confirmed = false;
            $scope.doConfirm = function(values) {
                values.forEach(function(ele){
                    if ($scope.confirm == ele) {
                        $scope.confirmed = true;
                    } else {
                        $scope.confirmed = false; 
                    }
                });
            }
        },
        link: function(scope, element, attrs) {

            attrs.$observe('match', function() {     
                scope.matches = JSON.parse(attrs.match); 
                scope.doConfirm(scope.matches);
            });

            scope.$watch('confirm', function() {
                scope.matches = JSON.parse(attrs.match); 
                scope.doConfirm(scope.matches);  
            });
        }
    };
});

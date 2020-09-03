var app = angular.module("mainController", ['authServices', 'userServices']);

app.controller('mainCtrl', function(Auth, $location, $timeout, $rootScope, $interval, $route, User, $window, AuthToken, $http, $scope, uploadFile){
    var app = this;
    app.loadme = false;
    app.hidename = true;
    app.checkSession = function() {
        if (Auth.isLoggedIn()) {
            app.checkingSession = true;
            var interval = $interval(function() {
                var token = $window.localStorage.getItem('token');
                if (token === null) {
                    $interval.cancel(interval); 
                } else {
                    self.parseJwt = function(token) {
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace('-', '+').replace('_', '/');
                        return JSON.parse($window.atob(base64));
                    };
                    var expireTime = self.parseJwt(token); 
                    var timeStamp = Math.floor(Date.now() / 1000); 
                    var timeCheck = expireTime.exp - timeStamp;
                    //console.log(timeCheck);
                    if (timeCheck <= 1800) {
                        //console.log("expire");
                        showModal(1);
                        $interval.cancel(interval); 
                    }else{
                        //console.log("not expire");
                    }
                }
            }, 2000);
        }
    };

    app.checkSession();

    var showModal = function(option) {
        app.choiceMade = false;
        app.modalHeader = undefined;
        app.modalBody = undefined;
        app.hideButton = false;

        if(option == 1){
            app.modalHeader = 'Timeout Warning'; 
            app.modalBody = 'Your session will expired in 30 minutes. Would you like to renew your session?';
            $("#myModal").modal({ backdrop: "static" });
        }else if(option == 2){
            app.hideButton = true;
            app.modalHeader = 'Logging Out';
            $("#myModal").modal({ backdrop: "static" });
            $timeout(function() {
                Auth.logout(); 
                $location.path('/logout'); 
                hideModal();
                $route.reload();
            }, 2000);
        }
        $timeout(function() {
            if (!app.choiceMade){
                hideModal();
            }
        }, 4000);
        
    }

    app.renewSession = function(){
        app.choiceMade = true;
        User.renewSession(app.email).then(function(data) {
            if (data.data.success) {
                AuthToken.setToken(data.data.token);
                app.checkSession();
            }else{
                app.modalBody = data.data.message;
            }
        });
        hideModal();
    }

    app.endSession = function(){
        app.choiceMade = true;
        hideModal();
        
        $timeout(function() {
            showModal(2);
        }, 1000);
    }

    var hideModal = function() {
        $("#myModal").modal('hide'); 
    };
    $rootScope.$on('$routeChangeStart', function() {
        if (!app.checkingSession) app.checkSession();

        if(Auth.isLoggedIn()){
            app.isLoggedIn = true;
            Auth.getUser().then(function(data) {
                app.name = data.data.name;
                app.mobile = data.data.mobile;
                app.email = data.data.email;
                app.idcard = data.data.idcard;
                app.address = data.data.address;
                app.image = data.data.image;
                app.id = data.data._id;
                //console.log(data.data);

                if(app.image) {
                    app.imagefile = true;
                } else {
                    app.imagefile = false;
                }
                User.getTypeh().then(function(data) {
                    if (data.data.typeh === 'OwnerH') {
                        app.authorizedOwnerH = true;
                        app.authorizedtenantH = false;
                        app.authorizedbrokerH = false;
                        app.loadme = true;
                    } else if(data.data.typeh === 'tenantH'){
                        app.authorizedtenantH = true;
                        app.authorizedOwnerH = false;
                        app.authorizedbrokerH = false;
                        app.loadme = true;
                    } else if(data.data.typeh === 'brokerH'){
                        app.authorizedbrokerH = true;
                        app.authorizedtenantH = false;
                        app.authorizedOwnerH = false;
                        app.loadme = true;
                    }else{
                        app.authorizedbrokerH = false;
                        app.authorizedtenantH = false;
                        app.authorizedOwnerH = false;
                        app.loadme = true;
                    }
                });
            });
        } else{
            app.isLoggedIn = false;
            app.name = "";
            app.loadme = true;
        }
    });
    app.loginowner = function(ownerloginData){
        app.loading = true;
        app.errormsg = false;
        app.disabled = true;
        Auth.loginowner(app.ownerloginData).then(function(data){
            
            if(data.data.success){
                app.loading = false;
                app.successmsg = data.data.message +' Redirecting...';
                
                $timeout(function(){
                    $location.path('/');
                    app.ownerloginData = "";
                    app.successmsg = false;
                    app.disabled = false;
                    app.checkSession();
                },2000);
            }else{
                if (data.data.expired) {
                    app.expired = true; 
                    app.loading = false; 
                    app.errormsg = data.data.message; 
                } else {
                    app.loading = false; 
                    app.disabled = false;
                    app.errormsg = data.data.message; 
                }
            }
        });
    }

    app.logout = function(){
        showModal(2);
    }

    $scope.file = {};
    app.submit = function(){  
        app.loading = true;
        app.errormsg = false;
        app.successmsg  = false;
        app.imagefile = false;
        //console.log($scope.file);

        uploadFile.upload($scope.file).then(function(data){
            //console.log(data.data);  
            if(data.data.success){
                app.loading = false;
                app.successmsg = data.data.message;
                app.select();
                app.errormsg = false;
                app.imagefile = true;
            } else {
                app.loading = false;
                app.errormsg = data.data.errormsg;
                app.successmsg = false;
                app.imagefile = false;
            }
           // app.select();
       });  
    }
    app.select = function() {
        $http.get('/api/show').then(function(data){
            //console.log(data.data.data.image);
            app.image = data.data.data.image;
        });
    }

    /*$scope.photoChanged = function(files) {
        if(files.length > 0 && files[0].name.match(/\.(png|jpg|jpeg)$/)) {
            var file = files[0];
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function(e) {
                $timeout(function(){
                    $scope.thumbnail = {};
                    $scope.thumbnail.dataUrl = e.target.result;
                })
            }
        } else {
            $scope.thumbnail = {};
        }
    }*/
    app.deleteUser = function(mobile){
        app.loading = true;
        app.errormsg = false;
        User.deleteuser(mobile).then(function(data){
            if(data.data.success) {
                app.loading = false;
                app.successmsg = data.data.message;
                $timeout(function(){
                    app.logout();
                },2000)
            } else{
                app.loading = false;
                app.errormsg = data.data.message;
            }
           // console.log(data);
        })
    }
});

app.directive("fileInput", function($parse){  
    return{  
         restrict : 'A',
         link: function(scope, element, attrs){  
             var parsedFile = $parse(attrs.fileInput);
             var parsedFileSetter = parsedFile.assign;

             element.bind("change", function(){  
                   scope.$apply( function() {
                       parsedFileSetter(scope, element[0].files[0])
                   });  
              });  
         }  
    }  
});  

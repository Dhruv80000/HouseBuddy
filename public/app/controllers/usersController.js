var app = angular.module("userApp", ['userServices','authServices']);

app.controller('ownerCtrl', function(User, $location, $timeout, $scope, uploadFile, $http){
    
    var app = this;

    app.showdata = true;
    app.checkdata = false;
    app.live = true;
    app.room = true;    
    $scope.names = ["2BHK", "3BHK"];
    
    User.getOwner().then(function(data) {
//        console.log(data.data.data);
        app.name = data.data.data.name;
        app.mobile = data.data.data.mobile;
        app.housetype = data.data.data.housetype;
        app.email = data.data.data.email;
        app.idcard = data.data.data.idcard;
        app.address = data.data.data.address;
        app.rentprice = data.data.data.rentprice;
        app.houseaddress = data.data.data.houseaddress;
        app.livingroom = data.data.data.livingroom;
        app.image = data.data.data.image;
        app.froom = data.data.data.froom;
        app.sroom = data.data.data.sroom;
        app.troom = data.data.data.troom;
        app.kichen = data.data.data.kichen;
    });

    app.checkfun = function(ownerRegData) {
        if(app.ownerRegData.functionality === "2BHK") {
            console.log("2BHK");
            app.live = false;
            app.room = true;
        } else if (app.ownerRegData.functionality === "3BHK") {
            console.log("3BHK");
            app.live = false;
            app.room = false;
        } else{
            app.errormsg = "Plz Select any one option";
            app.live = true;
            app.room = true;
        }
    }
    app.checkdetails = function(){
        app.checkdata =true;
        app.showdata = false;
    }
    app.checkdetails = function(ownerRegData){
        console.log(app.ownerRegData);
        app.loading = true;
        app.errormsg = false;
     //   app.successmsg  = false;
        //console.log(app.ownerRegData.functionality);        //console.log($scope.livingroom);        //console.log($scope.froom);        //console.log($scope.sroom);        //console.log($scope.troom);  //console.log($scope.kichen);
        
      /*  User.confirmOwner(app.ownerRegData).then(function(data){
            //console.log(data);
            if(data.data.success){
                app.loading = false;
                app.successmsg4 = data.data.message;

                $timeout(function(){
                    app.showdata = false;
                    app.checkdata = true;
                    //$location.path('/');
                    app.successmsg = true;
                    app.successmsg = app.successmsg1 +app.successmsg2+app.successmsg3+app.successmsg4+app.successmsg5 +' Redirecting...';
                },2000);
            }else{
                app.loading = false;
                app.errormsg = data.data.message;
            }
        }); 
*/
        uploadFile.uploadlivingroom($scope.livingroom).then(function(data){
           // console.log(data);
            if(data.data.success){
                app.loading = false;
                app.successmsg1 = data.data.message;
                app.selecthl();
                app.imagefile = true;
            } else {
                app.loading = false;
                app.errormsg = data.data.message;
                app.imagefile = false;
            }
        });
        app.selecthl = function() {
            $http.get('/api/showhl').then(function(data){
              //  console.log(data.data.data);
                app.livingroom = data.data.data.livingroom;
            });
        }
        uploadFile.uploadfroom($scope.froom).then(function(data){
          //  console.log(data);
            if(data.data.success){
                app.loading = false;
                app.successmsg2 = data.data.message;
                app.selectfroom();
                app.imagefile = true;
            } else {
                app.loading = false;
                app.errormsg = data.data.message;
                app.imagefile = false;
            }
        });
        app.selectfroom = function() {
            $http.get('/api/showfroom').then(function(data){
               // console.log(data.data.data);
                app.froom = data.data.data.froom;
            });
        }
        uploadFile.uploadsroom($scope.sroom).then(function(data){
          //  console.log(data);
            if(data.data.success){
                app.loading = false;
                app.successmsg3 = data.data.message;
                app.selectsroom();
                app.imagefile = true;
            } else {
                app.loading = false;
                app.errormsg = data.data.message;
                app.imagefile = false;
            }
        });
        app.selectsroom = function() {
            $http.get('/api/showsroom').then(function(data){
               // console.log(data.data.data);
                app.sroom = data.data.data.sroom;
            });
        }
        uploadFile.uploadtroom($scope.troom).then(function(data){
          //  console.log(data);
            if(data.data.success){
                app.loading = false;
                app.successmsg4 = data.data.message;
                app.selectsthroom();
                app.imagefile = true;
            } else {
                app.loading = false;
                app.errormsg = data.data.message;
                app.imagefile = false;
            }
        });
        app.selectsthroom = function() {
            $http.get('/api/showtroom').then(function(data){
               // console.log(data.data.data);
                app.troom = data.data.data.troom;
            });
        }
        uploadFile.uploadkichen($scope.kichen).then(function(data){
          //  console.log(data);
          //  app.selectkichen();
            if(data.data.success){
                app.loading = false;
                app.successmsg5 = data.data.message;
                app.selectkichen();
                app.imagefile = true;
                app.successmsg = app.successmsg1+app.successmsg2+app.successmsg3+app.successmsg4+app.successmsg5;
                $timeout(function(){
                    app.showdata = false;
                    app.checkdata = true;
                },2000);
            } else {
                app.loading = false;
                app.errormsg = data.data.message;
                app.imagefile = false;
            }
        });
        app.selectkichen = function() {
            $http.get('/api/showkichen').then(function(data){
              //  console.log(data.data.data);
                app.kichen = data.data.data.kichen;
            });
        }
    }

    app.confirm = function(){
        console.log(app.ownerRegData);
        app.loading = true;
        app.errormsgs = false;
        //console.log(app.ownerRegData.functionality);        //console.log($scope.livingroom);        //console.log($scope.froom);        //console.log($scope.sroom);        //console.log($scope.troom);  //console.log($scope.kichen);
        User.confirmOwner(app.ownerRegData).then(function(data){
            //console.log(data);
            if(data.data.success){
                app.loading = false;

                $timeout(function(){
                    app.successmsgs = data.data.message+' Redirecting...';
                    $location.path('/');
                },2000);
            }else{
                app.loading = false;
                app.errormsgs = data.data.message;
            }
        });
    }
    app.cancelHouse = function(ownerRegData){
        //console.log(app.ownerRegData);

        app.loading = true;
        app.errormsgs = false;

        User.cancelHouse(app.ownerRegData).then(function(data){
            //console.log(data);
            if(data.data.success){
                app.loading = false;
                app.successmsgs = data.data.message +' Redirecting...';

                $timeout(function(){
                    $location.path('/');
                    app.successmsgs = false;
                },2000);
            }else{
                app.loading = false;
                app.errormsgs = data.data.message;
            } 
        });
    }
});

app.controller('tenantCtrl', function(User, $scope, Auth, $timeout, $location){
    var app = this;

    app.houseDetails = false;
    app.alldetails = true;
    app.loading = true; 
    //app.accessDenied = true;
    app.errormsg = false;
    app.editAccess = false;
    app.deleteAccess = false;
    app.limit = 5; 
    app.searchLimit = 0;

    User.getUsers().then(function(data) {
        //console.log(data);
        if (data.data.success) {
            if (data.data.typeh === 'tenantH') {
                app.users = data.data.users; 
                app.loading = false; 
                //app.accessDenied = false;
               // console.log(app.users);
            } else{
                app.errormsg = 'Insufficient Permissions';
                app.loading = false;
            }
        } else{
            app.errormsg = data.data.message;
            app.loading = false; 
        } 
    });

    app.showMore = function(number) {
        app.showMoreError = false;

        if (number > 0) {
            app.limit = number; 
        } else {
            app.showMoreError = 'Please enter a valid number'; 
        }
    }

    app.showAll = function() {
        app.limit = undefined;
        app.showMoreError = false;
    }
    app.search = function(searchKeyword, number) {
        if (searchKeyword) {
            if (searchKeyword.length > 0) {
                app.limit = 0;
                $scope.searchFilter = searchKeyword;
                app.limit = number;
            } else {
                $scope.searchFilter = undefined;
                app.limit = 0;
            }
        } else {
            $scope.searchFilter = undefined;
            app.limit = 0;
        }
    }

    app.clear = function() {
        $scope.number = 'Clear';
        app.limit = 0;
        $scope.searchKeyword = undefined; 
        $scope.searchFilter = undefined; 
        app.showMoreError = false;
    }

    app.sortOrder = function(order) {
        app.sort = order;
    }

    app.getdetails = function(person){

        app.houseDetails = true;
        app.alldetails = false;
        console.log(person);
        $scope.details = person;

    }
    
    app.closetab = function(){      
        app.houseDetails = false;
        app.alldetails = true;
    }

    app.booking = function(details){

        app.loading = true;
        app.errormsg = false;  
        app.disabled = true;
        //console.log(details.name);
        app.name = details.name;
        app.email = details.email;
        app.mobile = details.mobile;
        Auth.getUser().then(function(data) {

            app.tname = data.data.name;
            app.tmobile = data.data.mobile;
            app.temail = data.data.email;
            
            app.tdetails = [{name : app.name, mobile : app.mobile, email : app.email, tname : app.tname, tmobile : app.tmobile, temail : app.temail}];
            console.log(app.tdetails[0]);
            
            User.bookingH(app.tdetails[0]).then(function(data){
                console.log(data);

                if(data.data.success){
                    app.loading = false;
                    app.disabled = true;
                    app.successmsg = data.data.message +' Redirecting...';
    
                    $timeout(function(){
                        $location.path('/');
                        app.successmsg = false;
                    },2000);
                }else{
                    app.loading = false;
                    app.disabled = false;
                    app.errormsg = data.data.message;
                }
            });
        });
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


app.controller('editCtrl', function(User, $scope, $timeout, $location, $routeParams, Auth){
    console.log("brokeditCtrlerCtrl");
    var app = this;

    function getUsers() {
        User.getUser($routeParams.mobile).then(function(data){
            if(data.data.success){
                app.name = data.data.user.name;
                $scope.newName = data.data.user.name;
                $scope.newEmail = data.data.user.email;
                $scope.newMobile = data.data.user.mobile;
                $scope.newIdcard = data.data.user.idcard;
                $scope.newAddress = data.data.user.address;
                app.newImage = data.data.user.image;
                app.currentUser = data.data.user._id;
             //  console.log(data.data);
            } else{
                app.errormsg = data.data.message;
            }
        });
    }
    getUsers();
    app.submit = function(newName, newEmail, newMobile, newIdcard, newAddress, valid) {
        app.loading = true;
        app.errormsg = false;
        app.disabled = true;

        if(valid) {
            var updateDetails = [{name : newName, mobile : newMobile, email : newEmail, idcard : newIdcard, address : newAddress, _id: app.currentUser}];
          //  console.log(updateDetails[0]);
            User.editUser(updateDetails[0]).then(function(data){
            //    console.log(data);
                if(data.data.success) {
                    app.loading = false;
                    app.successmsg = data.data.message +' Redirecting...';

                    $timeout(function(){
                        Auth.logout(); 
                        $location.path('/logout');
                      //  app.successmsg = false;
                    },2000);
                } else {
                    app.loading = false;
                    app.disabled = false;
                    app.errormsg = data.data.errormsg;
                }
            });
        } else {
            app.loading = false;
            app.disabled = false;
            app.errormsg = "Please ensure form is filled properly";
        }
        
    }
});

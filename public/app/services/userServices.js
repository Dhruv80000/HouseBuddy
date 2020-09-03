var app = angular.module('userServices', []);

app.factory('User', function($http) {
    var userFactory = {}; 

    userFactory.createowner = function(ownerRegData) {
        return $http.post('/api/OwnerHouse', ownerRegData);
    };

    userFactory.createtenant = function(tenantRegData) {
        return $http.post('/api/OwnerHouse', tenantRegData);
    };

    userFactory.createbroker = function(brokerRegData) {
        return $http.post('/api/OwnerHouse', brokerRegData);
    };

    userFactory.checkMobile = function(ownerRegData) {
        return $http.post('/api/checkmobile', ownerRegData);
    };

    userFactory.checkEmail = function(ownerRegData) {
        return $http.post('/api/checkemail', ownerRegData);
    };

    userFactory.checkIdcard = function(ownerRegData) {
        return $http.post('/api/checkidcard', ownerRegData);
    };

    userFactory.checkMobilet = function(tenantRegData) {
        return $http.post('/api/checkmobile', tenantRegData);
    };

    userFactory.checkEmailt = function(tenantRegData) {
        return $http.post('/api/checkemail', tenantRegData);
    };

    userFactory.checkIdcardt = function(tenantRegData) {
        return $http.post('/api/checkidcard', tenantRegData);
    };

    userFactory.checkMobileb = function(brokerRegData) {
        return $http.post('/api/checkmobile', brokerRegData);
    };

    userFactory.checkEmailb = function(brokerRegData) {
        return $http.post('/api/checkemail', brokerRegData);
    };

    userFactory.checkIdcardb = function(brokerRegData) {
        return $http.post('/api/checkidcard', brokerRegData);
    };

    userFactory.activateAccount = function(token) {
        return $http.put('/api/activate/' + token);
    };

    userFactory.checkCredentials = function(loginData) {
        return $http.post('/api/resend', loginData);
    };

    userFactory.resendLink = function(username) {
        return $http.put('/api/resend', username);
    };

    userFactory.sendemail = function(userData) {
        return $http.get('/api/resetemail/' + userData);
    };

    userFactory.sendPassword = function(resetData) {
        return $http.put('/api/resetpassword', resetData);
    };

    userFactory.resetUser = function(token) {
        return $http.get('/api/resetpassword/' + token);
    };

    userFactory.savePassword = function(regData) {
        return $http.put('/api/savepassword', regData);
    };

    userFactory.renewSession = function(email) {
        return $http.get('/api/renewToken/' + email);
    }

    userFactory.getTypeh = function() {
        return $http.get('/api/typeh/');
    };

    userFactory.getUsers = function() {
        return $http.get('/api/tenant/');
    };

    userFactory.getOwner = function() {
        return $http.get('/api/owner/');
    };

    userFactory.confirmOwner = function(ownerRegData) {
        return $http.post('/api/owner', ownerRegData);
    };

    userFactory.cancelHouse = function(ownerRegData) {
        return $http.post('/api/housecancel', ownerRegData);
    };

    userFactory.bookingH = function(tdetails) {
        return $http.post('/api/getbooking', tdetails);
    };

    userFactory.getUser = function(mobile) {
        return $http.get('/api/edit/'+ mobile);
    }

    userFactory.editUser = function(id) {
        return $http.put('/api/edit', id);
    };

    userFactory.deleteuser = function(mobile) {
        return $http.delete('/api/delete/'+ mobile);
    }

    return userFactory;
});//tdetails

app.service('uploadFile', function($http){

    this.upload = function(file) {
        var form_data = new FormData();    
        form_data.append('myfile', file.upload);  
        return $http.post('/api/upload', form_data, {

            transformRequest: angular.identity,  
            headers: {'Content-Type': undefined }  
        });
    }
    this.uploadlivingroom = function(livingroom) {
        var form_data = new FormData();    
        form_data.append('mylivingroom', livingroom.upload);  
        return $http.post('/api/uploadhl', form_data, {

            transformRequest: angular.identity,  
            headers: {'Content-Type': undefined }  
        });
    }
    this.uploadfroom = function(froom) {
        var form_data = new FormData();    
        form_data.append('myfroom', froom.upload);  
        return $http.post('/api/uploadfroom', form_data, {

            transformRequest: angular.identity,  
            headers: {'Content-Type': undefined }  
        });
    }
    this.uploadsroom = function(sroom) {
        var form_data = new FormData();    
        form_data.append('mysroom', sroom.upload);  
        return $http.post('/api/uploadsroom', form_data, {

            transformRequest: angular.identity,  
            headers: {'Content-Type': undefined }  
        });
    }
    this.uploadtroom = function(troom) {
        var form_data = new FormData();    
        form_data.append('mytroom', troom.upload);  
        return $http.post('/api/uploadtroom', form_data, {

            transformRequest: angular.identity,  
            headers: {'Content-Type': undefined }  
        });
    }
    this.uploadkichen = function(kichen) {
        var form_data = new FormData();    
        form_data.append('mykichen', kichen.upload);  
        return $http.post('/api/uploadkichen', form_data, {

            transformRequest: angular.identity,  
            headers: {'Content-Type': undefined }  
        });
    }
});

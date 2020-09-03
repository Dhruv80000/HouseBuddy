var Owner = require('../model/Ownerhouse');
var Book = require('../model/Book');
var multer = require('multer');
var path = require("path");
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';
var nodemailer = require('nodemailer');
const Nexmo = require('nexmo');

module.exports = function(router){

    //E-mail
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'cs9287923@gmail.com',
          pass: 'Candy@123'
        }
    });
    //SMS
    const nexmo = new Nexmo({
        apiKey: '1dab15d0',
        apiSecret: 'uMFqUl0UnvK9R6Aa',
    }, { debug: true });

     //Profile Image
    var Storage= multer.diskStorage({
        destination: function(req, file, cb) {    
        cb(null, "./public/uploads/profiles/")
        },
        filename: function(req,file,cb) {
            if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
                var err = new Error();
                err.code = 'filetype';
                return cb(err);
            } else {
                cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
            }
        }
    });
        
    var upload = multer({
        storage:Storage,
        limits: { fileSize: 10000000}
    }).single('myfile');

    //livingroom
    var livingroomStorage = multer.diskStorage({
        destination: function(req, file, cb) {    
        cb(null, "./public/uploads/livingroom/")
        },
        filename: function(req,file,cb) {
            if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
                var err = new Error();
                err.code = 'filetype';
                return cb(err);
            } else {
                cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
            }
        }
    });
        
    var uploadlivingroom = multer({
        storage:livingroomStorage,
        limits: { fileSize: 10000000}
    }).single('mylivingroom');

    //froom
    var froomStorage = multer.diskStorage({
        destination: function(req, file, cb) {    
        cb(null, "./public/uploads/room1/")
        },
        filename: function(req,file,cb) {
            if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
                var err = new Error();
                err.code = 'filetype';
                return cb(err);
            } else {
                cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
            }
        }
    });

    var uploadfroom = multer({
        storage:froomStorage,
        limits: { fileSize: 10000000}
    }).single('myfroom');

    //sroom
    var sroomStorage = multer.diskStorage({
        destination: function(req, file, cb) {    
        cb(null, "./public/uploads/room2/")
        },
        filename: function(req,file,cb) {
            if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
                var err = new Error();
                err.code = 'filetype';
                return cb(err);
            } else {
                cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
            }
        }
    });
        
    var uploadsroom = multer({
        storage:sroomStorage,
        limits: { fileSize: 10000000}
    }).single('mysroom');

    //troom
    var troomStorage = multer.diskStorage({
        destination: function(req, file, cb) {    
        cb(null, "./public/uploads/room3/")
        },
        filename: function(req,file,cb) {
            if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
                var err = new Error();
                err.code = 'filetype';
                return cb(err);
            } else {
                cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
            }
        }
    });    
    var uploadtroom = multer({
        storage:troomStorage,
        limits: { fileSize: 10000000}
    }).single('mytroom');

    //kichen
    var kichenStorage = multer.diskStorage({
        destination: function(req, file, cb) {    
        cb(null, "./public/uploads/KIchen/")
        },
        filename: function(req,file,cb) {
            if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
                var err = new Error();
                err.code = 'filetype';
                return cb(err);
            } else {
                cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
            }
        }
    });
    var uploadkichen = multer({
        storage:kichenStorage,
        limits: { fileSize: 10000000}
    }).single('mykichen');

    router.post("/OwnerHouse", function(req,res){
        var owner = new Owner();
   
        owner.name = req.body.name;
        owner.email = req.body.email;
        owner.mobile = req.body.mobile;
        owner.password = req.body.password;
        owner.typeh = req.body.typeh;
        owner.address = req.body.address;
        owner.idcard = req.body.idcard;
        owner.mobile = req.body.mobile;
        owner.nationality = req.body.nationality;
        owner.houseaddress = req.body.houseaddress;
        owner.housetype = req.body.housetype;
        owner.rentprice = req.body.rentprice;
        owner.temporarytoken = jwt.sign({ name: owner.name, email: owner.email, address: owner.address, idcard: owner.idcard, mobile: owner.mobile, image: owner.image }, secret, { expiresIn: '24h' });
        
        if(req.body.mobile == null || req.body.mobile == "" || req.body.password == null || req.body.password == "" || req.body.email == null || req.body.email == "" || req.body.name == null || req.body.name == "" || req.body.idcard == null || req.body.idcard == ""){
            res.json({ success: false, message: 'Ensure name, mobile, password, Id-card and email were provided'});
        }else{
            owner.save(function(err){
                if(err){
                    if (err.errors != null) {
                        if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message });
                        }else if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message }); 
                        } else if (err.errors.mobile) {
                            res.json({ success: false, message: err.errors.mobile.message });
                        } else if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message });
                        } else if (err.errors.idcard) {
                            res.json({ success: false, message: err.errors.idcard.message });
                        } else if( err.errors.rentprice) {
                            res.json({ success: false, message: err.errors.rentprice.message });
                        } 
                        else {
                            res.json({ success: false, message: err }); 
                        }
                    } else if (err){
                        if (err.code == 11000) {
                            //  res.json({ success: false, message: err.errmsg[61] });
                            if (err.errmsg[61] == "x") {
                                res.json({ success: false, message: 'That E-mail, mobile is already taken' });
                            }
                        } else{
                            res.json({ success: false, message: err });
                        }
                    }
                }else{

                    var mailOptions = {
                        from: 'HouseBuddy, cs9287923@gmail.com',
                        to: owner.email,
                        subject: 'Your Activation Link',
                        text: 'Hello ' + owner.name + ', thank you for registering at localhost.com. Please click on the following link to complete your activation: http://localhost:8080/activate/' + owner.temporarytoken,
                        html: 'Hello<strong> ' + owner.name + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:8080/activate/' + owner.temporarytoken + '">http://localhost:8080/activate/</a>'
                    };
                    transporter.sendMail(mailOptions, function(err, info){
                        if (err) {
                          console.log(err);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                    });
                    res.json({ success: true, message: 'Account registered! Please check your e-mail for activation link.'});
                }
            });
        }
    });

    //http://localhost:8080/api/authenticate
    router.post('/authenticate', function(req, res){
        Owner.findOne({ email: req.body.email }).select('email idcard active address name mobile password image').exec(function(err, user) {
            if (err) throw err;
            else {
                if (!user) {
                    res.json({ success: false, message: 'E-mail not found' });
                } else if (user) {
                    if (!req.body.password) {
                        res.json({ success: false, message: 'No password provided' });
                    } else {
                        var validPassword = user.comparePassword(req.body.password);
                        if (!validPassword) {
                            res.json({ success: false, message: 'Could not authenticate password' });
                        } else if (!user.active) {
                            res.json({ success: false, message: 'Account is not yet activated. Please check your e-mail for activation link.', expired: true });
                        } else{
                            var token = jwt.sign({ name: user.name, email: user.email, address: user.address, idcard: user.idcard, mobile: user.mobile, image: user.image }, secret, { expiresIn: '24h' }); 
                            res.json({ success: true, message: 'User authenticated!', token: token });
                        }             
                    }
                }
            }   
        });
    });

    router.post('/checkmobile', function(req, res) {
        Owner.findOne({ mobile: req.body.mobile }).select('mobile').exec(function(err, user) {
            if (err) throw err;

            if (user) {
                res.json({ success: false, message: 'That mobile number is already taken' });
            } else {
                res.json({ success: true, message: 'Valid mobile number' }); 
            }
        }) 
    });

    router.post('/checkemail', function(req, res) {
        Owner.findOne({ email: req.body.email }).select('email').exec(function(err, user) {
            if (err) throw err;

            if (user) {
                res.json({ success: false, message: 'That e-mail is already taken' });
            } else {
                res.json({ success: true, message: 'Valid e-mail' }); 
            }
        })
    });

    router.post('/checkidcard', function(req, res) {
        Owner.findOne({ idcard: req.body.idcard }).select('idcard').exec(function(err, user) {
            if (err) throw err;

            if (user) {
                res.json({ success: false, message: 'That idcard is already taken' });
            } else {
                res.json({ success: true, message: 'Valid idcard' }); 
            }
        })
    });

    router.put('/activate/:token', function(req, res) {
        Owner.findOne({ temporarytoken: req.params.token }, function(err, user) {
            if (err) throw err;

           var token = req.params.token; 
           jwt.verify(token, secret, function(err, decoded) {
               if (err) {
                   res.json({ success: false, message: 'Activation link has expired.' }); 
               } else if (!user) {
                   res.json({ success: false, message: 'Activation link has expired.' }); 
               } else {
                   user.temporarytoken = false; 
                   user.active = true; 
                   user.save(function(err) {
                       if (err) {
                           console.log(err); 
                       } else {                                
                            var mailOptions = {
                                from: 'cs9287923@gmail.com',
                                to: user.email,
                                subject: 'Account Activated',
                                text: 'Hello ' + user.name + ', Your account has been successfully activated!',
                                html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Your account has been successfully activated!'
                            };

                            transporter.sendMail(mailOptions, function(err, info){
                                if (err) {
                                  console.log(err);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                }
                            });
                           res.json({ success: true, message: 'Account activated!' }); 
                       }
                   });
               }
           });        
        });
    });

    router.post('/resend', function(req, res){
        Owner.findOne({ email: req.body.email }).select('email password active').exec(function(err, user) {
            if (err) throw err;
            else {
                if (!user) {
                    res.json({ success: false, message: 'Could not authenticate user' });
                } else if (user) {
                    if (!req.body.password) {
                        res.json({ success: false, message: 'No password provided' });
                    } else {
                        var validPassword = user.comparePassword(req.body.password);
                        if (!validPassword) {
                            res.json({ success: false, message: 'Could not authenticate password' });
                        } else if (user.active) {
                            res.json({ success: false, message: 'Account is already activated.' });
                        } else{
                            res.json({ success: true, user: user });
                        }             
                    }
                }
            }   
        });
    });

    router.put('/resend', function(req, res) {
        Owner.findOne({ email: req.body.email }).select('name email temporarytoken').exec(function(err, user) {
            if (err) throw err;
            user.temporarytoken = jwt.sign({ email: user.email }, secret, { expiresIn: '24h' });
            
            user.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    var mailOptions = {
                        from: 'cs9287923@gmail.com',
                        to: user.email,
                        subject: 'Activation Link Request',
                        text: 'Hello ' + user.name + ', You recently requested a new account activation link. Please click on the following link to complete your activation: http://localhost:8080/activate/' + user.temporarytoken,
                        html: 'Hello<strong> ' + user.name + '</strong>,<br><br>You recently requested a new account activation link. Please click on the link below to complete your activation:<br><br><a href="http://localhost:8080/activate/' + user.temporarytoken + '">http://localhost:8080/activate/</a>'
                    };
                    transporter.sendMail(mailOptions, function(err, info){
                        if (err) {
                          console.log(err);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.json({ success: true, message: 'Activation link has been sent to ' + user.email + '!' }); 
                }
            });
        });
    });

    router.get('/resetemail/:mobile', function(req, res) {
        Owner.findOne({ mobile: req.params.mobile }).select('mobile email name').exec(function(err, user) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if(!user) {
                    res.json({ success: false, message: 'mobile was not found' });
                } else{
                    const from = 'Vonage APIs';
                        const to = user.mobile;
                        const text = 'Hello from Vonage SMS API';
                    nexmo.message.sendSms(from, to, text, { type: 'unicode' }, (err, responseData) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if(responseData.messages[0]['status'] === "0") {
                                console.log("Message sent successfully.");
                            } else {
                                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                            }
                        }
                    });
                    var mailOptions = {
                        from: 'cs9287923@gmail.com',
                        to: user.email,
                        subject: 'Localhost E-mail Request',
                        text: 'Hello ' + user.name + ', You recently requested your email. Please save it in your files: ' + user.email,
                        html: 'Hello<strong> ' + user.name + '</strong>,<br><br>You recently requested your email. Please save it in your files: ' + user.email
                    };
                    transporter.sendMail(mailOptions, function(err, info){
                        if (err) {
                            console.log(err); 
                        } else {
                            console.log(info); 
                        }
                    });
                    res.json({ success: true, message: 'E-mail has been sent to sms and E-mail ! ' });
                }

            }
        });
    });

    router.put('/resetpassword', function(req, res) {
        Owner.findOne({ email: req.body.email }).select('email active mobile resettoken name').exec(function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'E-mail was not found' }); 
            } else if (!user.active) {
                res.json({ success: false, message: 'Account has not yet been activated' }); 
            } else {
                user.resettoken = jwt.sign({ email: user.email }, secret, { expiresIn: '24h' }); 
                user.save(function(err) {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        var mailOptions = {
                            from: 'cs9287923@gmail.com',
                            to: user.email,
                            subject: 'Reset Password Request',
                            text: 'Hello ' + user.name + ', You recently request a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:8080/reset/' + user.resettoken,
                            html: 'Hello<strong> ' + user.name + '</strong>,<br><br>You recently request a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:8080/reset/' + user.resettoken + '">http://localhost:8080/reset/</a>'
                        };
                        transporter.sendMail(mailOptions, function(err, info){
                            if (err) {
                                console.log(err); 
                            } else {
                                console.log(info);
                                console.log('sent to: ' + user.email); 
                            }
                        });
                        res.json({ success: true, message: 'Please check your e-mail for password reset link' });
                    }
                });
            }
        });
    });

    router.get('/resetpassword/:token', function(req, res) {
        Owner.findOne({ resettoken: req.params.token }).select().exec(function(err, user) {
            if (err) throw err;
      
            var token = req.params.token;
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Password link has expired' }); 
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'Password link has expired' }); 
                    } else {
                        res.json({ success: true, user: user }); 
                    }
                }
            });        
        });
    });

    router.put('/savepassword', function(req, res) {
        Owner.findOne({ email: req.body.email }).select('email mobile name password resettoken').exec(function(err, user) {
            if (err) throw err;
            if (req.body.password == null || req.body.password == '') {
                res.json({ success: false, message: 'Password not provided' });
            } else {
                user.password = req.body.password;
                user.resettoken = false;
                user.save(function(err) {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        var mailOptions = {
                            from: 'cs9287923@gmail.com',
                            to: user.email,
                            subject: 'Password Recently Reset',
                            text: 'Hello ' + user.name + ', This e-mail is to notify you that your password was recently reset at localhost.com',
                            html: 'Hello<strong> ' + user.name + '</strong>,<br><br>This e-mail is to notify you that your password was recently reset at localhost.com'
                        };
                        transporter.sendMail(mailOptions, function(err, info){
                            if (err) console.log(err); 
                            else {
                                console.log(info);
                            }
                        });
                        res.json({ success: true, message: 'Password has been reset!' }); 
                    }
                });
            }
        });
    });

    router.use(function(req, res, next) {

        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' });
        }
    });
    
    router.post('/me', function(req, res) {
        res.send(req.decoded);
    });

    router.post('/upload', function(req, res) {
        Owner.findOne({ email: req.decoded.email }).exec(function(err, user) {
            if(err) {
                console.log(err);
            } else if(!user){
                res.json({ success: false, message: 'No user found'});
            }
             else{
                upload(req, res, function(err) {
                    if(err) {
                        if( err.code === 'LIMIT_FILE_SIZE'){
                            res.json({ success: false, message: 'file too large'});
                        } else if( err.code === 'filetype' ) {
                            res.json({ success: false, message: 'file invalid'});
                        } else {
                            console.log(err);
                            res.json({ success: false, message: 'file was not upload'});
                        }
                    } else {
                        if(!req.file) {
                            res.json({ success: false, message: 'no file selected'});
                        } else{
                            user.image = req.file.filename;
                            user.save(function(err){
                                if(err){
                                    console.log(err);
                                }
                            });
                            res.json({ success: true, message: 'file uploaded' });
                        }
                    }
                });
            }
        });
    });

    router.get("/show", function(req, res){
        Owner.findOne({ email: req.decoded.email }).exec(function(err, user) {
            if(err) {
                console.log(err);
            } else if(!user){
                res.json({ success: false, message: 'No user found'});
            } else {
                upload(req, res, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        Owner.findOne({ email: req.decoded.email }).exec(function(err, mainuser){
                            if(err) {
                                console.log(err);
                            } else{
                                res.json({ data: mainuser });
                            }
                        });
                    }
                });
            }
        });
    });

    router.post('/uploadhl', function(req, res) {
        Owner.findOne({ email: req.decoded.email }).exec(function(err, user) {
            if(err) {
                console.log(err);
            } else if(!user){
                res.json({ success: false, message: 'No user found'});
            }
             else{
                uploadlivingroom(req, res, function(err) {
                    if(err) {
                        if( err.code === 'LIMIT_FILE_SIZE'){
                            res.json({ success: false, message: 'Main-Hall file too large'});
                        } else if( err.code === 'filetype' ) {
                            res.json({ success: false, message: 'Main-Hall file invalid'});
                        } else {
                            console.log(err);
                            res.json({ success: false, message: 'Main-Hall file was not upload'});
                        }
                    } else {
                        if(!req.file) {
                            res.json({ success: false, message: 'Main-Hall no file selected'});
                        } else{
                            user.livingroom = req.file.filename;
                            user.save(function(err){
                                if(err){
                                    console.log(err);
                                }
                            });
                            res.json({ success: true, message: 'Main-Hall,' });
                        }
                    }
                });
            }
        });
    });
    
    router.post('/uploadfroom', function(req, res) {
        Owner.findOne({ email: req.decoded.email }).exec(function(err, user) {
            if(err) {
                console.log(err);
            } else if(!user){
                res.json({ success: false, message: 'No user found'});
            }
             else{
                uploadfroom(req, res, function(err) {
                    if(err) {
                        if( err.code === 'LIMIT_FILE_SIZE'){
                            res.json({ success: false, message: 'room1 file too large'});
                        } else if( err.code === 'filetype' ) {
                            res.json({ success: false, message: 'room1 file invalid'});
                        } else {
                            console.log(err);
                            res.json({ success: false, message: 'room1 file was not upload'});
                        }
                    } else {
                        if(!req.file) {
                            res.json({ success: false, message: 'room1 no file selected'});
                        } else{
                            user.froom = req.file.filename;
                            user.save(function(err){
                                if(err){
                                    console.log(err);
                                }
                            });
                            res.json({ success: true, message: ' Room1,' });
                        }
                    }
                });
            }
        });
    });
    router.post('/uploadsroom', function(req, res) {
        Owner.findOne({ email: req.decoded.email }).exec(function(err, user) {
            if(err) {
                console.log(err);
            } else if(!user){
                res.json({ success: false, message: 'No user found'});
            }
             else{
                uploadsroom(req, res, function(err) {
                    if(err) {
                        if( err.code === 'LIMIT_FILE_SIZE'){
                            res.json({ success: false, message: 'Room2 file too large'});
                        } else if( err.code === 'filetype' ) {
                            res.json({ success: false, message: 'Room2 file invalid'});
                        } else {
                            console.log(err);
                            res.json({ success: false, message: 'Room2 file was not upload'});
                        }
                    } else {
                        if(!req.file) {
                            res.json({ success: false, message: 'Room2 no file selected'});
                        } else{
                            user.sroom = req.file.filename;
                            user.save(function(err){
                                if(err){
                                    console.log(err);
                                }
                            });
                            res.json({ success: true, message: ' Room2,' });
                        }
                    }
                });
            }
        });
    });
    router.post('/uploadtroom', function(req, res) {
        Owner.findOne({ email: req.decoded.email }).exec(function(err, user) {
            if(err) {
                console.log(err);
            } else if(!user){
                res.json({ success: false, message: 'No user found'});
            }
             else{
                uploadtroom(req, res, function(err) {
                    if(err) {
                        if( err.code === 'LIMIT_FILE_SIZE'){
                            res.json({ success: false, message: 'Room3 file too large'});
                        } else if( err.code === 'filetype' ) {
                            res.json({ success: false, message: 'Room3 file invalid'});
                        } else {
                            console.log(err);
                            res.json({ success: false, message: 'Room3 file was not upload'});
                        }
                    } else {
                        if(!req.file) {
                            res.json({ success: false, message: 'Room3 no file selected'});
                        } else{
                            user.troom = req.file.filename;
                            user.save(function(err){
                                if(err){
                                    console.log(err);
                                }
                            });
                            res.json({ success: true, message: ' Room3,' });
                        }
                    }
                });
            }
        });
    });
    router.post('/uploadkichen', function(req, res) {
        Owner.findOne({ email: req.decoded.email }).exec(function(err, user) {
            if(err) {
                console.log(err);
            } else if(!user){
                res.json({ success: false, message: 'No user found'});
            }
             else{
                uploadkichen(req, res, function(err) {
                    if(err) {
                        if( err.code === 'LIMIT_FILE_SIZE'){
                            res.json({ success: false, message: 'kichen file too large'});
                        } else if( err.code === 'filetype' ) {
                            res.json({ success: false, message: 'kichen file invalid'});
                        } else {
                            console.log(err);
                            res.json({ success: false, message: 'kichen file was not upload'});
                        }
                    } else {
                        if(!req.file) {
                            res.json({ success: false, message: 'kichen no file selected'});
                        } else{
                            user.kichen = req.file.filename;
                            user.save(function(err){
                                if(err){
                                    console.log(err);
                                }
                            });
                            res.json({ success: true, message: ' kichen files uploaded' });
                        }
                    }
                });
            }
        });
    });
    router.get("/showhl", function(req, res){
        Owner.findOne({ email: req.decoded.email }).exec(function(err, user) {
            if(err) {
                console.log(err);
            } else if(!user){
                res.json({ success: false, message: 'No user found'});
            } else {
                uploadlivingroom(req, res, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        Owner.findOne({ email: req.decoded.email }).exec(function(err, mainuser){
                            if(err) {
                                console.log(err);
                            } else{
                                res.json({ data: mainuser });
                            }
                        });
                    }
                });
            }
        });
    });
    router.get("/showfroom", function(req, res){
        Owner.findOne({ email: req.decoded.email }).exec(function(err, user) {
            if(err) {
                console.log(err);
            } else if(!user){
                res.json({ success: false, message: 'No user found'});
            } else {
                uploadfroom(req, res, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        Owner.findOne({ email: req.decoded.email }).exec(function(err, mainuser){
                            if(err) {
                                console.log(err);
                            } else{
                                res.json({ data: mainuser });
                            }
                        });
                    }
                });
            }
        });
    });
    router.get("/showsroom", function(req, res){
        Owner.findOne({ email: req.decoded.email }).exec(function(err, user) {
            if(err) {
                console.log(err);
            } else if(!user){
                res.json({ success: false, message: 'No user found'});
            } else {
                uploadsroom(req, res, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        Owner.findOne({ email: req.decoded.email }).exec(function(err, mainuser){
                            if(err) {
                                console.log(err);
                            } else{
                                res.json({ data: mainuser });
                            }
                        });
                    }
                });
            }
        });
    });
    router.get("/showtroom", function(req, res){
        Owner.findOne({ email: req.decoded.email }).exec(function(err, user) {
            if(err) {
                console.log(err);
            } else if(!user){
                res.json({ success: false, message: 'No user found'});
            } else {
                uploadtroom(req, res, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        Owner.findOne({ email: req.decoded.email }).exec(function(err, mainuser){
                            if(err) {
                                console.log(err);
                            } else{
                                res.json({ data: mainuser });
                            }
                        });
                    }
                });
            }
        });
    });
    router.get("/showkichen", function(req, res){
        Owner.findOne({ email: req.decoded.email }).exec(function(err, user) {
            if(err) {
                console.log(err);
            } else if(!user){
                res.json({ success: false, message: 'No user found'});
            } else {
                uploadkichen(req, res, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        Owner.findOne({ email: req.decoded.email }).exec(function(err, mainuser){
                            if(err) {
                                console.log(err);
                            } else{
                                res.json({ data: mainuser });
                            }
                        });
                    }
                });
            }
        });
    });
    router.get('/renewToken/:email', function(req, res) {
        Owner.findOne({ email: req.params.email }).select('email, mobile').exec(function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'No user was found' }); 
            } else {
                var newToken = jwt.sign({ email: user.email, mobile: user.mobile,  }, secret, { expiresIn: '24h' }); 
                res.json({ success: true, token: newToken }); 
            }
        });
    });

    router.get('/typeh', function(req, res) {
        Owner.findOne({ email: req.decoded.email }, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'No user was found' }); 
            } else {
                res.json({ success: true, typeh: user.typeh }); 
            }
        });
    });

    router.get('/tenant', function(req, res) {
        Owner.find({}, function(err, users) {
            if(err) throw err;
            Owner.findOne({ email: req.decoded.email }, function(err, mainUser) {
                if (!mainUser) {
                    res.json({ success: false, message: 'No user found' });
                } else{
                    if (mainUser.typeh === 'tenantH') {
                        if (!users) {
                            res.json({ success: false, message: 'Users not found' }); 
                        } else {
                            res.json({ success: true, users: users, typeh: mainUser.typeh });
                        }
                    } else {
                        res.json({ success: false, message: 'Insufficient typeh' });
                    }
                }
            });
        }); 
    });

    router.get('/owner', function(req, res) {
        Owner.findOne({email : req.decoded.email}, function( err, user){
            if(err) throw err;
            if(!user){
                res.json({ success: false, message: 'No user found' });
            } else {
                res.json({ success: true, data: user });
            }
        })
    });

    router.post("/owner", function(req,res){
        Owner.findOne({email : req.decoded.email}, function( err, user){
            if(err) throw err;
            if(!user){
                res.json({ success: false, message: 'No user found' });
            } else if(user.confirmowner === 'house'){
                res.json({ success: false, message: 'You are already confirm to your house'});   
            } else{
                user.confirmowner = req.body.confirmowner;
                user.functionality = req.body.functionality;
                user.save(function(err){ 
                    if(err) {
                        console.log(err);
                    } else{
                        var mailOptions = {
                            from: 'HouseBuddy, cs9287923@gmail.com',
                            to: user.email,
                            subject: 'Your Confirm',
                            text: 'Hello ' + user.name + ', Your '+ user.housetype+' has been successfully confirm...!',
                            html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Your '+ user.housetype+' has been successfully confirm...!'
                        };
                        transporter.sendMail(mailOptions, function(err, info){
                            if (err) {
                              console.log(err);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                        });
                        res.json({ success: true, message: 'Account confirm for request Rent-House.'});
                    }
               });
            }
        });
    });

    router.post("/housecancel", function(req,res){
        Owner.findOne({email : req.decoded.email}, function( err, user){
            if(err) throw err;
            if(!user){
                res.json({ success: false, message: 'No user found' });
            } else{
                user.confirmowner = "cancel";
                user.save(function(err){ 
                    if(err) {
                        console.log(err);
                    } else{
                        res.json({ success: true, message: 'House Successfully Cancel...'});
                    }
               });
            }
        });
    });

    router.delete('/delete/:mobile', function(req, res) {
        var deletedUser = req.params.mobile;
        Owner.findOne({ email: req.decoded.email }, function(err, mainUser) {
            if(err) throw err;
            if (!mainUser) {
                res.json({ success: false, message: 'No user found' });
            } else {
                Owner.findOneAndRemove({ mobile: deletedUser }, function(err, user) {
                    if(err) throw err;
                    res.json({ success: true, message: 'Your Account successfully delete ' });
                });
            }
        });
    });

    router.get('/edit/:mobile', function(req, res) {
        var editUser = req.params.mobile; 
        Owner.findOne({ email: req.decoded.email }, function(err, mainUser) {
            if (err) throw err;
            if (!mainUser) {
                res.json({ success: false, message: 'No user found' });
            } else{
                Owner.findOne({ mobile: editUser }, function(err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: 'No user found' });
                    } else {
                        res.json({ success: true, user: user });
                    }
                });
            }
        });
    });

    router.put('/edit', function(req, res) {
        var editUser = req.body._id;
        Owner.findOne({ username: req.decoded.username }, function(err, mainUser) {
            if (err) throw err;
            if (!mainUser) {
                res.json({ success: false, message: "no user found" });
            } else{
                Owner.findOne({ _id: editUser }, function(err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: 'No user found' });
                    } else{
                        user.name = req.body.name;
                        user.mobile = req.body.mobile;
                        user.email = req.body.email;
                        user.address = req.body.address;
                        user.idcard = req.body.idcard;
                        user.save(function(err) {
                            if (err) {
                                console.log(err); 
                            } else {
                                res.json({ success: true, message: 'Your details has been updated!' });
                            }
                        });
                    }
                });
            }
        });
    });

    router.post('/getbooking', function(req, res){
        var b = new Book();

        b.oname = req.body.name;
        b.oemail = req.body.email;
        b.omobile = req.body.mobile;
        b.tname = req.body.tname;
        b.temail = req.body.temail;
        b.tmobile = req.body.tmobile;

        b.save(function(err){
            if(err){
                res.json({ success: true, message: err });
            } else{

                var mailOptions = {
                    from: 'cs9287923@gmail.com',
                    to: b.temail,
                    subject: 'House Booking',
                    text: 'Hello ' + b.tname + ', You recently booking for house. Please do not share your booking id:' + b._id,
                    html: 'Hello<strong> ' + b.tname + '</strong>,<br><br>You recently booking for house. Please do not share your id:' + b._id
                };
                transporter.sendMail(mailOptions, function(err, info){
                    if (err) console.log(err); 
                    else {
                        console.log(info);
                    }
                });

                var mailOptionsowner = {
                    from: 'cs9287923@gmail.com',
                    to: b.oemail,
                    subject: 'House Booking',
                    text: 'Hello ' + b.oname + ', Recently booked your house and check your booking id and tenant booking id are same. Please do not share your booking id:' + b._id,
                    html: 'Hello<strong> ' + b.oname + '</strong>,<br><br>Recently booked your house and check your booking id and tenant booking id are same. Please do not share your id:' + b._id
                };
                transporter.sendMail(mailOptionsowner, function(err, info){
                    if (err) console.log(err); 
                    else {
                        console.log(info);
                    }
                });
                res.json({ success: true, message: 'House is Booked Check your E-mail for confirmation.'});
            }
        });
    });

    return router;
}
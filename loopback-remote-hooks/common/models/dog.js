'use strict';

module.exports = function(Dog) {
	Dog.location = function(id, cb) {
    Dog.findOne({where: {id: id}}, function(err, dog) { 
  		cb(null, dog.location);
  	});    
  }
	Dog.sendEmailConfirmation = function(to) {
   
    Dog.app.models.Email.send({
      to: to,
      from: 'you@gmail.com',
      subject: 'my subject',
      text: 'my text',
      html: 'my <em>html</em>'
    }, function(err, mail) {
      console.log('email sent!');   
      
    });
  }
	Dog.remoteMethod(
      'location', 
      {
        accepts: {arg: 'id', type: 'number', required: true},
        http: {path: '/:id/location', verb: 'get'},
        returns: {arg: 'location', type: 'Object'}
      }
  );

  Dog.beforeRemote ('create', function (context, modelInstance, next) {
    let birthdate = new Date(context.req.body.birthdate).getTime();    
    if (birthdate == 'Invalid Date') {
      next(new Error(birthdate));
    }
    context.req.body.birthdate = birthdate;
    next();
  });

  Dog.afterRemote ('create', function (context, modelInstance, next) {    
    Dog.app.models.Owner.findOne({where: {id: '22'}}, function(err, owner) { 
      Dog.sendEmailConfirmation(owner.email);
      next();
    });
  });  

  Dog.afterRemoteError ('create', function (context, next) {    
    delete context.error.stack;
    next();
  });  
};

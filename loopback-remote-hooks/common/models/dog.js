'use strict';

module.exports = function(Dog) {

	Dog.sendEmailConfirmation = function(ownerEmail) { 
    Dog.app.models.Email.send({
      to: ownerEmail,
      from: 'confirmation@dogsarethebest.com',
      subject: 'So Success! Much Dog!',      
      html: 'OMG. Your dog is awesome. OMG.'
    }, function(err, mail) {
      console.log('confirmation email sent');         
    });
  }

  Dog.beforeRemote ('create', function (context, modelInstance, next) {
    let birthdate = new Date(context.req.body.birthdate).getTime();    
    if (isNaN(birthdate)) {
      next(new Error(birthdate));
    }
    context.req.body.birthdate = birthdate;
    next();
  });

  Dog.afterRemote ('create', function (context, modelInstance, next) {    
    let ownerId = context.result.ownerId;
    Dog.app.models.Owner.findOne({where: {id: ownerId}}, function(err, owner) { 
      Dog.sendEmailConfirmation(owner.email);
      next();
    });
  });  

  Dog.afterRemoteError ('create', function (context, next) {    
    context.error.message = 'Invalid birthdate format';
    delete context.error.stack;
    next();
  });  
};

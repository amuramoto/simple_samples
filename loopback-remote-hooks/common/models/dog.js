'use strict';

module.exports = function(Dog) {
	Dog.location = function(id, cb) {
    Dog.findOne({where: {id: id}}, function(err, dog) { 
  		cb(null, dog.location);
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

  Dog.beforeRemote ('create', function (context, instance, next) {
    let birthdate = new Date(context.req.body.birthdate);
    if (birthdate == 'Invalid Date') {
      console.log(next);
      next(new Error(birthdate));
    }
    context.req.body.birthdate = birthdate;
    next();
  })

  Dog.afterRemoteError ('create', function (context, next) {    
    delete context.error.stack;
    next();
  })  
};

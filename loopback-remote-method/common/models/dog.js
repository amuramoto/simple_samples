module.exports = function(Dog) {
	console.log(Dog);
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
};

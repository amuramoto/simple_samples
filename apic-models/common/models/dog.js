module.exports = function(Dog) {
  Dog.greet = function(msg, cb) {
    process.nextTick(function() {
      msg = msg || 'world';
      cb(null, 'Hello ' + msg);
    });
  };
};

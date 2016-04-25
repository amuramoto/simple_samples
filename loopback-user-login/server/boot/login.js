module.exports = function (app) {
	
	var UserModel = app.models.user;
	
	/** Auth Routes **/
	app.post('/login', function (req, res) {
		const userCredentials = {
			"username": req.body.username,
			"password": req.body.password;
		}
		login(userCredentials);
	});

	/** Auth functions **/
	function login = function (userCredentials) {
		UserModel.login(userCredentials, 'user', function (err, access_token) {
			if (err) {
				res.send('login failed')
			}
			res.json(access_token);
		});
	}
}
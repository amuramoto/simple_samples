module.exports = function (app) {
	
	var UserModel = app.models.User;
	
	/** Auth Routes **/
	app.post('/login', function (req, res) {		
		const userCredentials = {
			"username": req.body.username,
			"password": req.body.password
		}
		UserModel.login(userCredentials, 'user', function (err, access_token) {
			if (err) {
				res.status(401).json({"error": "login failed"});
				return;
			}
			res.json(access_token);
		});
	});

	app.get('/logout', function (req, res, next) {
		const access_token = req.query.access_token;
		if (!access_token) {
			res.status(400).json({"error": "access token required"})
		}
		UserModel.logout(access_token, function (err) {
			if (err) {
				res.status(404).json({"error": "logout failed"});
				return;
			}
			res.send("user has been logged out");
			
		});		
	});
}
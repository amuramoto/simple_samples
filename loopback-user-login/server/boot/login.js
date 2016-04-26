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

	app.post('/logout', function (req, res) {
		const access_token = req.access_token.id;
		if (!access_token) {
			res.status(400).json({"error": "access token required"})
		}
		logout(access_token);
	});

	/** Auth functions **/
	var login = function (userCredentials) {
		UserModel.login(userCredentials, 'user', function (err, access_token) {
			if (err) {
				res.status(401).json({"error": "login failed"});
			}
			res.json(access_token);
		});
	}

	var logout = function (access_token) {
		UserModel.logout(access_token, function (err) {
			if (err) {
				res.status(404).json({"error": "logout failed"})
			}
			res.send("user has been logged out");
		})		
	}
}
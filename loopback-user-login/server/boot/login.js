module.exports = function (app) {
	
	var UserModel = app.models.User;
	
	/** Auth Routes **/
	app.post('/login', function (req, res) {		
		const userCredentials = {
			"username": req.body.username,
			"password": req.body.password
		}
		UserModel.login(userCredentials, 'user', function (err, result) {			
			if (err) {
				Log.error(err);
				res.status(401).json({"error": "login failed"});
				return;
			}

			Log.info({
				"username": userCredentials.username,
				"timestamp": new Date.getTime(),
				"action": "login"
			});

			const access_token = result.id;
			const ttl = result.ttl;
			res.json({
				"token": access_token,
				"ttl": ttl
			});
		});
	});

	app.get('/logout', function (req, res, next) {
		const access_token = req.query.access_token;
		if (!access_token) {
			res.status(400).json({"error": "access token required"});
			return;
		}
		UserModel.logout(access_token, function (err) {
			if (err) {
				Log.error({
					"error": err,
					"timestamp": new Date.getTime()
				});
				res.status(404).json({"error": "logout failed"});
				return;
			}
			res.status(204);
		});		
	});
}
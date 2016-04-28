import { Component } from 'angular2/core';
import { Http, Response } from 'angular2/http';

@Component ({
	selector: 'loopback-login',
	templateUrl: 'app/loopback-login/loopback-login.html',
	styleUrls: ['app/loopback-login/loopback-login.css']
})

export class LBLoginComponent {
	
	username: string;
	password: string;

	constructor (private _http: Http) {}
	
	login() {
		var credentials = {
			"username": this.username,
			"password": this.password
		};
		this._http.post('', JSON.stringify(credentials))
			.map(
				(res: Response) => res,
				(err: string) => 'login failed'
			);
	}
}
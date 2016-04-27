import { Component } from 'angular2/core';
import { LBLoginService } from './loopback-login/loopback-login.service';
import { LBLoginComponent } from './loopback-login/loopback-login.component';

@Component({
    selector: 'my-app',
    templateUrl: '<loopback-login></loopback-login>',
    directives: [LBLoginComponent]
})
export class AppComponent { 

	constructor(private _lbLoginService: LBLoginService) {

	}

}

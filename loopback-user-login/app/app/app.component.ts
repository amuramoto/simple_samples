import { Component } from 'angular2/core';
import { LBLoginComponent } from './loopback-login/loopback-login.component';

@Component({
    selector: 'my-app',
    template: '<loopback-login></loopback-login>',
    directives: [LBLoginComponent]
})
export class AppComponent { 

	constructor() {

	}

}

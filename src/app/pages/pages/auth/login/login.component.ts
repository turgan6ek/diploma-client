import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {CometChat} from "@cometchat-pro/chat";
import {AuthService} from "../../../../services/auth.service";
import {User} from "../../../../models/user";
import {environment} from "../../../../../environments/environment.prod";
@Component({
    selector: 'app-login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    error = '';
    constructor(
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    public onLogin(userForm: NgForm): void {
        // document.getElementById('login-user-form').click();
        this.authService.loginUser(userForm.value).subscribe(
            (response: User) => {
                console.log(response);
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }
    get f() {
        return this.form.controls;
    }

    send() {
        this.authService
            .login(this.f.login.value, this.f.password.value)
            .subscribe(
                (res) => {
                    if (res) {
                        setTimeout(() => {
                            const role = this.authService.currentUserValue.roles;
                            const authKey = environment.cometchatAuthKey;
                            const uid = this.authService.currentUserValue.username;

                            CometChat.login(uid, authKey).then(
                                (user) => {
                                    console.log('Login Successful:', {user});
                                },
                                (error) => {
                                    console.log('Login failed with exception:', {error});
                                }
                            );
                            this.router.navigate(['/main-page']);
                        }, 1000);
                    } else {
                        this.error = 'Invalid Login';
                    }
                }
            );
        this.router.navigate(['/']);
    }

}

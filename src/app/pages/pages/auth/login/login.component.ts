import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import {fadeInUp400ms} from '../../../../../@vex/animations/fade-in-up.animation';
import {AuthService} from '../../../../services/auth.service';
import {environment} from '../../../../../environments/environment.prod';
import {CometChat} from '@cometchat-pro/chat';

@Component({
    selector: 'vex-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        fadeInUp400ms
    ]
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    submitted = false;
    error = '';
    inputType = 'password';
    visible = false;

    icVisibility = icVisibility;
    icVisibilityOff = icVisibilityOff;

    constructor(private router: Router,
                private fb: FormBuilder,
                private cd: ChangeDetectorRef,
                private snackbar: MatSnackBar,
                private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
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
                            console.log('login roles:: ');
                            console.log(role);
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
                            this.router.navigate(['/scrumboard/']);
                        }, 1000);
                    } else {
                        this.error = 'Invalid Login';
                    }
                },
                (error) => {
                    this.error = 'Login or password is incorrect!!!';
                    this.submitted = false;
                }
            );
        this.router.navigate(['/']);
    }

    toggleVisibility() {
        if (this.visible) {
            this.inputType = 'password';
            this.visible = false;
            this.cd.markForCheck();
        } else {
            this.inputType = 'text';
            this.visible = true;
            this.cd.markForCheck();
        }
    }
}

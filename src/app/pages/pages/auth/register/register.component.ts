import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fadeInUp400ms} from '../../../../../@vex/animations/fade-in-up.animation';
import {AuthService} from '../../../../services/auth.service';
import {environment} from '../../../../../environments/environment.prod';
import {CometChat} from '@cometchat-pro/chat';

@Component({
    selector: 'vex-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: [
        fadeInUp400ms
    ]
})
export class RegisterComponent implements OnInit {

    form: FormGroup;

    inputType = 'password';
    visible = false;

    icVisibility = icVisibility;
    icVisibilityOff = icVisibilityOff;

    constructor(private router: Router,
                private fb: FormBuilder,
                private cd: ChangeDetectorRef,
                private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            username: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            gender: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            cellPhone: ['', Validators.required],
            password: ['', Validators.required],
            roles: [['USER'], Validators.required],
        });
    }

    send() {
        this.authService.registerUser(this.form).subscribe(res => {
            const authKey = environment.cometchatAuthKey;
            const uid = this.form.getRawValue().username;
            const name = this.form.getRawValue().username;

            const user = new CometChat.User(uid);
            user.setName(name);
            CometChat.createUser(user, authKey).then(
                userLet => {
                    console.log('user created', userLet);
                }, error => {
                    console.log('error', error);
                }
            );
            this.router.navigate(['/login']);
        }, error => {
        });
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import icMail from '@iconify/icons-ic/twotone-mail';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'vex-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUp400ms]
})
export class ForgotPasswordComponent implements OnInit {

  form = this.fb.group({
    email: [null, Validators.required]
  });

  icMail = icMail;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  send() {
    this.authService.reset(this.form.value.email).subscribe();
    this.router.navigateByUrl('/login');
  }
}

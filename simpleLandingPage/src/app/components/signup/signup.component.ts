import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CrudService } from '../../crud.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(private crud: CrudService) {}
  submitted = false;
  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    cpassword: new FormControl('', [Validators.required]),
  });
  userSignupDetails = {
    username: '',
    email: '',
    password: '',
    cpassword: '',
  };

  handleSignup() {
    this.submitted = true;
    this.userSignupDetails.username =
      this.signupForm.get('username')?.value || '';
    this.userSignupDetails.email = this.signupForm.get('email')?.value || '';
    this.userSignupDetails.password =
      this.signupForm.get('password')?.value || '';
    this.userSignupDetails.cpassword =
      this.signupForm.get('cpassword')?.value || '';
    if (this.signupForm.valid) {
      this.crud.signup(this.userSignupDetails).subscribe((res) => {
        console.log(res);

        if (res.status === 200) {
          console.log('reset fields');
          this.signupForm.reset();
          this.submitted = false;
        }
        else{
          
        }
      });
    }
  }
}

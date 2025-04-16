import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { CrudService } from '../../crud.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../notification.service';
import { NotificationComponent } from '../../common/notification/notification.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    CommonModule,
    NotificationComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  errorLoginSumitted = false;
  submitted = false;
  credentials = { email: '', password: '' };
  error: string | null = null;

  constructor(
    public notificationService: NotificationService,
    private crud: CrudService,
    private router: Router,
    private authService: AuthService,
    private location: Location
  ) {}
  triggerNotification() {
    this.notificationService.showMessage('This is a test notification!');
  }
  handleSubmit(): void {
    this.submitted = true;
    this.credentials.email = this.loginForm.get('email')?.value || '';
    this.credentials.password = this.loginForm.get('password')?.value || '';

    if (this.loginForm.valid) {
      this.crud.login(this.credentials).subscribe({
        next: (res) => {
          console.log('Response from backend:', res);

          if (res.valid) {
            this.authService
              .loginTokenStore(this.credentials.email)
              .subscribe();
            // Redirect to dashboard after successful login
            this.router.navigate(['/dashboard']);
            this.location.replaceState(this.location.path()); // Refreshes the URL
            window.location.reload();
          } else {
            this.errorLoginSumitted = true;
            this.error = res.message || 'Invalid credentials';
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.error = err.error?.message || 'Invalid email or password';
        },
      });
    }
  }
}

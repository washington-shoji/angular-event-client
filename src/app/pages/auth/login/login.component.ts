import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { take } from 'rxjs';
import { ErrorAlertComponent } from '../../../components/error-alert/error-alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorAlertComponent],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginFrm: FormGroup;
  submitting: boolean = false;
  errorMessage: string | undefined = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginFrm = new FormGroup({});
  }
  ngOnInit(): void {
    this.loginFrm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['register']);
  }

  submit(): void {
    this.submitting = true;
    const formValue = this.loginFrm.value;
    this.authService
      .login(formValue)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.router.navigate(['admin']);
        },
        error: (error) => {
          this.submitting = false;
          this.errorMessage = error.errorMessage;
        },
        complete: () => {
          this.submitting = false;
        },
      });
  }

  onDismiss($event: boolean) {
    if ($event) {
      this.errorMessage = undefined;
    }
  }

  get loginForm(): FormGroup {
    return this.loginFrm;
  }

  get usernameControl(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}

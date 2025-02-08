import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ErrorAlertComponent } from '../../../components/error-alert/error-alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorAlertComponent],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerFrm: FormGroup;
  submitting: boolean = false;
  errorMessage: string | undefined = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerFrm = new FormGroup({});
  }

  ngOnInit(): void {
    this.registerFrm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['login']);
  }

  submit(): void {
    if (!this.registerFrm.valid) return;
    this.submitting = true;
    const formValue = this.registerFrm.value;
    this.authService
      .register(formValue)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.router.navigate(['login']);
        },
        error: (error) => {
          this.submitting = false;
          this.errorMessage = error.message;
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
    return this.registerFrm;
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

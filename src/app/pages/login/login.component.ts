import { Component, OnInit } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

type FormInput = {
  name: string;
  placeholder: string;
  type: string;
  validator: ValidatorFn | null;
};


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginFormInputs: FormInput[] = [
    { name: 'email', placeholder: 'Email', type: 'text', validator: Validators.compose([Validators.required, Validators.email]) },
    { name: 'password', placeholder: 'Password', type: 'password', validator: Validators.compose([Validators.required, Validators.minLength(8)]) },
  ];
  registerFormInputs: FormInput[] = [
    { name: 'name', placeholder: 'Nickname', type: 'text', validator: Validators.compose([Validators.required, Validators.minLength(3)]) },
    { name: 'email', placeholder: 'Email', type: 'text', validator: Validators.compose([Validators.required, Validators.email]) },
    { name: 'password', placeholder: 'Password', type: 'password', validator: Validators.compose([Validators.required, Validators.minLength(8)]) },
    { name: 'confirm_password', placeholder: 'Confirm Password', type: 'password', validator: Validators.required },
  ];

  formInputs: FormInput[] = [];
  isRegistering = false;

  isLoading = false;
  form!: FormGroup;
  errorMsg?: string;

  ngOnInit(): void {
    this.switchToLogin();
  }

  genForm() {
    let formGroup: any = {};
    for (let input of this.formInputs) {
      formGroup[input.name] = new FormControl('', input.validator);
    }
    if (this.isRegistering) {
      const confirmPassValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        return control.value.password === control.value.confirm_password ? null : { passwords_no_match: true };
      };
      this.form = new FormGroup(formGroup, { validators: confirmPassValidator });
    } else {
      this.form = new FormGroup(formGroup);
    }
  }

  switchToLogin() {
    this.isRegistering = false;
    this.formInputs = this.loginFormInputs;
    this.genForm();
  }

  switchToRegister() {
    this.isRegistering = true;
    this.formInputs = this.registerFormInputs;
    this.genForm();
  }

  trackErrors() {
    let msg = undefined;
    const controls = this.form.controls;
    for (let key in controls) {
      const control = controls[key];
      if (control.dirty && control.errors != null) {
        const error_key = Object.keys(control.errors)[0];
        let name = (key.charAt(0).toUpperCase() + key.substr(1).toLowerCase()).split('_').join(' ');
        let error = control.errors[error_key];
        msg = this.getErrorMessage(error_key, error, name);
        break;
      }
    }
    if (!msg && this.form.errors != null && this.form.errors['passwords_no_match']) {
      msg = this.getErrorMessage('passwords_no_match');
    }
    this.errorMsg = msg;
  }

  getErrorMessage(error_key: string, error?: any, name?: string) {
    let msg = 'Validation error!';
    switch (error_key) {
      case 'required': msg = `${name} is required!`; break;
      case 'email': msg = `${name} has wrong email format!`; break;
      case 'minlength': msg = `${name} has wrong length! Required length: ${error.requiredLength}`; break;
      case 'passwords_no_match': msg = `Passwords don't match!`; break;
    }
    return msg;
  }

  onSubmit() {
    if (this.form.invalid) return;
    if (this.isRegistering) {
      this.submitRegister();
    } else {
      this.submitLogin();
    }
  }

  submitLogin() {
    this.form.disable();
    this.isLoading = true;
    const formValue = this.form.value;
    // To Update: Change this Promise
    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() * 100 < 90) {
          reject();
        } else {
          resolve();
        }
      }, 2000);
    }).then(() => {
      // Reroute
      console.log("Reroute");
    }).catch(() => {
      this.errorMsg = 'Incorrect email or password!';
      this.form.enable();
      this.isLoading = false;
    });
  }

  submitRegister() {
    this.form.disable();
    this.isLoading = true;
    const formValue = this.form.value;
    // To Update: Change this Promise
    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() * 100 < 90) {
          reject();
        } else {
          resolve();
        }
      }, 2000);
    }).then(() => {
      // Reroute
      console.log("Reroute");
    }).catch(() => {
      // this.errorMsg = 'Incorrect email or password!';
      this.form.enable();
      this.isLoading = false;
    });
  }
}

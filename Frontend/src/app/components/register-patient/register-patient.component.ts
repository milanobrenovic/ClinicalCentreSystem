import { Patient } from './../../models/patient';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {
  private registerForm: FormGroup;
  private submitted = false;
  private patient: Patient;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
      repeatPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      healthInsuranceID: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    }, {
      validator: MustMatch('password', 'repeatPassword')
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  private onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));

  }

}

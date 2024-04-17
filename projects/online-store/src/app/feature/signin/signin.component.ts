import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="form">  
      <input formControlName="email" name="email" placeholder="Enter Email" type="email" data-testId="email">
      <div *ngIf="form.get('email')?.getError('required')" data-testId="email-required">This field is required</div>
      <div *ngIf="form.get('email')?.getError('email')" data-testId="email-invalid">This email is invalid</div>
      <input placeholder="Enter Your Password" type="password" data-testId="password">
      <button [disabled]="!form.valid" data-testId="signin-button">SignIn</button>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
})
export default class SignInComponent {
 form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('')
 })
}

import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <form>  
      <input required #emailField="ngModel" [(ngModel)]="email" name="email" placeholder="Enter Email" type="email" data-testId="email">
      <div *ngIf="emailField.hasError('required')" data-testId="email-required">This field is required</div>
      <input [(ngModel)]="password" name="password" placeholder="Enter Your Password" type="password" data-testId="password">
      <button data-testId="signin-button">SignIn</button>
    </form>
  `,
  standalone: true,
  imports: [FormsModule, NgIf],
})
export default class SignInComponent {
  email = '';
  password = '';
}

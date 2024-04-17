import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <form>
      <input [(ngModel)]="email" name="email" placeholder="Enter Email" type="email" data-testId="email">
      <input [(ngModel)]="password" name="password" placeholder="Enter Your Password" type="password" data-testId="password">
      <button data-testId="signin-button">SignIn</button>
    </form>
  `,
  standalone: true,
  imports: [FormsModule],
})
export default class SignInComponent {
  email = '';
  password = '';
}

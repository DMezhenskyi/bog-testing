import { Component } from '@angular/core';

@Component({
  template: `
    <input placeholder="Enter Email" type="email" data-testId="email">
    <input placeholder="Enter Your Password" type="password" data-testId="password">
  `,
  standalone: true,
  imports: [],
})
export default class SignInComponent {}

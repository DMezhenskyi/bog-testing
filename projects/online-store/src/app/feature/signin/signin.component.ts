import { Component } from '@angular/core';

@Component({
  template: `
    <input type="email" data-testId="email">
    <input type="password" data-testId="password">
  `,
  standalone: true,
  imports: [],
})
export default class SignInComponent {}

import { Component } from '@angular/core';

@Component({
  template: `
    <input type="text" data-testId="email">
    <input type="text" data-testId="password">
  `,
  standalone: true,
  imports: [],
})
export default class SignInComponent {}

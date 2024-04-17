import { TestBed } from "@angular/core/testing"
import SignInComponent from "./signin.component"
import { By } from "@angular/platform-browser";

describe('SigninComponent', () => {
  it('should render email & password input fields', () => {
    const {debugEl} = setup();

    const emailField = debugEl.query(By.css('[data-testId="email"]'));
    const passworField = debugEl.query(By.css('[data-testId="password"]'));

    expect(emailField).toBeTruthy();
    expect(passworField).toBeTruthy();
  })
})

function setup() {
  const fixture = TestBed.createComponent(SignInComponent);
  const debugEl = fixture.debugElement;

  // initial change detection
  fixture.detectChanges();

  return {
    fixture,
    debugEl
  }

}
import { TestBed } from "@angular/core/testing"
import SignInComponent from "./signin.component"
import { By } from "@angular/platform-browser";

describe('SigninComponent', () => {
  it('should render email & password input fields', () => {
    const { getFormElements} = setup();
    
    const {emailField, passworField} = getFormElements()
    
    expect(emailField).toBeTruthy();
    expect(passworField).toBeTruthy();
  })
  it('should verify that email & password have proper attributes', () => {
    const {getFormElements} = setup();
    
    const {emailField, passworField} = getFormElements();

    expect(emailField.nativeElement.type).toBe('email');
    expect(passworField.nativeElement.type).toBe('password');
  })
})

function setup() {
  const fixture = TestBed.createComponent(SignInComponent);
  const debugEl = fixture.debugElement;

  // initial change detection
  fixture.detectChanges();

  const getFormElements = () => ({
    emailField: debugEl.query(By.css('[data-testId="email"]')),
    passworField: debugEl.query(By.css('[data-testId="password"]'))
  })

  return {
    fixture,
    debugEl,
    getFormElements
  }

}
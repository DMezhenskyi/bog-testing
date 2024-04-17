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
  it('form controls should have placeholders', () => {
    const {getFormElements} = setup();
    const {emailField, passworField} = getFormElements();
    
    expect(emailField.nativeElement.placeholder).toMatch(/email/i)
    expect(passworField.nativeElement.placeholder).toMatch(/password/i)
  })
  it('should render a submit button', () => {
    const {getFormElements} = setup();
    const {button} = getFormElements();

    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toMatch(/signin/i)
  })
})

function setup() {
  const fixture = TestBed.createComponent(SignInComponent);
  const debugEl = fixture.debugElement;

  // initial change detection
  fixture.detectChanges();

  const getFormElements = () => ({
    emailField: debugEl.query(By.css('[data-testId="email"]')),
    passworField: debugEl.query(By.css('[data-testId="password"]')),
    button: debugEl.query(By.css('[data-testId="signin-button"]')),
  })

  return {
    fixture,
    debugEl,
    getFormElements
  }

}
import { TestBed } from "@angular/core/testing"
import SignInComponent from "./signin.component"
import { By } from "@angular/platform-browser";

describe('SigninComponent', () => {
  describe('Form Appearance', () => {
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
  describe('Form Validation', () => {
    it('should show/hide error message if email is empty', async () => {
      const {getFormElements, fixture, debugEl} = setup();
      await fixture.whenStable(); // await when all pending microtasks finished

      const {emailField} = getFormElements();

      emailField.nativeElement.value = ''
      emailField.nativeElement.dispatchEvent(new InputEvent('input'));
      fixture.detectChanges();

      let requiredMsgEl = debugEl.query(By.css('[data-testId="email-required"'));
      expect(requiredMsgEl).toBeTruthy();
      expect(requiredMsgEl.nativeElement.textContent).toMatch(/required/i);

      emailField.nativeElement.value = 'non empty'
      emailField.nativeElement.dispatchEvent(new InputEvent('input'));
      fixture.detectChanges();
      // re-query the same element
      requiredMsgEl = debugEl.query(By.css('[data-testId="email-required"'));
      expect(requiredMsgEl).toBeNull()
    })
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
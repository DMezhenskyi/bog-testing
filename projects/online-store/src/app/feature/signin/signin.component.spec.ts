import { TestBed } from "@angular/core/testing"
import SignInComponent from "./signin.component"
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

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
      const {getFormElements, fixture, debugEl, simulateUserValueInput} = setup();
      await fixture.whenStable(); // await when all pending microtasks finished

      const {emailField} = getFormElements();

      simulateUserValueInput(emailField, '');

      let requiredMsgEl = debugEl.query(By.css('[data-testId="email-required"'));
      
      expect(requiredMsgEl).toBeTruthy();
      expect(requiredMsgEl.nativeElement.textContent).toMatch(/required/i);

      simulateUserValueInput(emailField, 'non empty');

      // re-query the same element
      requiredMsgEl = debugEl.query(By.css('[data-testId="email-required"'));
      expect(requiredMsgEl).toBeNull()
    })
    it('should show/hide error message if email is not valid', async () => {
      const {getFormElements, fixture, simulateUserValueInput, debugEl} = setup();
      await fixture.whenStable();
      const {emailField} = getFormElements();
  
      simulateUserValueInput(emailField, 'this is not an email');
      
      let requiredMsgEl = debugEl.query(By.css('[data-testId="email-invalid"'));
      expect(requiredMsgEl).toBeTruthy();
      expect(requiredMsgEl.nativeElement.textContent).toMatch(/invalid/i);
  
      simulateUserValueInput(emailField, 'email@valid.com');
      requiredMsgEl = debugEl.query(By.css('[data-testId="email-invalid"'));
      expect(requiredMsgEl).toBeNull()
    })
    it('should disable button if the form is invalid', async () => {
      const {getFormElements, fixture, simulateUserValueInput, debugEl} = setup();
      await fixture.whenStable();
      
      const {emailField} = getFormElements();
      simulateUserValueInput(emailField, '');
      
      const {button} = getFormElements();
      expect(button.nativeElement.disabled).toBe(true)
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

  const simulateUserValueInput = (field: DebugElement, value: string) => {
    field.nativeElement.value = value;
    field.nativeElement.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();
  }

  return {
    fixture,
    debugEl,
    getFormElements,
    simulateUserValueInput
  }

}
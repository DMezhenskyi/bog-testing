import { TestBed } from "@angular/core/testing"
import SignInComponent from "./signin.component"

describe('SigninComponent', () => {

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
import { TestBed } from "@angular/core/testing";
import { ChipComponent } from "./chip.component";

describe('ChipComponent', () => {

  it('should render properly the chip text', () => {
    const {fixture, debugElement, componentRef} = setup();
  });
  
  it.todo('should render render the remove icon when removable is true');
  
  it.todo('should be focusable');
  
  it.todo(
    'when removed is clicked, should emit the removed event with the chip instance'
  );
});

function setup() {
  const fixture = TestBed.createComponent(ChipComponent);
  const componentRef = fixture.componentRef;
  const debugElement = fixture.debugElement;

  fixture.detectChanges();

  return { fixture, componentRef, debugElement };
}
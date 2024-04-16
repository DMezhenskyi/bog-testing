import { TestBed } from "@angular/core/testing";
import { ChipComponent } from "./chip.component";
import { By } from "@angular/platform-browser";
import { firstValueFrom } from "rxjs";
import { Component } from "@angular/core";

describe('ChipComponent', () => {

  it('should render properly the chip text', () => {
    // SETUP
    const { debugElement, fixture, componentRef } = setup();
    const testString = 'Angular Test';
    
    // ACTION
    componentRef.setInput('text', testString);
    fixture.detectChanges();

    // ASSERTION
    const chipText = debugElement.query(By.css('[data-testId="text"]'));
    expect(chipText.nativeElement.textContent).toContain(testString);
  });
  it('should render render the remove icon when removable is true', () => {
    const { debugElement, fixture, componentRef } = setup();

    componentRef.setInput('removable', true);
    fixture.detectChanges();

    const removeIcon = debugElement.query(By.css('[data-testId="remove"]'));
    expect(removeIcon).toBeTruthy();
  });
  it('should be focusable', () => {
    const { debugElement } = setup();
    expect(debugElement.nativeElement.tabIndex).toBe(0);
  });
  
  // it('when removed is clicked, should emit the removed event with the chip instance', () => {
  //   let expectedValue: ChipComponent<any> | undefined;
  //   const { fixture, debugElement, componentRef } = setup();
  //   fixture.componentInstance.removed.subscribe(
  //     (chip) => (expectedValue = chip)
  //   );

  //   componentRef.setInput('removable', true);
  //   fixture.detectChanges();

  //   const removeIcon = debugElement.query(By.css('.chip-remove-icon'));
  //   removeIcon.nativeElement.click();

  //   expect(expectedValue).toBe(fixture.componentInstance);
  // });

  it('when removed is clicked, should emit the removed event with the chip instance', async () => {
    const { fixture, debugElement, componentRef } = setup();
    const outputValue = firstValueFrom(fixture.componentInstance.removed);

    componentRef.setInput('removable', true);
    fixture.detectChanges();

    const removeIcon = debugElement.query(By.css('.chip-remove-icon'));
    removeIcon.nativeElement.click();

    expect(await outputValue).toBe(fixture.componentInstance);
  });
});

function setup() {
  const fixture = TestBed.createComponent(ChipComponent);
  const componentRef = fixture.componentRef;
  const debugElement = fixture.debugElement;

  fixture.detectChanges();

  return { fixture, componentRef, debugElement };
}

// introducing the TestHost strategy

describe('ChipComponent | Test Host', () => {
  it('should render properly the chip text', () => {
    const { fixture, getChipDebugEl, hostComponentInstance } = setupTestHost();
    const testString = 'Angular Test';

    hostComponentInstance.text = testString;
    fixture.detectChanges();

    expect(getChipDebugEl().nativeElement.textContent).toContain(testString);
  });
  it('when removed is clicked, should emit the removed event with the chip instance', () => {
    const { fixture, hostComponentInstance, hostDebugEl, getChipDebugEl } =
      setupTestHost();

    hostComponentInstance.removable = true;
    fixture.detectChanges();

    const removeIcon = hostDebugEl.query(By.css('[data-testId="remove"]'));
    removeIcon.nativeElement.click();

    expect(hostComponentInstance.removedChip).toBe(
      getChipDebugEl().componentInstance
    );
  });
});

function setupTestHost() {
  @Component({
    standalone: true,
    imports: [ChipComponent],
    template: `
      <df-chip
        [text]="text"
        [removable]="removable"
        (removed)="onRemoved($event)"
      ></df-chip>
    `,
  })
  class TestHostComponent {
    text = 'Angular Test';
    removable = false;
    removedChip: ChipComponent<any> | undefined;

    onRemoved(chip: ChipComponent<any>) {
      this.removedChip = chip;
    }
  }

  const fixture = TestBed.createComponent(TestHostComponent);
  const hostDebugEl = fixture.debugElement;
  const hostComponentInstance = fixture.componentInstance;

  const getChipDebugEl = () => hostDebugEl.query(By.directive(ChipComponent));

  fixture.detectChanges();

  return { fixture, hostComponentInstance, hostDebugEl, getChipDebugEl };
}

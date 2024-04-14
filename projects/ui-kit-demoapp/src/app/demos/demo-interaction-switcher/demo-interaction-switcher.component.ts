import { Component } from '@angular/core';
import { ButtonComponent, CanDisableDirective } from 'ui-kit';

@Component({
  standalone: true,
  imports: [CanDisableDirective, ButtonComponent],
  template: `
    <p class="element-description">
      Directive that can disable interactive (focusable) elements and prevents
      click events on it
    </p>
    <div class="showcase">
      <h5>Disabled Links & Buttons</h5>
      <div class="state">
        <p>Prevent default behavior on click if disabled</p>
        <button
          (click)="disabled = !disabled"
          dfButton
          appearance="stroked"
          style="margin-right: 15px;"
        >
          {{ disabled ? 'Enable' : 'Disable' }}
        </button>
        <a href="/interaction-switcher" dfCanDisable [disabled]="disabled"
          >Disabled Link</a
        >
      </div>
    </div>
  `,
})
export class DemoInteractionSwitcherComponent {
  disabled = true;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChipComponent } from 'ui-kit';

@Component({
  standalone: true,
  imports: [ChipComponent],
  template: ` <p class="element-description">Chip Component</p>
    <div class="showcase">
      <h5>Chip Variants:</h5>
      <div class="state">
        <p>Default Chip</p>
        <df-chip text="Angular" value="angular" />
      </div>
      <div class="state">
        <p>Removable Chip</p>
        <df-chip
          text="ReactJS"
          value="reactjs"
          removable
          (removed)="onRemove($event)"
        />
      </div>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoChipComponent {
  onRemove(e: ChipComponent<string>) {
    alert(`Removed Chip: ${e.value}`);
  }
}

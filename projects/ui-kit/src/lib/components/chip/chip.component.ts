import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { HasTabIndexDirective } from '../../directives/has-tab-index/has-tab-index.directive';
import { toBooleanProperty } from '../../utils/type-coercion';

@Component({
  selector: 'df-chip',
  standalone: true,
  imports: [NgIf],
  template: `
    <span class="chip-text">
      {{ text }}
    </span>
    <i (click)="onClick()" *ngIf="removable" class="chip-remove-icon"></i>
  `,
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: HasTabIndexDirective,
      inputs: ['tabIndex', 'pauseFocusing'],
    },
  ],
})
export class ChipComponent<T> {
  @Input({ transform: toBooleanProperty })
  removable = false;

  @Input()
  value: T | null = null;

  @Input({ required: true })
  text = '';

  @Output()
  removed = new EventEmitter<ChipComponent<T>>();

  onClick() {
    if (this.removable) {
      this.removed.emit(this);
    }
  }
}

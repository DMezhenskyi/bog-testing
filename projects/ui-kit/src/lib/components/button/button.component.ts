import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { toBooleanProperty } from '../../utils/type-coercion';
import { CanDisableDirective } from '../../directives/can-disable/can-disable.directive';
import { HasTabIndexDirective } from '../../directives/has-tab-index/has-tab-index.directive';

export const BUTTON_CLASSES = {
  solid: 'solid-button',
  stroked: 'stroked-button',
  dashed: 'dashed-button',
} as const;

export type ButtonAppearance = keyof typeof BUTTON_CLASSES;
export type ButtonClasses = (typeof BUTTON_CLASSES)[ButtonAppearance];

@Component({
  selector: 'button[dfButton],a[dfButton]',
  imports: [NgIf],
  template: `
    <span class="button-label">
      <ng-content></ng-content>
    </span>
    <span *ngIf="loading" class="button-loader"></span>
  `,
  standalone: true,
  styleUrls: ['./button.component.scss'],
  hostDirectives: [
    {
      directive: CanDisableDirective,
      inputs: ['disabled'],
    },
    {
      directive: HasTabIndexDirective,
      inputs: ['tabIndex', 'pauseFocusing: disabled'],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  appearance: ButtonAppearance = 'solid';

  @Input()
  set loading(value: any) {
    this.#loading = toBooleanProperty(value);
  }
  get loading(): boolean {
    return this.#loading;
  }
  #loading = false;

  @HostBinding('class')
  protected get buttonTypeHostClass(): ButtonClasses {
    return BUTTON_CLASSES[this.appearance];
  }
}

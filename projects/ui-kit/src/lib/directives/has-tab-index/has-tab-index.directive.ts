import { Directive, HostBinding, Input } from '@angular/core';
import { toNumberProperty } from '../../utils/type-coercion';

type TabIndexInput = number | string;

@Directive({
  selector: '[dfHasTabIndex]',
  standalone: true,
})
export class HasTabIndexDirective {
  @Input()
  pauseFocusing = false;

  @Input()
  @HostBinding('attr.tabindex')
  set tabIndex(value: TabIndexInput) {
    this.#tabIndex = toNumberProperty(value);
  }
  get tabIndex() {
    return this.pauseFocusing ? -1 : this.#tabIndex;
  }
  #tabIndex: number = 0;
}

/**
 * -----------------------
 * Home Work!
 * -----------------------
 * 1. Create a TestHost component in your spec file and configure test module.
 * 2. In TestHost component template create a focusable element like e.g. a button.
 * 3. Apply HasTabIndexDirective directive to this button.
 * 4. Write a test case that verifies that if "pauseFocusing" is set to "true" then
 * focusing on this element isn't possible.
 * 5. Write a test case that verifies that if "pauseFocusing" is set to "false" then
 * it is possible to focus on the element.
 *
 */

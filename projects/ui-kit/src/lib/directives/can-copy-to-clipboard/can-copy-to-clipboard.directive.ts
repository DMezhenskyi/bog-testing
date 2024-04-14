import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject,
} from '@angular/core';
import { ClipboardService } from './clipboard.service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Directive({
  selector: '[dfCanCopyToClipboard]',
  standalone: true,
  exportAs: 'dfClipboard',
})
export class CanCopyToClipboardDirective {
  #clipboard = inject(ClipboardService);
  #el: ElementRef = inject(ElementRef);

  #copied = new ReplaySubject<boolean>();
  copied$ = this.#copied.asObservable();

  @Input()
  text = '';

  get #computedSelectionText() {
    const currentSelection = window.getSelection()?.toString();
    const innerElText = this.#el.nativeElement.innerText;
    return this.text || currentSelection || innerElText;
  }

  @HostListener('click', ['$event'])
  copy(e?: Event) {
    e?.preventDefault();
    this.#el.nativeElement.select?.();
    this.#clipboard
      .copy(this.#computedSelectionText)
      .then(() => this.#copied.next(true));
  }

  clear() {
    this.#clipboard.clear().then(() => this.#copied.next(false));
  }
}

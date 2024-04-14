import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ButtonComponent, CanCopyToClipboardDirective } from 'ui-kit';

@Component({
  standalone: true,
  imports: [CanCopyToClipboardDirective, AsyncPipe, NgIf, ButtonComponent],
  template: `
    <p class="element-description">
      This directives allow to copy text of any element
    </p>
    <div class="showcase">
      <h5>Should copy text provided:</h5>
      <div class="state">
        <button
          dfCanCopyToClipboard
          #clipboard="dfClipboard"
          text="https://localhost/demo/product/1"
          dfButton
        >
          {{ (clipboard.copied$ | async) ? 'Copied' : 'Share Product Link' }}
        </button>
        <button
          dfButton
          appearance="stroked"
          style="margin-left: 12px"
          (click)="clipboard.clear()"
        >
          Reset Selection
        </button>
      </div>
    </div>
    <div class="showcase">
      <h5>Should copy element content if not text provided:</h5>
      <div class="state">
        <button dfCanCopyToClipboard #clipboard2="dfClipboard" dfButton>
          This text should be copied on click
        </button>
        <span class="copied-text" *ngIf="clipboard2.copied$ | async"
          >Text Copied...</span
        >
      </div>
    </div>
    <div class="showcase">
      <h5>Should copy selected text in textarea:</h5>
      <div class="state">
        <input
          dfCanCopyToClipboard
          #clipboard3="dfClipboard"
          value="Click to copy it to clipboard ..."
        />
        <span class="copied-text" *ngIf="clipboard3.copied$ | async"
          >Text Copied...</span
        >
      </div>
    </div>
  `,
  styles: [
    `
      .copied-text {
        display: block;
        font-size: 11px;
      }
    `,
  ],
})
export class DemoClipboardComponent {}

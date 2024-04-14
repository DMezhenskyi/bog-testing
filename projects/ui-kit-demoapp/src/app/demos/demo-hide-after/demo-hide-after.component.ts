import { Component } from '@angular/core';
import { HideAfterDirective } from 'ui-kit';

@Component({
  standalone: true,
  imports: [HideAfterDirective],
  template: `
    <p class="element-description">
      It is a <b>Structural Directive</b> which removes view after some period
      of time and replaces with an alternative view.
    </p>
    <div class="showcase">
      <h5>Should hide banner after 5 seconds and alt view:</h5>
      <div class="state">
        <div
          class="banner"
          *hideAfter="9000; then altBanner; let counter = counter"
        >
          This Banner will be removed in
          <span class="counter">{{ counter }}</span> seconds...
        </div>
        <ng-template #altBanner>
          <div class="alt-banner">Here was a banner...</div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      .banner,
      .alt-banner {
        padding: 15px 30px;
        box-sizing: border-box;
        text-align: center;
        width: 100%;
        background: #daf8ff;
        border: #89d7e9 solid 1px;
        border-radius: 10px;
        min-width: 300px;
      }
      .alt-banner {
        border-style: dashed;
        background: transparent;
      }
    `,
  ],
})
export class DemoHideAfterComponent {}

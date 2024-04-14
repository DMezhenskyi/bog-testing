import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from 'ui-kit';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <p class="element-description">A simple button component.</p>
    <div class="showcase">
      <h5>Button Appearance:</h5>
      <div class="state">
        <p>Default button</p>
        <button dfButton>Decoded Frontend</button>
      </div>
      <div class="state">
        <p>Stroked Button</p>
        <button dfButton appearance="stroked">Decoded Frontend</button>
      </div>
      <div class="state">
        <p>Solid Button</p>
        <button dfButton appearance="solid">Decoded Frontend</button>
      </div>
    </div>
    <div class="showcase">
      <h5>Loading Button:</h5>
      <div class="state">
        <p>Stroked Button</p>
        <button
          (click)="loading = !loading"
          dfButton
          appearance="stroked"
          style="margin-right: 10px;"
        >
          {{ loading ? 'Stop Loading' : 'Start Loading' }}
        </button>
        <button dfButton [loading]="loading">Decoded Frontend</button>
      </div>
    </div>
    <div class="showcase">
      <h5>Link Button:</h5>
      <div class="state">
        <p>Link Button</p>
        <a href="/" dfButton>🔗 Decoded Frontend</a>
      </div>
    </div>
    <div class="showcase">
      <h5>Disabled Button:</h5>
      <div class="state">
        <p>Disabled Link Button</p>
        <a href="/" [disabled]="true" dfButton>🔗 Decoded Frontend</a>
      </div>
      <div class="state">
        <p>Disabled Button</p>
        <button href="/" [disabled]="true" dfButton>Decoded Frontend</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoButtonComponent {
  loading = true;
}

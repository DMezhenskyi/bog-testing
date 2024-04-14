import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  ButtonComponent,
  CanCopyToClipboardDirective,
  ChipComponent,
  ProductUrlPipe,
} from 'ui-kit';
import { DemoButtonComponent } from './demos/demo-button/demo-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    ButtonComponent,
    CanCopyToClipboardDirective,
    ProductUrlPipe,
    ChipComponent,
    DemoButtonComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  loading = false;

  removeChip(chip: ChipComponent<string>) {
    console.log(chip);
  }
}

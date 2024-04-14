import { Routes } from '@angular/router';
import { DemoButtonComponent } from './demos/demo-button/demo-button.component';
import { DemoChipComponent } from './demos/demo-chip/demo-chip.component';
import { DemoInteractionSwitcherComponent } from './demos/demo-interaction-switcher/demo-interaction-switcher.component';
import { DemoProductLinkerComponent } from './demos/demo-product-linker/demo-product-linker.component';
import { DemoClipboardComponent } from './demos/demo-clipboard/demo-clipboard.component';
import { DemoHideAfterComponent } from './demos/demo-hide-after/demo-hide-after.component';
import { DemoItemCardComponent } from './demos/demo-item-card/demo-item-card.component';

export const routes: Routes = [
  { path: '', redirectTo: 'button', pathMatch: 'full' },
  { path: 'button', component: DemoButtonComponent },
  { path: 'chip', component: DemoChipComponent },
  { path: 'interaction-switcher', component: DemoInteractionSwitcherComponent },
  { path: 'hide-after', component: DemoHideAfterComponent },
  { path: 'product-linker', component: DemoProductLinkerComponent },
  { path: 'clipboard', component: DemoClipboardComponent },
  { path: 'item-card', component: DemoItemCardComponent },
];

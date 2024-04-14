import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  async copy(string: string) {
    try {
      //... some additional logic
      await navigator.clipboard.writeText(string.trim());
      return true;
    } catch (error) {
      return false;
    }
  }
  async clear() {
    try {
      await navigator.clipboard.writeText('');
      return true;
    } catch (error) {
      return false;
    }
  }
}

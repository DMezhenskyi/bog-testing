import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SignInService {
  signIn(values: { email: string | null, password: string | null }) {}
}
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { PRODUCT_BASE_URL } from 'ui-kit';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: PRODUCT_BASE_URL,
      useValue: window.location.host, //localhost:4200
    },
  ],
};

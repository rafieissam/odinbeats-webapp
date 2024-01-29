import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgIconsConfig } from '@ng-icons/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgIconsConfig({
      size: "1.2rem",
      color: "#f4f3ee",
    }),
    provideRouter(routes),
  ]
};

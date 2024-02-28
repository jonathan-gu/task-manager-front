import '@angular/compiler'
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import 'moment/locale/fr';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations()
  ]
})
  .catch((err) => console.error(err));

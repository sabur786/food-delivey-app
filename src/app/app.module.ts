import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';


// Non-standalone wrapper used to bootstrap the application when using an NgModule
@Component({
  selector: 'app-root-wrapper',
  template: '<app-root></app-root>'
})
export class RootWrapperComponent {}

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes),
     AppComponent],
  declarations: [RootWrapperComponent],
  bootstrap: [RootWrapperComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreLayoutComponent } from './components/core-layout/core-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    CoreLayoutComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [CoreLayoutComponent]
})
export class AppModule { }

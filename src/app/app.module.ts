import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreLayoutComponent } from './components/core-layout/core-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgregarMenuComponent } from './components/agregar-menu/agregar-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//Angular Material:
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptores/TokenInterceptor';
import { EstasSeguroComponent } from './components/estas-seguro/estas-seguro.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PopupSugerirComponent } from './components/popup-sugerir/popup-sugerir.component';


@NgModule({
  declarations: [
    CoreLayoutComponent,
    NavbarComponent,
    MenuComponent,
    HomeComponent,
    RegistrarseComponent,
    PerfilComponent,
    IniciarSesionComponent,
    AgregarMenuComponent,
    EstasSeguroComponent,
    PopupSugerirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    NgbModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true }
  ],
  bootstrap: [CoreLayoutComponent]

})
export class AppModule { }

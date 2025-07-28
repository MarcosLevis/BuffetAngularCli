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
import { MatTableModule } from '@angular/material/table';

//Modelos
import { PerfilComponent } from './components/perfil/perfil.component';
import { AgregarSugerenciaComponent } from './components/agregar-sugerencia/agregar-sugerencia.component';
import { SugerenciaComponent } from './components/sugerencia/sugerencia.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { ProductoComponent } from './components/producto/producto.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ResponsableComponent } from './components/responsable/responsable.component';
import { AgregarTurnoComponent } from './components/agregar-turno/agregar-turno.component';
import { AsignarTurnoComponent } from './components/asignar-turno/asignar-turno.component';
import { CompraComponent } from './components/compra/compra.component';

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
    AgregarSugerenciaComponent,
    SugerenciaComponent,
    AgregarProductoComponent,
    ProductoComponent,
    PedidoComponent,
    ResponsableComponent,
    AgregarTurnoComponent,
    AsignarTurnoComponent,
    CompraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
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

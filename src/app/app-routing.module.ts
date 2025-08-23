import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SugerenciaComponent } from './components/sugerencia/sugerencia.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ResponsableComponent } from './components/responsable/responsable.component';
// import { CompraComponent } from './components/compra/compra.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
    { path: 'home', component: HomeComponent},
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard], data: { roles: ['cliente'] }},
    { path: 'sugerencia', component: SugerenciaComponent, canActivate: [AuthGuard], data: { roles: ['responsable-turno','administrador'] }},
    { path: 'producto', component: ProductoComponent, canActivate: [AuthGuard] },
    { path: 'responsable', component: ResponsableComponent, canActivate: [AuthGuard], data: { roles: ['administrador'] }},
    /*{ path: 'compra', component: CompraComponent},*/
    { path: '**', redirectTo: 'home'},
  ];
//cambiar
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
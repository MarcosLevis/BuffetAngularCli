import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SugerenciaComponent } from './components/sugerencia/sugerencia.component';
import { ProductoComponent } from './components/producto/producto.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'menu', component: MenuComponent, /*canActivate: [AuthGuard]*/},
    { path: 'home', component: HomeComponent},
    { path: 'perfil', component: PerfilComponent},
    { path: 'sugerencia', component: SugerenciaComponent},
    { path: 'producto', component: ProductoComponent},
    { path: '**', redirectTo: 'home'},
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    // Ejemplo de rutas:
    { path: '', component: HomeComponent },
    { path: 'menu', component: MenuComponent }
    // { path: 'about', component: AboutComponent },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
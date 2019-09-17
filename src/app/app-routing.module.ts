import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/home/orders/orders.component';
import { ItemsComponent } from './components/home/items/items.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const HomeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: 'items', component: ItemsComponent},
      {path: '', redirectTo: 'items', pathMatch: 'full'},
      { path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuardGuard]

      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuardGuard]
      }
    ]
  },
  { path: '**',  redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(HomeRoutes)
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }

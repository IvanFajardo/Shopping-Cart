import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/home/header/header.component';
import { ItemsComponent } from './components/home/items/items.component';
import { DatabaseService } from './services/database.service';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { AuthService } from './services/auth.service';
import { ConfigService, loadConfigurations } from './services/config.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartReducer } from 'src/app/store/cart/cart.reducer';
import { CartEffects } from 'src/app/store/cart/cart.effects';
import { InventoryReducer } from 'src/app/store/inventory/inventory.reducer';
import { InventoryEffects } from 'src/app/store/inventory/inventory.effects';
import { ProfileComponent } from './components/profile/profile.component';
import { CustomerReducer } from './store/customer/customer.reducer';
import { CustomerEffects } from './store/customer/customer.effects';
import { OrdersComponent } from './components/home/orders/orders.component';
import { OrdersReducer } from './store/orders/orders.reducer';
import { OrdersEffects } from './store/orders/orders.effects';
import { SearchStore } from './store/search/search.action';
import { SearchReducer } from './store/search/search.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    ItemsComponent,
    CartComponent,
    ProfileComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forRoot({
      cart: CartReducer,
      inventory: InventoryReducer,
      customer: CustomerReducer,
      orders: OrdersReducer,
      search: SearchReducer
    }),
    EffectsModule.forRoot([CartEffects, InventoryEffects, CustomerEffects, OrdersEffects])
  ],
  providers: [ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigurations,
      deps: [ConfigService],
      multi: true
    }, AuthGuardGuard, AuthService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

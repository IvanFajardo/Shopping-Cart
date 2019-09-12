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
import { CartReducer } from 'src/app/store/cart.reducer';
import { CartEffects } from 'src/app/store/cart.effects';
import { InventoryReducer } from 'src/app/store/inventory.reducer';
import { InventoryEffects } from 'src/app/store/inventory.effects';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    ItemsComponent,
    CartComponent,
    ProfileComponent
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
      inventory: InventoryReducer
    }),
    EffectsModule.forRoot([CartEffects, InventoryEffects])
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

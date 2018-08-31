import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';


import {
  ApiService,
  AuthGuard,
  HeaderComponent,
  FooterComponent,
  JwtService,
  ProfilesService,
  SharedModule,
  UserService,
 } from './shared';

 const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    HomeModule,
    ProfileModule,
    rootRouting,
    SettingsModule,
    SharedModule,
  ],
providers: [
    ApiService,
    AuthGuard,
    JwtService,
    ProfilesService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

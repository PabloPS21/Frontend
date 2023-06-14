import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SigInComponent } from './components/sig-in/sig-in.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { SuccesDialogComponent } from './shared/succes-dialog/succes-dialog.component';
import { LogoComponent } from './shared/logo/logo.component';
import { LogOutDialogComponent } from './shared/log-out-dialog/log-out-dialog.component';
import { InicioComponent } from './components/pages/inicio/inicio.component';
import { SiteInfoComponent } from './components/pages/site-info/site-info.component';
import { GameCardComponent } from './components/games/game-card/game-card.component';
import { GameDetailsComponent } from './components/games/game-details/game-details.component';
import { RecentlyAddedComponent } from './components/pages/recently-added/recently-added.component';

import {RouterModule, Routes} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';


//Configuración de las rutas
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SigInComponent },
  { path: 'main', component: PrincipalComponent, children: [
    { path: 'inicio', component: InicioComponent },
    { path: 'info', component: SiteInfoComponent},
    { path: 'recently-added', component: RecentlyAddedComponent},
    { path: 'game-detail', component: GameDetailsComponent},
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigInComponent,
    PrincipalComponent,
    SuccesDialogComponent,
    LogoComponent,
    LogOutDialogComponent,
    InicioComponent,
    SiteInfoComponent,
    GameCardComponent,
    GameDetailsComponent,
    RecentlyAddedComponent
  ],
  imports: [
    [RouterModule.forRoot(routes)],
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatGridListModule,
    MatRadioModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

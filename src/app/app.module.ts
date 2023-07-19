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
import { NewTemplateComponent } from './components/news/new-template/new-template.component';
import { SearchResultsComponent } from './components/pages/search-results/search-results.component';

import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
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
import {NgxPaginationModule} from 'ngx-pagination';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import { GenresComponent } from './components/pages/genres/genres.component';
import { GenresCardComponent } from './components/games/genres-card/genres-card.component';
import { GamesResultsComponent } from './components/pages/games-results/games-results.component';
import { DevelopersComponent } from './components/pages/developers/developers.component';
import { DeveloperCardComponent } from './components/games/developer-card/developer-card.component';
import { GamesResultsDevelopersComponent } from './components/pages/games-results-developers/games-results-developers.component';
import { RegisteredGamesComponent } from './components/pages/registered-games/registered-games.component';
import { RegisterdGameCardComponent } from './components/games/registerd-game-card/registerd-game-card.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';





//Configuración de las rutas
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SigInComponent },
  { path: 'main', component: PrincipalComponent, children: [
    { path: 'home', component: InicioComponent },
    { path: 'info', component: SiteInfoComponent},
    { path: 'recently-added', component: RecentlyAddedComponent},
    { path: 'game-detail', component: GameDetailsComponent},
    { path: 'search-results', component: SearchResultsComponent},
    { path: 'genres', component: GenresComponent},
    { path: 'developers', component: DevelopersComponent},
    { path: 'games-result', component: GamesResultsComponent},
    { path: 'games-result-developer', component: GamesResultsDevelopersComponent},
    { path: 'my-games', component: RegisteredGamesComponent}
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
    RecentlyAddedComponent,
    NewTemplateComponent,
    SearchResultsComponent,
    GenresComponent,
    GenresCardComponent,
    GamesResultsComponent,
    DevelopersComponent,
    DeveloperCardComponent,
    GamesResultsDevelopersComponent,
    RegisteredGamesComponent,
    RegisterdGameCardComponent,
    ConfirmDialogComponent,
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
    MatRadioModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {path: 'home', loadChildren: './pages/home/home.module#HomeModule'},
  {path: 'matches', loadChildren: './pages/matches/matches.module#MatchesModule'},
  {path: 'standings', loadChildren: './pages/standings/standings.module#StandingsModule'},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

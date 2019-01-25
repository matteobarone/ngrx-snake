import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: '/intro',
}, {
  path: 'intro',
  loadChildren: './features/intro/intro.module#IntroModule',
}, {
  path: 'game',
  loadChildren: './features/game/game.module#GameModule',
}, {
  path: '**',
  pathMatch: 'full',
  redirectTo: 'intro',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

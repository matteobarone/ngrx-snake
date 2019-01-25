import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { IntroComponent } from './containers/intro/intro.component';

const routes: Routes = [{
  path: '',
  component: IntroComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroRoutingModule {
}

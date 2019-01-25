import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';
import { effects, CustomSerializer } from './store';

@NgModule({
  imports: [
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    StoreModule.forFeature('router', fromRouter.routerReducer),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  providers: [{provide: RouterStateSerializer, useClass: CustomSerializer}]
})
export class RouterModule {
}

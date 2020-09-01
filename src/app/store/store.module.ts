import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '@environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthFeatureStoreModule } from './auth';
import { PostFeatureStoreModule } from './post';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictStateImmutability: true,
          strictActionTypeUniqueness: true,
        },
      },
    ),
    EffectsModule.forRoot(),
    environment.storeInstrument,
    PostFeatureStoreModule,
    AuthFeatureStoreModule,
  ],
})
export class AppStoreModule {}

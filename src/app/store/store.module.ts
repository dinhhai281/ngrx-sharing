import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '@environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthFeatureStoreModule } from './auth';
import { PostFeatureStoreModule } from './post';
import { CollectionFeatureModule } from './collection';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
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
    CollectionFeatureModule,
  ],
})
export class AppStoreModule {}

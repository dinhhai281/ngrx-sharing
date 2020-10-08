import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CollectionEffects } from './collection.effect';
import { COLLECTION_FEATURE_KEY, reducer } from './collection.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(COLLECTION_FEATURE_KEY, reducer),
    EffectsModule.forFeature([CollectionEffects]),
  ],
})
export class CollectionFeatureModule {}

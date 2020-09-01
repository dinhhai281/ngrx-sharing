import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PostEffects } from './post.effect';
import { POST_FEATURE_KEY, reducer } from './post.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(POST_FEATURE_KEY, reducer),
    EffectsModule.forFeature([PostEffects]),
  ],
})
export class PostFeatureStoreModule {}

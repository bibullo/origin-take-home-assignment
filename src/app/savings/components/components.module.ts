import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AmountInputComponent } from './amount-input/amount-input.component';

@NgModule({
  declarations: [AmountInputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AmountInputComponent],
})
export class ComponentsModule {}

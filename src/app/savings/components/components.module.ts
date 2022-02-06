import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AmountInputComponent } from './amount-input/amount-input.component';
import { MonthYearPickerComponent } from './month-year-picker/month-year-picker.component';

@NgModule({
  declarations: [AmountInputComponent, MonthYearPickerComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AmountInputComponent, MonthYearPickerComponent],
})
export class ComponentsModule {}

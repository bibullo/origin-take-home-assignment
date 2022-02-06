import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { AmountInputComponent } from './amount-input/amount-input.component';
import { MonthYearPickerComponent } from './month-year-picker/month-year-picker.component';

@NgModule({
  declarations: [AmountInputComponent, MonthYearPickerComponent],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskModule],
  exports: [AmountInputComponent, MonthYearPickerComponent],
})
export class ComponentsModule {}

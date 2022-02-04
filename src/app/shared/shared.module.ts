import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';

const sharedComponents = [LayoutComponent];

@NgModule({
  declarations: sharedComponents,
  imports: [CommonModule, RouterModule],
  exports: sharedComponents,
})
export class SharedModule {}

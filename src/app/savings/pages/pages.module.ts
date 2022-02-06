import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';

import { PlanSimulationScreenComponent } from './plan-simulation-screen/plan-simulation-screen.component';

@NgModule({
  declarations: [PlanSimulationScreenComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'origin-plan-simulation-screen',
  templateUrl: './plan-simulation-screen.component.html',
  styleUrls: ['./plan-simulation-screen.component.scss'],
})
export class PlanSimulationScreenComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void>;

  initialDate: Date;
  reachDate: Date;

  amount: FormControl;

  monthNames: string[];

  monthsBetweenDates!: number;
  monthlyAmount!: number;
  monthlyLabel!: string;
  reachDateLabel!: string;

  constructor() {
    this.unsubscribe$ = new Subject();

    this.initialDate = new Date();
    this.initialDate.setMonth(this.initialDate.getMonth() + 1);
    this.reachDate = new Date(this.initialDate);

    this.amount = new FormControl(0);
    this.amount.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.setMonthlyAmount();
        this.setMonthlyLabel();
      });

    this.monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }

  ngOnInit(): void {
    this.setVariables();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setMonthsBetweenDates(): void {
    const currentMonth = this.initialDate.getMonth();
    const goalMonth = this.reachDate.getMonth();

    const yearDifference =
      (this.reachDate.getFullYear() - this.initialDate.getFullYear()) * 12;

    const totalMonthsBetweenDates =
      yearDifference - currentMonth + goalMonth + 1;

    this.monthsBetweenDates = totalMonthsBetweenDates;
  }

  setMonthlyAmount(): void {
    const amountValue = this.amount.value / this.monthsBetweenDates;

    this.monthlyAmount = amountValue;
  }

  setMonthlyLabel(): void {
    const monthDistance =
      this.amount.value > 0 && this.amount.value !== ''
        ? this.monthsBetweenDates
        : 0;

    const label =
      monthDistance === 1
        ? `${monthDistance} month deposit`
        : `${monthDistance} monthly deposits`;

    this.monthlyLabel = label;
  }

  setReachDateLabel(): void {
    const reachMonth = this.monthNames[this.reachDate.getMonth()];

    const reachYear = this.reachDate.getFullYear();

    this.reachDateLabel = `${reachMonth} ${reachYear}.`;
  }

  setVariables(): void {
    this.setMonthsBetweenDates();
    this.setMonthlyAmount();
    this.setMonthlyLabel();
    this.setReachDateLabel();
  }
}

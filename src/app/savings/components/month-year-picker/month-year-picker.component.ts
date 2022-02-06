import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'origin-month-year-picker',
  templateUrl: './month-year-picker.component.html',
  styleUrls: ['./month-year-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthYearPickerComponent {
  @HostBinding('tabindex') tabindex = 0;

  @HostListener('keydown.ArrowLeft', ['$event'])
  handleLeftArrowKeyDown() {
    this.changeMonth(-1);
  }

  @HostListener('keydown.ArrowRight', ['$event'])
  handleRightArrowKeyDown() {
    this.changeMonth(1);
  }

  @Input() initialDate!: Date;
  @Input() reachDate!: Date;
  @Output() reachDateChange: EventEmitter<Date>;

  @Input() monthNames!: string[];

  constructor() {
    this.reachDateChange = new EventEmitter();
  }

  changeMonth(direction: number): void {
    if (
      this.reachDate.getTime() === this.initialDate.getTime() &&
      direction === -1
    ) {
      return;
    }

    const reachMonth = this.reachDate.getMonth();

    this.reachDate.setMonth(reachMonth + direction);

    this.reachDateChange.emit(this.reachDate);
  }
}

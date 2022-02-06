import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MonthYearPickerComponent } from './month-year-picker.component';

describe('MonthYearPickerComponent', () => {
  let component: MonthYearPickerComponent;
  let fixture: ComponentFixture<MonthYearPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthYearPickerComponent],
    })
      .overrideComponent(MonthYearPickerComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthYearPickerComponent);
    component = fixture.componentInstance;

    component.initialDate = new Date(2022, 2, 2);
    component.initialDate.setMonth(component.initialDate.getMonth() + 1);
    component.reachDate = new Date(component.initialDate);

    component.monthNames = [
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a changeMonth function', () => {
    const getMonthSpy = jest.spyOn(component.reachDate, 'getMonth');
    const setMonthSpy = jest.spyOn(component.reachDate, 'setMonth');
    const dateChangeEmitSpy = jest.spyOn(component.reachDateChange, 'emit');

    // spies shouldn't be called for "direction = -1" when reachDate and initialDate are equal

    component.changeMonth(-1);
    expect(getMonthSpy).not.toHaveBeenCalled();
    expect(setMonthSpy).not.toHaveBeenCalled();
    expect(dateChangeEmitSpy).not.toHaveBeenCalled();

    // spies should be called on every other scenario

    let reachMonth = component.reachDate.getMonth();

    component.changeMonth(1);

    expect(getMonthSpy).toHaveBeenCalled();
    expect(setMonthSpy).toHaveBeenCalledWith(reachMonth + 1);
    expect(dateChangeEmitSpy).toHaveBeenCalledWith(component.reachDate);

    getMonthSpy.mockClear();
    setMonthSpy.mockClear();
    dateChangeEmitSpy.mockClear();

    reachMonth = component.reachDate.getMonth();

    component.changeMonth(-1);

    expect(getMonthSpy).toHaveBeenCalled();
    expect(setMonthSpy).toHaveBeenCalledWith(reachMonth - 1);
    expect(dateChangeEmitSpy).toHaveBeenCalledWith(component.reachDate);
  });

  it('it should have a tabindex attribute equal to 0', () => {
    const tabindexAttribute = fixture.nativeElement.getAttribute('tabindex');

    expect(tabindexAttribute).toBe('0');
  });

  it('should call for changeMonth function on keyboard arrow key press', () => {
    const changeMonthSpy = jest.spyOn(component, 'changeMonth');

    const leftArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    const rightArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });

    fixture.nativeElement.dispatchEvent(leftArrowEvent);
    expect(changeMonthSpy).toHaveBeenCalledWith(-1);

    changeMonthSpy.mockClear();

    fixture.nativeElement.dispatchEvent(rightArrowEvent);
    expect(changeMonthSpy).toHaveBeenCalledWith(1);
  });

  it('should call for changeMonth function on template arrow icon click', () => {
    const changeMonthSpy = jest.spyOn(component, 'changeMonth');

    const leftArrow = fixture.debugElement.query(
      By.css('.c-month-year-picker__left-arrow')
    );
    const rightArrow = fixture.debugElement.query(
      By.css('.c-month-year-picker__right-arrow')
    );

    leftArrow.nativeElement.click();
    expect(changeMonthSpy).toHaveBeenCalledWith(-1);

    changeMonthSpy.mockClear();

    rightArrow.nativeElement.click();
    expect(changeMonthSpy).toHaveBeenCalledWith(1);
  });

  it('it should have correct template month name', () => {
    const monthLabel = fixture.debugElement.query(
      By.css('.c-month-year-picker__dates--month')
    );

    expect(monthLabel.nativeElement.textContent.trim()).toBe('April');

    component.changeMonth(2);
    fixture.detectChanges();

    expect(monthLabel.nativeElement.textContent.trim()).toBe('June');

    component.changeMonth(-1);
    fixture.detectChanges();

    expect(monthLabel.nativeElement.textContent.trim()).toBe('May');
  });

  it('it should have correct template month year', () => {
    const yearLabel = fixture.debugElement.query(
      By.css('.c-month-year-picker__dates--year')
    );

    expect(yearLabel.nativeElement.textContent.trim()).toBe('2022');

    component.changeMonth(24);
    fixture.detectChanges();

    expect(yearLabel.nativeElement.textContent.trim()).toBe('2024');

    component.changeMonth(-12);
    fixture.detectChanges();

    expect(yearLabel.nativeElement.textContent.trim()).toBe('2023');
  });
});

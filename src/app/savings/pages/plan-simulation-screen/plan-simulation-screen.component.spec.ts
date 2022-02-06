import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { AmountInputComponent } from '../../components/amount-input/amount-input.component';
import { MonthYearPickerComponent } from '../../components/month-year-picker/month-year-picker.component';
import { PlanSimulationScreenComponent } from './plan-simulation-screen.component';

describe('PlanSimulationScreenComponent', () => {
  let component: PlanSimulationScreenComponent;
  let fixture: ComponentFixture<PlanSimulationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PlanSimulationScreenComponent,
        AmountInputComponent,
        MonthYearPickerComponent,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanSimulationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a initialDate with a month greater than currentDate', () => {
    const currentDate = new Date();

    const expectedInitialDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + 1)
    );
    const expectedInitialDateMonth = expectedInitialDate.getMonth();
    const initialDateMonth = component.initialDate.getMonth();

    expect(initialDateMonth).toBe(expectedInitialDateMonth);
  });

  it('should have an initialDate equal to reachDate', () => {
    const initialDate = component.initialDate;
    const reachDate = component.reachDate;

    expect(initialDate).toEqual(reachDate);
  });

  it('should call for setMonthlyAmount and setMonthlyLabel on valueChanges of the amount control', () => {
    const setMonthlyAmountSpy = jest.spyOn(component, 'setMonthlyAmount');
    const setMonthlyLabelSpy = jest.spyOn(component, 'setMonthlyLabel');

    component.amount.setValue(25000);

    expect(setMonthlyAmountSpy).toHaveBeenCalledTimes(1);
    expect(setMonthlyLabelSpy).toHaveBeenCalledTimes(1);

    component.amount.setValue(50000);

    expect(setMonthlyAmountSpy).toHaveBeenCalledTimes(2);
    expect(setMonthlyLabelSpy).toHaveBeenCalledTimes(2);
  });

  it('should call for setVariables on init', () => {
    const setVariablesSpy = jest.spyOn(component, 'setVariables');

    component.ngOnInit();

    expect(setVariablesSpy).toHaveBeenCalled();
  });

  it('should have a setMonthsBetweenDates function', () => {
    expect(component.monthsBetweenDates).toBe(1);

    let reachMonth = component.reachDate.getMonth();
    component.reachDate.setMonth(reachMonth + 13);

    component.setMonthsBetweenDates();

    expect(component.monthsBetweenDates).toBe(14);

    reachMonth = component.reachDate.getMonth();
    component.reachDate.setMonth(reachMonth + 12);

    component.setMonthsBetweenDates();

    expect(component.monthsBetweenDates).toBe(26);
  });

  it('should have a setMonthlyAmount function', () => {
    component.amount.setValue(25000);

    let reachMonth = component.reachDate.getMonth();
    component.reachDate.setMonth(reachMonth + 39);

    component.setMonthsBetweenDates();
    component.setMonthlyAmount();

    expect(component.monthlyAmount).toBe(625);

    reachMonth = component.reachDate.getMonth();
    component.reachDate.setMonth(reachMonth - 8);

    component.setMonthsBetweenDates();
    component.setMonthlyAmount();

    expect(component.monthlyAmount).toBe(781.25);
  });

  it('should have a setMonthlyLabel function', () => {
    const expectedLabelForEmptyAmounts = '0 monthly deposits';

    component.amount.setValue(0);
    component.setMonthlyLabel();

    expect(component.monthlyLabel).toBe(expectedLabelForEmptyAmounts);

    component.amount.setValue('');
    component.setMonthlyLabel();

    expect(component.monthlyLabel).toBe(expectedLabelForEmptyAmounts);

    const expectedLabelForOneMonthAmounts = '1 month deposit';

    component.amount.setValue(2500);
    component.setMonthlyLabel();

    expect(component.monthlyLabel).toBe(expectedLabelForOneMonthAmounts);

    const expectedLabelForMultipleMonths = '2 monthly deposits';

    let reachMonth = component.reachDate.getMonth();
    component.reachDate.setMonth(reachMonth + 1);
    component.setMonthsBetweenDates();
    component.setMonthlyLabel();

    expect(component.monthlyLabel).toBe(expectedLabelForMultipleMonths);
  });

  it('should have a setReachDateLabel function', () => {
    component.reachDate = new Date(2025, 5, 5);
    let expectedLabel = 'June 2025.';

    component.setReachDateLabel();

    expect(component.reachDateLabel).toBe(expectedLabel);

    component.reachDate = new Date(2027, 7, 7);
    expectedLabel = 'August 2027.';

    component.setReachDateLabel();

    expect(component.reachDateLabel).toBe(expectedLabel);
  });

  it('should have a setVariables function', () => {
    const setMonthsSpy = jest.spyOn(component, 'setMonthsBetweenDates');
    const setMonthlyAmountSpy = jest.spyOn(component, 'setMonthlyAmount');
    const setMonthlyLabelSpy = jest.spyOn(component, 'setMonthlyLabel');
    const setReachDateLabelSpy = jest.spyOn(component, 'setReachDateLabel');

    component.setVariables();

    expect(setMonthsSpy).toHaveBeenCalled();
    expect(setMonthlyAmountSpy).toHaveBeenCalled();
    expect(setMonthlyLabelSpy).toHaveBeenCalled();
    expect(setReachDateLabelSpy).toHaveBeenCalled();
  });

  it('it should bind amount into AmountInputComponent', () => {
    const amountInputComponent = fixture.debugElement.query(
      By.css('.c-plan-simulation-screen__amount-input')
    ).componentInstance as AmountInputComponent;

    expect(amountInputComponent.amount).toBe(component.amount);
  });

  it('it should bind initialDate, reachDate and monthNames into MonthYearPickerComponent', () => {
    const monthYearPickerComponent = fixture.debugElement.query(
      By.css('.c-plan-simulation-screen__month-year-picker')
    ).componentInstance as MonthYearPickerComponent;

    expect(monthYearPickerComponent.initialDate).toBe(component.initialDate);
    expect(monthYearPickerComponent.reachDate).toBe(component.reachDate);
    expect(monthYearPickerComponent.monthNames).toBe(component.monthNames);
  });

  it('it should call for setVariables on reachDateChange event', () => {
    const setVariablesSpy = jest
      .spyOn(component, 'setVariables')
      .mockImplementation(() => {});

    const monthYearPickerComponent = fixture.debugElement.query(
      By.css('.c-plan-simulation-screen__month-year-picker')
    );

    monthYearPickerComponent.triggerEventHandler('reachDateChange', {});

    expect(setVariablesSpy).toHaveBeenCalled();
  });

  it('should have a formatted monthlyAmount', () => {
    const monthlyAmount = fixture.debugElement.query(
      By.css('.c-plan-simulation-screen__results-monthly--value')
    );

    component.amount.setValue(2500);
    let reachMonth = component.reachDate.getMonth();
    component.reachDate.setMonth(reachMonth + 31);
    component.setVariables();
    fixture.detectChanges();

    expect(component.monthlyAmount).toBe(78.125);
    expect(monthlyAmount.nativeElement.textContent.trim()).toBe('$78.13');
  });

  it('should have a formatted amount value', () => {
    const amountValue = fixture.debugElement.query(
      By.css('.c-plan-simulation-screen__results-description--amount')
    );

    component.amount.setValue('');
    fixture.detectChanges();

    expect(amountValue.nativeElement.textContent.trim()).toBe('$0');

    component.amount.setValue(0);
    fixture.detectChanges();

    expect(amountValue.nativeElement.textContent.trim()).toBe('$0');

    component.amount.setValue(25000);
    fixture.detectChanges();

    expect(amountValue.nativeElement.textContent.trim()).toBe('$25,000');
  });
});

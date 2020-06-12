import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Components
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { DynamicFormControlService } from '../dynamic-form/dynamic-form-control.service';
import { Subscription } from 'rxjs';

// Models
import { FormRow } from '../form/form-row';
import { FormBase } from '../form/form-base';
import { StepperElement } from './stepper-element.model';


@Component({
  selector: 'lib-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements OnInit, OnDestroy {

  @Input() stepElements: StepperElement<string>[];

  @Output() fromValueChange = new EventEmitter<FormGroup>();
  @Output() submitedEvent = new EventEmitter();

  widthExp: number;
  currentStepIndex: number; // Diventa Input / Output
  touchedSteps: number[];
  validSteps: number[];
  stepForm: FormGroup;
  formStateSubscription: Subscription;

  // Map Detalis
  mapId: string;
  latitude = 42.50;
  longitude = 12.50;
  latSub: Subscription;
  lngSub: Subscription;
  mapGeoJson: any;
  mapBboxPolygon: any;
  mapShapePolygon: any;
  mapFormFields: FormBase<any>[];

  // Form elements
  formRows: FormRow<string>[];

  constructor(private qcs: DynamicFormControlService) { }

  ngOnInit(): void {
    this.widthExp = 100 / this.stepElements.length;

    // step a 1
    this.currentStepIndex = 1;
    this.validSteps = [];
    this.touchedSteps = [];

    this.formRows = [].concat(...this.stepElements.map(e => e.fromRows));

    const elements = [].concat(...this.formRows.map(e => e.items));

    this.stepForm = this.qcs.toFormGroup(elements);

    this.mapId = this.getMapId();
    const mapFormRows = this.stepElements.find(elem => elem.mapId).fromRows;
    this.mapFormFields = [].concat(...mapFormRows.map(e => e.items));

    // Form Latiture
    this.stepForm.controls.latitude?.setValue(42.50);
    this.latSub = this.stepForm.controls.latitude?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(newVal => {
        this.latitude = newVal;
      });

    // Form Longitude
    this.stepForm.controls.longitude?.setValue(12.50);
    this.lngSub = this.stepForm.controls.longitude?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(newVal => {
        this.longitude = newVal;
      });

    this.formStateSubscription = this.stepForm.valueChanges
      .subscribe(newValue => {
        const mapFieldsKeys = this.mapFormFields.map(e => e.key);
        const mapBoxingValues = [];

        mapFieldsKeys.forEach(key => {
          const fieldValue = this.stepForm.value[key];
          if (typeof fieldValue === 'object') {
            mapBoxingValues.push(this.stepForm.value[key]);
          }

          if (fieldValue?.shapelight) {  // TODO: Fix name
            this.mapShapePolygon = fieldValue.shapelight;
          }
        });

        if (mapBoxingValues?.length > 0) {
          this.mapBboxPolygon = mapBoxingValues[mapBoxingValues.length - 1]?.boundingbox; // TODO: Fix Name
        }

        this.fromValueChange.emit(newValue);
      });
  }

  ngOnDestroy(): void {
    if (this.formStateSubscription) {
      this.formStateSubscription.unsubscribe();
    }
    if (this.latSub) {
      this.latSub.unsubscribe();
    }
    if (this.lngSub) {
      this.lngSub.unsubscribe();
    }
  }

  get stepRows(): FormRow<string>[] {
    const rows = this.stepElements.find(e => e.index === this.currentStepIndex).fromRows;
    return rows;
  }

  getItems(formRow: FormRow<string>) {
    const items = formRow.items.filter(item => {
      let showCondition = false;
      // Se tipo semplice
      if (item.parentShowCondition?.parentKey &&
        item.parentShowCondition?.parentValue === this.stepForm.get(item.parentShowCondition.parentKey).value) {
        showCondition = true;
      }

      // Se oggetto
      if (item.parentShowCondition?.parentKey
        && typeof item.parentShowCondition?.parentValue === 'object'
        // tslint:disable-next-line: max-line-length
        && JSON.stringify(item.parentShowCondition?.parentValue) === JSON.stringify(this.stepForm.get(item.parentShowCondition.parentKey).value)
      ) {
        showCondition = true;
      }

      if (!item.parentShowCondition || showCondition) {
        this.stepForm.get(item.key)?.setValidators(Validators.required);
        return item;
      } else {
        this.stepForm.get(item.key)?.setValidators(null);
      }
    });
    return items;
  }

  getPratentField(itemKey: string): FormBase<string> {
    const elements = [].concat(...this.formRows.map(e => e.items));
    return elements.find(e => e.parentFieldKey === itemKey);
  }

  isValidStep(stepIndex: number) {
    const step = this.validSteps.find(e => e === stepIndex);
    if (step) { return true; }
    return false;
  }

  setValidStep(stepIndex: number) {
    // ritorna true se tutti campi di quello step sono validi altrimenti false
    // prendi le chiavi dei campi di quel particolare step
    const rowsItems = this.stepElements
      .find(e => e.index === stepIndex).fromRows
      .map(e => e.items);
    const rowsElements = [].concat(...rowsItems);
    const fieldsKeys = rowsElements.map(e => e.key);
    const controls = this.stepForm.controls;

    const filtered = Object.keys(controls)
      .filter(key => fieldsKeys.includes(key) && controls[key].valid)
      .reduce((obj, key) => {
        obj[key] = controls[key];
        return obj;
      }, {});

    if (arraysEqual(fieldsKeys, Object.keys(filtered))) {
      const index = this.validSteps.indexOf(stepIndex, 0);
      if (index === -1) {
        this.validSteps.push(stepIndex);
      }
    } else {
      const index = this.validSteps.indexOf(stepIndex, 0);
      if (index > -1) {
        this.validSteps.splice(index, 1);
      }
    }
  }

  isTouchedStep(stepIndex: number) {
    const step = this.touchedSteps.find(e => e === stepIndex);
    if (step) { return true; }
    return false;
  }

  prevStep() {
    this.stepForm.updateValueAndValidity();
    this.setValidStep(this.currentStepIndex);
    this.touchedSteps.push(this.currentStepIndex);
    this.currentStepIndex--;
  }

  nextStep() {
    this.stepForm.updateValueAndValidity();
    this.setValidStep(this.currentStepIndex);
    this.touchedSteps.push(this.currentStepIndex);
    this.currentStepIndex++;
  }

  onSubmit() {
    this.submitedEvent.emit(this.stepForm.getRawValue());
  }

  stepHaveMap(stepIndex: number) {
    const step = this.stepElements.find(e => e.index === stepIndex);
    if (step && step.mapId) {
      // const fromElements = [].concat(...step.fromRows.map(e => e.items));
      // const latitudeControl = fromElements.find(e => e.key === this.latitude);
      // const longitudeControl = fromElements.find(e => e.key === this.longitude);
      return true;
    }
    return false;
  }

  getMapGeojson(geoJson: any) {
    this.mapGeoJson = geoJson;
    console.log(geoJson);
  }

  private getMapId() {
    const step = this.stepElements.find(e => e.mapId);
    if (step && step.mapId) {
      return step.mapId;
    }
    return null;
  }

}

function arraysEqual(a, b) {
  if (a === b) { return true; }
  if (a == null || b == null) { return false; }
  if (a.length !== b.length) { return false; }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) { return false; }
  }
  return true;
}

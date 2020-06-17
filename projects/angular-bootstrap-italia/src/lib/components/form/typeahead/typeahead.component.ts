import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

// RxJS
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { EMPTY } from 'rxjs/internal/observable/empty';

// Models
import { FormAutocomplete } from './form-autocomplete';

// Services
import { TypeaheadSearchService } from './typeahead-search.service';


@Component({
  selector: 'lib-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent implements OnInit, AfterViewInit {
  @Input() field: FormAutocomplete;
  @Input() form: FormGroup;

  @Input() parentValue: object = null;

  @ViewChild('typeahead') autocompleteInput: ElementRef;

  autocompleteListOpened = false;
  filteredData$ = new Subject<any[]>();

  dataLength = 7;

  isFilled = false;
  isLoading = false;

  constructor(private searchService: TypeaheadSearchService) { }

  ngOnInit(): void {
    // Attiva controllo validità se già riempito
    if (this.form.controls[this.field.key]?.value) {
      this.isFilled = true;
    }

    this.form.controls[this.field.key].valueChanges
      .pipe(
        tap(value => {
          // Per impedire di visualizzare 'object Object' in caso di oggetto
          if (value && typeof value !== 'string' && value[this.field.asyncParams.searchField]) {
            this.autocompleteInput.nativeElement.value = value[this.field.asyncParams.searchField];
          } else if (value) {
            this.autocompleteListOpened = true;
          }
        }),
        debounceTime(300),
        tap(value => {
          if (typeof value === 'string') {
            this.filteredData$.next(null);
            this.isLoading = true;
          }
        }),
        switchMap(value => {
          const additionalFilter = {};
          if (this.parentValue) {
            const additionalFilterName = this.field.parentFieldFilterKey;
            const additionalFilterValue = this.parentValue[additionalFilterName];

            additionalFilter[this.field.asyncParams.parentFilterName] = additionalFilterValue;
          }

          if (typeof value === 'string') {
            return this.searchService.searchElements(
              this.field.asyncParams.url,
              this.field.asyncParams.requestModel,
              value,
              this.field.asyncParams.searchField,
              additionalFilter)
              .pipe(
                finalize(() => this.isLoading = false),
              );
          } else {
            // Observable that immediately completes
            return EMPTY;
          }
        })
      )
      .subscribe(newValue => {
        this.filteredData$.next(newValue.items);
      });

    if (this.field.parentFieldKey) {
      this.form.get(this.field.parentFieldKey).valueChanges.subscribe(newParentValue => {

        const currentValue = this.form.get(this.field.key).value;

        if (newParentValue && (typeof newParentValue !== 'object'
          || newParentValue[this.field.parentFieldFilterKey] !== currentValue?.[this.field.asyncParams?.parentFilterName])) {
          this.form.get(this.field.key).reset();
          this.form.get(this.field.key).setValue('');
        }

        if (!newParentValue) {
          this.autocompleteListOpened = false;
        }
      });
    }
  }

  ngAfterViewInit(): void {
    // Per impedire di visualizzare 'object Object' in caso di reload del componente
    if (this.form.controls[this.field.key]?.value
      && this.form.controls[this.field.key]?.value[this.field.asyncParams.searchField]) {
      this.autocompleteInput.nativeElement.value = this.form.controls[this.field.key].value[this.field.asyncParams.searchField];
    }
  }

  onBlur(event) {
    this.isFilled = true;
    if (!event.relatedTarget || event.localname === 'input') {
      this.autocompleteListOpened = false;
    }
  }

  onFocus(event) {
    if (this.form.get(this.field.parentFieldKey)?.value && !this.form.get(this.field.key)?.value) {
      this.autocompleteListOpened = true;
    }
  }

  get isValidItem() {
    if (typeof this.form.controls[this.field.key].value === 'object') {
      if (this.form.controls[this.field.key].errors) {
        this.form.controls[this.field.key].setErrors(null);
      }
      return true;
    } else {
      if (!this.form.controls[this.field.key].errors) {
        this.form.controls[this.field.key].setErrors({incorrect: true});
      }
      return false;
    }
  }

  get isTouched() {
    return this.form.controls[this.field.key].touched;
  }

  get isDirty() {
    return this.form.controls[this.field.key].dirty;
  }

  get isEnabled() {
    return this.form.controls[this.field.key].enabled;
  }

  autocompleteHighlights(item: string) {
    const input = this.form.controls[this.field.key].value;
    return item.replace(new RegExp(input, 'gi'), (match) => `<mark>${match}</mark>`);
  }

  autocompleteSetValue(element: any) {
    this.form.controls[this.field.key].patchValue(element);
    this.autocompleteListOpened = false;
  }
}

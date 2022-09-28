import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export interface SeedSelectOption<ValueType = any> {
  label: string;
  value: ValueType;
}

@Component({
  selector: 'seed-select',
  templateUrl: './seed-select.component.html',
  styleUrls: ['./seed-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => SeedSelectComponent)
  }]
})
export class SeedSelectComponent implements ControlValueAccessor, OnChanges, OnInit {
  onChange = (ignored: SeedSelectOption): void => {};
  onTouched = (ignored: SeedSelectOption): void => {};

  @Output()
  selectionChange = new EventEmitter<SeedSelectOption>();

  @Input()
  value: any;

  @Input()
  template?: TemplateRef<{ item: SeedSelectOption }>;

  /**
   * Select dropdown label inside the selection input. This will be visible only when there's no selected option yet.
   * If not provided, the first option will be selected by default and be displayed in the input.
   */
  @Input()
  label?: string;

  selectedOptionIndex = -1;

  @Input()
  options!: Array<SeedSelectOption>;
  shouldPreventGlobalClick = false;

  optionsMenuOpen = false;

  @HostListener('document:click', ['$event'])
  onGlobalClick(): void {
    if (this.shouldPreventGlobalClick) {
      this.shouldPreventGlobalClick = false;
      return;
    }
    this.optionsMenuOpen = false;
  }

  ngOnInit(): void {
    this.validateOptions();
    if (!this.label) {
      this.selectedOptionIndex = 0;
    }
    if (this.value) {
      const foundIndex = this.options.findIndex(i => i.value === this.value);
      if (foundIndex !== undefined) {
        this.selectedOptionIndex = foundIndex;
      }
    }

    setTimeout(() => this.selectOption(this.selectedOptionIndex), 0);
  }

  validateOptions(): void {
    if (!this.options || this.options.length === 0) {
      throw new Error('Seed select must get a none empty array of options');
    }
  }

  ngOnChanges(): void {
    this.validateOptions();
  }

  registerOnChange(fn: (value: SeedSelectOption) => void): void {
    this.onChange = fn;
  }

  writeValue(items: Array<SeedSelectOption>): void {
  }

  registerOnTouched(fn: (value: SeedSelectOption) => void): void {
    this.onTouched = fn;
  }

  selectOption(optionIndex: number): void {
    if (optionIndex < 0) return;
    const selectedOption = this.options[optionIndex];
    this.onChange(selectedOption.value);
    this.selectedOptionIndex = optionIndex;
    this.selectionChange.emit(selectedOption);
  }

  handleClick() {
    this.optionsMenuOpen = !this.optionsMenuOpen;
    this.shouldPreventGlobalClick = true;
  }
}

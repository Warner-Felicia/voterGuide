import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor, Validator {
  onChange = (file) => {};
  onTouched = () => {};
  file: File | null = null;
  touched = false;
  disabled = false;

  constructor(private host: ElementRef<HTMLInputElement>) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.markAsTouched();

    if (file && !this.disabled) {
      this.onChange(file);
    }
  }

  onClick() {
    this.markAsTouched();
  }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;

  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (file) {
      const extension = file.name.split('.')[1].toLowerCase();
      if ('csv' !== extension.toLowerCase()) {
        return {
          requiredFileType: 'csv'
        };
      }
    }
  }

}

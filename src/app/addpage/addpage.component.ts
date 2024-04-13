import {Component, OnInit} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {NavComponent} from "../nav/nav.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-addpage',
  standalone: true,
  imports: [
    JsonPipe,
    NavComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './addpage.component.html',
  styleUrl: './addpage.component.css'
})
export class AddpageComponent implements OnInit{
  reviewForm!: FormGroup;  // Add the ! postfix to assert that the property will be defined

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      restaurantName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      reviewComments: [''],
      reviewDate: ['', Validators.required],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  onAddClick(): void {
    if (this.reviewForm.valid) {
      console.log(this.reviewForm.value);
      // Reset the form after successful submission
      this.reviewForm.reset();
    } else {
      this.validateAllFormFields(this.reviewForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup | null): void {
    if (formGroup) {
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control) {
          if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
          } else {
            control.markAsTouched({ onlySelf: true });
          }
        }
      });
    }
  }

  onNewPictureClick(): void {
    // Your new picture logic here
  }

  onSelectPictureClick(): void {
    // Your select picture logic here
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.reviewForm.get(controlName);
    return !!control && control.touched && control.invalid;
  }

  getErrorMessage(controlName: string): string {
    const control = this.reviewForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Required field';
    }
    if (control?.hasError('minlength')) {
      return 'Minimum length is 3';
    }
    if (control?.hasError('maxlength')) {
      return 'Maximum length is 20';
    }
    if (control?.hasError('min') || control?.hasError('max')) {
      return 'Rating must be between 1 and 5';
    }
    return '';
  }
}

import {Component, inject, OnInit} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {NavComponent} from "../nav/nav.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ReviewDalService} from "../../services/review-dal.service";
import {Review} from "../../models/Review.model";
import {Router} from "@angular/router";

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
  reviewForm!: FormGroup;
  review: Review = new Review("McDonald's", "Bad", new Date("2024-01-01"), 4, null, "", "");
  dal = inject(ReviewDalService)
  router = inject(Router);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      restaurantName: [this.review.restaurantName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      reviewComments: [this.review.reviewComments],
      reviewDate: [this.review.reviewDate.toISOString().split('T')[0], Validators.required],
      rating: [this.review.rating, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  onAddClick(): void {
    if (this.reviewForm.valid) {
      this.dal.insert(this.review).then((data) => {
        console.log(data);
        alert("Record added successfully");
        this.reviewForm.reset();
        this.router.navigate(["/show"]);
      }).catch(e => {
        console.log("error " + e.message)
      })
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
      return `${controlName} is a required field`;
    }
    if (control?.hasError('minlength')) {
      return 'Minimum length is 3';
    }
    if (control?.hasError('maxlength')) {
      return 'Maximum length is 20';
    }
    if (control?.hasError('min') || control?.hasError('max')) {
      return 'Rating must be between 1 and 10';
    }
    return '';
  }
}

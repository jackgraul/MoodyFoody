import {Component, inject, OnInit} from '@angular/core';
import {JsonPipe, NgIf} from "@angular/common";
import {NavComponent} from "../nav/nav.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReviewDalService} from "../../services/review-dal.service";
import {Review} from "../../models/Review.model";
import {Router} from "@angular/router";
import {CameraService} from "../../services/camera.service";

@Component({
  selector: 'app-addpage',
  standalone: true,
  imports: [
    JsonPipe,
    NavComponent,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './addpage.component.html',
  styleUrl: './addpage.component.css'
})

export class AddpageComponent {
  review: Review = new Review();
  imgsrc: any;
  dal = inject(ReviewDalService);
  router = inject(Router);
  cameraService = inject(CameraService);
  nameError: string = "";
  dateError: string = "";
  ratingError: string = "";

  btnAddClick(): void {
    if (this.validateForm(this.review)){
      this.dal.insert(this.review).then((data) => {
        console.log(data);
        alert("Review added successfully");
        this.router.navigate(["/show"]);
      }).catch(e => {
        console.log("error " + e.message)
      });
    }
  }

  onNewPictureClick(): void {
    this.cameraService.capturePhoto().then((data)=>{
      this.imgsrc = data;
    }).catch((e)=>{
      alert(e.toString());
    });
  }

  onSelectPictureClick(): void {
    this.cameraService.loadPhotoFromLibrary().then((data)=>{
      this.imgsrc = data;
    }).catch((e)=>{
      alert(e.toString());
    });
  }

  validateForm(review: Review) {
    let isValid = true;

    if (this.validateName(review.restaurantName) != "") {
      this.nameError = this.validateName(review.restaurantName);
      isValid = false;
    } else {
      this.nameError = "";
    }

    if (this.validateDate(review.reviewDate) != "") {
      this.dateError = this.validateDate(review.reviewDate);
      isValid = false;
    } else {
      this.dateError = "";
    }

    if (this.validateRating(review.rating) != "") {
      this.ratingError = this.validateRating(review.rating);
      isValid = false;
    } else {
      this.ratingError = "";
    }

    return isValid;
  }

  validateName(name: string): string {
    if (name == null || name == ""){
      return "Restaurant Name is required";
    }
    else if (name.length < 3 || name.length > 20){
      return "Restaurant Name must be between 3 & 20 characters";
    }
    else {
      return "";
    }
  }

  validateDate(date: Date | null): string {
    if (date === null || (date instanceof Object)) {
      return "Review Date is required";
    } else {
      return "";
    }
  }

  validateRating(rating: number): string {
    if (rating == null){
      return "Review Rating is required";
    } else if (rating <= 0 || rating > 10){
      return "Review Rating must be from 1-10";
    } else {
      return "";
    }
  }
}

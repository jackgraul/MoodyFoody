import {Component, inject, OnInit} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {JsonPipe, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Review} from "../../models/Review.model";
import {ReviewDalService} from "../../services/review-dal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CameraService} from "../../services/camera.service";
import {GeoService} from "../../services/geo.service";

declare const H: any;

@Component({
  selector: 'app-detailpage',
  standalone: true,
  imports: [
    NavComponent,
    JsonPipe,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './detailpage.component.html',
  styleUrl: './detailpage.component.css'
})
export class DetailpageComponent implements OnInit{
  review: Review = new Review();
  imgsrc: any;
  position: any;

  dal = inject(ReviewDalService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  cameraService = inject(CameraService);
  geoService = inject(GeoService);

  nameError: string = "";
  dateError: string = "";
  ratingError: string = "";
  error: any;

  ngOnInit(){
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id).then((data)=>{
      this.review = data;
    }).catch((e)=>{
      console.log("Error: " + e.message);
    });
  }

  btnUpdateClick() {
    if (this.validateForm(this.review)) {
      this.dal.update(this.review).then((data) => {
        console.log(data);
        alert("Review updated successfully");
        this.router.navigate(["/show"]);
      }).catch(e => {
        console.log("error " + e.message)
      });
    }
  }

  btnCancelClick() {
    this.router.navigate(["/show"]);
  }

  btnNewPictureClick(): void {
    this.cameraService.capturePhoto().then((data)=>{
      this.imgsrc = data;
    }).catch((e)=>{
      alert(e.toString());
    });
  }

  btnSelectPictureClick(): void {
    this.cameraService.loadPhotoFromLibrary().then((data)=>{
      this.imgsrc = data;
    }).catch((e)=>{
      alert(e.toString());
    });
  }

  btnGetLocationClick() {
    this.geoService.getCurrentLocation().then((data)=>{
      this.position = data;
      this.review.lat = data.lat;
      this.review.lon = data.lon;
      this.showMap();
    }).catch((e)=>{
      this.error = e;
      console.log(e);
    });
  }

  public showMap() {
    console.log("showing map: ")
    document.getElementById('mapContainer')!.innerHTML = '';

    // Initialize the platform object:
    const platform = new H.service.Platform({
      'apikey': 'aFq76cFW7BPopLU1ZyBExvtW8Jrn61YfF42n1htjK_g'
    });

    // Obtain the default map types from the platform object
    const maptypes = platform.createDefaultLayers();

    const options = {
      zoom: 15,
      center: {
        lat: this.review.lat, lng: this.review.lon
      }
    };

    // Instantiate (and display) a map object:
    const map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.vector.normal.map,
      options
    );

    const icon = new H.map.Icon('assets/img/circle-icon.png');
    const marker = new H.map.Marker({
      lat: this.review.lat, lng: this.review.lon
    }, {icon: icon});

    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
  }

  validateForm(review: Review) {
    let isValid = true;

    if (this.validateDate(review.reviewDate) != "") {
      this.dateError = this.validateDate(review.reviewDate);
      isValid = false;
    } else {
      this.dateError = "";
    }

    if (this.validateName(review.restaurantName) != "") {
      this.nameError = this.validateName(review.restaurantName);
      isValid = false;
    } else {
      this.nameError = "";
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

  validateDate(date: Date): string {
    if (date == null){
      return "Review Date is required";
    } else {
      return "";
    }
  }

  validateRating(rating: number):string {
    if (rating == null){
      return "Review Rating is required";
    } else if (rating <= 0 || rating > 10){
      return "Review Rating must be from 1-10";
    } else {
      return "";
    }
  }
}

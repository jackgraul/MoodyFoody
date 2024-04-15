import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {NavComponent} from "../nav/nav.component";
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
    FormsModule,
    JsonPipe,
    NavComponent,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './detailpage.component.html',
  styleUrl: './detailpage.component.css'
})
export class DetailpageComponent implements OnInit{
  dal = inject(ReviewDalService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  cameraService = inject(CameraService);
  geoService = inject(GeoService);

  isFormSubmitted: boolean = false;

  review: any = {
    restaurantName: '',
    reviewComments: '',
    reviewDate: null,
    rating: null,
    imgSrc: '',
    lat: '',
    lon: ''
  }

  imgsrc: any;
  position: any;

  ngOnInit(){
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id).then((data)=>{
      this.review = data;
    }).catch((e)=>{
      console.log("Error: " + e.message);
    });
  }

  btnUpdateClick(reviewForm: NgForm) {
    if (reviewForm.valid) {
      this.dal.update(this.review).then((data) => {
        console.log(data);
        alert("Review updated successfully");
        this.router.navigate(["/show"]);
        this.isFormSubmitted = true;
        reviewForm.resetForm();
      }).catch(e => {
        console.log("error " + e.message)
      });
    } else {
      console.log('Form is invalid');
      this.isFormSubmitted = true;
      // Handle the form validation errors
      for (const controlName in reviewForm.controls) {
        if (reviewForm.controls.hasOwnProperty(controlName)) {
          const control = reviewForm.controls[controlName];
          if (control.invalid) {
            console.log(`Control Name: ${controlName}, Errors: `, control.errors);
          }
        }
      }
    }
  }

  btnCancelClick() {
    this.router.navigate(["/show"]);
  }

  btnNewPictureClick() {
    this.cameraService.capturePhoto().then((data)=>{
      this.imgsrc = data;
      this.review.imgSrc = this.imgsrc;
      console.log(this.review.imgSrc);
    }).catch((e)=>{
      alert(e.toString());
      console.log(e);
    });
  }

  btnSelectPictureClick() {
    this.cameraService.loadPhotoFromLibrary().then((data)=>{
      this.imgsrc = data;
      this.review.imgSrc = this.imgsrc;
      console.log(this.review.imgSrc);
    }).catch((e)=>{
      alert(e.toString());
      console.log(e);
    });
  }

  btnGetLocationClick() {
    this.geoService.getCurrentLocation().then((data)=>{
      this.position = data;
      this.review.lat = data.lat;
      this.review.lon = data.lon;
      this.showMap();
    }).catch((e)=>{
      console.log(e);
    });
  }

  public showMap() {
    console.log("showing map: ");
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
}

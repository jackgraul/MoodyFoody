import {Component, inject} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {NavComponent} from "../nav/nav.component";
import {Review} from "../../models/Review.model";
import {ReviewDalService} from "../../services/review-dal.service";
import {Router} from "@angular/router";
import {CameraService} from "../../services/camera.service";
import {GeoService} from "../../services/geo.service";

declare const H: any;

@Component({
  selector: 'app-addpage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NavComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './addpage.component.html',
  styleUrl: './addpage.component.css'
})
export class AddpageComponent {
  dal = inject(ReviewDalService);
  router = inject(Router);

  cameraService = inject(CameraService);
  geoService = inject(GeoService);

  isFormSubmitted: boolean = false;

  review: any = {
    restaurantName: '',
    reviewComments: '',
    reviewDate: null,
    rating: null,
    pictureUrl: '',
    lat: '',
    lon: ''
  }

  imgsrc: any;
  position: any;

  btnAddClick(reviewForm: NgForm){
    if (reviewForm.valid) {
      console.log('Form is valid:', this.review);

      this.dal.insert(this.review).then((data) => {
        console.log(data);
        alert("Review added successfully");
        this.router.navigate(["/show"]);
      }).catch(e => {
        console.log("error " + e.message)
      });

      this.isFormSubmitted = true;

      // Reset the form
      reviewForm.resetForm();

      // Reset the review object
      this.review = {
        restaurantName: '',
        reviewComments: '',
        reviewDate: null,
        rating: null,
        pictureUrl: '',
        lat: '',
        lon: ''
      };

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
      alert(e);
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
}

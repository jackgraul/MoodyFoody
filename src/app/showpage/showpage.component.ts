import {Component, inject} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {Review} from "../../models/Review.model";
import {ReviewDalService} from "../../services/review-dal.service";
import {Router} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-showpage',
  standalone: true,
  imports: [
    NavComponent,
    NgClass
  ],
  templateUrl: './showpage.component.html',
  styleUrl: './showpage.component.css'
})
export class ShowpageComponent {
  reviews: Review[] = [];
  dal = inject(ReviewDalService);
  router = inject(Router);

  constructor() {
    this.showAll();
  }

  showAll() {
    this.dal.selectAll().then((data) => {
      this.reviews = data;
      console.log(this.reviews)
    }).catch((err) => {
      console.log(err);
      this.reviews = [];
    })
  }

  onModifyClick(review: Review) {
    this.router.navigate([`/detail/${review.id}`]);
  }

  onDeleteClick(review: Review) {
    this.dal.delete(review)
      .then((data) => {
        console.log(data);
        this.showAll();
        alert("Review deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

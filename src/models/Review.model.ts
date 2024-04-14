  export class Review {
  id: number | undefined;
  restaurantName: string = "";
  reviewComments: string = "";
  reviewDate: Date = new Date("");
  rating: number = 0;
  imgSrc: string | null = null;
  lat: string = "";
  lon: string = "";

  constructor(
    restaurantName: string = "",
    reviewComments: string = "",
    reviewDate: Date = new Date(""),
    rating: number = 0,
    imgSrc: string | null = null,
    lat: string = "",
    lon: string = ""
  ) {
    this.restaurantName = restaurantName;
    this.reviewComments = reviewComments;
    this.reviewDate = reviewDate;
    this.rating = rating;
    this.imgSrc = imgSrc;
    this.lat = lat;
    this.lon = lon;
  }
}

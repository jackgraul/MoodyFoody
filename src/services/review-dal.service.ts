import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Review} from "../models/Review.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewDalService {

  database = inject(DatabaseService)

  constructor() {

  }

  insert(review: Review): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["reviews"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const reviewsStore = transaction.objectStore("reviews");
      const req = reviewsStore.add(review);

      req.onsuccess = (event: any) => {
        //returns the key of newly added item
        console.log(`Success: review added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  selectAll(): Promise<Review[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["reviews"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const reviewsStore = transaction.objectStore("reviews");

      //Preferred way..
      //             const friendCursor = friendsStore.openCursor();
      //
      //             let books: Book[] = [];
      //             friendCursor.onsuccess = (event: any) => {
      //                 const cursor = event.target.result;
      //                 // console.log(cursor);
      //                 if (cursor) {
      //                     // console.log(`Name ${cursor.key} is ${cursor.value.name}`);
      //                     books.push(cursor.value);
      //                     cursor.continue();
      //                 } else {
      //                     // console.log("No more entries!");
      //                     resolve(books);
      //                 }
      //             };

      //also works.. (easy way)

      const req = reviewsStore.getAll();
      req.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  select(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["reviews"]);

      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const reviewsStore = transaction.objectStore("reviews");

      const req = reviewsStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  update(review: Review): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["reviews"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const reviewsStore = transaction.objectStore("reviews");

      const reqUpdate = reviewsStore.put(review);

      reqUpdate.onsuccess = (event: any) => {
        console.log(`Success: data updated successfully: ${event}`);
        resolve(event);
      };

      reqUpdate.onerror = (event: any) => {
        console.log(`Error: failed to update: ${event}`);
        reject(event)
      };
    });
  }

  delete(review: Review): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["reviews"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const reviewsStore = transaction.objectStore("reviews");
      if (review.id) {
        const reqDelete = reviewsStore.delete(review.id);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: review deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      } else {
        reject("review does not have id")
      }
    });
  }
}

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {
  }

  db: any

  initDatabase(){
    this.createDatabase().then(data=>{
      console.log("Database created successfully: " + data)
    }).catch(e=>{
      console.log("Error in database creation: " + e.message)
    })
  }

  // must be called when the program runs. manually called in setting page
  createDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("MoodyFoodyDB", 1);

      request.onerror = (event) => {
        console.error("Error in creating database!");
      };

      request.onsuccess = (event) => {
        console.log("onsuccess called");
        // @ts-ignore
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        console.log("onupgradeneeded called");
        // @ts-ignore
        this.db = event.target.result;
        const reviewsStore = this.db.createObjectStore("reviews", {
          keyPath: "id",
          autoIncrement: true,
        });
        const usersStore = this.db.createObjectStore("users", {
          keyPath: "id",
          autoIncrement: true,
        });
      };
    });
  }
}

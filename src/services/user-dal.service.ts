import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {User} from "../models/User.model";

@Injectable({
  providedIn: 'root'
})
export class UserDalService {

  database = inject(DatabaseService)

  constructor() {

  }

  insert(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["users"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const usersStore = transaction.objectStore("users");
      const req = usersStore.add(user);

      req.onsuccess = (event: any) => {
        console.log(`Success: user added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  selectAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["users"]);

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const usersStore = transaction.objectStore("users");
      const req = usersStore.getAll();

      req.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      req.onerror = (event: any) => {
        reject(event);
      };

    });
  }

}

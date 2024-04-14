import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor() { }

  getCurrentLocation(): Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      const options = {
        timeout: 1000,
        maximumAge: 0,
        enableHighAccuracy: true
      };

      navigator.geolocation.getCurrentPosition((data)=>{
        resolve({
          lat: data.coords.latitude,
          lon: data.coords.longitude
        });
      }, (e)=>{
        reject({
          code: e.code,
          message: e.message
        });
      }, options)
    });
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtiltiesService {
  constructor() {}
  //converting raw population in Million and Billion Format
  convertPopulation(val: any) {
    if (val > 0 && val < 1000000) {
      return val / 1000000 + ' million +';
    } else if (val > 100000000) {
      if (val / 1000000000 < 1) {
        return val / 1000000 + ' million +';
      } else {
        return val / 1000000000 + ' Billion +';
      }
    } else {
      return Math.round(val / 1000000) + ' million +';
    }
  }

  //Sorting Countries by Name
  sortCountriesArray(countriesDetails: any) {
    countriesDetails.sort((a: any, b: any) => {
      let nameA = a.name.common.toUpperCase();
      let nameB = b.name.common.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
}

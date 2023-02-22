import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor( private http:HttpClient ) { }
   searchCountries(searchString: string) {
    const url = `https://restcountries.com/v3.1/name/${searchString}`;
    return this.http.get(url);
  }

  // searchCountries( pageSize: number, pageNumber: number): Observable<any> {
  //   const skip = pageSize * (pageNumber - 1);
  //   return this.http.get(`${this.baseUrl}?skip=${skip}&limit=${pageSize}`);
  // }

  private allCountriesUrl = 'https://restcountries.com/v3.1/all';



  getAllCountries(): Observable<any> {
    return this.http.get(this.allCountriesUrl);
  }

  getCountryById(id: string|null) {
    return this.http.get<any>(this.allCountriesUrl).pipe(
      map((countries:any) => {
        const country = countries.find((c:any )=> c.name.common === id);
        return  country
        ;
      })
    );
  }
}

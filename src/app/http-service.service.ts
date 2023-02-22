import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  private allCountriesUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}
  //getting countries for search via given Url
  searchCountries(searchString: string) {
    const url = `https://restcountries.com/v3.1/name/${searchString}`;
    return this.http.get(url);
  }

  //getting all countries
  getAllCountries(): Observable<any> {
    return this.http.get(this.allCountriesUrl);
  }
  //getting countries by name  to display its properties  when clicked
  getCountryById(id: string | null) {
    return this.http.get<any>(this.allCountriesUrl).pipe(
      map((countries: any) => {
        const country = countries.find((c: any) => c.name.common === id);
        return country;
      })
    );
  }
}

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';
import { UtiltiesService } from '../utilties.service';

@Component({
  selector: 'app-worldpedia',
  templateUrl: './worldpedia.component.html',
  styleUrls: ['./worldpedia.component.scss'],
})
export class WorldpediaComponent implements OnInit {
  searchString: string = '';
  currentPage = 1;
  pageSize = 20;
  totalCountries = 0;
  countriesDetails: any;
  searchResults: any;
  isSearchClicked = false;
  loader: boolean = false;

  constructor(
    private httpsvc: HttpServiceService,
    private router: Router,
    private utilities: UtiltiesService
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  //subscribing to the observable returned to the Api call
  onSearch() {
    this.loader = true;
    this.httpsvc.searchCountries(this.searchString).subscribe(
      (data: any) => {
        this.searchResults = data;
        this.isSearchClicked = true;
        this.loader = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //subscribing to the observable returned to the Api call
  loadCountries() {
    this.loader = true;
    this.httpsvc.getAllCountries().subscribe((data: any) => {
      this.totalCountries = data.length;

      this.countriesDetails = data.slice(0, this.pageSize);
      this.utilities.sortCountriesArray(this.countriesDetails);
      this.loader = false;
    });
  }
  // adding more countries on the display when clicked
  showMore() {
    this.currentPage++;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.loader = true;
    this.httpsvc.getAllCountries().subscribe((data: any) => {
      this.countriesDetails = this.countriesDetails.concat(
        data.slice(start, end)
      );
      this.utilities.sortCountriesArray(this.countriesDetails);
      this.loader = false;
    });
  }
  country: any;
  languages!: string[];
  currency: any;
  population!: string;

  //subscribing to the observable returned to the Api call
  showDetails(common: string) {
    this.loader = true;
    this.httpsvc.getCountryById(common).subscribe((countryData) => {
      this.country = countryData;

      for (let keys in this.country.languages) {
        this.languages = Object.values(this.country.languages);
      }
      for (let keys in this.country.currencies) {
        this.currency = this.country.currencies[keys].name;
      }
      this.population = this.utilities.convertPopulation(
        this.country.population
      );
      this.loader = false;
    });
  }
}

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
;
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-worldpedia',
  templateUrl: './worldpedia.component.html',
  styleUrls: ['./worldpedia.component.scss']
})
export class WorldpediaComponent implements OnInit {
searchString: string ='';
currentPage = 1;
pageSize = 20;
totalCountries = 0;
countriesDetails:any;
searchResults: any;
isSearchClicked=false;
loader:boolean=false;

  constructor(private httpsvc:HttpServiceService, private router:Router) { }

  ngOnInit(): void {
// this. getContriesDetails()
    // this.onSearch()

    this.loadCountries()
  }



  onSearch() {
    this.loader=true;
    this.httpsvc.searchCountries(this.searchString)
      .subscribe(
        (data: any) => {
          console.log(this.searchString)
        console.log(data)
          this.searchResults = data;
          this.isSearchClicked=true
          this.loader=false
        },
        (error) => {
          console.error(error);
        }
      );
      
  }
loadCountries() {
  this.loader=true;
  this.httpsvc.getAllCountries()
    .subscribe((data: any) => {
      console.log('data'+ typeof(data));
      this.totalCountries = data.length;

      this.countriesDetails = data.slice(0, this.pageSize);
      this.sortCountriesArray();
      this.loader=false;
    });
}
  
showMore() {
  this.currentPage++;
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.loader=true;
  this.httpsvc.getAllCountries()
    .subscribe((data: any) => {
      this.countriesDetails = this.countriesDetails.concat(data.slice(start, end));
      this.sortCountriesArray();
      this.loader=false;

    });
}
country:any;
languages!: string[];
currency:any;
population!:string;
showDetails(common: string) {
  this.loader = true;
  this.httpsvc.getCountryById(common).subscribe(countryData=> {
    this.country = countryData;
    console.log(this.country);
    for(let keys in this.country.languages){
      this.languages = Object.values(this.country.languages);
      
    };
    for(let keys in this.country.currencies){
      this.currency=this.country.currencies[keys].name
    }
    this.population=this.convertPopulation(this.country.population)
    this.loader= false
    
  });
  
 
  
}
convertPopulation(val:any){
  
    if(val>0 && val<1000000){
      return val/1000000 +' million +'
    }
    else if(val>100000000){
      if(val/1000000000 < 1){
        return val/1000000+' million +'
      }else{
        return val/1000000000+' Billion +'
      }

    }
    else{
      return Math.round(val/1000000)+' million +'
    }

  }


  sortCountriesArray(){
    this.countriesDetails.sort((a:any,b:any)=>{
      let nameA = a.name.common.toUpperCase(); 
      let nameB = b.name.common.toUpperCase(); 
      if (nameA < nameB) {
          return -1; 
       }
      if (nameA > nameB) {
           return 1; 
      }
    return 0;
    })
  }
}



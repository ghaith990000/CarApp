import { Component, OnInit } from '@angular/core';
import { Car, ShowroomService } from 'src/app/services/showroom.service';
import { Observable } from 'rxjs';
import {toArray} from 'rxjs/operators';
interface CheckboxStates {
  [key: string]: boolean;
}

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})

export class Tab2Page implements OnInit {
  filteredCars$: Observable<Car[]>;
  openFilter: boolean = false;
  filteredResults: any;
  type: string = "";
  selectedManufacturer: string = "";
  selectedModel: string = "";
  selectedColor: string = "";
  checkedColors: string[] = [];
  mileageRange: {lower: number, upper:number} = {lower: 0, upper: 200000}
  models: string[] = [];
  types = ["Bus", "Forklift", "Hatchback", "Pick-up", "Sedan", "SUV", "Truck", "Van", "Coupe" ];
  manufacturers = ["Toyota", "SsangYong", "Volvo", "Lexus", "Hino", "Audi", "Chevrolet", "Chery", "Isuzu", "KIA", "BMW", "Ford", "GMC", "Jeep", "Honda", "Renault", "Daihatsu", "Peugeot", "Suzuki", "Volkswagen", "Nissan", "Dodge", "Porsche", "Maxus", "Geely", "HYUNDAI", "Infinity", "Mistsubishi", "Subaru", "Isuzu", "Chery", "Audi"];
  colors = ["blue", "beige", 'black', 'bronze', 'golden', 'grey', 'yellow', 'orange', 'pearl', 'silver', 'brown', 'green', 'maroon', 'red', 'violet', 'white'];


  checkboxStates: CheckboxStates = {};
  priceRange : {lower: number, upper: number} = {lower: 0, upper: 5000};

  showPrice(){
    console.log("Price Range", this.priceRange);
  }

  toggleFilter(){
    this.openFilter = !this.openFilter;
  }


  onSelectChange(){
    switch(this.selectedManufacturer){
      case "toyota":
        switch(this.type){
          case "sedan":
            this.models = ["Camery", "Corolla", "Avalon", "Yaris", "Avalon Hybrid", "Camery Hybrid"];
            break;
          case "suv":
            this.models = ["Highllander", "4Runner", "Sequoia", "RAV4", "C-HR", "Land Cruiser"];
            break;
          case "coupe":
            this.models = ["Celica", "MR2"];
            break;
          case "truck":
            this.models = ["Tundra", "Tacoma"];
            break;
          case "van":
            this.models = ["Sienna", "Previa"];
            break;
        }
      break;
      case "ssangyong":
        switch(this.type){
          case "sedan":
            this.models = ["Chairman"];
            break;
          case "suv":
            this.models = ["Tivoli", "Korando", "Rexton", "Kyron"];
            break;
          case "truck":
            this.models = ["Musso", "Actyon Sports", "Korando Sports/CJ-5", "Musso Sports"];
            break;
          case "van":
            this.models = ["Rodius/Stavic", "Istana"];
        }
        break;
      case "volvo":
        switch(this.type){
          case "sedan":
            this.models = ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90", "S40", "S70", ];
            break;
          case "hatchback":
            this.models = ["C30"];
            break;
          case "wagon":
            this.models = ["V40", "V70"];
            break;
          case "suv":
            this.models = ["XC70"];
            break;
        }
        break;
      case "lexus":
        switch(this.type){
          case "sedan":
            this.models = ["ES", "LS", "IS", "GS", "HS"];
            break;
          case "suv":
            this.models= ["UX", "NX", "RX", "LX"];
            break;
          case "coupe":
            this.models = ["RC", "LC", "SC"];
            break;
          case "hatchback":
            this.models = ["CT"];
        }
        break;
      case "hino":
        switch(this.type){
          case "truck":
            this.models = ["Dutro", "Ranger", "Profia", "Briska"];
            break;
          case "bus":
            this.models = ["Poncho", "Liesse", "Melpha", "Rainbow"];
            break;
        }
        break;
    }
    console.log("Manufacturer Changed: ", this.models);
  }
  constructor(public showroomSrv: ShowroomService) {

    this.filteredCars$ = this.showroomSrv.searchCars();
   }

  ngOnInit() {

    for (let color of this.colors){
      this.checkboxStates[color]= false;
    }

    this.filteredCars$ = this.showroomSrv.searchCars();
    console.log("Filtered Cars" + this.filteredCars$)
    this.filteredResults = this.filteredCars$.pipe(
      toArray()
    ).subscribe(arrayOfValues => {
      console.log('Array of values', arrayOfValues);
    })
  }

  getCheckedColors() {
    const checkedColors: string[] = [];

    for (let color of this.colors){
      if(this.checkboxStates[color]){
        checkedColors.push(color);
      }
    }

    return checkedColors;
  }

  onSearch(){
    this.checkedColors = this.getCheckedColors();
    console.log(this.checkedColors);
    this.filteredCars$ = this.showroomSrv.searchCars(
      this.type,
      this.selectedManufacturer,
      this.selectedModel,
      this.checkedColors,
      this.mileageRange,
    )
  }


}

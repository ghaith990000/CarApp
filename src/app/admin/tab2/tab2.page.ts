import { Component, OnInit } from '@angular/core';
import { Car, ShowroomService } from 'src/app/services/showroom.service';
import { Observable } from 'rxjs';
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
  type: string = "";
  selectedManufacturer: string = "";
  selectedModel: string = "";
  selectedColor: string = "";
  models: string[] = [];
  types = ["Bus", "Forklift", "Hatchback", "Pick-up", "Sedan", "SUV", "Truck", "Van", "Coupe" ];
  manufacturers = ["Toyota", "SsangYong", "Volvo", "Lexus", "Hino", "Audi", "Chevrolet", "Chery", "Isuzu", "KIA", "BMW", "Ford", "GMC", "Jeep", "Honda", "Renault", "Daihatsu", "Peugeot", "Suzuki", "Volkswagen", "Nissan", "Dodge", "Porsche", "Maxus", "Geely", "HYUNDAI", "Infinity", "Mistsubishi", "Subaru", "Isuzu", "Chery", "Audi"];
  colors = ["blue", "beige", 'black', 'bronze', 'golden', 'grey', 'yellow', 'orange', 'pearl', 'silver', 'brown', 'green', 'maroon', 'red', 'violet', 'white'];


  checkboxStates: CheckboxStates = {};
  priceRange : {lower: number, upper: number} = {lower: 0, upper: 5000};

  showPrice(){
    console.log("Price Range", this.priceRange);
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


}

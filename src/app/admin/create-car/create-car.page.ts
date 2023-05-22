import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Car, ShowroomService } from 'src/app/services/showroom.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.page.html',
  styleUrls: ['./create-car.page.scss'],
})
export class CreateCarPage implements OnInit {
  imagesSelected = false;
  imagesSrc: string[] = [];
  images: File[] = [];
  models: string[] = [];
  showroomId: string = "";
  car: Car = {
    type: "",
    showroomId: "",
    manufacturer: "",
    model: "",
    color: "",
    mileage: 0,
    category: "forsale",
    engineSpecifications: {
      horsepower: 0,
      torque:  0,
      fuelEfficiency: 0,
    },
    numberOfSeats: 0,
    specificationAndFeatures: {
      sunroof: false,
      navigation: false,
      heatedSeats: false,
      blindSpotMonitor: false
    },
    price: 0,
    vatPrice: 0,
    imageUrls: [],
  }

  types = ["Bus", "Forklift", "Hatchback", "Pick-up", "Sedan", "SUV", "Truck", "Van", "Coupe", "Wagon" ];

  manufacturers = ["Toyota", "SsangYong", "Volvo", "Lexus", "Hino", "Audi", "Chevrolet", "Chery", "Isuzu", "KIA", "BMW", "Ford", "GMC", "Jeep", "Honda", "Renault", "Daihatsu", "Peugeot", "Suzuki", "Volkswagen", "Nissan", "Dodge", "Porsche", "Maxus", "Geely", "HYUNDAI", "Infinity", "Mistsubishi", "Subaru", "Isuzu", "Chery", "Audi"];

  colors = ["blue", "beige", 'black', 'bronze', 'golden', 'grey', 'yellow', 'orange', 'pearl', 'silver', 'brown', 'green', 'maroon', 'red', 'violet', 'white'];

  constructor(public storage: AngularFireStorage,public router: Router, public showroomSrv:ShowroomService, public ActRoute: ActivatedRoute, public utilitySrv: UtilityService) {
    this.showroomId = this.ActRoute.snapshot.paramMap.get('showroomId') ?? "";
    console.log(this.showroomId);
  }

  onFileSelected(event: any) {
    this.images = event.target.files;
    if (this.images) {
      for (let i = 0; i < this.images.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(this.images[i]);
        reader.onload = () => {
          this.imagesSelected = true;
          this.imagesSrc.push(reader.result as string);
        };
      }
    }
  }

  onSelectChange(){
    switch(this.car.manufacturer){
      case "toyota":
        switch(this.car.type){
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
        switch(this.car.type){
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
        switch(this.car.type){
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
        switch(this.car.type){
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
        switch(this.car.type){
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

  removeImage(image: string) {
    const index = this.imagesSrc.indexOf(image);
    if (index !== -1) {
      this.imagesSrc.splice(index, 1);
    }
    if (this.imagesSrc.length === 0) {
      this.imagesSelected = false;
    }
  }

  async uploadImages() {
    // let imageUrls = [];
    for (let i = 0; i < this.images.length; i++) {
      const filePath = `${this.showroomId}/cars/${Date.now()}_${i}.jpg`;
      const fileRef = this.storage.ref(filePath);
      const snapshot = await fileRef.put(this.images[i]);
      const downloadUrl = await snapshot.ref.getDownloadURL();

      console.log(`Image ${i + 1} uploaded successfully! Download URL: ${downloadUrl}`);
      // await this..collection()
      this.car.imageUrls.push(downloadUrl);
    }
    // this.car.imageUrls = imageUrls;
    console.log(this.car.imageUrls);
    this.imagesSrc = [];
    this.imagesSelected = false;
  }

  async createCar(){

    let vat = 5;
    this.car.vatPrice = this.car.price + ((vat /100) * this.car.price);
    await this.uploadImages();
    if(this.car.imageUrls.length <= 0){
      this.utilitySrv.presentToast("You must select car images", 5000, "bottom", "failure");

      return;
    }
    try{
      console.log(this.car.imageUrls);
      await this.showroomSrv.createCar(this.showroomId, this.car);
      this.utilitySrv.presentToast("Created Car Successfully", 5000, "bottom", "success");
      this.router.navigateByUrl("/admin/showrooms/showroom-details/"+this.showroomId);
    }catch(error){
      this.utilitySrv.presentToast("Error Creating Car", 5000, "bottom", "failure");
    }
  }

  ngOnInit() {
  }

}

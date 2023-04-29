import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataListService {
  public newitem: Item = {} as Item;
  public List: Item[] = [
    {
      id: 1,
      name: "Apple",
      description: "Fruits",
      price: 1.5,
      photo: "alertCtrl: AlertControllerpple.jpg"
    },
    {
      id: 2,
      name: "Banana",
      description: "Vegetables",
      price: 2.0,
      photo: "banana.jpg"
    },
    {
      id: 1,
      name: "Kiwi",
      description: "Fruits",
      price: 3.0,
      photo: "kiwi.jpg"
    },

]

  constructor(public alertCtrl:AlertController) {

  }

  add(item: Item){
    this.List.push(item);
  }

  remove(item:Item , i?:number){
    if(!i)
      i = this.List.indexOf(item);

    this.List.splice(i, 1);
    this.showAlert('Delete', 'Item deleted successfully.');
  }

  async showAlert(title: string, msg: string){
    let alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: ['Ok']
    });
    alert.present();
  }

}

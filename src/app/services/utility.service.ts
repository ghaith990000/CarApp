import { Injectable } from '@angular/core';
import { ToastController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  async presentToast(message: string, duration: number, position: 'top' | 'middle' | 'bottom', status: "success" | "failure"){

    if(status === "success"){
      const toast = await this.toastCtrl.create({
        message: message,
        duration: duration,
        position: position,
        color: "primary"
      });
      toast.present();
    }else if(status === "failure"){
      const toast = await this.toastCtrl.create({
        message: message,
        duration: duration,
        position: position,
        color: "danger"
      });
      toast.present();
    }



  }
}

import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private readonly alertCtrl: AlertController,
                private readonly loadingCtrl: LoadingController) {
    }


    async info(header: string, message: string, buttons: string[] = ['OK']) {
        const alert = await this.alertCtrl.create({
            header,
            message,
            buttons,
            backdropDismiss: true
        });
        alert.present();
        return alert;
    }
}

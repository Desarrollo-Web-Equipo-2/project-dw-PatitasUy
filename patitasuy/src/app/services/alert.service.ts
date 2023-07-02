import { Injectable } from '@angular/core';
import { AlertController, LoadingController, SpinnerTypes } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private readonly alertCtrl: AlertController,
                private readonly loadingCtrl: LoadingController) {
    }


    async alert(header: string, message: string, buttons: string[] = ['OK']) {
        const alert = await this.alertCtrl.create({
            header,
            message,
            buttons,
            backdropDismiss: true,
            keyboardClose: true
        });
        alert.present();
        return alert;
    }

    async loading(message?: string, duration?: number, spinner?: SpinnerTypes) {
        const loading = await this.loadingCtrl.create({
            backdropDismiss: false,
            keyboardClose: false,
            message: message,
            duration: duration,
            spinner: spinner || 'bubbles'
        });
        loading.present();
        return loading;
    }
}

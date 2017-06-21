import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Flashlight } from '@ionic-native/flashlight';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SocialSharing } from "@ionic-native/social-sharing";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SpeechRecognition } from '@ionic-native/speech-recognition';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  image: string = null;
  scanerData: any = null;
  listenData: any = null;
  constructor(
    private socialSharing: SocialSharing,
    private flashlight: Flashlight,
    private camera: Camera,
    private navs: NavController,
    private barcodeScanner: BarcodeScanner,
    private speechRecognition: SpeechRecognition
  ) { }

  empezarEscucha() {
    this.speechRecognition.requestPermission()
      .then(
      () => {
        this.speechRecognition.startListening()
        .subscribe(
        (matches: Array<string>) => this.listenData += matches[0],
        (onerror) => console.log('error:', onerror)
        )
      },
      () => console.log('Denied')
      )

  }
  terminarEscucha() {
    this.speechRecognition.stopListening()

  }
  compartir() {
    this.socialSharing.share("Revisa este evento de tu ciudad", "Visita La Galera Magazine", "http://www.lagaleramagazine.es/wp-content/uploads/2017/06/gracias-a-lavida-768x432.jpg", "http://www.lagaleramagazine.es/raquel-palma-carmen-tena-y-rosario-abelaira-en-gracias-a-la-vida/").then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });

  }

  scaner() {
    this.barcodeScanner.scan({ showTorchButton: true, showFlipCameraButton: true }).then((barcodeData) => {
      this.scanerData = JSON.stringify(barcodeData);
    }, (err) => {
      this.scanerData = err;
    });
  }

  flash() {
    this.flashlight.toggle();
  }

  getPicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture(options)
      .then(imageData => {
        this.image = `data:image/jpeg;base64,${imageData}`;
      })
      .catch(error => {
        console.error(error);
      });
  }

  getGallery() {
    let options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }
    this.camera.getPicture(options)
      .then(imageData => {
        this.image = `data:image/jpeg;base64,${imageData}`;
      })
      .catch(error => {
        console.error(error);
      });
  }
}

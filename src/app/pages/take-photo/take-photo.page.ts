import { Post } from './../../models/post.model';
import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.page.html',
  styleUrls: ['./take-photo.page.scss'],
})
export class TakePhotoPage implements AfterViewInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngAfterViewInit() {
    const video = document.getElementById('video') as any;

    if (navigator.mediaDevices.getUserMedia) {
      // Captura o vídeo da câmera
      navigator.mediaDevices.getUserMedia({ video: { aspectRatio: 1 } } )
      .then( (stream: any) => {
        video.srcObject = stream;
      })
      .catch( (err: any) => {
        console.log('Não consigo carregar o vídeo!');
      });
    }
  }

  takePicture() {
    const video = document.getElementById('video') as any;
    const canvas = document.getElementById('canvas') as any;
    const context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, 1000, 1000);
    localStorage.setItem('leogram.post', JSON.stringify(new Post(canvas.toDataURL(), '', '')));

    video.classList.add('animated');
    video.classList.add('flash');

    setTimeout(() => {
      this.navCtrl.navigateForward('/post');
    }, 1000);
  }

}

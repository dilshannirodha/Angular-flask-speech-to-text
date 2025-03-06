import { Component } from '@angular/core';
import { UploadAudioComponent } from '../components/upload-audio.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [UploadAudioComponent,CommonModule]  
})
export class HomeComponent {}

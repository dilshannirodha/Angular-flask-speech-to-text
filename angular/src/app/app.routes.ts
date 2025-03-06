import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { UploadAudioComponent } from './components/upload-audio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'upload', component: UploadAudioComponent },
  
];

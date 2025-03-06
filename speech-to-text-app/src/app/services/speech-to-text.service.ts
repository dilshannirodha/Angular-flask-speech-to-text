import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechToTextService {
  private apiUrl = 'http://localhost:5000/api/speech-to-text';  

  constructor(private http: HttpClient) {}

  transcribeAudio(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(this.apiUrl, formData);
  }
}
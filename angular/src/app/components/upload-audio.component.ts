import { Component } from '@angular/core';
import { SpeechToTextService } from '../services/speech-to-text.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'upload-audio',
  templateUrl: './upload-audio.component.html',
  imports: [CommonModule],
})
export class UploadAudioComponent {
  transcript: string = '';
  file: File | null = null;
  errorMessage: string = '';
  isRecording: boolean = false;
  chooseFileUpload: boolean = false;
  chooseComputerMIC: boolean = false;
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];
  recordedAudioFile: File | null = null;

  constructor(private speechToTextService: SpeechToTextService) {}

  onChooseAudioFile(): void {
    this.chooseFileUpload = true;
    this.chooseComputerMIC = false;
    this.resetStates();
  }

  onChooseComputerMIC(): void {
    this.chooseComputerMIC = true;
    this.chooseFileUpload = false;
    this.resetStates();
  }

  private resetStates(): void {
    this.file = null;
    this.recordedAudioFile = null;
    this.transcript = '';
    this.errorMessage = '';
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
    this.recordedAudioFile = null; // Reset recorded file if a new file is uploaded
  }

  startRecording(): void {
    this.errorMessage = '';
    this.transcript = '';
    this.audioChunks = [];

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.isRecording = true;
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/mp3' });
          this.recordedAudioFile = new File([audioBlob], 'recorded_audio.mp3', { type: 'audio/mp3' });
        };

        this.mediaRecorder.start();
      })
      .catch(() => {
        this.errorMessage = 'Microphone access denied!';
      });
  }

  stopRecording(): void {
    if (this.mediaRecorder) {
      this.isRecording = false;
      this.mediaRecorder.stop();
    }
  }

  onSubmit(): void {
    const audioToTranscribe = this.recordedAudioFile || this.file;

    if (audioToTranscribe) {
      this.speechToTextService.transcribeAudio(audioToTranscribe).subscribe({
        next: (response) => {
          this.transcript = response.transcript;
        },
        error: () => {
          this.errorMessage = 'Error processing the file';
        },
      });
    } else {
      this.errorMessage = 'Please upload or record an audio file';
    }
  }
}

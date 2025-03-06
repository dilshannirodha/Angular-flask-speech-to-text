from flask import Flask, request, jsonify
import whisper
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#locate the dowloaded ggml-base in c/users/username/.cashe/whisper folder
print("Loading Whisper model...")
model = whisper.load_model("base")
print("Model loaded successfully!")

@app.route('/api/speech-to-text', methods=['POST'])
def speech_to_text():
    try:
        print("Received a request...")

        # Check if file is in request
        if 'file' not in request.files:
            print("No file received!")
            return jsonify({'error': 'No file provided'}), 400

        audio_file = request.files['file']
        file_path = 'temp_audio.mp3'
        print(f"Saving file to {file_path}...")
        audio_file.save(file_path)

        # Process the audio with Whisper
        print("Transcribing audio...")
        result = model.transcribe(file_path)
        transcript = result["text"]

        # Clean up
        os.remove(file_path)
        print("Transcription successful!")

        return jsonify({'transcript': transcript})

    except Exception as e:
        print(f"Internal Server Error: {str(e)}")
        return jsonify({'error': f'Internal Server Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from utils.feature_utils import extract_features, simulate_lr_score, get_prediction_review
from flask_cors import CORS
import librosa

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg', 'flac'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB file size limit

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            # Check if file was uploaded
            if 'audio' not in request.files:
                return jsonify({'error': 'No file selected', 'result': None}), 400
                
            file = request.files['audio']
            
            # Check if file has a valid name
            if file.filename == '':
                return jsonify({'error': 'No selected file', 'result': None}), 400
                
            # Validate file type
            if not allowed_file(file.filename):
                return jsonify({
                    'error': 'Invalid file type. Allowed formats: WAV, MP3, OGG, FLAC',
                    'result': None
                }), 400
                
            # Process valid file
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            # Process audio
            features = extract_features(filepath)
            score = simulate_lr_score(features)
            result = get_prediction_review(score)
            
            # Clean up
            os.remove(filepath)
            
            return jsonify({'error': None, 'result': result})
            
        except librosa.util.exceptions.ParameterError:
            return jsonify({
                'error': 'Invalid audio file - could not be processed',
                'result': None
            }), 400
        except Exception as e:
            return jsonify({
                'error': f'Analysis failed: {str(e)}',
                'result': None
            }), 500
    
    return jsonify({'error': None, 'result': None})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
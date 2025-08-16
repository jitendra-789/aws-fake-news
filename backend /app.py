from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import boto3
import tempfile
from botocore.exceptions import NoCredentialsError, ClientError

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# S3 Configuration
S3_BUCKET = 'aws-fake-news'
MODEL_S3_KEY = 'model.pkl'

# Global variable for caching
model = None

def load_model_from_s3():
    """Load model from S3 bucket"""
    global model
    if model is not None:
        return model
    
    try:
        s3 = boto3.client('s3')
        
        # Create a temporary file to download the model
        with tempfile.NamedTemporaryFile() as temp_file:
            s3.download_fileobj(S3_BUCKET, MODEL_S3_KEY, temp_file)
            temp_file.seek(0)
            model = joblib.load(temp_file.name)
            print(f"✅ Model loaded successfully from s3://{S3_BUCKET}/{MODEL_S3_KEY}")
            return model
            
    except NoCredentialsError:
        print("❌ AWS credentials not found")
        raise
    except ClientError as e:
        print(f"❌ Error loading model from S3: {e}")
        raise
    except Exception as e:
        print(f"❌ Unexpected error loading model: {e}")
        raise

# Initialize model on startup
try:
    load_model_from_s3()
except Exception as e:
    print(f"❌ Startup failed: {e}")

# API Routes
# API Routes

# API info endpoint
@app.route('/', methods=['GET'])
def api_info():
    return jsonify({
        "name": "Fake News Detector API",
        "version": "1.0.0",
        "endpoints": {
            "/": "API information",
            "/health": "Health check",
            "/predict": "Make predictions (POST)"
        },
        "status": "running"
    })

# Health check endpoint
@app.route('/health', methods=['GET'])
def health():
    try:
        # Check if model is loaded
        if model is None:
            load_model_from_s3()
        return jsonify({"status": "ok", "model_loaded": model is not None})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Ensure model is loaded
        current_model = model or load_model_from_s3()
        
        data = request.get_json()
        text = data.get('text', '')

        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Make prediction
        prediction = current_model.predict([text])[0]
        result = "FAKE" if prediction == 0 else "REAL"

        return jsonify({
            "prediction": result,
            "confidence": "N/A"  # Optional: Add confidence scoring
        })
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)

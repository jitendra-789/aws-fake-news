# 🚀 Fake News Detector

A full-stack machine learning application that classifies news articles as **REAL** or **FAKE** using advanced NLP techniques and multiple ML algorithms. Built with Flask backend API and React frontend.

[![Python](https://img.shields.io/badge/Python-3.10+-blue)](https://python.org)
[![React](https://img.shields.io/badge/React-19.1+-61dafb)](https://reactjs.org)
[![Flask](https://img.shields.io/badge/Flask-2.2+-000000)](https://flask.palletsprojects.com)
[![AWS S3](https://img.shields.io/badge/AWS%20S3-orange)](https://aws.amazon.com/s3)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-latest-f7931e)](https://scikit-learn.org)

## 📁 Project Structure

```
fake-news-detector/
├── README.md                    # Project documentation
├── .gitignore                  # Git ignore patterns
│
├── backend/                    # Flask API Backend
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── model.pkl             # Trained ML model (S3)
│   ├── FakeNewsNet.csv       # Dataset
│   ├── flask.pem             # SSL certificate
│   ├── env/                  # Python virtual environment
│   └── templates/            # Legacy HTML templates
│
└── frontend/                  # React Frontend
    ├── package.json          # Node.js dependencies
    ├── .env                  # Environment variables
    ├── .gitignore           # Frontend-specific ignores
    ├── public/              # Static assets
    │   ├── index.html       # Main HTML template
    │   ├── favicon.ico      # App icon
    │   └── manifest.json    # PWA manifest
    └── src/                 # React source code
        ├── App.js           # Main React component
        ├── index.js         # React entry point
        ├── index.css        # Global styles
        └── App.css          # Component styles
```

## 🎯 Features

### **Machine Learning**
- **Multi-Algorithm Selection**: Automatic best model selection from 7+ algorithms
- **High Accuracy**: 83%+ prediction accuracy on test data
- **NLP Processing**: Advanced text preprocessing and feature extraction
- **Cloud Integration**: Model served from AWS S3 for scalability

### **Backend API**
- **RESTful Architecture**: Clean API endpoints with JSON responses
- **CORS Enabled**: Cross-origin support for frontend integration
- **Health Monitoring**: Built-in health checks and error handling
- **AWS S3 Integration**: Cloud-based model storage and retrieval

### **Frontend Interface**
- **Modern React**: Built with React 19.1+ and modern hooks
- **Responsive Design**: Mobile-first design with fluid scaling
- **Real-time Predictions**: Instant feedback with loading states
- **Sample Data**: Pre-loaded examples of real and fake news
- **Dark/Light Theme**: User preference with system detection
- **Keyboard Shortcuts**: Cmd/Ctrl+Enter for quick predictions

### **Production Ready**
- **Containerizable**: Docker-ready with environment configuration
- **SSL Support**: HTTPS-ready with certificate management
- **Error Handling**: Comprehensive error management and logging
- **Performance Optimized**: Caching and efficient resource loading

## 🛠️ Technology Stack

### **Backend**
- **Framework**: Flask 2.2+ with CORS support
- **ML Libraries**: scikit-learn, pandas, numpy, joblib
- **Cloud**: AWS S3 for model storage, boto3 for AWS integration
- **Server**: Gunicorn for production deployment
- **Environment**: Python 3.10+ virtual environment

### **Frontend**
- **Framework**: React 19.1+ with modern hooks
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Animations**: Framer Motion for smooth interactions
- **Build Tool**: Create React App with WebPack
- **Testing**: Jest and React Testing Library

### **DevOps & Deployment**
- **Version Control**: Git with comprehensive .gitignore
- **Environment Management**: Virtual environments and .env files
- **Cloud Storage**: AWS S3 for model and asset storage
- **Process Management**: Background processes and health monitoring

## 📚 Quick Start

### **Prerequisites**
- Python 3.10 or higher
- Node.js 16 or higher
- AWS account (for S3 integration)
- Git

### **1. Clone Repository**
```bash
git clone <repository-url>
cd fake-news-detector
```

### **2. Backend Setup**
```bash
# Navigate to backend
cd backend

# Create virtual environment
python3 -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up AWS credentials (optional, for S3 features)
aws configure
# OR set environment variables:
# export AWS_ACCESS_KEY_ID=your_key
# export AWS_SECRET_ACCESS_KEY=your_secret
# export AWS_DEFAULT_REGION=us-east-1

# Start Flask server
python app.py
```

The backend will be available at `http://localhost:5000`

### **3. Frontend Setup**
```bash
# Navigate to frontend (new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

## 🔧 Configuration

### **Backend Configuration**
The Flask app supports the following environment variables:

```python
# S3 Configuration (in app.py)
S3_BUCKET = 'aws-fake-news'        # Your S3 bucket name
MODEL_S3_KEY = 'model.pkl'         # Model file path in S3

# Flask Configuration
FLASK_ENV = 'development'          # development/production
FLASK_DEBUG = True                 # Debug mode
```

### **Frontend Configuration**
Create/modify `frontend/.env`:

```bash
# Browser Configuration
BROWSER=default                    # Use system default browser
SKIP_PREFLIGHT_CHECK=true         # Skip dependency checks

# API Configuration (in App.js)
API_BASE_URL=http://3.94.123.225:5001  # Your backend URL
```

## 🚀 API Endpoints

### **Base URL**: `http://3.94.123.225:5001`

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/` | GET | API information | None | API details and available endpoints |
| `/health` | GET | Health check | None | `{"status": "ok", "model_loaded": true}` |
| `/predict` | POST | Classify text | `{"text": "news article"}` | `{"prediction": "REAL/FAKE", "confidence": "N/A"}` |

### **Example API Usage**

**Health Check:**
```bash
curl -X GET "http://3.94.123.225:5001/health"
```

**Make Prediction:**
```bash
curl -X POST "http://3.94.123.225:5001/predict" \
  -H "Content-Type: application/json" \
  -d '{"text": "Breaking news: Scientists discover cure for cancer"}'
```

## 🧪 Testing

### **Backend Testing**
```bash
# Test API endpoints
curl -X GET "http://localhost:5000/health"
curl -X POST "http://localhost:5000/predict" \
  -H "Content-Type: application/json" \
  -d '{"text": "Test news article content"}'
```

### **Frontend Testing**
```bash
cd frontend
npm test                          # Run unit tests
npm run build                     # Test production build
```

## 📱 Usage Guide

### **Using the Web Interface**
1. **Open** the application at `http://localhost:3000`
2. **Enter** news text in the textarea
3. **Click** "Predict" or use Cmd/Ctrl+Enter
4. **View** the classification result (REAL/FAKE)
5. **Try** sample texts using the sample buttons

### **Sample Texts**
**Real News Examples:**
- Federal Reserve announcements
- WHO guidelines
- Corporate earnings reports

**Fake News Examples:**
- Conspiracy theories
- Medical misinformation  
- Sensational claims

## 🔧 Development

### **Adding New Features**
1. **Backend**: Add new routes in `app.py`
2. **Frontend**: Create new components in `src/`
3. **Styling**: Update `src/index.css` for global styles

### **Model Training**
To retrain the model with new data:
1. Update the dataset in `backend/FakeNewsNet.csv`
2. Run training script (if available)
3. Upload new `model.pkl` to S3

### **Deployment**
**Backend Production:**
```bash
# Using Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# With SSL
gunicorn -w 4 -b 0.0.0.0:5000 --certfile flask.pem --keyfile flask.pem app:app
```

**Frontend Production:**
```bash
cd frontend
npm run build                     # Create production build
# Serve the build/ directory with your web server
```

## 📋 Troubleshooting

### **Common Issues**

**CORS Errors:**
- Ensure Flask-CORS is installed: `pip install flask-cors`
- Check API_BASE_URL in frontend configuration

**Model Loading Errors:**
- Verify AWS credentials are configured
- Check S3 bucket permissions and model file exists

**Frontend Build Errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

**Port Conflicts:**
- Backend: Change port in `app.py`: `app.run(port=5001)`
- Frontend: Set PORT environment variable: `PORT=3001 npm start`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - Initial work and development

## 🙏 Acknowledgments

- scikit-learn community for ML algorithms
- React team for the frontend framework
- Flask community for the web framework
- AWS for cloud infrastructure

---

**Built with ❤️ for accurate news classification**

# CardioPredict - Heart Disease Prediction Application

A full-stack application for predicting heart disease risk using machine learning, built with Flask (backend) and Next.js (frontend).

## Features

- **Interactive Home Page**: Information about heart diseases, risk factors, and prevention
- **About Page**: Details about the ML model, how it works, and its importance
- **Prediction Page**: Comprehensive form for health data input and instant risk assessment
- **PDF Download**: Export prediction results as a PDF report
- **Light/Dark Theme**: Toggle between themes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Project Structure

### Frontend (Next.js)
- **Pages**:
  - `/` - Home page with heart disease information
  - `/about` - Model information and features
  - `/predict` - Prediction form and results

- **Components**:
  - `Navigation` - Header with links and theme toggle
  - `Footer` - Footer with links and social media
  - `ThemeToggle` - Light/dark mode switcher
  - `ThemeProvider` - Theme context provider

### Backend (Flask API)
Your existing Flask API handles the prediction logic.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip

### Backend Setup (Flask)

1. **Keep your .pkl file with your Flask API** - Do NOT move it to the Next.js project
   - Your current structure is correct: Flask API and .pkl file stay together
   - The Next.js frontend will make HTTP requests to the Flask API

2. Install Flask dependencies:
   ```bash
   pip install flask flask-cors joblib numpy scikit-learn
   ```

3. Run the Flask API:
   ```bash
   python app.py
   ```
   The API will run on `http://localhost:5000`

### Frontend Setup (Next.js)

1. Install dependencies (already done):
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

## Usage

1. **Start the Flask API first** (port 5000)
2. **Then start the Next.js frontend** (port 3000)
3. Navigate to `http://localhost:3000`
4. Explore the home page and about page
5. Go to "Predict Now" to enter health data
6. View results and download as PDF

## Input Parameters

The prediction model requires the following inputs:

- **Age** (years)
- **Gender** (Male/Female)
- **Height** (cm)
- **Weight** (kg)
- **Systolic Blood Pressure** (mm Hg)
- **Diastolic Blood Pressure** (mm Hg)
- **Cholesterol Level** (Normal/Border-Line/High)
- **Glucose Level** (Normal/Border-Line/High)
- **Smoking Status** (Yes/No)
- **Alcohol Consumption** (Yes/No)
- **Physical Activity** (Yes/No)

## Technologies Used

### Frontend
- **Next.js 13** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **next-themes** - Theme management
- **jsPDF** - PDF generation
- **Lucide React** - Icons

### Backend
- **Flask** - Web framework
- **scikit-learn** - Machine learning
- **joblib** - Model serialization
- **NumPy** - Numerical computations

## Important Notes

### About the .pkl File Location
**The .pkl file MUST stay with your Flask API**, not in the Next.js project. Here's why:

1. The Flask API loads the model using `joblib.load()`
2. Next.js is the frontend that sends data to Flask
3. Flask processes the data and returns predictions
4. This separation of concerns is the correct architecture

### File Location in Your Flask Project
```
your-flask-project/
├── app.py
├── best_heart_risk_model.pkl  ← Keep it here
└── requirements.txt
```

### CORS Configuration
The Flask API already has CORS enabled, allowing the Next.js frontend to make requests.

## API Endpoint

### POST /predict
Request body:
```json
{
  "age": 45,
  "gender": "Male",
  "height": 170,
  "weight": 75,
  "ap_hi": 120,
  "ap_lo": 80,
  "cholesterol": "Normal",
  "gluc": "Normal",
  "smoke": "No",
  "alco": "No",
  "active": "Yes"
}
```

Response:
```json
{
  "heart_risk": 0,
  "risk_probability": 0.234,
  "bmi": 25.95
}
```

## Disclaimer

This application is for educational and informational purposes only. It should not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers regarding medical conditions or health concerns.

## Future Enhancements

- Add user authentication
- Store prediction history
- Add data visualization charts
- Implement batch predictions
- Add more detailed health recommendations
- Multi-language support

## License

MIT License - Feel free to use for educational purposes.

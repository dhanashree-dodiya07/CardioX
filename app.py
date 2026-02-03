from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load trained model
model_path = os.path.join(os.path.dirname(__file__), "best_heart_risk_model.pkl")
model = joblib.load(model_path)

# -------------------------
# MAPPINGS (Human → Model)
# -------------------------
gender_map = {
    "Male": 1,
    "Female": 0
}

cholesterol_map = {
    "Normal": 1,
    "Border-Line": 2,
    "High": 3
}

glucose_map = {
    "Normal": 1,
    "Border-Line": 2,
    "High": 3
}

yes_no_map = {
    "Yes": 1,
    "No": 0
}


@app.route("/")
def home():
    return "Heart Risk Prediction API is running ❤️"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # -------- RAW USER INPUT --------
        age = float(data["age"])
        gender = gender_map[data["gender"]]
        height = float(data["height"])
        weight = float(data["weight"])
        ap_hi = float(data["ap_hi"])
        ap_lo = float(data["ap_lo"])
        cholesterol = cholesterol_map[data["cholesterol"]]
        gluc = glucose_map[data["gluc"]]
        smoke = yes_no_map[data["smoke"]]
        alco = yes_no_map[data["alco"]]
        active = yes_no_map[data["active"]]

        # -------- BMI CALCULATION --------
        height_m = height / 100
        bmi = round(weight / (height_m ** 2), 2)

        # -------- MODEL INPUT (10 FEATURES) --------
        X = np.array([[
            age,
            gender,
            ap_hi,
            ap_lo,
            cholesterol,
            gluc,
            smoke,
            alco,
            active,
            bmi
        ]])

        prediction = model.predict(X)[0]
        probability = model.predict_proba(X)[0][1]

        return jsonify({
            "heart_risk": int(prediction),
            "risk_probability": round(float(probability), 3),
            "bmi": bmi
        })

    except KeyError as e:
        return jsonify({
            "error": f"Invalid input value: {str(e)}"
        }), 400

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

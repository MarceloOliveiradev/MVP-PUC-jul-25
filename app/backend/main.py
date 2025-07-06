from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Caminho absoluto para o modelo
model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../model/model_heart_classification.pkl"))
model = joblib.load(model_path)

@app.route("/", methods=["GET"])
def home():
    return "API de Classificação de Doença Cardíaca funcionando."

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        required_fields = [
            "age", "sex", "cp", "trestbps", "chol", "fbs",
            "restecg", "thalach", "exang", "oldpeak", "slope", "ca", "thal"
        ]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Campo ausente: {field}"}), 400

        input_data = [data[field] for field in required_fields]

        prediction = model.predict([input_data])[0]
        probability = model.predict_proba([input_data])[0][1]

        return jsonify({
            "prediction": int(prediction),
            "probability": round(float(probability), 4)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)

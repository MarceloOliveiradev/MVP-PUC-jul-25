import joblib
import pytest
import numpy as np
import os

# Caminho absoluto para evitar erros
MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../model/model_heart_classification.pkl"))

@pytest.fixture(scope="module")
def model():
    return joblib.load(MODEL_PATH)

def test_model_prediction_output(model):
    # Entrada de exemplo (sem doença)
    sample = np.array([[45, 0, 0, 120, 180, 0, 1, 170, 0, 0.2, 2, 0, 2]])
    prediction = model.predict(sample)[0]
    assert prediction in [0, 1], f"Predição inválida: {prediction}"

def test_model_prediction_probability(model):
    # Entrada de exemplo (com doença)
    sample = np.array([[63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1]])
    probability = model.predict_proba(sample)[0][1]
    assert 0.0 <= probability <= 1.0, f"Probabilidade fora do intervalo: {probability}"

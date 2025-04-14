import pickle
from pathlib import Path
__version__ = "0.1.0"
Base_dir = Path(__file__).resolve(strict=True).parent
with open(Base_dir / f"trained_diabetes-{__version__}.pkl", "rb") as f:
    model = pickle.load(f)


def predict_diabetes(input_data):
    if model is None:
        raise RuntimeError("Model is not loaded.")
    prediction = model.predict(input_data)
    # print(prediction)
    return prediction[0]
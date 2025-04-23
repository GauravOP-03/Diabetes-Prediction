import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, conint, confloat
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import numpy as np
from model.model import predict_diabetes
# from MachineLearning.model.model import __version__ as model_version
from model.model import __version__ as model_version

class data(BaseModel):
    pregnancies: conint(ge=0) 
    glucose: confloat(ge=50)  
    blood_pressure: confloat(ge=30, le=122)
    skin_thickness: confloat(ge=0, le=99)
    insulin: confloat(ge=15, le=300)
    bmi: confloat(ge=10, le=67)
    diabetes_pedigree_function: confloat(ge=0.05, le=2.42)
    age: conint(ge=1, le=100)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)   
@app.get('/')
def home():
    return {"health_check":"OK", "model_version":"0.1.0"}

@app.post('/predict')
def predict(input: data):
    try:
        input_dict = input.model_dump()
        input_values = list(input_dict.values())
        d = np.array(input_values).reshape(1, -1)
        # print(d[0][0])
        pred = predict_diabetes(d)
        return {"prediction": int(pred)} 
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

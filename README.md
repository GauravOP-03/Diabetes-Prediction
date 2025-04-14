# Diabetes Prediction Web App

This is a full-stack machine learning web application that predicts whether a person is diabetic or not based on medical input parameters. The app uses a trained machine learning model (Logistic Regression or other algorithms) integrated via a FastAPI backend and served through a React frontend.

## Features

- User-friendly interface built with **React**
- Backend API built with **FastAPI**
- Machine learning model trained in **Google Colab** and served using a **pickle (.pkl) file**
- Real-time predictions based on user input
- Clean separation between frontend and backend
- Scalable and ready for deployment

---

## Tech Stack

### Frontend
- React (JavaScript / TypeScript)
- Axios (for HTTP requests)
- Bootstrap or Tailwind (if used)

### Backend
- FastAPI (Python)
- Uvicorn (for running the FastAPI app)
- Scikit-learn (model training and prediction)
- Pickle (model serialization)

### ML Model
- Logistic Regression / Random Forest / ANN
- Trained on the Pima Indians Diabetes Dataset
- Feature scaling + preprocessing included

---

## How It Works

1. User enters input parameters (like glucose, blood pressure, BMI, etc.) via the React UI.
2. The frontend sends the data to FastAPI via a POST request.
3. FastAPI loads the trained `.pkl` model and returns the prediction.
4. The UI displays whether the person is likely diabetic or not.

---

## Installation & Usage

### 1. Clone the repository
bash
git clone https://github.com/GauravOP-03/Diabetes-Prediction.git
cd Diabetes-Prediction

### 2. Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload or python ./main.py

### 3. Frontend Setup
cd frontend
npm install
npm start

import { useState } from 'react'
import dataSchema from './Schema'
import { Input } from './components/ui/input'
import { Label } from "@/components/ui/label";
import axios from 'axios';
import backendURL from './config';
function App() {
  const [data, setData] = useState({
    pregnancies: "",
    glucose: "",
    blood_pressure: "",
    skin_thickness: "",
    insulin: "",
    bmi: "",
    diabetes_pedigree_function: "",
    age: "",
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    // console.log(data)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedData = {
      pregnancies: Number(data.pregnancies),
      glucose: Number(data.glucose),
      blood_pressure: Number(data.blood_pressure),
      skin_thickness: Number(data.skin_thickness),
      insulin: Number(data.insulin),
      bmi: Number(data.bmi),
      diabetes_pedigree_function: Number(data.diabetes_pedigree_function),
      age: Number(data.age),
    };

    // console.log(parsedData)

    try {
      setLoading(true);
      dataSchema.parse(parsedData); // validate first

      const res = await axios.post(`${backendURL}/predict`, parsedData); // await this!
      // console.log(res.data);
      setPrediction(res.data.prediction);
      setError(null);
    } catch (err: any) {
      // console.log(err);

      if (err.errors && err.errors[0] && err.errors[0].message) {
        setError(err.errors[0].message);
      } else {
        setError("An unexpected error occurred.");
      }
      setPrediction(null)

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-mono flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
      <h1 className="text-7xl text-white font-bold mb-8 drop-shadow-lg">
        Diabetes Prediction
      </h1>

      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="pregnancies">Pregnancies</Label>
            <Input id="pregnancies" type="number" name="pregnancies" required min={0} value={data.pregnancies} onChange={onInputChange} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="glucose">Glucose (mg/dL)</Label>
            <Input id="glucose" type="number" name="glucose" required min={0} value={data.glucose} onChange={onInputChange} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="blood_pressure">Blood Pressure (mm/Hg)</Label>
            <Input id="blood_pressure" type="number" name="blood_pressure" required min={0} value={data.blood_pressure} onChange={onInputChange} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="skin_thickness">Skin Thickness (mm)</Label>
            <Input id="skin_thickness" type="number" name="skin_thickness" required min={0} value={data.skin_thickness} onChange={onInputChange} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="insulin">Insulin (µU/mL)</Label>
            <Input id="insulin" type="number" name="insulin" required min={0} value={data.insulin} onChange={onInputChange} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="bmi">BMI (kg/m²)</Label>
            <Input id="bmi" type="number" name="bmi" required min={0} value={data.bmi} onChange={onInputChange} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="diabetes_pedigree_function">Diabetes Pedigree Function</Label>
            <Input id="diabetes_pedigree_function" type="number" name="diabetes_pedigree_function" required min={0} value={data.diabetes_pedigree_function} onChange={onInputChange} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" name="age" required min={0} value={data.age} onChange={onInputChange} />
          </div>
        </form>

        {error && (
          <div className="text-red-600 text-center mt-4 font-semibold">
            {error}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-800 transition duration-300 text-white font-semibold py-3 px-6 rounded-full shadow-md flex items-center gap-2"
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <div className='flex items-center gap-2'>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>  Predicting...
                </span>
              </div>
            ) : (
              "Predict"
            )}
          </button>
        </div>

        {prediction !== null && (
          <div className="mt-8 border border-gray-300 rounded-xl px-6 py-4 shadow-sm bg-white text-gray-800 text-center text-lg font-medium">
            Prediction:{" "}
            <span className={prediction === 0 ? "text-green-600" : "text-red-500"}>
              {prediction === 0 ? "No Diabetes" : "Diabetes"}
            </span>
          </div>
        )}

      </div>
    </div>


  )
}

export default App

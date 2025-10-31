import React, { useEffect, useState } from "react";
import "./App.css";
import { Chart } from "react-chartjs-2";

function App() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Example state & district list (you can replace this with your API)
  const indiaStates = {
    TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
    Kerala: ["Kozhikode", "Ernakulam", "Thiruvananthapuram"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangalore"],
  };

  useEffect(() => {
    setStates(Object.keys(indiaStates));
  }, []);

  useEffect(() => {
    if (selectedState) {
      setDistricts(indiaStates[selectedState]);
    } else {
      setDistricts([]);
    }
  }, [selectedState]);

  const fetchData = async () => {
    if (!selectedDistrict) return;
    setLoading(true);
    try {
      // Example dummy data (replace this with your MGNREGA API)
      const result = {
        employment: [120, 200, 150, 80, 70, 110, 130],
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      };
      setData(result);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch data. Please try again later.");
    }
    setLoading(false);
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      alert(`Detected your location: 
Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
      // Here, you can use reverse geocoding API to map lat/lon to District
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex flex-col items-center">
      <header className="bg-blue-600 text-white w-full text-center py-4 shadow-lg">
        <h1 className="text-3xl font-bold tracking-wide">Our Voice, Our Rights</h1>
        <p className="text-sm opacity-90">Empowering Citizens with MGNREGA Insights</p>
      </header>

      <main className="w-full max-w-4xl p-6">
        <div className="bg-white p-6 rounded-2xl shadow-xl mt-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <label className="font-semibold text-gray-700 block mb-2">Select State</label>
              <select
                className="w-full border p-2 rounded-lg"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">-- Select State --</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="font-semibold text-gray-700 block mb-2">Select District</label>
              <select
                className="w-full border p-2 rounded-lg"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">-- Select District --</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={fetchData}
            >
              Show Performance
            </button>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              onClick={handleLocation}
            >
              Detect My Location
            </button>
          </div>
        </div>

        {loading && <p className="text-center text-gray-600 mt-6">Loading data...</p>}

        {data && (
          <div className="bg-white mt-8 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              MGNREGA Performance in {selectedDistrict}
            </h2>
            <Chart
              type="bar"
              data={{
                labels: data.labels,
                datasets: [
                  {
                    label: "Employment Provided",
                    data: data.employment,
                    backgroundColor: "rgba(37, 99, 235, 0.6)",
                    borderColor: "rgba(37, 99, 235, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        )}
      </main>

      <footer className="text-center py-4 text-gray-600 mt-auto">
        © 2025 Our Voice, Our Rights | Built with ❤️ for Rural India
      </footer>
    </div>
  );
}

export default App;

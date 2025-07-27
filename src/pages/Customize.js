import { useState } from 'react';
import axios from 'axios';

function Customize() {
  const [color, setColor] = useState('#ff0000');
  const [parts, setParts] = useState({ spoiler: 'None', rims: 'Standard' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/builds',
        {
          carModel: 'Sports Car',
          color,
          selectedParts: parts
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setSuccess(' Build saved successfully!');
    } catch (e) {
      alert(' Error saving build. Please login again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 px-4 sm:px-8 py-8 overflow-auto bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">🛠️ Customize Your Car</h2>

        {success && (
          <div className="mb-4 text-green-600 text-sm font-semibold text-center">{success}</div>
        )}

        <div className="grid md:grid-cols-2 gap-10">

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">🎨 Car Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-20 h-10 rounded border border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">🏁 Spoiler</label>
              <select
                value={parts.spoiler}
                onChange={(e) => setParts({ ...parts, spoiler: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option>None</option>
                <option>Sport Spoiler</option>
                <option>Racing Spoiler</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">⚙️ Rims</label>
              <select
                value={parts.rims}
                onChange={(e) => setParts({ ...parts, rims: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option>Standard</option>
                <option>Alloy</option>
                <option>Chrome</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className={`w-full py-2 font-semibold rounded-lg transition duration-200 text-white ${
                loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? 'Saving...' : '💾 Save Build'}
            </button>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-inner text-center">
            <div
              style={{ backgroundColor: color }}
              className="w-full h-40 sm:h-48 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4 transition"
            >
              Preview Car
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Model:</strong> Sports Car <br />
              <strong>Spoiler:</strong> {parts.spoiler} <br />
              <strong>Rims:</strong> {parts.rims}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customize;

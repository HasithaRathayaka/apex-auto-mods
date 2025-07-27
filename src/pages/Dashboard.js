import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBuild, setEditingBuild] = useState(null);

  useEffect(() => {
    fetchBuilds();
  }, []);

  const fetchBuilds = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/builds', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuilds(res.data);
    } catch (err) {
      console.error(' Error fetching builds:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this build?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/builds/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuilds(builds.filter((b) => b._id !== id));
    } catch (err) {
      console.error(' Error deleting build:', err);
    }
  };

  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/builds/${editingBuild._id}`, {
        color: editingBuild.color,
        selectedParts: editingBuild.selectedParts,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBuilds(builds.map(b => (b._id === res.data._id ? res.data : b)));
      setEditingBuild(null);
    } catch (err) {
      console.error(' Error updating build:', err);
    }
  };

  return (
    <div className="flex-1 px-4 sm:px-8 py-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Your Custom Builds</h2>

      {loading ? (
        <p className="text-gray-500">Loading your builds...</p>
      ) : builds.length === 0 ? (
        <p className="text-gray-500">No builds found. Start customizing your car!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-xl text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase tracking-wide">
              <tr>
                <th className="p-4 text-left">Model</th>
                <th className="p-4 text-left">Color</th>
                <th className="p-4 text-left">Spoiler</th>
                <th className="p-4 text-left">Rims</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {builds.map((build) => (
                <tr key={build._id} className="border-t">
                  <td className="p-4 font-medium">{build.carModel}</td>
                  <td className="p-4">
                    <span
                      className="inline-block w-6 h-6 rounded-full border"
                      style={{ backgroundColor: build.color }}
                      title={build.color}
                    />
                  </td>
                  <td className="p-4">{build.selectedParts?.spoiler || 'N/A'}</td>
                  <td className="p-4">{build.selectedParts?.rims || 'N/A'}</td>
                  <td className="p-4 text-xs text-gray-500">
                    {new Date(build.createdAt).toLocaleDateString()}<br />
                    <span>{new Date(build.createdAt).toLocaleTimeString()}</span>
                  </td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => setEditingBuild(build)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(build._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingBuild && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Edit Build</h3>

            <div>
              <label className="block mb-1">🎨 Color</label>
              <input
                type="color"
                value={editingBuild.color}
                onChange={(e) => setEditingBuild({ ...editingBuild, color: e.target.value })}
                className="w-16 h-10"
              />
            </div>

            <div>
              <label className="block mb-1">🏁 Spoiler</label>
              <select
                value={editingBuild.selectedParts?.spoiler}
                onChange={(e) =>
                  setEditingBuild({
                    ...editingBuild,
                    selectedParts: { ...editingBuild.selectedParts, spoiler: e.target.value }
                  })
                }
                className="w-full border p-2 rounded"
              >
                <option>None</option>
                <option>Sport Spoiler</option>
                <option>Racing Spoiler</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">⚙️ Rims</label>
              <select
                value={editingBuild.selectedParts?.rims}
                onChange={(e) =>
                  setEditingBuild({
                    ...editingBuild,
                    selectedParts: { ...editingBuild.selectedParts, rims: e.target.value }
                  })
                }
                className="w-full border p-2 rounded"
              >
                <option>Standard</option>
                <option>Alloy</option>
                <option>Chrome</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setEditingBuild(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

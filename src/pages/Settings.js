import { useState } from 'react';

function Settings() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [message, setMessage] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();

    setMessage(' Profile updated (This is UI-only for now)');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-xl rounded-xl mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">⚙️ Settings</h2>

      {message && <div className="text-green-600 mb-4">{message}</div>}

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Settings;

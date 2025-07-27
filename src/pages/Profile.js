import React from 'react';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <p>No user data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">👤 User Profile</h2>

      <div className="space-y-4 text-gray-700 text-sm">
        <div className="flex items-center">
          <span className="w-32 font-semibold">Name:</span>
          <span>{user.name}</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 font-semibold">Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 font-semibold">Role:</span>
          <span>Garage Member</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;

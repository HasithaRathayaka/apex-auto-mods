import React from 'react';
import Img2523 from '../assets/IMG_2523-1.jpg'; 
import img2 from '../assets/img2.jpg';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="flex-1 p-6 sm:p-10 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Welcome{user?.name ? `, ${user.name}` : ''} 
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          This is <span className="font-semibold text-blue-600">Apex Auto Mods</span> — your ultimate garage to explore, customize, and modify premium sports cars.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4"> Featured Builds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Nissan GTR',
              price: 'LKR 90,000,000',
              img: img2,
            },
            {
              name: 'Range Rover',
              price: 'LKR 53,500,000',
              img: Img2523, 
            },
          ].map((car, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={car.img}
                alt={car.name}
                className="w-full h-48 object-contain bg-gray-50 p-2"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{car.name}</h3>
                <p className="text-sm text-gray-500">{car.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 Garage Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-3xl font-extrabold text-blue-600">12</p>
            <p className="text-gray-500 mt-1">Total Builds</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-3xl font-extrabold text-green-600">4</p>
            <p className="text-gray-500 mt-1">Active Projects</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-3xl font-extrabold text-red-600">3</p>
            <p className="text-gray-500 mt-1">Pending Services</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

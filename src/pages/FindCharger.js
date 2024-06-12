import React, { useState } from 'react';

const FindCharger = ({ chargerLocations, currentUser }) => {
  const [selectedCharger, setSelectedCharger] = useState(null);

  const handleCardClick = (charger) => {
    setSelectedCharger(charger);
  };

  const chargerList = chargerLocations.map((charger, index) => {
    const {
      chargerName,
      distance,
      rating,
      imageUrl,
    } = charger;

    return (
      <div
        key={index}
        className="bg-white shadow-lg rounded-lg p-4 mb-4 transition-transform transform hover:scale-105 cursor-pointer"
        onClick={() => handleCardClick(charger)}
      >
        <img
          src={imageUrl}
          alt={chargerName}
          className="w-full h-48 object-cover rounded-t-lg mb-2"
        />
        <h2 className="text-xl font-bold mb-2 text-indigo-600">{chargerName}</h2>
        <p className="text-lg mb-1">
          <strong className="font-semibold">Rating:</strong> {rating}
        </p>
        <p className="text-lg mb-1">
          <strong className="font-semibold">Distance:</strong> {distance} km
        </p>
      </div>
    );
  });

  const chargerDetail = selectedCharger ? (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full">
      <img
        src={selectedCharger.imageUrl}
        alt={selectedCharger.chargerName}
        className="w-full h-64 object-cover rounded-t-lg mb-4"
      />
      <h2 className="text-2xl font-bold mb-3 text-indigo-600">{selectedCharger.chargerName}</h2>
      <p className="text-lg mb-1">
        <strong className="font-semibold">Port Type:</strong> {selectedCharger.portType}
      </p>
      <p className="text-lg mb-1">
        <strong className="font-semibold">Capacity:</strong> {selectedCharger.portCapacity} kW
      </p>
      <p className="text-lg mb-1">
        <strong className="font-semibold">Time Availability:</strong> {selectedCharger.timeAvailability}
      </p>
      <p className="text-lg mb-1">
        <strong className="font-semibold">Contact Number:</strong> {selectedCharger.contactNumber}
      </p>
      <p className="text-lg mb-1">
        <strong className="font-semibold">Distance:</strong> {selectedCharger.distance} km
      </p>
      <p className="text-lg mb-1">
        <strong className="font-semibold">Amenities:</strong> {selectedCharger.amenities}
      </p>
      <p className="text-lg mb-1">
        <strong className="font-semibold">Contact:</strong> {selectedCharger.contact}
      </p>
      <p className="text-lg mb-1">
        <strong className="font-semibold">Message from Owner:</strong> {selectedCharger.messageFromOwner}
      </p>
    </div>
  ) : null;

  return (
    <div className="container mx-auto p-6">
      {currentUser ? (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Nearby Chargers</h1>
          {selectedCharger ? (
            <div className="w-full">
              <button
                onClick={() => setSelectedCharger(null)}
                className="mb-4 text-indigo-600 underline"
              >
                Back to List
              </button>
              {chargerDetail}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chargerList.length > 0 ? chargerList : <p className="text-lg text-center">No chargers found.</p>}
            </div>
          )}
        </div>
      ) : (
        <p className="text-lg text-center">Please sign in to view charger details.</p>
      )}
    </div>
  );
};

export default FindCharger;

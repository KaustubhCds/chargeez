import React, { useEffect, useState } from "react";
import "./FindCharger.css"; 
import { db, auth } from '../config/firebase'; 
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

const FindCharger = ({ chargerLocations = [], onClose }) => {
  console.log("Charger locations:", chargerLocations);

  const [selectedCharger, setSelectedCharger] = useState(null);
  const [requestSent, setRequestSent] = useState(false); 
  const [chargers, setChargerLocations] = useState(chargerLocations); // Use local state to store charger locations

  useEffect(() => {
    fetchChargers();
  }, []);

  const handleChargerClick = (charger) => {
    console.log("Charger clicked:", charger);
    setSelectedCharger(charger);
    setRequestSent(false);
  };

  const fetchChargers = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'chargers'));
      const chargers = snapshot.docs.map(doc => ({
        id: doc.id,  // Include the document ID
        ...doc.data()
      }));
      setChargerLocations(chargers);
    } catch (error) {
      console.error("Error fetching chargers: ", error);
    }
  };

  const closeSelectedCharger = () => {
    setSelectedCharger(null);
  };

  const sendChargeRequestEmail = async (charger) => {
    if (!auth.currentUser) {
      console.log("User not authenticated");
      return;
    }

    try {
      const response = await fetch('/sendChargeRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chargerId: charger.id,
          userId: auth.currentUser.uid
        })
      });

      if (response.ok) {
        console.log("Email sent to service provider");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleRequestCharge = async () => {
    console.log("Selected charger:", selectedCharger);
    console.log("Charger ID:", selectedCharger.id);
    if (!auth.currentUser) {
      console.log("User not authenticated");
      return;
    }

    if (!selectedCharger || selectedCharger.id === undefined) {
      console.log("No charger selected or charger ID is undefined");
      return;
    }

    const chargeRequest = {
      chargerId: selectedCharger.id,
      userId: auth.currentUser.uid,
      status: "pending",
      requestedAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "chargeRequests"), chargeRequest);
      setRequestSent(true);
      console.log("Charge request sent");
      // Optionally, show a message to the user here
    } catch (error) {
      console.error("Error sending charge request: ", error);
      // Optionally, show an error message to the user here
    }
  };

  const handleStartCharge = () => {
    console.log("Starting charge for", selectedCharger.name);
    // Add your start charge logic here
  };

  const handleEndCharge = () => {
    console.log("Ending charge for", selectedCharger.name);
    // Add your end charge logic here
  };

  return (
    <div className="find-charger-modal">
      {chargers.map((charger, index) => (
        <div key={index} className={`charger-box charger-${index + 1}`} onClick={() => {
          console.log("Charger clicked:", charger);
          handleChargerClick(charger);
        }}>
          <p className="charger-name-1">Charger Name: {charger.name}</p>
          <p className="port-type-1">Port Type: {charger.portType}</p>
          <p className="port-capacity-1">Port Capacity: {charger.portCapacity}</p>
        </div>
      ))}
      {selectedCharger && (
        <div className="charger-details">
          <h3 className="name-of-charger-2">Charger Details</h3>
          <img src={selectedCharger.photos} className="charger-photo" alt="Charger" />
          <p className="charger-name-2">Charger Name: {selectedCharger.name}</p>
          <p className="port-type-2">Port Type: {selectedCharger.portType}</p>
          <p className="port-capacity-2">Port Capacity: {selectedCharger.portCapacity}</p>  
          <p className="port-num-2">Number of Ports: {selectedCharger.numPorts}</p>
          <p className="Fees-2">Charges per Unit ₹: {selectedCharger.chargeType}</p>
          <p className="Current-Type-2">Current Type: {selectedCharger.currentType}</p>
          <p className="Parking-2">Parking: {selectedCharger.parkingAvailability}</p>
          <button onClick={handleRequestCharge} disabled={requestSent}>Request Charge</button>
          <button disabled={!requestSent}>Start Charge</button>
          <button disabled={!requestSent}>End Charge</button>
          {/* Close button */}
          <img className="close1437-1-icon1" alt="" src="/close1437-1@2x.png" onClick={closeSelectedCharger}/>
        </div>
      )}
    </div>
  );
};

export default FindCharger;

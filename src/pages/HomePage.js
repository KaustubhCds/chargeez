
import React, { useState, useCallback, useEffect } from "react";
import FindCharger from "../components/FindCharger";
import PortalPopup from "../components/PortalPopup";
import MapComponent from "./GoogleMaps"; // Update the path if needed
import AddCharger from '../components/AddCharger';
import NavBar from "./NavBar";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from '../config/firebase'; // Ensure these are correctly imported
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from 'react-router-dom';


const HomePage = () => {
  const [isFindChargerOpen, setFindChargerOpen] = useState(false);
  const [chargerLocations, setChargerLocations] = useState([]);
  const [isAddChargerOpen, setIsAddChargerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // State to track the current user
  const [userLocation, setUserLocation] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Update state when user signs in or out
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      }, () => {
        console.log("Error getting the current position. Using default location.");
        setUserLocation({ lat: 18, lng: 73 });
      });
    } else {
      console.log("Geolocation is not available. Using default location.");
      setUserLocation({ lat: 18, lng: 73 });
    }
  }, []);

  const openFindCharger = useCallback(() => {
    setFindChargerOpen(true);
  }, []);

  const closeFindCharger = useCallback(() => {
    setFindChargerOpen(false);
  }, []);

  const openAddCharger = useCallback(() => {
    if (currentUser) { // Open AddCharger only if user is signed in
      setIsAddChargerOpen(true);
    } else {
      alert("Please sign in to add a charger.");
    }
  }, [currentUser]);

  const closeAddCharger = useCallback(() => {
    setIsAddChargerOpen(false);
  }, []);

  useEffect(() => {
    const fetchChargerLocations = async () => {
      const querySnapshot = await getDocs(collection(db, "chargers"));
      const locations = querySnapshot.docs.map(doc => {
        const chargerData = doc.data();
        if (chargerData.geoLocation && typeof chargerData.geoLocation === 'string') {
          const [latStr, lngStr] = chargerData.geoLocation.split(',');
          const lat = parseFloat(latStr.trim());
          const lng = parseFloat(lngStr.trim());
          return { ...chargerData, geoLocation: { lat, lng }};
        }
        return chargerData; // Return the document data even if there's no geoLocation
      });
      setChargerLocations(locations);
    };

    fetchChargerLocations();
  }, []);

  useEffect(() => {
    if (location.state?.openAddCharger) {
      openAddCharger();
    }
  }, [location.state, openAddCharger]);

  return (
    <>
      <div className="home-page">
        <NavBar />

        <div className="google-maps-container">
          {userLocation && (
            <MapComponent
              chargerLocations={chargerLocations}
              openFindCharger={openFindCharger}
              currentUser={currentUser}
              center={userLocation} // Pass the userLocation as center
            />
          )}
        </div>
      </div>

      {isFindChargerOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeFindCharger}
        >
          <FindCharger
            chargerLocations={chargerLocations}
            onClose={closeFindCharger}
          />
        </PortalPopup>
      )}

      {isAddChargerOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeAddCharger}
        >
          <AddCharger onClose={closeAddCharger} />
        </PortalPopup>
      )}
    </>
  );
};

export default HomePage;

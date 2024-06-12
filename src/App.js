import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Services from "./pages/Services";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import LocationContext from "./pages/LocationContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import MainPage from "./pages/MainPage";
import FindCharger from './components/FindCharger';



function App() {
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [chargerLocations, setChargerLocations] = useState([]);

  useEffect(() => {
    const fetchChargerLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chargers"));
        const locations = querySnapshot.docs.map((doc) => {
          const chargerData = doc.data();
          console.log("Charger data:", chargerData);

          let lat = 0;
          let lng = 0;

          if (chargerData.geoLocation && typeof chargerData.geoLocation === "string") {
            const [latStr, lngStr] = chargerData.geoLocation.split(",");
            lat = parseFloat(latStr.trim());
            lng = parseFloat(lngStr.trim());
          } else {
            console.warn(`geoLocation not found or not a string in document ID: ${doc.id}`);
          }

          if (isNaN(lat) || isNaN(lng)) {
            console.error(`Error parsing geoLocation for charger ID ${doc.id}`);
          }

          return {
            ...chargerData,
            geoLocation: {
              lat: isNaN(lat) ? 0 : lat,
              lng: isNaN(lng) ? 0 : lng,
            },
          };
        });
        setChargerLocations(locations);
        console.log("Charger Locations:", locations);
      } catch (error) {
        console.error("Error fetching charger locations:", error);
      }
    };

    fetchChargerLocations();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User's location:", latitude, longitude);
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (location.action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [location.action, location.pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (location.pathname) {

      case "/":
        title = "ChargeEazy";
        metaDescription = "Access to the landing page";
        break;

        case "/chargers":
        title = "ChargeEazy";
        metaDescription = "Access to the landing page";
        break;

      case "/signin":
        title = "ChargeEazy";
        metaDescription = "Sign in to access your account.";
        break;
      case "/services":
        title = "ChargeEazy";
        metaDescription = "Explore our services.";
        break;
      case "/homepage":
        title = "ChargeEazy";
        metaDescription = "Welcome to the home page.";
        break;
      case "/contact":
        title = "ChargeEazy";
        metaDescription = "Get in touch with us.";
        break;
      case "/myprofile":
        title = "ChargeEazy";
        metaDescription = "Manage your profile.";
        break;
      default:
        title = "ChargeEazy";
        metaDescription = "Welcome to our app.";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [location.pathname]);

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      <>
        

        <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chargers" element={<FindCharger chargerLocations={[]} />} /> {/* Pass necessary props */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/services" element={<Services />} />
          <Route path="/homepage" element={<HomePage chargerLocations={chargerLocations} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/myprofile" element={<MyProfile />} />
        
        </Routes>
      </>
    </LocationContext.Provider>
  );
};

export default App;
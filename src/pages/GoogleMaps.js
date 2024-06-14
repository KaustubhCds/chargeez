
import React, { useState, useEffect, useRef, useContext } from "react";
import FindCharger from "./FindCharger";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  StandaloneSearchBox,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import LocationContext from "./LocationContext";

const mapStyles = {
  height: "100vh",
  width: "100%",
};

const defaultCenter = { lat: 40.756795, lng: -73.954298 };
const libraries = ["places"];

function MapComponent({
  updateSelectedLocation,
  chargerLocations,
  openFindCharger,
  isAuthenticated,
  currentUser,
}) {
  const [center, setCenter] = useState(null);
  const [chargerMarkers, setChargerMarkers] = useState([]);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [destination, setDestination] = useState("");
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const directionsServiceRef = useRef(null);

  const { selectedLocation, setSelectedLocation } = useContext(LocationContext);

  const getMarkerColor = (portCapacity) => {
    const capacity = parseFloat(portCapacity);
    if (capacity >= 60) return "#fc0800";
    if (capacity >= 50) return "#fc3200";
    if (capacity >= 25) return "#fc8f00";
    if (capacity >= 12) return "#fcd600";
    if (capacity >= 7.5) return "#fcf800";
    if (capacity >= 3.3) return "#c5fc00";
    return "#0043fc";
  };

  useEffect(() => {
    if (chargerLocations && Array.isArray(chargerLocations) && isScriptLoaded) {
      const newChargerMarkers = chargerLocations
        .map((charger, index) => {
          if (charger.geoLocation && typeof charger.geoLocation === "object") {
            const { lat, lng } = charger.geoLocation;
            const icon = {
              url: "/icon.png",
              scaledSize: new window.google.maps.Size(35, 50),
            };
            return {
              position: { lat, lng },
              icon,
              chargerName: charger.chargerName,
              imageUrl: charger.imageUrl, // Pass imageUrl here
              key: charger.id || index,
              portType: charger.portType,
              portCapacity: charger.portCapacity,
            };
          } else {
            //   console.warn(Invalid or missing geoLocation for charger at index ${index});
            return null;
          }
        })
        .filter((marker) => marker !== null);

      setChargerMarkers(newChargerMarkers);
    }
  }, [chargerLocations, isScriptLoaded]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        () => {
          console.log(
            "Error getting the current position. Using default location."
          );
          setCenter({ lat: 18, lng: 73 });
        }
      );
    } else {
      console.log("Geolocation is not available. Using default location.");
      setCenter({ lat: 18, lng: 73 });
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      chargerMarkers.forEach((marker) => {
        bounds.extend(marker.position);
      });

      if (!bounds.isEmpty()) {
        mapRef.current.fitBounds(bounds);
      } else {
        mapRef.current.setCenter(center);
        mapRef.current.setZoom(15);
      }
    }
  }, [chargerMarkers, center]);

  const onMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
    if (updateSelectedLocation) {
      updateSelectedLocation({ lat, lng });
    }
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) {
      return;
    }
    const place = places[0];
    if (!place.geometry || !place.geometry.location) {
      return;
    }
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setSelectedLocation({ lat, lng });
    setCenter({ lat, lng });
  };

  const recenterMap = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
        mapRef.current.setCenter({ lat: latitude, lng: longitude });
      },
      () => {
        console.log("Error: The Geolocation service failed.");
        setCenter(defaultCenter);
        mapRef.current.setCenter(defaultCenter);
      }
    );
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleRouteSubmit = () => {
    if (navigator.geolocation && isScriptLoaded) {
      navigator.geolocation.getCurrentPosition((position) => {
        const origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        directionsServiceRef.current =
          new window.google.maps.DirectionsService();
        directionsServiceRef.current.route(
          {
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirectionsResponse(result);
            } else {
              console.error(`Error fetching directions ${result}`);
            }
          }
        );
      });
    }
  };

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      <LoadScript
        googleMapsApiKey="AIzaSyAz-yCiSKYP_dkoNaQy5vhi-r3w6Bcyuhg"
        libraries={libraries}
        onLoad={() => setIsScriptLoaded(true)}
      >
        <div className="relative w-full h-screen flex">
          <div className="w-1/4 bg-white p-4 overflow-y-auto">
            <FindCharger
              chargerLocations={chargerLocations}
              currentUser={currentUser}
            />
          </div>
          <div className="w-3/4">
            <GoogleMap
              mapContainerStyle={mapStyles}
              center={center}
              zoom={10}
              onClick={onMapClick}
              onLoad={(mapInstance) => {
                mapRef.current = mapInstance;
              }}
            >
              {isScriptLoaded &&
                chargerMarkers.map((marker) => (
                  <Marker
                    key={marker.key}
                    position={marker.position}
                    icon={marker.icon}
                    onClick={() =>
                      currentUser
                        ? openFindCharger()
                        : alert("Please sign in to view charger details.")
                    }
                    onMouseOver={() => setHoveredMarker(marker)}
                    onMouseOut={() => setHoveredMarker(null)}
                  >
                    {hoveredMarker === marker && isAuthenticated && (
                      <InfoWindow
                        position={marker.position}
                        onCloseClick={() => setHoveredMarker(null)}
                      >
                        <div className="p-2">
                          <img
                            src={marker.imageUrl}
                            alt={marker.chargerName}
                            className="w-full h-40 object-cover rounded-md mb-2"
                          />
                          <p className="text-sm">
                            Port Capacity: {marker.portCapacity}
                          </p>
                          <p className="text-sm">
                            Port Type: {marker.portType}
                          </p>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                ))}
              <StandaloneSearchBox
                onLoad={(ref) => (searchBoxRef.current = ref)}
                onPlacesChanged={onPlacesChanged}
              >
                <input
                  type="text"
                  placeholder="Search places..."
                  className="box-border border border-gray-300 w-60 h-8 px-3 rounded-md shadow-md text-sm outline-none overflow-ellipsis mt-2 ml-3"
                />
              </StandaloneSearchBox>
              {selectedLocation && (
                <Marker
                  position={{
                    lat: selectedLocation.lat,
                    lng: selectedLocation.lng,
                  }}
                  onClick={() => setSelectedLocation(null)}
                />
              )}
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
            <div className="absolute top-20 right-5 space-y-4 z-10">
              <button
                onClick={recenterMap}
                className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Recenter
              </button>
              <button
                onClick={openFindCharger}
                className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-700"
              >
                Find Charger
              </button>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter destination"
                  value={destination}
                  onChange={handleDestinationChange}
                  className="box-border border border-gray-300 w-60 h-8 px-3 rounded-md shadow-md text-sm outline-none"
                />
                <button
                  onClick={handleRouteSubmit}
                  className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </LoadScript>
    </LocationContext.Provider>
  );
}

export default MapComponent;

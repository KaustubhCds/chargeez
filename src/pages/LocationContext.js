// LocationContext.js
import { createContext } from 'react';

const LocationContext = createContext({
    selectedLocation: null, // default value
    setSelectedLocation: () => {}, // provides a default function (no-op)
  });

export default LocationContext;

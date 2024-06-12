import React, { useState,useContext, useEffect } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import './AddCharger.css'
import LocationContext from '../pages/LocationContext'; 
import { auth, storage, ref, uploadBytes, getDownloadURL } from '../config/firebase';




function AddCharger() {
    const { selectedLocation } = useContext(LocationContext);
    const initialGeoLocation = selectedLocation ? `${selectedLocation.lat}, ${selectedLocation.lng}` : '';
    const [geoLocation, setGeoLocation] = useState(initialGeoLocation);
    const [chargerName, setChargerName] = useState('');    
    const [numPorts, setNumPorts] = useState('');
    const [portType, setPortType] = useState('');
    const [portCapacity, setPortCapacity] = useState('');
    const [timeAvailability, setTimeAvailability] = useState('');
    const [meterAvailability, setMeterAvailability] = useState(false);
    const [parkingAvailability, setParkingAvailability] = useState('');
    const [photos, setPhotos] = useState('');
    const [chargeType, setChargeType] = useState('');
    const [currentType, setCurrentType] = useState('');
    const [showHelp, setShowHelp] = useState(false); // New state for showing help popup


    useEffect(() => {
        // This effect will run every time `selectedLocation` changes, updating `geoLocation`.
        if (selectedLocation) {
            setGeoLocation(`${selectedLocation.lat}, ${selectedLocation.lng}`);
        }
    }, [selectedLocation]);

    const toggleHelpPopup = () => {
        setShowHelp(!showHelp);
    };

    // Before handling the submit, you can check if all required fields are filled
    const isFormValid = () => {
        // Check if all required fields have values
        return (
            chargerName.trim() &&
            geoLocation.trim() &&
            numPorts.trim() &&
            portType &&
            portCapacity &&
            timeAvailability.trim() &&
            parkingAvailability.trim() &&
            photos && // Check if a photo file has been selected
            chargeType.trim() &&
            currentType
        );
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isFormValid()){
            alert('Please fill in all the required fields');
            return;
        }

        if(!photos){
            alert('Please upload a photo of the location.');
            return;
        }

        const user = auth.currentUser;
         if (!user) {
            alert('User not authenticated.');
             return;
        }

        let photoURL = '';
        if (photos) {
            const photoRef = ref(storage, `photos/${photos.name}`);
            await uploadBytes(photoRef, photos);
            photoURL = await getDownloadURL(photoRef);
        }

        const chargerData = {
            name: chargerName,
            geoLocation,
            numPorts,
            portType,
            portCapacity,
            timeAvailability,
            meterAvailability,
            parkingAvailability,
            photos: photoURL,
            chargeType,
            currentType,
            userId: user.uid,           // user's unique id
            userEmail: user.email,      // user's email
            // If you've stored user's name & mobile in Firebase Auth user object
            userName: user.displayName, // user's name
            userMobile: user.phoneNumber // user's mobile number
        };

        try {
            const docRef = await addDoc(collection(db, "chargers"), chargerData);
            console.log("Document written with ID: ", docRef.id);
            alert('Charger added successfully!');
            // Reset form or navigate to another page if needed
        } catch (error) {
            console.error("Error adding charger:", error);
            alert('Error adding charger. Please try again.');
        }
    }

    return (
        <div>            
            <form className='addchargerform' onSubmit={handleSubmit}>
                <div className='add-charger'>
                <b className='formheader'>Add Charger</b>
                <div className='addcharger-line'/>
                <div className='point1'>
                    <label>Name of Charger:</label>
                    <input className='box1' 
                    type="text" 
                    placeholder='Charger Name'
                    value={chargerName} 
                    onChange={e => setChargerName(e.target.value)} required />
                </div>

                <div className='point2'>
                    <label>Geolocation:</label>
                    <input className='box2'
                    type="text" 
                    value={geoLocation}                     
                    onChange={e => setGeoLocation(e.target.value)} 
                    placeholder="Select Location from Map" readOnly={!!selectedLocation} required/>
                    <button type="button" className="help-button" onClick={toggleHelpPopup}>?</button>
                    {showHelp && (
                        <div className="help-popup">
                            <p>Instructions on how to add geolocation:</p>
                            <ul>
                                <li>Step 1: Do this...</li>
                                <li>Step 2: Do that...</li>
                                {/* ... add more steps as needed */}
                            </ul>
                            <button type="button" className="close-help" onClick={toggleHelpPopup}>Close</button>
                        </div>
                    )}
                </div>

                <div className='point3'>
                    <label>Number of Ports Available:</label>
                    <input className='box3'
                    type="number" 
                    value={numPorts} 
                    onChange={e => setNumPorts(e.target.value)} 
                    min={1} required/>
                </div>
                <div className='point4'>
                    <label>Port Type:</label>
                    <select className='box4'
                    value={portType} 
                    onChange={e => setPortType(e.target.value)} required>
                        <option value="">Select Port Type</option>
                        <option value="Three Pin Socket220-240W">Three Pin Socket 220-240W</option>
                        <option value="Type 2 plug">Type 2 plug</option>
                        <option value="CCS">CCS</option>
                        <option value="CHAdeMO">CHAdeMO</option>
                        <option value="Mode 2 Charger">Mode 2 Charger</option>
                    </select>
                </div>
                <div className='point5'>
                    <label>Port Capacity:</label>
                    <select className='box5'
                    value={portCapacity} 
                    onChange={e => setPortCapacity(e.target.value)} required>
                        <option value="">Select Port Capacity</option>
                        <option value="3.3KW">3.3KW</option>
                        <option value="7.5KW">7.5KW</option>
                        <option value="12KW">12KW</option>
                        <option value="25KW">25KW</option>
                        <option value="50KW">50KW</option>
                        <option value="60KW">60KW</option>
                        {/* ... add other options */}
                    </select>
                </div>
                <div className='point6'>
                    <label>Time Availability:</label>
                    <input className='box6'
                    type="text" 
                    value={timeAvailability} 
                    onChange={e => setTimeAvailability(e.target.value)} 
                    placeholder="e.g., 9am - 5pm" required />
                </div>
                <div className='point7'>
                    <label>Meter Availability:</label>
                    <div className='box7'>
                    <label>
                        <input 
                            type="radio" 
                            name="meterAvailability"
                            value="Yes"
                            checked={meterAvailability === "Yes"} 
                            onChange={e => setMeterAvailability(e.target.value)} 
                        required />
                        Yes
                    </label>
                    
                    <label>
                        <input 
                            type="radio" 
                            name="meterAvailability"
                            value="No"
                            checked={meterAvailability === "No"} 
                            onChange={e => setMeterAvailability(e.target.value)} 
                        required />
                        No
                    </label>
                    </div>
                </div>
                <div className='point8'>
                    <label>Parking Availability:</label>
                    <input className='box8'
                    type="text" 
                    value={parkingAvailability} 
                    onChange={e => setParkingAvailability(e.target.value)} 
                    placeholder="e.g., 2 Four Wheeler" required/>
                </div>
                <div className='point9'>
                    <label>Photos of Location:</label>
                    <input className='box9' 
                        type="file" 
                        onChange={e => setPhotos(e.target.files[0])} 
                        placeholder='Upload charger location Photo' required/>
                </div>

                <div className='point10'>
                    <label>Charges per unit:</label>
                    <input className='box10'
                    type="text" 
                    value={chargeType} 
                    placeholder='Amount per unit'
                    onChange={e => setChargeType(e.target.value)} required />
                </div>
                <div className='point11'>
                    <label>Type of Current by the Port:</label>
                    <select className='box11' 
                    value={currentType} 
                    onChange={e => setCurrentType(e.target.value)} required >
                        <option value="">Select Current Type</option>
                        <option value="AC">AC</option>
                        <option value="DC">DC</option>
                    </select>
                </div>
                <button type="submit" className='submitbutton'>Add Charger</button>
                </div>
            </form>       
        </div>
    );
}

export default AddCharger;

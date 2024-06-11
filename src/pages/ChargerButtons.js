import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';


function ChargerButtons({ onShareChargerClick }) {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsUserAuthenticated(!!user); // Directly convert user to boolean
        });

        return () => unsubscribe();
    }, []);

    const handleShareCharger = () => {
        if (isUserAuthenticated) {
            onShareChargerClick();
        } else {
            navigate('/signin');
        }
    }

    return (
        <div className="button-add-charger">
            <div className="button-add-charger-child" />
            <div className="share-your-charger" onClick={handleShareCharger}>Share Your Charger</div>
        </div>
    );
}

export default ChargerButtons;

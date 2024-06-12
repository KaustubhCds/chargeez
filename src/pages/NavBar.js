import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
    const [userData, setUserData] = useState(null);
    const [isGuest, setIsGuest] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsGuest(false);  // User is not a guest
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                }
            } else {
                setIsGuest(true);  // User is a guest
                setUserData(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const getInitials = (name) => {
        if (!name) return "";
        return name.split(' ').map(part => part[0].toUpperCase()).join('');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-background-grey shadow-md py-2 px-10 flex flex-wrap items-center justify-between text-xl">
            <div className="flex items-center w-full md:w-auto">
                <Link to="/">
                    <img className="h-16" src="/logo.png" alt="Logo" />
                </Link>
                <button
                    className="text-white text-2xl md:hidden ml-auto"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            
            <div className={`w-full md:flex md:w-auto ${isMenuOpen ? "block" : "hidden"}`}>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-10 mt-4 md:mt-0">
                    <Link to="/homepage" className="text-white hover:text-[#8AFF74] transition duration-300">Home</Link>
                    <Link to="/services" className="text-white hover:text-[#8AFF74] transition duration-300">Services</Link>
                    <Link to="/contact" className="text-white hover:text-[#8AFF74] transition duration-300">Contact</Link>
                    <Link to="/myprofile" className="text-white hover:text-[#8AFF74] transition duration-300">My Profile</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

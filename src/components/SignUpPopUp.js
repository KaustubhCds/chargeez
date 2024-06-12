import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPopUp.css";
import { auth, db } from '../config/firebase';  // Adjust the path if needed
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const SignUpPopUp = ({onClose}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user data in Firestore
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: name,
            mobileNumber: mobileNumber,
            email: email,
            username: mobileNumber  // using mobile number as username
        });

        alert('Sign up successful!');
        onClose();
    } catch (error) {
        alert(error.message);
    }
};

  const onClose14371ImageClick = useCallback(() => {
    onClose();
  });

  return (
    <form className="sign-up-pop-up"onSubmit={handleSignUp}>
      <div className="signup">
        <b className="sign-up">Sign Up</b>
        <div className="signup-line"/>
        
        <input className="email-id1" 
         type="text"
         placeholder="Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
        />
        <input className="email-id2" 
        type="tel"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        />
        
        <input className="email-id3" 
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        
        <input className="email-id4" 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        
        <div className="name">Name:</div>
        <div className="mobile-number">Mobile Number:</div>
        <div className="email-id5">Email ID:</div>
        <div className="password2">Password:</div>
        <img
          className="close1437-1-icon"
          alt=""
          src="/close1437-1@2x.png"
          onClick={onClose14371ImageClick}
        />
        <button type = "submit" className="sign-up-done-button">
          <div className="sign-up-done-button-child" />
          <div className="sign-up1">Sign Up</div>
        </button>
      </div>
    </form>
  );
};

export default SignUpPopUp;

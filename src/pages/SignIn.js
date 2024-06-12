import { useState } from "react";
import { auth, googleProvider, facebookProvider, db } from '../config/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';


// const StatCard = ({ number, label }) => (
//   <div className="flex-1 mx-2 my-4 sm:my-0">
//     <div className="text-4xl text-white font-poppins">{number}</div>
//     <div className="text-sm text-white font-poppins">{label}</div>
//   </div>
// );



// const InfoCard = ({ imgSrc, title, description }) => (
//   <div className="flex flex-col items-center mx-5 my-4 sm:my-0">
//     <img src={imgSrc} className="w-56 rounded-lg" alt={title} />
//     <div className="text-xl font-poppins text-[#7DF9FF] w-56 pt-3 text-center">
//       {title}
//     </div>
//     <div className="w-56 pt-3 font-poppins text-white text-center">
//       {description}
//     </div>
//   </div>
// );


// const Performance = () => {
//   return (
//     <section className="bg-black h-auto w-full">
//       <div className="flex flex-wrap p-8 justify-center items-center space-x-4 md:space-x-8 lg:space-x-16 mx-auto">
//         <StatCard number="15000+" label="Chargers Onboarded" />
//         <StatCard number="1.2M+" label="Charging Sessions/Year" />
//         <StatCard number="36000+" label="Tons CO2 Reduced/Year" />
//         <StatCard number="65000+" label="Users Onboarded" />
//         <StatCard number="25500+" label="Stations on Roaming" />
//       </div>
//     </section>
//   );
// };






// const WhyToChoose = () => {
//   return (
//     <section className="bg-[#36454F] w-full h-auto">
//       <div className="text-[#39FF14] font-poppins text-3xl text-center pt-14">
//         Why Choose ChargeEazy?
//       </div>

//       <div className="pt-16 flex flex-wrap justify-center">
//         <InfoCard
//           imgSrc="/1.png"
//           title="Find Stations Nearby"
//           description="Quickly locate charging stations near you with our easy-to-use map."
//         />
//         <InfoCard
//           imgSrc="/2.png"
//           title="Easy Start Charging"
//           description="Start charging your EV in just a few clicks with our user-friendly interface."
//         />
//         <InfoCard
//           imgSrc="/3.png"
//           title="Transparent Pricing"
//           description="Get clear and upfront pricing for all your charging needs."
//         />
//         <InfoCard
//           imgSrc="/4.png"
//           title="Reliable Support"
//           description="24/7 support to assist you anytime, anywhere."
//         />
//       </div>

//       <div className="text-[#39FF14] font-poppins text-3xl text-center pt-14">
//         How ChargeEazy Works?
//       </div>

//       <div className="pt-16 flex flex-wrap justify-center">
//         <InfoCard
//           imgSrc="/5.png"
//           title="Locate Stations"
//           description="Search and select a nearby charging station."
//         />
//         <InfoCard
//           imgSrc="/6.png"
//           title="Plug In"
//           description="Connect your EV to the station."
//         />
//         <InfoCard
//           imgSrc="/7.png"
//           title="Start Charging"
//           description="Use the app to begin charging."
//         />
//         <InfoCard
//           imgSrc="/8.png"
//           title="Track & Pay"
//           description="Monitor charging status and pay easily through the app."
//         />
//       </div>
//     </section>
//   );
// };



// const Subscribe = () => {
//   return (
//     <div className="bg-[#36454F] w-full h-auto py-10 justify-center pt-28">
//       <div className="flex flex-col md:flex-row justify-center items-center">
//         <div className="w-full md:w-1/3 text-center md:text-left">
//           <div className="text-white text-2xl font-bold">
//             Subscribe to Our Newsletter
//           </div>
//           <div className="text-white text-sm mt-4 font-light">
//             Stay updated with our latest news and updates
//           </div>
//         </div>
//         <div className="mt-6 md:mt-0 md:ml-20 w-full md:w-1/3">
//           <div className="flex flex-col md:flex-row items-center">
          
//             <label htmlFor="email" className="text-white mr-2 mb-2 md:mb-0">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="px-2 py-1 rounded w-80"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="text-white text-xs ml-12 mt-2">we respect your privacy</div>
//           <button className="mt-4 md:mt-5 px-12 py-2 ml-12 bg-white text-black  rounded-lg hover:bg-blue-700">
//             Subscribe Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Footer = () => {
//   return (
//     <footer className="bg-[#36454F] w-full h-auto pt-10 pb-10">
//       <div className="container mx-auto text-center">
//         <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-8 text-white">
//           <li>
//             <a href="/about-us" className="hover:underline">
//               About Us
//             </a>
//           </li>
//           <li>
//             <a href="/contact-us" className="hover:underline">
//               Contact Us
//             </a>
//           </li>
//           <li>
//             <a href="/privacy-policy" className="hover:underline">
//               Privacy Policy
//             </a>
//           </li>
//           <li>
//             <a href="/terms-conditions" className="hover:underline">
//               Terms & Conditions
//             </a>
//           </li>
//         </ul>
//       </div>
//     </footer>
//   );
// };

// const DownloadSection = () => {
//   return (
//     <section className="bg-white w-full h-auto py-10 flex flex-col items-center">
//       <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
//         Download ChargeEazy
//       </h2>
//       <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//         <a
//           href="https://www.apple.com/app-store/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-black text-white font-bold py-2 px-4 rounded flex items-center justify-center"
//         >
//           <img src="/apple.png" alt="Apple Store" className="h-6 mr-2" />
//           <span>App Store</span>
//         </a>
//         <a
//           href="https://play.google.com/store"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-black text-white font-bold py-2 px-4 rounded flex items-center justify-center"
//         >
//           <img src="/google-play.png" alt="Google Play" className="h-6 mr-2" />
//           <span>Google Play</span>
//         </a>
//       </div>
//     </section>
//   );
// };

// import { useState } from "react";

const DownloadSection = () => {
  return (
    <section className="bg-white w-full h-auto py-10 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
        Download ChargeEazy
      </h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          <img src="/apple.png" className="h-6 mr-2" />
          <span>App Store</span>
        </a>
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white font-bold py-1 rounded flex items-center justify-center"
          style={{ width: "130px" }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-10 mr-2"
          />
        </a>
      </div>
    </section>
  );
};

const SignIn = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGuestSignIn = () => {
    alert('Continuing as a guest!');
    navigate('/homepage');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Sign in successful!');
      navigate('/homepage');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        name: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
        mobile: mobile,
      }, { merge: true });

      alert('Signed in with Google successfully!');
      navigate('/homepage');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        name: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
        mobile: mobile,
      }, { merge: true });

      alert('Signed in with Facebook successfully!');
      navigate('/homepage');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      alert('Registration successful!');
      setIsRegistering(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('Signed out successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative">
      <div className="text-[#36454F] font-poppins text-center text-4xl font-semibold mt-16">
        Welcome to ChargeEazy
      </div>
      <div className={`flex mt-16 ${isRegistering ? "filter blur-sm" : ""}`}>
        <div className="w-1/2">
          <img src="/signin.png" alt="Car" />
          <DownloadSection />
        </div>
        <div className="flex flex-col items-center justify-center bg-white p-8 w-full md:w-1/2">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6">{isRegistering ? 'Register' : 'Sign In'}</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={isRegistering ? handleRegister : handleSignIn}>
              {isRegistering && (
                <>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      id="mobile"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isRegistering && (
                  <a
                    href="#"
                    onClick={handleForgotPassword}
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                )}
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#8AFF74] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {isRegistering ? 'Register' : 'Log In'}
                </button>
              </div>
            </form>
            {!isRegistering && (
              <>
                <div className="text-center text-gray-600 my-2">or</div>
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
                  >
                    Log In with Google
                  </button>
                  <button
                    type="button"
                    onClick={handleFacebookSignIn}
                    className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Log In with Facebook
                  </button>
                </div>
              </>
            )}
            {!isRegistering && (
              <>
                <div className="text-center text-gray-600 my-2">or</div>
                <div className="text-center">
                  <span className="text-gray-600">New to ChargeEazy? </span>
                  <button
                    type="button"
                    onClick={() => setIsRegistering(true)}
                    className="text-blue-500 hover:text-blue-800 font-bold"
                  >
                    Register
                  </button>
                </div>
              </>
            )}
            {isRegistering && (
              <div className="text-center">
                <span className="text-gray-600">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-500 hover:text-blue-800 font-bold"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isRegistering && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#8AFF74] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Register
                </button>
              </div>
              <div className="text-center">
                <span className="text-gray-600">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-500 hover:text-blue-800 font-bold"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;


// const SignIn = () => {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleGuestSignIn = () => {
//     alert('Continuing as a guest!');
//     navigate('/homepage');
//   };

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert('Sign in successful!');
//       navigate('/homepage');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleForgotPassword = async () => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       alert('Password reset email sent!');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       const userDocRef = doc(db, "users", user.uid);
//       await setDoc(userDocRef, {
//         name: user.displayName,
//         email: user.email,
//         profilePicture: user.photoURL,
//         mobile: mobile,
//       }, { merge: true });

//       alert('Signed in with Google successfully!');
//       navigate('/homepage');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleFacebookSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, facebookProvider);
//       const user = result.user;

//       const userDocRef = doc(db, "users", user.uid);
//       await setDoc(userDocRef, {
//         name: user.displayName,
//         email: user.email,
//         profilePicture: user.photoURL,
//         mobile: mobile,
//       }, { merge: true });

//       alert('Signed in with Facebook successfully!');
//       navigate('/homepage');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       // Implement your registration logic here
//       // For example, using createUserWithEmailAndPassword(auth, email, password);
//       alert('Registration successful!');
//       setIsRegistering(false);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       alert('Signed out successfully!');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="relative h-screen w-screen bg-gray-100 flex items-center justify-center">
//       <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="sm:flex sm:flex-row">
//           <div className="sm:w-1/2 hidden md:block">
//             <img src="/signin.png" alt="Sign In" className="w-full h-full object-cover" />
//           </div>
//           <div className="sm:w-1/2 p-8">
//             <h2 className="text-2xl font-bold mb-6">{isRegistering ? 'Register' : 'Sign In'}</h2>
//             {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//             <form onSubmit={isRegistering ? handleRegister : handleSignIn}>
//               {isRegistering && (
//                 <div className="mb-4">
//                   <label
//                     htmlFor="name"
//                     className="block text-gray-700 text-sm font-bold mb-2"
//                   >
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     placeholder="Enter your name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//               )}
//               {isRegistering && (
//                 <div className="mb-4">
//                   <label
//                     htmlFor="mobile"
//                     className="block text-gray-700 text-sm font-bold mb-2"
//                   >
//                     Mobile Number
//                   </label>
//                   <input
//                     type="text"
//                     id="mobile"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     placeholder="Enter your mobile number"
//                     value={mobile}
//                     onChange={(e) => setMobile(e.target.value)}
//                   />
//                 </div>
//               )}
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="mb-6">
//                 <label
//                   htmlFor="password"
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 {!isRegistering && (
//                   <a
//                     href="#"
//                     onClick={handleForgotPassword}
//                     className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
//                   >
//                     Forgot Password?
//                   </a>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <button
//                   type="submit"
//                   className="w-full bg-[#8AFF74] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 >
//                   {isRegistering ? 'Register' : 'Log In'}
//                 </button>
//               </div>
//               {!isRegistering && (
//                 <>
//                   <div className="text-center text-gray-600 my-2">or</div>
//                   <div className="mb-4">
//                     <button
//                       type="button"
//                       onClick={handleGoogleSignIn}
//                       className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
//                     >
//                       Log In with Google
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleFacebookSignIn}
//                       className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     >
//                       Log In with Facebook
//                     </button>
//                   </div>
//                 </>
//               )}
//               {!isRegistering && (
//                 <>
//                   <div className="text-center text-gray-600 my-2">or</div>
//                   <div className="text-center">
//                     <span className="text-gray-600">New to ChargeEasy? </span>
//                     <button
//                       type="button"
//                       onClick={() => setIsRegistering(true)}
//                       className="text-blue-500 hover:text-blue-800 font-bold"
//                     >
//                       Register
//                     </button>
//                   </div>
//                 </>
//               )}
//               {isRegistering && (
//                 <div className="text-center">
//                   <span className="text-gray-600">Already have an account? </span>
//                   <button
//                     type="button"
//                     onClick={() => setIsRegistering(false)}
//                     className="text-blue-500 hover:text-blue-800 font-bold"
//                   >
//                     Sign In
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
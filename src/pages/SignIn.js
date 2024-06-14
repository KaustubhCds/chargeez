
import { useState } from "react";
import { auth, googleProvider, facebookProvider, db } from '../config/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
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

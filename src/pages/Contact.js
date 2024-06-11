import React from 'react';
import NavBar from './NavBar';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contactpage">
            <NavBar />
            <div className="content-section">
                <div className="section who-we-are">
                    <img
                        className="image-left"
                        src="/c1.png"
                        alt="Tree"
                    />
                    <div className="text-container">
                        <h3>Who We Are</h3>
                        <p>
                            ChargeEazy is at the forefront of the electric vehicle (EV) revolution, committed to making EV charging accessible, convenient, and efficient for everyone. Founded in 2023, we've grown from a visionary startup into a respected leader in the EV charging industry. Our passion drives us to innovate, creating solutions that empower EV owners and contribute to a greener, more sustainable future.
                        </p>
                    </div>
                </div>
                <div className="vision-and-map">
                    <div className="section vision-and-what-we-do">
                        <div className="text-container">
                            <h3>Our Vision</h3>
                            <p>
                                Our vision is where in India transportation is eco-friendly, seamless, and connected. We believe in a future where EV charging stations are as widespread and accessible as conventional fuel stations, ensuring that EV owners never have to worry about their next charge.
                            </p>
                        </div>
                        <div className="text-container">
                            <h3>What We Do</h3>
                            <p>
                                At ChargeEazy, we specialize in providing comprehensive EV charging solutions. From easy-to-use home charging systems to expansive public charging networks, we cover every aspect of charging. Our state-of-the-art platform allows users to locate, use, and pay for charging with just a few taps, simplifying the entire process.
                            </p>
                        </div>
                    </div>
                    <img
                        className="image-right"
                        src="/c2.png"
                        alt="Map"
                    />
                </div>
            </div>
            <div className="section why-choose-us">
                <h3>Why Choose Us</h3>
                <ul>
                    <li><b style={{color: '#36E307'}}>User-Centric:</b> Our services are designed with the user in mind. We provide 24/7 support and a seamless user experience to ensure charging your EV is as simple as possible.</li>
                    <li><b style={{color: '#36E307'}}>Community-Focused:</b> Beyond just providing services, we build communities. We connect EV enthusiasts and everyday users, encouraging knowledge-sharing and support.</li>
                    <li><b style={{color: '#36E307'}}>Sustainability:</b> We're dedicated to promoting environmental stewardship. By using our services, you're contributing to a cleaner, healthier planet.</li>
                </ul>
            </div>
            <div className="section contact-us">
                <h3>Contact Us</h3>
                <div className="contact-info">
                    <div className="contact-details">
                        <p>
                            <img className="icon" src="./c3.png" alt="Email Icon" /> 
                            Email: chargeeazy@gmail.com
                        </p>
                        <p>
                            <img className="icon" src="./c4.png" alt="Phone Icon" /> 
                            Phone: 7030777761
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
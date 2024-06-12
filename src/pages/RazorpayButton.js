import React from 'react';

const RazorpayButton = ({ amount, currency, name, description, image, orderId, prefill, theme, onSuccess, onFailure }) => {

    const loadRazorpay = () => {
        const options = {
            key: 'YOUR_RAZORPAY_KEY', // Enter the Key ID generated from the Dashboard
            amount: amount, // Amount is in currency subunits. For example, 50000 paisa for INR 500
            currency: currency,
            name: name,
            description: description,
            image: image,
            order_id: orderId, // Pass the order ID if you have generated it from your backend
            handler: (response) => {
                onSuccess(response);
            },
            prefill: prefill,
            theme: theme,
        };

        const rzp = new window.Razorpay(options);

        rzp.on('payment.failed', (response) => {
            onFailure(response.error);
        });

        rzp.open();
    };

    return (
        <button onClick={loadRazorpay} className="btn btn-primary">
            Pay Now
        </button>
    );
};

export default RazorpayButton;

import React, { useState } from 'react';

const AddMoney = ({ updateBalance }) => {
  const [amount, setAmount] = useState('');

  const addMoneyHandler = async () => {
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount.');
      return;
    }

    const options = {
      key: 'rzp_test_OrfCtamT9xJHMV',
      amount: amount * 100,
      currency: 'INR',
      name: 'Your Wallet Name',
      description: 'Add money to wallet',
      image: 'path_to_your_logo.png',
      handler: function (response) {
        updateBalance(amount);
        alert('Payment successful: ' + response.razorpay_payment_id);
      },
      prefill: {
        email: 'test@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const preventScroll = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center bg-white h-40 p-6 rounded-lg shadow-md">
      <input
        type="number"
        placeholder="Enter amount to add"
        value={amount}
        onChange={handleAmountChange}
     
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={addMoneyHandler}
        className="bg-green-500 text-white py-4 px-5 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
      >
        Add Money
      </button>
    </div>
  );
};

export default AddMoney;

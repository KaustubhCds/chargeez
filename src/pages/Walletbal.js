// src/components/WalletBalance.js
import React from "react";

const WalletBalance = ({ balance }) => {
  return (
    <div>
      <h2>Wallet Balance: {balance} INR</h2>
    </div>
  );
};

export default WalletBalance;

// src/components/Invoice.js
import React from "react";

const Invoice = ({ transaction }) => {
  return (
    <div className="invoice">
      <h2>Invoice</h2>
      <p>Company Name: chargeEazy</p>
      <p>Transaction ID: {transaction.id}</p>
      <p>Date: {transaction.date}</p>
      <p>Time: {transaction.time}</p>
    </div>
  );
};

export default Invoice;

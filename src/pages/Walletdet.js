import React, { useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import AddMoney from "./Addmoney";

function Walletdet() {
  const [balance, setBalance] = useState(5000); // Initial wallet balance (mocked)
  const [transactions, setTransactions] = useState([]);

  const updateBalance = (amount) => {
    const newBalance = parseFloat(balance) + parseFloat(amount);
    setBalance(newBalance);

    const transaction = {
      id: generateTransactionId(),
      amount: parseFloat(amount).toFixed(2),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    setTransactions([transaction, ...transactions]);
  };

  const generateTransactionId = () => {
    return "_" + Math.random().toString(36).substr(2, 9); // Example of generating a simple unique ID
  };

  const handlePrintInvoice = (transaction) => {
    const invoiceContent = `
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .invoice { padding: 20px; border: 1px solid #ccc; }
            .invoice h2 { font-size: 1.5em; text-align: center; }
            .invoice p { margin: 5px 0; }
            .company-name { font-weight: bold; text-align: center; font-size: 2em; }
            .amount { font-weight: bold; text-align: right; }
          </style>
        </head>
        <body>
          <div class="invoice">
            <div class="company-name">chargeEazy</div>
            <h2>Invoice</h2>
            <p>Transaction ID: ${transaction.id}</p>
            <p>Date: ${transaction.date}</p>
            <p>Time: ${transaction.time}</p>
            <p class="amount">Amount: ${transaction.amount} INR</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "Print", "height=400,width=600");
    printWindow.document.open();
    printWindow.document.write(invoiceContent);
    printWindow.document.close();

    printWindow.document.addEventListener("DOMContentLoaded", () => {
      printWindow.print();
      printWindow.close();
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col w-full sm:w-4/5 p-4 bg-gray-100 sm:pl-60 pt-20 overflow-auto">
          <div className="flex flex-col md:flex-row md:space-x-4 items-start">
            {/* Wallet Card */}
            <div className="bg-gradient-to-r relative from-gray-700 via-gray-500 to-green-200 rounded-lg w-full md:w-[450px] h-64 p-6 mb-4 shadow-lg">
              <div className="text-white">
                <h2 className="text-2xl font-bold">Username:</h2>
                <p className="text-2xl">John Doe</p>
                <div className="mt-4">
                  <h2 className="text-2xl font-bold">Wallet Balance:</h2>
                  <p className="text-3xl">Rs.{balance}</p>
                </div>
                <div className="mt-4">
                  <p className="text-2xl">**** **** **** 1234</p>
                </div>
                {/* Logo */}
                <img
                  src="./fevicon.png"
                  alt=" Logo"
                  className="absolute top-4 right-4 h-14 w-20 md:h-14 md:w-20"
                />
              </div>
            </div>
            {/* Add Money Section */}
            <div className="w-full md:w-[300px] md:min-w-[250px]">
              <AddMoney updateBalance={updateBalance} />
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recent Transactions
            </h2>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 bg-white shadow rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">
                      Transaction ID: {transaction.id}
                    </p>
                    <p>Amount: {transaction.amount} INR</p>
                    <p>Date: {transaction.date}</p>
                    <p>Time: {transaction.time}</p>
                  </div>
                  <button
                    onClick={() => handlePrintInvoice(transaction)}
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                  >
                    Print Invoice
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Walletdet;

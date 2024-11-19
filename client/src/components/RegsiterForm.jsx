import React, { useState } from "react";

const RegsiterForm = () => {
  const [receiptData, setReceiptData] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const clientData = {
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      fileNo: formData.get("fileNo"),
    };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientData),
      });
      const data = await response.json();
      setReceiptData({ ...clientData, qrCode: data.qrCode });
    } catch (err) {
      console.error("Error registering client:", err);
    }
  };

  if (receiptData) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-bold text-green-600 mb-4">
          Registration Successful!
        </h3>
        <div className="border p-4 rounded-md shadow">
          <p>
            <strong>First Name:</strong> {receiptData.fname}
          </p>
          <p>
            <strong>Last Name:</strong> {receiptData.lname}
          </p>
          <p>
            <strong>File Number:</strong> {receiptData.fileNo}
          </p>
          <img src={receiptData.qrCode} alt="QR Code" className="mt-4" />
        </div>
        <button
          onClick={() => setReceiptData(null)}
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
        >
          Register Another Client
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleRegister} className="text-center">
      <h2 className="text-2xl mb-4">Client Registration</h2>
      <input
        type="text"
        name="fname"
        placeholder="First Name"
        required
        className="mb-2 p-2 border"
      />
      <input
        type="text"
        name="lname"
        placeholder="Last Name"
        required
        className="mb-2 p-2 border"
      />
      <input
        type="text"
        name="fileNo"
        placeholder="File Number"
        required
        className="mb-2 p-2 border"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Register
      </button>
    </form>
  );
};

export default RegsiterForm;

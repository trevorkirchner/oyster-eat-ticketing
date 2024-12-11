import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { generateClient } from "aws-amplify/api";
import { updateTickets } from "./graphql/mutations";
import { listTickets } from "./graphql/queries";

const client = generateClient();

const ScanTicket = () => {
  const [scanResult, setScanResult] = useState("");
  const [status, setStatus] = useState("");

  const handleScan = async (data) => {
    if (data) {
      alert(`QR Code detected: ${data.text}`); // Show an alert with the detected QR code data
      setScanResult(data.text); // Update the state with the QR code content
      setStatus("Processing...");
  
      try {
        const ticketData = await client.graphql({
          query: listTickets,
          variables: {
            filter: { TicketId: { eq: data.text } }, // Adjust filter based on your data model
          },
        });
  
        const ticket = ticketData.data.listTickets.items[0];
  
        if (!ticket) {
          setStatus("Invalid ticket.");
          alert("Invalid ticket."); // Show an alert for an invalid ticket
          return;
        }
  
        if (ticket.TicketUsed) {
          setStatus("Ticket already used!");
          alert("Ticket already used!"); // Show an alert if the ticket is already used
          return;
        }
  
        await client.graphql({
          query: updateTickets,
          variables: {
            input: {
              id: ticket.id,
              TicketUsed: true,
            },
          },
        });
  
        setStatus("Ticket validated successfully!");
        alert("Ticket validated successfully!"); // Show an alert for successful validation
      } catch (error) {
        console.error("Error validating ticket:", error);
        setStatus("An error occurred while validating the ticket.");
        alert("An error occurred while validating the ticket."); // Show an alert for errors
      }
    }
  };
  

  const handleError = (error) => {
    console.error("Scanner Error:", error);
    setStatus("Error reading QR code.");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>Scan Ticket</h1>
      <div
        style={{
          width: "400px",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <Scanner
          onScan={handleScan}
          onError={handleError}
          constraints={{ facingMode: "environment" }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <p>{scanResult && `QR Code: ${scanResult}`}</p>
      <p>{status}</p>
    </div>
  );
};

export default ScanTicket;

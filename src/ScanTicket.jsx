import React, { useRef, useState } from "react";
import { Scanner } from '@yudiel/react-qr-scanner';
import { generateClient } from "aws-amplify/api";
import { updateTickets } from "./graphql/mutations";
import { listTickets } from "./graphql/queries";

const client = generateClient();


const ScanTicket = () => {
  const [scanResult, setScanResult] = useState("");
  const [status, setStatus] = useState("");

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);
      setStatus("Processing...");

      try {
        // Fetch the ticket from the database
        const ticketData = await client.graphql({
          query: listTickets,
          variables: {
            filter: { QRData: { eq: data } },
          },
        });

        const ticket = ticketData.data.listTickets.items[0];

        if (!ticket) {
          setStatus("Invalid ticket.");
          return;
        }

        if (ticket.TicketUsed) {
          setStatus("Ticket already used!");
          return;
        }

        // Update the ticket as used
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
      } catch (error) {
        console.error("Error validating ticket:", error);
        setStatus("An error occurred while validating the ticket.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full screen height
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
          border: "2px solid #ccc", // Optional: Border around the scanner
          borderRadius: "8px", // Optional: Rounded corners
        }}
      >
        <Scanner
          onScan={handleScan}
          onError={(error) => {
            console.error("Scanner Error:", error);
            setStatus("Error reading QR code.");
          }}
          constraints={{ facingMode: "environment" }} // Use the rear camera
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
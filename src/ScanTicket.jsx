import React, { useRef, useState } from "react";
import { QrReader } from "react-qr-scanner";
import { generateClient } from "aws-amplify/api";
import { updateTickets } from "./graphql/mutations";
import { listTickets } from "./graphql/queries";

const client = generateClient();

const ScanTicket = () => {
  const [scanResult, setScanResult] = useState("No result");
  const [status, setStatus] = useState("");
  const qrReaderRef = useRef(null); // Ref for the QR Reader component

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

  const handleError = (err) => {
    console.error("QR Reader Error:", err);
    setStatus("Error reading QR code.");
  };

  const openImageDialog = () => {
    if (qrReaderRef.current) {
      qrReaderRef.current.openImageDialog();
    }
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Scan Ticket</h1>
      <QrReader
        ref={qrReaderRef}
        delay={100}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        legacyMode={true} // Enable legacyMode for image dialog
      />
      <button onClick={openImageDialog}>Upload QR Code</button>
      <p>{scanResult && `QR Code: ${scanResult}`}</p>
      <p>{status}</p>
    </div>
  );
};

export default ScanTicket;

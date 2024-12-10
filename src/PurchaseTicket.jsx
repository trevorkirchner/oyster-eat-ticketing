import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { generateClient } from "aws-amplify/api";
import QRCode from "qrcode";
import { createTickets } from "./graphql/mutations";
import { listEventIds } from "./graphql/queries";
import { sendEmail } from "./emailService";
import { useNavigate } from "react-router-dom";

const client = generateClient();

const PurchaseTicket = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    numberOfTickets: 1,
  });
  const [eventId, setEventId] = useState("");
  const [ticketPrice, setTicketPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await client.graphql({
          query: listEventIds,
          variables: { filter: { Year: { eq: "2025" } } },
        });
        const event = response.data.listEventIds.items[0];

        if (event) {
          setEventId(event.id);
          setTicketPrice(event.TicketPrice);
          setTotalPrice(event.TicketPrice); // Set initial total price
        } else {
          alert("Event for 2025 not found.");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        alert("Failed to fetch event details.");
      }
    };

    fetchEventDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "numberOfTickets") {
      const ticketCount = parseInt(value, 10);
      if (ticketCount >= 1 && ticketCount <= 4) {
        setTotalPrice(ticketCount * ticketPrice);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { firstName, lastName, email, phoneNumber, numberOfTickets } = formData;
  
    if (numberOfTickets < 1 || numberOfTickets > 4) {
      alert("You can only purchase between 1 and 4 tickets.");
      return;
    }
  
    const tickets = [];
    try {
      for (let i = 0; i < numberOfTickets; i++) {
        const ticketId = `TICKET-${Math.random().toString(36).substr(2, 9)}`;
        const qrData = await QRCode.toDataURL(ticketId);
  
        const newTicket = {
          EventId: eventId,
          TicketId: ticketId,
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          PhoneNumber: phoneNumber,
          PaymentStatus: "Paid",
          Timestamp: new Date().toISOString(),
          TicketUsed: false,
          QRData: qrData,
        };
  
        await client.graphql({
          query: createTickets,
          variables: { input: newTicket },
        });
  
        tickets.push({
          ticketId,
          qrData,
        });
      }
  
      const subject = "Your Ticket Purchase Receipt";
      const body = `
        <h1>Thank you for your purchase!</h1>
        <p>Dear ${firstName} ${lastName},</p>
        <p>Here are your tickets:</p>
        ${tickets
          .map(
            (ticket) => `
          <div>
            <p>Ticket ID: ${ticket.ticketId}</p>
            <img src="${ticket.qrData}" alt="QR Code" />
          </div>
        `
          )
          .join("")}
        <p>We look forward to seeing you at the event!</p>
      `;
  
      await sendEmail(email, subject, body);
  
      alert("Tickets purchased successfully! A receipt has been sent to your email.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        numberOfTickets: 1,
      });
      setTotalPrice(ticketPrice);
    } catch (error) {
      console.error("Error processing purchase:", error);
      alert("Error processing your purchase. Please try again.");
    }
  };
  

  return (
    <div>
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: "auto", padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" gutterBottom>
        Purchase Tickets
      </Typography>
      <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
      <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
      <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      <TextField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required />
      <TextField label="Number of Tickets" name="numberOfTickets" type="number" inputProps={{ min: 1, max: 4 }} value={formData.numberOfTickets} onChange={handleChange} required />
      <Typography variant="h6">Total Cost: ${totalPrice.toFixed(2)}</Typography>
      <Button type="submit" variant="contained" color="primary">
        Purchase Tickets
      </Button>
    </Box>
    <button onClick={() => navigate("/ticket-scanner")}>
    Go to Scan Tickets
  </button>
  </div>
  );
};

export default PurchaseTicket;

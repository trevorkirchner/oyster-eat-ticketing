import axios from "axios";

const API_URL = "https://0jtng6n0rh.execute-api.us-east-1.amazonaws.com/prod/send-email"; // Replace with your API Gateway URL

export const sendEmail = async (toAddress, subject, body) => {
    try {
      // Create the payload
      const payload = {
        toAddress,
        subject,
        body,
      };
  
      // Wrap the payload in a "body" field and stringify it
      const wrappedPayload = {
        body: JSON.stringify(payload),
      };
  
      // Send the request
      const response = await axios.post(API_URL, wrappedPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Email sent successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };
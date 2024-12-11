import axios from "axios";

const API_URL = "https://0jtng6n0rh.execute-api.us-east-1.amazonaws.com/prod/send-email"; // Replace with your API Gateway URL

export const sendEmail = async (payload) => {
  try {

    const wrappedPayload = {
        body: JSON.stringify(payload),
      };

    const response = await axios.post(
      API_URL,
      JSON.stringify(wrappedPayload), // Send the payload as a JSON string
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Email sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
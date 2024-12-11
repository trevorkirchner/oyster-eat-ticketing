const nodemailer = require("nodemailer");
const QRCode = require("qrcode");

exports.handler = async (event) => {
  try {
    const { toAddress, subject, body, tickets } = JSON.parse(event.body);

    // Generate QR code images for each ticket
    const attachments = [];
    for (const ticket of tickets) {
      const qrCodeBuffer = await QRCode.toBuffer(ticket.ticketId); // Use only TicketId
      attachments.push({
        filename: `${ticket.ticketId}.png`,
        content: qrCodeBuffer,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "trevor.d.kirchner@gmail.com", // Replace with your Gmail address
        pass: "jaic acpi zona shdl", // Replace with your App Password or Gmail password
      },
    });

    // Send the email
    await transporter.sendMail({
      from: "trevor.d.kirchner@gmail.com",
      to: toAddress,
      subject,
      html: body,
      attachments, // Attach generated QR code images
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!"}),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send email."}),
    };
  }
};
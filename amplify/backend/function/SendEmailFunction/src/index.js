const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const { toAddress, subject, body } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "trevor.d.kirchner@gmail.com", // Replace with your Gmail address
        pass: "jaic acpi zona shdl", // Replace with your App Password or Gmail password
      },
    });

    const mailOptions = {
      from: "trevor.d.kirchner@gmail.com",
      to: toAddress,
      subject: subject,
      html: body,
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!", info }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send email.", error }),
    };
  }
};

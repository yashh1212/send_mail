const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send_mail", async (req, res) => {
  const { name, email_address, enquiry_message } = req.body;
  console.log(req.body)
  console.log(name, email_address, enquiry_message);
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    if (name && email_address && enquiry_message) {
      let message = {
        from: "yash.portfolio.message@gmail.com",
        to: "yashdhokane12@gmail.com",
        subject: `portfolio message from :: ${email_address}`,
        text: `hii yash you have meaasge from :: ${name} email::${email_address} \n the message is ::  ${enquiry_message}`,
      };
      let info = await transporter.sendMail(message);
      return res.status(200).json("message send seccessfully");
    }
    return res.status(400).json("fill all fields");
  } catch (error) {
    console.log(error);
    return res.status(404).json("try again");
  }
});
app.listen(process.env.port,()=>{console.log(`server started at port ${process.env.port}`);})

const {query} = require('../../config/db')
export const verify = require("express").Router();
const jsonparser = require("body-parser").json()

const SendOtp = require("sendotp");
const sendOtp = new SendOtp(process.env.MSG91_API_KEY);

verify.post("/sentuserotp", (req, res) => {
    console.log(req.body)
  sendOtp.send(req.body.phone, process.env.SENDER_ID, function (error, data) {
    res.status(200).json("OTP sent");
  });
});

verify.route("/verifyotp", jsonparser).post((req, res) => {
  sendOtp.verify(req.body.phone, req.body.otp, function (error, data) {
    if (data.type == "success"){
        console.log("OTP verified successfully")
        res.status(200).json(data)
    } ;
    if (data.type == "error"){
        console.log("OTP verification failed");
        res.status(500).json(data)
    } 
  });
});

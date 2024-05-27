const { hashPassword, verifyPassword } = require("../config/bcrypt");
const { verifyToken, createToken } = require("../config/jwt");
const { transporter } = require("../config/nodemailer");
const User = require("../models/User");
require("dotenv").config();

module.exports.home = (req, res) => {
    try {
        return res.status(200).json({
            message: "This is the home page, Server is up!"
        });
    }
    catch (err) {
        console.error("Error in rendering home", err);
    }
}

module.exports.register = async (req, res) => {
    try {
        const currUser = await User.find({ email: req.body.email });
        if (currUser.length) {
            return res.status(203).json({
                message: "Account exist.. Please login"
            });
        }
        if (req.body.password.length < 8) {
            return res.status(203).json({
                message: "Password should be min. 8 characters.."
            });
        }
        let hashedPassword = await hashPassword(req.body.password);
        if (hashedPassword === null) {
            return res.status(203).json({
                message: "Error in hashing password.."
            });
        }
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        console.log("New User created:", req.body.fName);
        return res.status(200).json({
            message: "Account Created"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.login = async (req, res) => {
    try {
        const currUser = await User.find({ email: req.body.email });
        if (!currUser.length) {
            return res.status(203).json({
                message: "Account doesn't exist.."
            });
        }
        console.log(req.body.password);
        let status = await verifyPassword(req.body.password, currUser[0].password);

        if (!status) {
            return res.status(203).json({
                message: "Incorrect username or password.."
            });
        }

        const data = {
            id: currUser[0]._id,
            email: currUser[0].email,
            category: currUser[0].category,
            fName: currUser[0].fName,
            lName: currUser[0].lName,
            phone: currUser[0].phone
        }
        const token = await createToken(data);
        if (!token) {
            return res.status(203).json({
                message: "Error in generating token.."
            });
        }
        console.log("Login Success");

        return res.status(200).json({
            message: "Login Success..",
            token: token,
            email: currUser[0].email,
            fName: currUser[0].fName,
            category: currUser[0].category,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.sendMail = async(req, res) => {
    try {
        console.log(req.body);
        console.log(req.headers.authorization);
        const decoded = await verifyToken(req.headers.authorization);
        console.log(decoded);
        if (!decoded) {
            return res.status(203).json({
                message: "Session Expired.. Login Again"
            });
        }
        const propertyData = req.body.propertyData;
        const sellerData = req.body.propertyData.seller;
        // console.log(propertyData)
        const BuyerMsgData = `<div style='font-size:large; font-family: sans-serif'>
              <h3 class="protest-riot-regular", >Hey <span>${decoded.fName}</span>,</h3>
              <p>Thanks for your interest in choosing the house on our website, Rentify.</p>
              <p>The owner contact details are as follows</p>
              <div style = "margin:auto; padding: 0 30px; border: 2px solid lightgray; text-align: center; width:fit-content">
                  <h5 style="text-decoration:underline;">Seller's Contact Details</h5>
                  <div style="white-space: pre-line;">
                  Full Name : ${propertyData.seller.fName} ${propertyData.seller.lName}
                  <br>
                  Phone : ${propertyData.seller.phone}
                  <br>
                  Email : ${propertyData.seller.email}
                  </div>
                  <h5 style="text-decoration:underline;">Property Details</h5>
                  <div style="white-space: pre-line;">
                  BHK : ${propertyData.bhk} <br>  
                  Area : ${propertyData.area} <br>
                    Address : ${propertyData.address} <br>
                    Village : ${propertyData.village} <br>
                    District : ${propertyData.city} <br>
                    State : ${propertyData.state} <br>
                    (Near by) <br>
                    School : ${propertyData.school} <br>
                    Hospital : ${propertyData.hospital} 
                  </div>
              </div>
              <p>Revert to this email for more details</p>
              <p>- -<br>Best Regards<br>Rentify <br>Made with 💖 <a href="https://www.linkedin.com/in/sriramsanthosh/" target="_blank"
                  style="font-weight:bold; text-decoration: underline; color: crimson;">Sriram Santhosh</a></p>
                  </div>
              `;

        const SellerMsgData = `<div style='font-size:large; font-family: sans-serif'>
              <h3 class="protest-riot-regular", >Hey <span>${sellerData.fName}</span>,</h3>
              <p>A buyer is interested in choosing your property on our website, Rentify.</p>
              <p>The buyer contact details are as follows</p>
              <div style = "margin:auto; padding: 0 30px; border: 2px solid lightgray; text-align: center; width:fit-content">
                  <h5 style="text-decoration:underline;">Buyer's Contact Details</h5>
                  <div style="white-space: pre-line;">
                  Full Name : ${decoded.fName} ${decoded.lName}
                  <br>
                  Phone : ${decoded.phone}
                  <br>
                  Email : ${decoded.email}
                  </div>
                  <h5 style="text-decoration:underline;">Property Details</h5>
                  <div style="white-space: pre-line;">
                  BHK : ${propertyData.bhk} <br>  
                  Area : ${propertyData.area} <br>
                    Address : ${propertyData.address} <br>
                    Village : ${propertyData.village} <br>
                    District : ${propertyData.city} <br>
                    State : ${propertyData.state} <br>
                    (Nearby) <br>
                    School : ${propertyData.school} <br>
                    Hospital : ${propertyData.hospital} 
                  </div>
              </div>
              <p>Revert to this email for more details</p>
              <p>- -<br>Best Regards<br>Rentify <br>Made with 💖 <a href="https://www.linkedin.com/in/sriramsanthosh/" target="_blank"
                  style="font-weight:bold; text-decoration: underline; color: crimson;">Sriram Santhosh</a></p>
                  </div>
              `;

              console.log(SellerMsgData);
              console.log(BuyerMsgData);

        let BuyerEmailStatus = await SendMail(decoded.email, BuyerMsgData);
        if (BuyerEmailStatus) {
            console.log("Email sent to Buyer");
        }
        let SellerEmailStatus = await SendMail(propertyData.seller.email, SellerMsgData);
        if (SellerEmailStatus) {
            console.log("Email sent to Seller");
        }
        if (BuyerEmailStatus && SellerEmailStatus) {
            return res.status(200).json({
                message: "Email Sent..Check your Inbox"
            })
        }
        return res.status(203).json({
            message: "Try Again"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}


const SendMail = async (emailId, matter) => {
    try {
        await transporter.sendMail({
            from: `"Rentify" ${process.env.SMTP_USER_NAME}`,
            to: emailId,
            subject: "Rentify -- Ting Ting",
            html: await matter
        }).then(() => {
            console.log("Email sent successfully!");
        });
        return 1;
    }
    catch (error) {
        console.log(`Error in sending email: `, error);
        return 0;
    }
}




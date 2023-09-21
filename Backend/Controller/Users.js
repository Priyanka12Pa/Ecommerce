import Register from "../Model/Register.js";
import db from "../Config/Db.js";
import upload from "../Middleware/Upload.js";
import Product from "../Model/Product.js";
import Stripe from "stripe";
import Invoices from "../Model/Invoice.js";
// const crypto = require("crypto");
import crypto from "crypto";
// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
const stripe = Stripe('sk_test_51L7wPHSAFhwExXj7ppv9EpOm0Dotv5DcCzadXmIH4LVG0hGScpJq9flW0K95ak1Rc7697epdc18DXhDq6uzGWF4H007BVMdWGr')

// add user

export const adduser = async (req, res) => {
  const { FirstName, LastName, Role, Email, Contact, Password } = req.body;

  const email = await Register.findAll({
    where: {
      Email: [req.body.Email],
    },
  });
  const registerEmail = email[0]?.dataValues?.Email;
  if (registerEmail === req.body.Email) {
    res.status(400).json({ msg: "Email allready exists" });
  } else {
    try {
      await Register.create({
        FirstName: FirstName,
        LastName: LastName,
        Role: Role,
        Email: Email,
        Contact: Contact,
        Password: Password,
      });
      res.json({ msg: "Registration Successful" });
    } catch (error) {
      console.log(error);
    }
  }
};

// get user

export const getUsers = async (req, res) => {
  try {
    const users = await Register.findAll({
      attributes: [
        "id",
        "FirstName",
        "LastName",
        "Email",
        "Contact",
        "Password",
      ],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

// login

export const Login = async (req, res) => {
  const user = await Register.findOne({
    where: { Email: req.body.Email, Password: req.body.Password },
  });

  if (user) {
    res.json({ msg: "Login Successful" });
  } else {
    res.json({ msg: "User not found" });
  }
};

// addproduct
export const imageupload = async (req, res) => {
  try {
    const { ProductName, Category, Title, Price, Couponcode } = req.body;

    const ProductImage = req.file.filename;

    const newProduct = await Product.create({
      ProductName,
      Category,
      Title,
      Price,
      Couponcode,
      ProductImage,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// getproduct
export const getproduct = async (req, res) => {
  try {
    const users = await Product.findAll({
      attributes: [
        "id",
        "ProductName",
        "Category",
        "Title",
        "Price",
        "Couponcode",
        "ProductImage",
        "createdAt"
      ],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

//deleteproduct
export const Delete = async (req, res) => {
  const Id = req.params.id;
  console.log(Id, "idgfdh");
  try {
    const user = await Product.destroy({
      where: { Id },
    });

    if (!user) {
      console.log(user);
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "User not found" });
    }
    return res.json({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

// update product

export const update = async (req, res) => {
  try {

    console.log("req.body; = ", req.body);


    const { ProductName, Category, Title, Price, Couponcode } = req.body;
    console.log("find id", req.params.id)
   

  
    let user = await Product.findOne({
      where: {
        id: req.params.id
      }
    });
    console.log("data by id", user)
    let updates = await Product.update({
      ProductName: ProductName, Category: Category, Title: Title, Price: Price, Couponcode: Couponcode
    }, {
      where: {
        id: req.params.id
      },
    })
    console.log(updates, "datat");

    return res.send(updates);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};







// getby id product
export const findOneProduct = async (req, res) => {
  try {
    let user = await Product.findOne({
      where: {
        id: req.params.id
      }

    });
    console.log(req.params.id);
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.toString() });
  }
};



//payment

export const addpayment = async (req, res) => {
  const { amount } = req.body;
console.log(amount,"dfg")
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'inr',
    statement_descriptor: 'Custom descriptor',
    payment_method_types: ["card"],
  });

  res.json({ clientSecret: paymentIntent });
};


//invoice
export const addconfirm = async (req, res) => {
  const { IDs, Price, currency } = req.body;
  console.log(req.body, "data")
  try {
    await Invoices.create({
      IDs: IDs,
      Price: Price,
      currency: currency
    });
    res.json({ msg: "Invoice Successful" });
  } catch (error) {
    console.log(error);
  }
};



/////////

export const getinvoice = async (req, res) => {
  try {
    let user = await Invoices.findOne({
      where: {
        IDs: req.params.id
      }

    });
    console.log(req.params.id);

    return res.json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.toString() });
  }
};











export const Forgotpassword = async (req, res) => {
  const { Email } = req.body;

  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "parmanandpatidar096@gmail.com",
      pass: "qhoqdoldibfkpnem",



    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  var mailOptions = {
    from: "parmanandpatidar096@gmail.com",
    to: Email,
    subject: "Password Reset Request",
    text:
      `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
      `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
      `http://localhost:3000/reset/${resetToken}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    console.log("Email sent:", info.response);
    res.status(200).send("Password reset email sent");

  });
  console.log(resetToken)
  let updates = await Register.update({
    resetToken: resetToken
  }, {
    where: {
      Email: Email
    },
  })
  console.log(updates);
  return res.send(updates);

}



export const resetToken = (req, res) => {
  const resetToken = req.params.token;

  if (resetToken) {
    console.log('if');
    res.render("reset-password", {

      resetToken: resetToken
    });
  } else {
    console.log('else');
    res.status(400).send(req);
  }
};


export const resetTokens = async (req, res) => {
  try {
    const resetToken = req.params.token;
    const newPassword = req.body.newPassword;

    console.log(req.body, "jhkkj");


    let updates = await Register.update({
      Password: newPassword
    }, {
      where: {
        resetToken: resetToken
      },
    })
    console.log(updates, "hjh");
    return res.json(updates);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }

};



///// social login

export const addSociallogin = async (req, res) => {
  const { FirstName, Email ,Role} = req.body;
  console.log(req.body);
  console.log(FirstName, Email);
  const email = await Register.findAll({
    where: {
      Email
    },
  });
  const registerEmail = email[0]?.dataValues?.Email;
    try {
      console.log("dfdg")
      await Register.create({
        FirstName: FirstName,
        Email: Email,
        Role:Role,

      });
      res.json({ msg: "Registration Successful" });
    } catch (error) {
      console.log(error);
    
  }
};





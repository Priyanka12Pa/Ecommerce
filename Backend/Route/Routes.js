import express from "express";
import { addSociallogin, adduser, getUsers, Login,imageupload,getproduct,Delete,update,findOneProduct,addpayment,getinvoice,addconfirm,Forgotpassword,resetToken,resetTokens} from "../Controller/Users.js";

import upload from "../Middleware/Upload.js";
const router = express.Router();

router.post("/addUser", adduser);
router.get("/getUser", getUsers);
router.post("/login", Login);
router.post("/upload", upload.single("ProductImage"), imageupload);
router.get("/getallproduct", getproduct);
router.delete("/deleteproduct/:id", Delete);
router.post("/updateproduct/:id", update);
router.get("/findoneproduct/:id", findOneProduct);
router.post("/payment", addpayment);
router.post("/invoice", addconfirm);
router.get("/getinvoice/:id", getinvoice);
router.post("/forgot-password", Forgotpassword);
router.get("/reset/:token", resetToken);
router.post("/reset/:token", resetTokens);
router.post("/sociallogin", addSociallogin);

export default router;

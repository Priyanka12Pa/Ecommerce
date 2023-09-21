
import express from "express";
import cors from "cors";
import router from "./Route/Routes.js";
// import {Stripe} from 'stripe';
const app = express();
// const stripe = Stripe('sk_test_51L7wPHSAFhwExXj7ppv9EpOm0Dotv5DcCzadXmIH4LVG0hGScpJq9flW0K95ak1Rc7697epdc18DXhDq6uzGWF4H007BVMdWGr');//this one is secret key

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(express.json());
app.use(router);
 
app.listen(5000, ()=> console.log('Server running at port 5000'));





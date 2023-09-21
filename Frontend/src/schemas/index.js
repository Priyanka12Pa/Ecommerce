import * as Yup from "yup";

export const signUpSchema= Yup.object({
    FirstName: Yup.string().min(2).max(15).required("please enter a FirstName"),
    LastName: Yup.string().min(2).max(15).required("please enter a LastName"),
    Role:Yup.string().min(2).max(15).required("please choose your role"),
    Email: Yup.string().email().required("please enter a Email"),
    Contact: Yup.string().min(10).max(12).required("please enter a Contact"),
    Password: Yup.string().min(6).required("please enter a Password")
    
    
})

export const loginSchema= Yup.object({
   
    Email: Yup.string().email().required("please enter a Email"),
    Password: Yup.string().min(6).required("please enter a Password")
    
    
})


export const Productschema=Yup.object({
    ProductName: Yup.string().min(3).required("please enter a ProductName"),
    Category: Yup.string().min(3).required("please enter a Category"),
    Title: Yup.string().min(3).required("please enter a Title"),
    Price: Yup.string().min(3).required("please enter a Price"),
    Couponcode: Yup.string().required("please enter a Couponcode"),
   
})

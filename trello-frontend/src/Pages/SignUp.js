import { TextField, Typography, Container, Button } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from 'formik';


export default function SignUp(){
    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("First name required"),
        lastName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Last name required"),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
        passwordConfirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"),
    });
  
    

const formik = useFormik({
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    }
});

const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;


return(
    <>
    <Container>
   
    <Typography> Sign Up</Typography>
        <TextField fullWidth label = "First Name" />
        <TextField fullWidth label = "Last Name" />
        <TextField fullWidth label = "Email" />
        <TextField fullWidth label = "Password" />
        <TextField fullWidth label = "Security Question" />
        <TextField fullWidth label = "Security Answer" />
        <Button fullwidth type="submit" variant="container">Submit</Button>
    </Container>
       
    </>

);
}
    



//you can add default keyword

//use <typography> tag for adding text

//mui.com for more info
import * as Yup from "yup";
import {useState } from "react";
import {Box, Button, Container, IconButton, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {Form, FormikProvider, useFormik} from "formik";
import {LoadingButton} from "@mui/lab";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";



export default function Register() {

    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        // firstName: Yup.string()
        //     .min(2, "Too Short!")
        //     .max(50, "Too Long!")
        //     .required("First name required"),
        // lastName: Yup.string()
        //     .min(2, "Too Short!")
        //     .max(50, "Too Long!")
        //     .required("Last name required"),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string()
            .required('Password is required')
            .min(8, "Too Short!")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/,
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol'
            ),
        passwordConfirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"),
        securityAnswer: Yup.string()
            .required("securityAnswer is required"),
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();




    const formik = useFormik({
        initialValues: {
           
            email: '',
            password: '',
            passwordConfirmation: '',
            securityAnswer: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values) => {
            const {email, password,  securityAnswer} = values;
            console.log(email,password)
            console.log("hi")
            console.log(values);

            dispatch(
                setUser({
                    email,
                    password,
                    securityAnswer,
                })
            );

            console.log('dwjdnw')

            try {
              fetch('http://localhost:3000/User/save', {
                 method: 'POST',
                 body: JSON.stringify({
                     email,
                     password,
                     securityAnswer,
                 }),
                 headers: {
                     'Content-Type': 'application/json',
                 },
             });
     
             // Registration successful, navigate to the login page
            //  navigate("/login");
         } catch (error) {
             console.error(error);
             // Handle error if the registration request fails
         }

         console.log("hehe nhi hua")

            
        },
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Container maxWidth="sm" sx={{ height: "100%" }}>
        <Stack spacing={5}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                
                <TextField
                  fullWidth
                  autoComplete="email"
                  type="email"
                  label="Email address"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  {...getFieldProps("password")}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />

                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  label="Confirm Password"
                  {...getFieldProps("passwordConfirmation")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(
                    touched.passwordConfirmation && errors.passwordConfirmation
                  )}
                  helperText={
                    touched.passwordConfirmation && errors.passwordConfirmation
                  }
                />

<TextField
                  fullWidth
                  autoComplete="securityAnswer"
                  
                  label="security Answer"
                  {...getFieldProps("securityAnswer")}
                  error={Boolean(touched.securityAnswer && errors.securityAnswer)}
                  helperText={touched.securityAnswer && errors.securityAnswer}
                />

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Register
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Stack>
    </Container>
  );
}


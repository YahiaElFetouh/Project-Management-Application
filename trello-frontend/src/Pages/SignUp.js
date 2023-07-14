import * as Yup from "yup";
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import {
  Container,Stack,TextField,Box,Typography} from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import { useDispatch } from "react-redux";


export default function SignUp() {
  const [passShow, setPass] = useState(false);

  const Register = Yup.object().shape({
    fName: Yup.string()
       // in case first name is not entered
      .required("Enter first name"),
      lName: Yup.string()
      // in case last name is not entered
      .required("Enter last name"),
    email: Yup.string()
      .email("not valid!")
      .required("Email is required!"),
    securityAnswer: Yup.string()
      // in case last name is not entered
      .required("Enter Answer"),
    password: Yup.string().required("Password is required!"),
    confirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords are not matching!!"
    ),
  });

  // const dispatch = useDispatch();
    const navigate = useNavigate();



   const formik = useFormik({
  initialValues: {
    fName: '',
    lName: '',
    email: '',
    password: '',
    confirmation: '',
    securityAnswer: '',
  },
  validationSchema: Register,

  onSubmit: async (values) => {
    const {email, password, fName, lName, securityAnswer} = values;
    console.log(values);


  // Code for linking the frontend and the backend:
  // Referred these sources:
  //1) https://dmitripavlutin.com/javascript-fetch-async-await/

  try {
      await fetch('http://localhost:8080/users/save', {
          method: 'POST',
          body: JSON.stringify({
              fName,
              lName,
              email,
              password,
              securityAnswer,
          }),
          headers: {
              'Content-Type': 'application/json',
          },
      });

      // Registration successful, navigate to the login page
      navigate("/login");
  } catch (error) {
      console.error(error);
      // Handle error if the registration request fails
  }
},
});



  

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Container >
      <Box >
        <Stack >
          <Box>
            <Typography
              variant="h1"
              sx={{
                textAlign: "right",
              }}
            >
              Sign up page - Enter your details
            </Typography>
          </Box>
          
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
            
              <Stack >
                <TextField
                  fullWidth
                  label="First name"
                  {...getFieldProps("fName")}
                  error={Boolean(touched.fName && errors.fName)}
                  helperText={touched.fName && errors.fName}
                />

                <TextField
                  fullWidth
                  label="Last name"
                  {...getFieldProps("lName")}
                  error={Boolean(touched.lName && errors.lName)}
                  helperText={touched.lName && errors.lName}
                />

                <TextField
                  fullWidth
                  autoComplete="username"
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
                  type={passShow ? "text" : "password"}
                  label="Confirm Password"
                  {...getFieldProps("passwordConfirmation")}
                
                  error={Boolean(
                    touched.passwordConfirmation && errors.passwordConfirmation
                  )}
                  helperText={
                    touched.passwordConfirmation && errors.passwordConfirmation
                  }
                />
                <TextField
                            fullWidth
                            label="Answer"
                            {...getFieldProps("securityAnswer"
                            )}
                            error={Boolean(touched.securityAnswer && errors.securityAnswer)}
                            helperText={touched.securityAnswer && errors.securityAnswer}
                        />


                

                <LoadingButton loading={isSubmitting}>
                  Sign Up
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Stack>
      </Box>
    </Container>
  );
}

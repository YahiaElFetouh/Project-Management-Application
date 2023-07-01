import * as Yup from "yup";
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import {
  Container,Stack,TextField,Box,Typography} from "@mui/material";


// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
    password: Yup.string().required("Password is required!"),
    confirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords are not matching!!"
    ),
  });



  const formik = useFormik({
    initialValues: {
      fName: '',
      lName: '',
      email: '',
      password: '',
      confirmation: '',
    },
    validationSchema: Register,

    await fetch('http://localhost:8080/users/save', {
    method: 'POST',
    body: JSON.stringify({
      email: values.email,
      fName: values.firstName,
      lName: values.lastName,
      password: values.password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  navigate("/signUp");
}

    //over here
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

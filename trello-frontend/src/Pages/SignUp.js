import * as Yup from "yup";
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import {
  Container,Stack,TextField,Box,Typography} from "@mui/material";

// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Register() {
  const [passShow, setPass] = useState(false);

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
      "Passwords must match"
    ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: RegisterSchema,
    // onSubmit: async (values) => {
    //   const { emailID, pass, fname, lname } = values;
    //   console.log(emailID, pass, fname, lname);
    // },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Container  sx={{ height: "80%" }}>
      <Box sx={{ mt: 20 }}>
        <Stack spacing={5}>
          <Box>
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
              }}
            >
              Sign up page - Enter your details
            </Typography>
          </Box>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="First name"
                  {...getFieldProps("firstName")}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />

                <TextField
                  fullWidth
                  label="Last name"
                  {...getFieldProps("lastName")}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
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
                //   InputProps={{
                //     endAdornment: (
                //       <InputAdornment position="end">
                //         <IconButton
                //           edge="end"
                //           onClick={() => setPass((prev) => !prev)}
                //         >
                //           {passShow ? (
                //             <VisibilityIcon />
                //           ) : (
                //             <VisibilityOffIcon />
                //           )}
                //         </IconButton>
                //       </InputAdornment>
                //     ),
                //   }}
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

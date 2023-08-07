"use client";

import React, { useState } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";
// import { Link } from "react-router-dom"
import Link from "next/link";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(firstName, lastName, email, dateOfBirth, password);
  }

  return (
    <React.Fragment>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="First Name"
            onChange={(e: any) => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Last Name"
            onChange={(e: any) => setLastName(e.target.value)}
            value={lastName}
            fullWidth
            required
          />
        </Stack>
        <TextField
          type="email"
          variant="outlined"
          color="secondary"
          label="Email"
          onChange={(e: any) => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          type="password"
          variant="outlined"
          color="secondary"
          label="Password"
          onChange={(e: any) => setPassword(e.target.value)}
          value={password}
          required
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          type="date"
          variant="outlined"
          color="secondary"
          label="Date of Birth"
          onChange={(e: any) => setDateOfBirth(e.target.value)}
          value={dateOfBirth}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <Button variant="outlined" color="secondary" type="submit">
          Register
        </Button>
      </form>
      <small>
        Already have an account? <Link href="/login">Login Here</Link>
      </small>
    </React.Fragment>
  );
};

export default RegisterForm;

// // ** MUI Imports
// import Grid from "@mui/material/Grid";

// // ** Styled Component
// import DatePickerWrapper from "../components/react-datepicker";

// // ** Demo Components Imports
// import FormLayoutsBasic from "./FormLayoutsBasic";
// import FormLayoutsIcons from "./FormLayoutsIcons";
// import FormLayoutsSeparator from "./FormLayoutsSeparator";
// import FormLayoutsAlignment from "./FormLayoutsAlignment";

// // ** Third Party Styles Imports
// import "react-datepicker/dist/react-datepicker.css";

// const FormLayouts = () => {
//   return (
//     <DatePickerWrapper>
//       <Grid container spacing={6}>
//         <Grid item xs={12} md={6}>
//           <FormLayoutsBasic />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <FormLayoutsIcons />
//         </Grid>
//         <Grid item xs={12}>
//           <FormLayoutsSeparator />
//         </Grid>
//         <Grid item xs={12}>
//           <FormLayoutsAlignment />
//         </Grid>
//       </Grid>
//     </DatePickerWrapper>
//   );
// };

// export default FormLayouts;

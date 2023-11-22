import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function Review({ onReviewChange }) {
  const [amount, setAmount] = useState();
  const [message, setMessage] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    onReviewChange({ amount: event.target.value, message });
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    onReviewChange({ amount, message: event.target.value });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        ¿Cuanto desea donar?
      </Typography>
      <Grid item xs={12}>
          <TextField
            required
            id="amount"
            name="amount"
            label="Ingrese un monto"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={handleAmountChange}
          />
        </Grid>
        <br></br>
        <Typography variant="h6" gutterBottom>
            ¿Desea dejar un mensaje?
        </Typography>
        <Grid item xs={12}>
            <TextField
            required
            id="message"
            name="message"
            label="Mensaje"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={handleMessageChange}
            />
        </Grid>
    </React.Fragment>
  );
}
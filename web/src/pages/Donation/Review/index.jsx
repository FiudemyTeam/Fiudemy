import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function Review() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        ¿Cuanto desea donar?
      </Typography>
      <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Ingrese un monto"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <br></br>
        <Typography variant="h6" gutterBottom>
            ¿Desea dejar un mensaje?
        </Typography>
        <Grid item xs={12}>
            <TextField
            required
            id="address1"
            name="address1"
            label="Mensaje"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            />
        </Grid>
    </React.Fragment>
  );
}
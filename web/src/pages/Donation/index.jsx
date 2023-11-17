import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const Donation = () => {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [donationSent, setDonationSent] = useState(false);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleDonate = () => {
    // Aquí puedes realizar acciones relacionadas con la donación (por ejemplo, enviar datos al servidor)
    console.log(`Donación de ${amount} recibida con el mensaje: ${message}`);

    // Actualizar el estado para indicar que la donación se ha enviado con éxito
    setDonationSent(true);

    // Limpiar los campos del formulario después de la donación
    setAmount(0);
    setMessage("");
  };

  const handleNewDonation = () => {
    // Restablecer el estado para permitir una nueva donación
    setDonationSent(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        marginTop: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h4" component="h1" sx={{ marginBottom: "20px" }}>
        Gracias por colaborar con el curso
      </Typography>
      {donationSent ? (
        <div>
          <Typography variant="h6" color="primary" sx={{ marginBottom: "20px" }}>
            ¡Gracias por tu donación!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNewDonation}
            sx={{ marginTop: "20px" }}
          >
            Nueva Donación
          </Button>
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              label="Monto"
              type="number"
              variant="outlined"
              fullWidth
              value={amount}
              onChange={handleAmountChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              label="Mensaje"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={message}
              onChange={handleMessageChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDonate}
              sx={{ marginTop: "20px" }}
            >
              Donar
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Donation;



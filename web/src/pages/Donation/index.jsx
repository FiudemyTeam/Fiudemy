import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from '../Donation/AddresForm';
import PaymentForm from '../Donation/PaymentForm';
import Review from '../Donation/Review';
import { useParams } from "react-router-dom";
import axios from 'axios'; 

const API_HOST = import.meta.env.VITE_API_HOST;

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link to="/home">
        Fiudemy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Dedicatoria', 'Donacion', 'Detalles de Pago'];

function getStepContent(step, handleReviewChange) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 2:
      return <PaymentForm />;
    case 1:
      return <Review onReviewChange={handleReviewChange} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const { teacherId } = useParams();

  const [donationData, setDonationData] = React.useState({
    teacher_id: teacherId,
    amount: 0,
    message: "",
  });

  const handleReviewChange = (reviewData) => {
    setDonationData((prevData) => ({ ...prevData, ...reviewData }));
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async () => {
    if (activeStep == 2) {
      try {
        await axios.post(
          `${API_HOST}/donations/`,
          donationData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.error('Error making donation:', error);
      }  
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Tu Donacion
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
              <React.Fragment>
                  {/*{sendDonation(activeStep)}*/}
                  <Typography variant="h5" gutterBottom>
                      Gracias por tu donacion!.
                  </Typography>
                  <Typography variant="subtitle1">
                      Los fondos donados se enviarán directamente a la billetera del profesor a cargo del curso.
                  </Typography>
              </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, handleReviewChange)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Volver
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Donar' : 'Siguiente'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
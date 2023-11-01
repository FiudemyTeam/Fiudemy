import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const cardInfo = [
  {
    title: 'Introducción a Python',
    content: 'Primeros pasos en Python',
  },
  {
    title: 'Fundamentos de Programación en Python',
    content: 'Conceptos clave de programación',
  },
  {
    title: 'Estructuras de Control en Python',
    content: 'Control de flujo en Python',
  },
  {
    title: 'Funciones y Módulos en Python',
    content: 'Modularización y reutilización de código',
  },
  {
    title: 'Trabajo con Listas y Tuplas en Python',
    content: 'Manipulación de datos estructurados',
  },
  {
    title: 'Manejo de Diccionarios y Conjuntos en Python',
    content: 'Organización de datos en Python.',
  },
  {
    title: 'Programación Orientada a Objetos en Python',
    content: 'Conceptos de OOP en Python.',
  },
  {
    title: 'Manipulación de Archivos en Python',
    content: 'Lectura y escritura de archivos.',
  },
  {
    title: 'Proyectos Prácticos con Python',
    content: 'Uso cotidiano',
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Fiudemy
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
  sx={{
    bgcolor: 'background.paper',
    pt: 8,
    pb: 6,
  }}
>
  <Container maxWidth="md"> {/* Aumenta el maxWidth para hacerlo más amplio */}
    <Typography
      component="h1"
      variant="h2"
      align="center"
      color="text.primary"
      gutterBottom
    >
      Iniciacion a la programacion en Python
    </Typography>
    <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Curso básico de programación en Python para principiantes, abordando conceptos esenciales y la sintaxis de Python.
    </Typography>
    <Stack
      sx={{ pt: 4 }}
      direction="row"
      spacing={2}
      justifyContent="center"
    >
      <Button variant="contained">Enroll in course</Button>
      <Button variant="outlined">Enroll in certification</Button>
    </Stack>
  </Container>
</Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {cardInfo[index] ? cardInfo[index].title : 'Title not available'} {/* Verifica si cardInfo[index] existe */}
                    </Typography>
                    <Typography>
                      {cardInfo[index] ? cardInfo[index].content : 'Content not available'} {/* Verifica si cardInfo[index] existe */}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from './general/Copyright';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';


const base_url = 'http://localhost:8000'

async function fetchCoursesFromBackend() {
  try {
    const response = await axios.get(`${base_url}/courses/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos de los cursos!', error);
    return [];
  }
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Landpage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const data = await fetchCoursesFromBackend();
      setCourses(data);
    }

    fetchCourses();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Link to="/home" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
            <AutoStoriesIcon />
            <Typography variant="h6" color="inherit" noWrap style={{ marginLeft: '10px' }}>
              Fiudemy
            </Typography>
          </Link>
          <div style={{ flexGrow: 1 }} />
          <Link to="/profile" style={{ textDecoration: 'none', color: 'white', marginRight: 20 }}>
            <PersonIcon />
          </Link>
          <Link to="/logout" style={{ textDecoration: 'none', color: 'white' }}>
            <ExitToAppIcon />
          </Link>
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
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              <AutoStoriesIcon fontSize={'inherit'} vertical-align={'middle'} sx={{ mr: 2 }} />
              Fiudemy
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Elige entre más de 210.000 cursos de vídeo en línea con nuevo contenido cada mes
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {courses.map((course) => (
              <Grid item key={course.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={course.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.name}
                    </Typography>
                    <Typography>
                      {course.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Ver</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Copyright from './general/Copyright';
import LinearProgress from '@mui/material/LinearProgress';

const UserProfile = () => {
  // Simulated user data and courses
  const userData = {
    username: 'ldiaz',
    email: 'ldiaz@example.com',
  };

  const coursesStarted = [
    {
      id: 1,
      name: 'Curso de Desarrollo Web',
      progress: 30,
      description: 'Aprende a crear aplicaciones web modernas con las últimas tecnologías.',
      image: 'https://i.ytimg.com/vi/bYOjmW-740M/maxresdefault.jpg',
    },
    {
      id: 2,
      name: 'Diseño Gráfico Avanzado',
      progress: 50,
      description: 'Perfecciona tus habilidades de diseño gráfico y crea proyectos impresionantes.',
      image: 'https://institutonoa.com.ar/wp-content/uploads/2021/10/diseno_grafico.jpg',
    },
  ];

  const coursesFinished = [
    {
      id: 3,
      name: 'Machine Learning con Python',
      description: 'Explora el mundo del machine learning y la inteligencia artificial con Python.',
      image: 'https://escuelafullstack.com/web/image/slide.channel/14/image_512',
    },
    {
      id: 4,
      name: 'Curso de Marketing Digital',
      description: 'Domina las estrategias de marketing digital para hacer crecer tu negocio.',
      image: 'https://i.ytimg.com/vi/sRAlwvGz-vo/maxresdefault.jpg',
    },
  ];

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Link to="/home" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
            <AutoStoriesIcon />
            <Typography variant="h6" color="inherit" noWrap style={{ marginLeft: '10px' }}>
              Fiudemy
            </Typography>
          </Link>
          <div style={{ flexGrow: 1 }} />
          <Link to="/logout" style={{ textDecoration: 'none', color: 'white' }}>
            <ExitToAppIcon />
          </Link>
        </Toolbar>
      </AppBar>
      <main>
      <Container sx={{ marginTop: '20px' }}>
        <Card>
          <CardContent>
            <Typography variant="h5">User Profile</Typography>
            <Typography>
              Username: {userData.username}
            </Typography>
            <Typography>
              Email: {userData.email}
            </Typography>
          </CardContent>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 1 }}>Cursos empezados</Typography>
            <Grid container spacing={2}>
              {coursesStarted.map((course) => (
                <Grid item key={course.id} xs={12} sm={6}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                    <div style={{ padding: '16px' }}>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{ mb: 1 }}
                      />
                      <Typography>Progreso: {course.progress}%</Typography>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 1 }}>Cursos terminados</Typography>
            <Grid container spacing={2}>
              {coursesFinished.map((course) => (
                <Grid item key={course.id} xs={12} sm={6}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
          </CardContent>
        </Card>
      </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </div>
  );
};

export default UserProfile;
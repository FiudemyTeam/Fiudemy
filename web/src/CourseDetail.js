import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Simula la carga de detalles del curso desde una fuente de datos
    // Reemplaza esto con tu lógica de obtención de datos
    const fakeCourseData = {
      name: 'Curso de Programación Avanzada',
      description:
        'Aprende programación avanzada con ejemplos prácticos y proyectos emocionantes.',
      instructor: 'John Doe',
      duration: '10 semanas',
      level: 'Avanzado',
    };

    // Simulamos una solicitud de carga de datos
    setTimeout(() => {
      setCourse(fakeCourseData);
    }, 1000);
  }, [id]);

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
          <Link to="/profile" style={{ textDecoration: 'none', color: 'white', marginRight: 20 }}>
            <PersonIcon />
          </Link>
          <Link to="/logout" style={{ textDecoration: 'none', color: 'white' }}>
            <ExitToAppIcon />
          </Link>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: '20px' }}>
        {course ? (
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" style={{ marginBottom: '10px' }}>
              {course.name}
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>
              Instructor: {course.instructor}
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>
              Duración: {course.duration}
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>
              Nivel: {course.level}
            </Typography>
            <Typography variant="body1">{course.description}</Typography>
            {/* Agrega más detalles del curso aquí, como el contenido, el precio, las reseñas, etc. */}
          </Paper>
        ) : (
          <Typography>Cargando detalles del curso...</Typography>
        )}
      </Container>
    </div>
  );
};

export default CourseDetail;
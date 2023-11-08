import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const databaseData = [
  {
    id: 1,
    title: 'Introducción a Python',
    content: 'Primeros pasos en Python',
  },
  {
    id: 2,
    title: 'Fundamentos de Programación en Python',
    content: 'Conceptos clave de programación',
  },
  {
    id: 3,
    title: 'Estructuras de Control en Python',
    content: 'Control de flujo en Python',
  },
  {
    id: 4,
    title: 'Funciones y Módulos en Python',
    content: 'Modularización y reutilización de código',
  },
  {
    id: 5,
    title: 'Trabajo con Listas y Tuplas en Python',
    content: 'Manipulación de datos estructurados',
  },
];

const defaultTheme = createTheme();

export default function CourseView() {
  const [expandedCourse, setExpandedCourse] = useState(null);

  const handleCourseExpansion = (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  const [selectedCourses, setSelectedCourses] = useState([]); 

  const handleCourseSelection = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <div style={{ borderBottom: '1px dashed black' }}>
          </div>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Iniciación a la programación en Python
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
              <Button variant="contained">Inscribirse al curso</Button>
              <Button variant="outlined">Inscribirse a la certificación</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {databaseData.map((course) => (
            <Accordion key={course.id} expanded={expandedCourse === course.id}>
              <AccordionSummary
                onClick={() => handleCourseExpansion(course.id)}
              >
                <Typography gutterBottom variant="h5" component="h2">
                  {course.title}
                </Typography>
                <Checkbox
                  checked={selectedCourses.includes(course.id)}
                  onChange={() => handleCourseSelection(course.id)}
                  sx={{ marginLeft: 'auto' }}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {course.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Fiudemy
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Continua aprendiendo con nosotros!
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'; // Importa el ícono de eliminación
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Importa createTheme
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AutoStoriesIcon from "@mui/icons-material/AutoStories";



const defaultTheme = createTheme(); // Crea un tema

export default function CreateCourseView() {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    modules: [{ moduleTitle: '', moduleContent: '' }],
  });

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    if (name === 'title' || name === 'description') {
      setCourseData({ ...courseData, [name]: value });
    } else {
      const modules = [...courseData.modules];
      modules[index][name] = value;
      setCourseData({ ...courseData, modules });
    }
  };

  const addModule = () => {
    setCourseData({
      ...courseData,
      modules: [...courseData.modules, { moduleTitle: '', moduleContent: '' }],
    });
  };

  const deleteModule = (index) => {
    const modules = [...courseData.modules];
    modules.splice(index, 1);
    setCourseData({ ...courseData, modules });
  };

  const handleSubmit = () => {
    // Aquí puedes enviar los datos del curso a tu servidor o realizar otra acción.
    console.log(courseData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container sx={{ marginTop: "20px" }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Crear un nuevo curso
          </Typography>
          <TextField
            name="title"
            label="Título del curso"
            variant="outlined"
            fullWidth
            value={courseData.title}
            onChange={(e) => handleChange(e)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="description"
            label="Descripción del curso"
            variant="outlined"
            fullWidth
            value={courseData.description}
            onChange={(e) => handleChange(e)}
            style={{ marginBottom: "20px" }}
          />
          {courseData.modules.map((module, index) => (
            <div key={index}>
              <TextField
                name="moduleTitle"
                label={`Título del Módulo ${index + 1}`}
                variant="outlined"
                fullWidth
                value={module.moduleTitle}
                onChange={(e) => handleChange(e, index)}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                name="moduleContent"
                label={`Contenido del Módulo ${index + 1}`}
                variant="outlined"
                fullWidth
                value={module.moduleContent}
                onChange={(e) => handleChange(e, index)}
                style={{ marginBottom: "20px" }}
              />
              <IconButton onClick={() => deleteModule(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={addModule}>
              Agregar Módulo
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Crear Curso
            </Button>
          </Box>
        </Paper>
      </Container>
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

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
import axios from 'axios'; 
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';




const defaultTheme = createTheme(); // Crea un tema

export default function CreateCourseView() {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    image: '',
    modules: [{ moduleTitle: '', moduleDescription: '', moduleContentType: '', moduleContent: '' }],
  });

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    if (name === 'title' || name === 'description' || name ==='image') {
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
      modules: [...courseData.modules, {  moduleTitle: '', moduleDescription: '', moduleContentType: '', moduleContent: '' }],
    });
  };

  const deleteModule = (index) => {
    const modules = [...courseData.modules];
    modules.splice(index, 1);
    setCourseData({ ...courseData, modules });
  };

  const [createdCourseId, setCreatedCourseId] = useState(null); 
  const API_HOST = import.meta.env.VITE_API_HOST;
  const [successMessage, setSuccessMessage] = useState(false); // Nuevo estado para el mensaje de éxito

  const handleSubmit = async () => {
    console.log(courseData);
    
    try {
      const courseResponse = await axios.post(
        `${API_HOST}/courses/`,
        {
          name: courseData.title,
          description: courseData.description,
          image: courseData.image,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    
      console.log('Course created successfully:', courseResponse.data);
    
      const { id: generatedCourseId } = courseResponse.data;
    
      const modulePromises = courseData.modules.map((module, index) => {
        return axios.post(
          `${API_HOST}/courses/${generatedCourseId}/material`,
          {
            title: module.moduleTitle,
            description: module.moduleDescription,
            order: index+1,
            type: module.moduleContentType,
            value: module.moduleContent
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      });
    
      const materialResponses = await Promise.all(modulePromises);
    
      materialResponses.forEach((response, index) => {
        console.log(`Material added to course for module ${index + 1}:`, response.data);
      });
      setSuccessMessage(true); // Activa el mensaje de éxito
      setCreatedCourseId(generatedCourseId);
    } catch (error) {
      console.error('Error creating course or adding material:', error);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSuccessMessage(false); // Cierra el Snackbar al hacer clic en "Cerrar"
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
            name="image"
            label="Imagen de portada del curso"
            variant="outlined"
            fullWidth
            value={courseData.image}
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
                name="moduleDescription"
                label={`Descripción del Módulo ${index + 1}`}
                variant="outlined"
                fullWidth
                value={module.moduleTitle}
                onChange={(e) => handleChange(e, index)}
                style={{ marginBottom: "10px" }}
              />
              <Select
                name="moduleContentType"
                label={`Tipo de contenido del Módulo ${index + 1}`}
                variant="outlined"
                fullWidth
                value={module.moduleContentType}
                onChange={(e) => handleChange(e, index)}
                style={{ marginBottom: "20px" }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Tipo de Contenido 
                </MenuItem>
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="imagen">Imagen</MenuItem>
                <MenuItem value="bibliografia">Bibliografía</MenuItem>
              </Select>          
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
            {createdCourseId ? (
              <Link to={`/course/${createdCourseId}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                  Ir al Curso Creado
                </Button>
              </Link>
            ) : (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Crear Curso
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }} // Centra el Snackbar
        style={{ width: '50%', minWidth: '300px' }} // Establece el ancho y el ancho mínimo del Snackbar
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          Curso creado con éxito
        </MuiAlert>
      </Snackbar>
 
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
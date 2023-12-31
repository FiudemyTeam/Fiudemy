import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';




const defaultTheme = createTheme(); // Crea un tema

export default function CreateCourseView() {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    image: '',
    course_materials: [{ title: '', description: '', type: '', value: '' }],
  });

  const handleChange = (event, materialIdx = null) => {
    const { name, value } = event.target;
    if (materialIdx === null) {
      setCourseData({ ...courseData, [name]: value });
    } else {
      const course_materials = courseData.course_materials.map((material, idx) => {
        if (idx === materialIdx) {
          return { ...material, [name]: value };
        } else {
          return material;
        }
      });
      setCourseData({ ...courseData, course_materials });
    }
  };

  const addModule = () => {
    setCourseData({
      ...courseData,
      course_materials: [...courseData.course_materials, { title: '', description: '', type: '', value: '' }],
    });
  };

  const deleteModule = (index) => {
    const course_materials = [...courseData.course_materials];
    course_materials.splice(index, 1);
    setCourseData({ ...courseData, course_materials });
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
          name: courseData.name,
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

      const modulePromises = courseData.course_materials.map((material, index) => {
        return axios.post(
          `${API_HOST}/courses/${generatedCourseId}/material`,
          {
            title: material.title,
            description: material.description,
            order: index + 1,
            type: material.type,
            value: material.value
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
      <Container sx={{ marginTop: "3em", marginBottom: "3em" }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Crear curso
          </Typography>
          <TextField
            name="name"
            label="Título del curso"
            variant="outlined"
            fullWidth
            value={courseData?.name || ''}
            onChange={(e) => handleChange(e)}
            style={{ marginBottom: "10px" }}
          />

          <TextField
            name="image"
            label="Imagen de portada del curso"
            variant="outlined"
            fullWidth
            value={courseData?.image || ''}
            onChange={(e) => handleChange(e)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="description"
            label="Descripción del curso"
            variant="outlined"
            fullWidth
            value={courseData?.description || ''}
            onChange={(e) => handleChange(e)}
            style={{ marginBottom: "20px" }}
          />
          {courseData?.course_materials.map((material, index) => (
            <>
              <Divider style={{ marginBottom: "2em" }} />
              <div key={index} style={{ marginBottom: "2em" }}>
                <TextField
                  name="title"
                  label={`Título del Módulo ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={material.title}
                  onChange={(e) => handleChange(e, index)}
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  name="description"
                  label={`Descripción del Módulo ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={material.description}
                  onChange={(e) => handleChange(e, index)}
                  style={{ marginBottom: "10px" }}
                />
                <Select
                  name="type"
                  label={`Tipo de contenido del Módulo ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={material.type}
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
                  name="value"
                  label={`Contenido del Módulo ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={material.value}
                  onChange={(e) => handleChange(e, index)}
                  style={{ marginBottom: "20px" }}
                />
                <Button variant="contained" color="error" onClick={() => deleteModule(index)}>
                  <DeleteIcon /> Eliminar Módulo
                </Button>
              </div>
            </>
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
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { updateCourseInformation } from '@pages/CourseEdition/api';

const defaultTheme = createTheme();

const EditCourseView = () => {
  const { courseId } = useParams();
  console.log("recibe por param",courseId);
//  const { courseId } = 10//course.id;
  const API_HOST = import.meta.env.VITE_API_HOST;
  const [courseDetails, setCourseDetails] = useState(null);
//  const [courseData, setCourseData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(true); 
//  const {courseTitle, courseImage, courseDescription, course_materials } =

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${API_HOST}/courses/${courseId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        // Copiar toda la información de courseDetails a courseData al cargar la página
        setCourseData({
          name: response.data.name || '',
          description: response.data.description || '',
          image: response.data.image || '',
          id: response.data.id,
          is_favorite: response.data.is_favourite,
          teacher_id: response.data.teacher_id,
          is_subscribed: response.data.is_subscribed,
          total_subscriptions: response.data.total_subscriptions,
          total_rate: response.data.total_rate,
          teacher_name: response.data.teacher_name,
          is_owner: response.data.is_owner,
          progress: response.data.progress,
          course_materials: response.data.course_materials.map((material) => ({
            title: material.title || '',
            description: material.description || '',
            type: material.type || '',
            value: material.value || '',
            id: material.id,
            course_id: material.course_id,
            viewed: material.viewed,
            order: material.order,
          })),
        });
  
        setCourseDetails(response.data);
        console.log("COURSE DETAILS",courseDetails);
        console.log("COURSE DETAILS2",response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [API_HOST, courseId]);
  
  
  const [courseData, setCourseData] = useState({
    title: courseDetails?.name || '',
    description: courseDetails?.description || '',
    image: courseDetails?.image || '',
    course_materials: [], // Inicializamos los módulos como un arreglo vacío
  });
  console.log("COURSE DATA ES",courseData);
  console.log("COURSE Details ES",courseDetails);

  // Copiar la información de los módulos de courseDetails a courseData al cargar la página
  useEffect(() => {
    if (courseDetails) {
      setCourseData({
        name: courseDetails.name || '',
        description: courseDetails.description || '',
        image: courseDetails.image || '',
        id: courseDetails.id,
        is_favorite: courseDetails.is_favourite,
        teacher_id: courseDetails.teacher_id,
        is_subscribed: courseDetails.is_subscribed,
        total_subscriptions: courseDetails.total_subscriptions,
        total_rate: courseDetails.total_rate,
        teacher_name: courseDetails.teacher_name,
        is_owner: courseDetails.is_owner,
        progress: courseDetails.progress,
        course_materials: courseDetails.course_materials.map((material) => ({
          title: material.title || '',
          description: material.description || '',
          type: material.type || '',
          value: material.value || '',
          id: material.id,
          course_id: material.course_id,
          viewed: material.viewed,
          order: material.order,
        })),
      });
    }
  }, [courseDetails]);

  const addModule = () => {
    setCourseData({
      ...courseData,
      course_materials: [...courseData.course_materials, { title: '', description: '', type: '', value: '' }],
    });
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(false);
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    if (name === 'name' || name === 'description' || name === 'image') {
      setCourseData({ ...courseData, [name]: value });
    } else {
      const course_materials = [...courseData.course_materials];
      course_materials[index][name] = value;
      setCourseData({ ...courseData, course_materials });
    }
  };
  
  
  const handleSubmit = async () => {
    console.log('Course data to update:', courseData);
    updateCourseInformation(courseId, courseData)
    .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error al actualizar la información del curso!", error);
      });
      };
    

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container sx={{ marginTop: "20px" }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Editar mi curso
          </Typography>
          <TextField
            name="name"
            label="Título del curso"
            variant="outlined"
            fullWidth
            value={courseData.name || courseDetails?.name || ''}
            onChange={(e) => handleChange(e)}
            style={{ marginBottom: "10px" }}
            />

          <TextField
            name="image"
            label="Imagen de portada del curso"
            variant="outlined"
            fullWidth
            value={courseData.image || courseDetails?.image || ''}
            onChange={(e) => handleChange(e)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="description"
            label="Descripción del curso"
            variant="outlined"
            fullWidth
            value={courseData.description || courseDetails?.description || ''}
            onChange={(e) => handleChange(e)}
            style={{ marginBottom: "20px" }}
          />
          {courseData.course_materials.map((material, index) => (
            <div key={index}>
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
              <IconButton onClick={() => deleteModule(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={addModule}>
              Agregar Módulo
            </Button>
              <Link to={`/course/${courseId}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Guardar
                </Button>
              </Link>

          </Box>
        </Paper>
      </Container>
      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        style={{ width: '50%', minWidth: '300px' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          Curso editado con éxito
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
};

export default EditCourseView;

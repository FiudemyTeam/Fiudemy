import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
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
import Divider from '@mui/material/Divider';
import { updateCourseInformation } from '@pages/CourseEdition/api';

const defaultTheme = createTheme();

const EditCourseView = () => {
  const { courseId } = useParams();
  console.log("CourseId", courseId);
  const API_HOST = import.meta.env.VITE_API_HOST;
  const [courseDetails, setCourseDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${API_HOST}/courses/${courseId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCourseDetails(response.data);

        console.log("COURSE DETAILS", courseDetails);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [API_HOST, courseId]);


  const addModule = () => {
    const materialIndex = courseDetails.course_materials.length + 1;
    setCourseDetails({
      ...courseDetails,
      course_materials: [
        ...courseDetails.course_materials,
        { title: `Módulo ${materialIndex}`, description: `Descripción del módulo ${materialIndex}`, type: '', value: '', order: materialIndex }
      ],
    });
  };

  const deleteModule = (materialIdx) => {
    const course_materials = courseDetails.course_materials.filter((_, idx) => idx !== materialIdx);
    setCourseDetails({ ...courseDetails, course_materials });
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(false);
  };

  const handleChange = (event, materialIdx = null) => {
    const { name, value } = event.target;
    if (materialIdx === null) {
      setCourseDetails({ ...courseDetails, [name]: value });
    } else {
      const course_materials = courseDetails.course_materials.map((material, idx) => {
        if (idx === materialIdx) {
          return { ...material, [name]: value };
        } else {
          return material;
        }
      });
      setCourseDetails({ ...courseDetails, course_materials });
    }
  };


  const handleSubmit = async () => {
    console.log('Course data to update:', courseDetails);
    const { success } = await updateCourseInformation(courseId, courseDetails)
      .catch((error) => {
        console.error("Error al actualizar la información del curso!", error);
      });
    setSuccessMessage(success);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container sx={{ marginTop: "3em", marginBottom: "3em" }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Editar mi curso
          </Typography>
          <TextField
            name="name"
            label="Título del curso"
            variant="outlined"
            fullWidth
            value={courseDetails?.name || ''}
            onChange={(e) => handleChange(e)}
            style={{ marginBottom: "10px" }}
          />

          <TextField
            name="image"
            label="Imagen de portada del curso"
            variant="outlined"
            fullWidth
            value={courseDetails?.image || ''}
            onChange={(e) => handleChange(e)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="description"
            label="Descripción del curso"
            variant="outlined"
            fullWidth
            value={courseDetails?.description || ''}
            onChange={(e) => handleChange(e)}
            style={{ marginBottom: "20px" }}
          />
          {courseDetails?.course_materials.map((material, index) => (
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
            <Link to={`/course/${courseId}`} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Guardar
              </Button>
            </Link>

          </Box>
        </Paper >
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
    </ThemeProvider >
  );
};

export default EditCourseView;

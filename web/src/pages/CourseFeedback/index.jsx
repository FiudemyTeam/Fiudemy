import React from 'react';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import React from 'react';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const CourseFeedback = ({ course, selectedCourses, handleCourseSelection }) => {
  return (
    <AccordionDetails>
      <Typography>
        {course && course.content}
      </Typography>
      <div>
        <Typography variant="h6">Puntuación:</Typography>
        <Rating name="rating" value={course ? course.rating : 0} readOnly />
      </div>
      <div>
        <TextField
          id="comment"
          label="Deja un comentario"
          variant="outlined"
          fullWidth
        />
      </div>
      <div>
        <Typography variant="h6">Referencias:</Typography>
        <List>
          {course && course.references ? (
            course.references.map((reference, index) => (
              <ListItem key={index}>
                <ListItemText primary={reference.title} secondary={reference.url} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No hay referencias disponibles" />
            </ListItem>
          )}
        </List>
      </div>
    </AccordionDetails>
  );
}

export default CourseFeedback;

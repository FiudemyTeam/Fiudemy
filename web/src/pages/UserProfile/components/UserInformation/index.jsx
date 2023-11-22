import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { fetchUserInformation, updateUserInformation } from "./api";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const UserInformation = () => {
  const [userInformation, setUserInformation] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { username, email, about_me } = userInformation;

  useEffect(() => {
    fetchUserInformation()
      .then((userInformation) => {
        setUserInformation(userInformation);
      })
      .catch((error) => {
        console.error("Error al obtener la informacion del usuario!", error);
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateUserInformation(userInformation)
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error al actualizar la informacion del usuario!", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInformation((prevUserInformation) => ({
      ...prevUserInformation,
      [name]: value,
    }));
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <StyledCard>
        <CardContent>
          <TextField
            label="Username"
            name="username"
            value={username || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            label="Email"
            name="email"
            value={email || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            label="Sobre mi"
            name="about_me"
            value={about_me || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            margin="normal"
            size="small"
            style={{ marginBottom: "30px" }}
          />
          {isEditing ? (
            <>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  mr: 1,
                  color: "white",
                  backgroundColor: "success.dark",
                }}
              >
                Guardar
              </Button>
              <Button
                variant="contained"
                onClick={() => setIsEditing(false)}
                sx={{ mx: 1, color: "error", backgroundColor: "error.main" }}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={handleEdit}>
              Editar
            </Button>
          )}
        </CardContent>
      </StyledCard>
    </div>
  );
};

export default UserInformation;

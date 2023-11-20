import { useState, useContext, useEffect } from "react";
import {
  Grid,
  Select,
  MenuItem,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  Button,
  Collapse,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { SearchContext } from "@context/SearchContext";

const API_HOST = import.meta.env.VITE_API_HOST;

export default function App() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const { category, setCategory, rate, setRate, favorite, setFavorite } =
    useContext(SearchContext);

  const handleChange = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    // Hacer la solicitud para obtener las categorías desde tu API
    fetch(`${API_HOST}/courses/categories/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez al montar el componente

  return (
    <Container>

        <Grid container spacing={2} padding={3}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="cat-label">Categoría</InputLabel>
              <Select
                value={category || ""}
                onChange={(e) => setCategory(e.target.value)}
                label="Categoria"
                labelId="cat-label"
              >
                <MenuItem value={undefined}>Todas</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="cat-rating">Calificación</InputLabel>
              <Select
                value={rate || ""}
                onChange={(e) => setRate(e.target.value)}
                label="Calificacion"
                labelId="cat-rating"
              >
                <MenuItem value={undefined}>Todas</MenuItem>
                <MenuItem value="0">
                  0 <StarIcon fontSize="1px" />
                </MenuItem>
                <MenuItem value="1">
                  1 <StarIcon fontSize="1px" />
                </MenuItem>
                <MenuItem value="2">
                  2 <StarIcon fontSize="1px" />
                </MenuItem>
                <MenuItem value="3">
                  3 <StarIcon fontSize="1px" />
                </MenuItem>
                <MenuItem value="4">
                  4 <StarIcon fontSize="1px" />
                </MenuItem>
                <MenuItem value="5">
                  5 <StarIcon fontSize="1px" />
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            alignSelf="center"
            justifyContent="center"
          >
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={favorite || false}
                    onChange={() => setFavorite(!favorite)}
                  />
                }
                label="Solo Favoritos"
              />
            </FormControl>
          </Grid>
        </Grid>
    </Container>
  );
}

import { useState, useContext } from "react";
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

export default function App() {
  const [open, setOpen] = useState(false);

  const { category, setCategory, rate, setRate, favorite, setFavorite } =
    useContext(SearchContext);

  const handleChange = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Container>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleChange}>
            Filtros
          </Button>
        </Grid>
      </Grid>
      <Collapse in={open}>
        <Grid container spacing={2} padding={3}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="cat-label">Categoria</InputLabel>
              <Select
                value={category || ""}
                onChange={(e) => setCategory(e.target.value)}
                label="Categoria"
                labelId="cat-label"
              >
                <MenuItem value={undefined}>Todas</MenuItem>
                <MenuItem value="1">Category 1</MenuItem>
                <MenuItem value="2">Category 2</MenuItem>
                <MenuItem value="2">Category 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="cat-rating">Calificacion</InputLabel>
              <Select
                value={rate || ""}
                onChange={(e) => setRate(e.target.value)}
                label="Calificacion"
                labelId="cat-rating"
              >
                <MenuItem value={undefined}>Todas</MenuItem>
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
      </Collapse>
    </Container>
  );
}

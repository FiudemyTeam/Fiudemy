import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from './general/Copyright';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const cards = [
  {
    index: 1,
    image: 'https://i.ytimg.com/vi/bYOjmW-740M/maxresdefault.jpg',
    name: 'Curso de Desarrollo Web',
    description: 'Aprende a crear aplicaciones web modernas con las últimas tecnologías.',
  },
  {
    index: 2,
    image: 'https://institutonoa.com.ar/wp-content/uploads/2021/10/diseno_grafico.jpg',
    name: 'Diseño Gráfico Avanzado',
    description: 'Perfecciona tus habilidades de diseño gráfico y crea proyectos impresionantes.',
  },
  {
    index: 3,
    image: 'https://escuelafullstack.com/web/image/slide.channel/14/image_512',
    name: 'Machine Learning con Python',
    description: 'Explora el mundo del machine learning y la inteligencia artificial con Python.',
  },
  {
    index: 4,
    image: 'https://i.ytimg.com/vi/sRAlwvGz-vo/maxresdefault.jpg',
    name: 'Curso de Marketing Digital',
    description: 'Domina las estrategias de marketing digital para hacer crecer tu negocio.',
  },
  {
    index: 5,
    image: 'https://i.ytimg.com/vi/_vzc9pQnpic/maxresdefault.jpg',
    name: 'Programación en C++',
    description: 'Aprende a programar en C++ y construye aplicaciones de alto rendimiento.',
  },
  {
    index: 6,
    image: 'https://d3puay5pkxu9s4.cloudfront.net/curso/4271/800_imagen.jpg',
    name: 'Curso de Cocina Gourmet',
    description: 'Conviértete en un chef experto y prepara platos gourmet de alta calidad.',
  },
  {
    index: 7,
    image: 'https://globaldardos.com.ar/blog/wp-content/uploads/2021/09/blog-1.png',
    name: 'Desarrollo de Aplicaciones Móviles',
    description: 'Crea aplicaciones móviles para iOS y Android y llega a millones de usuarios.',
  },
  {
    index: 8,
    image: 'https://inverarg.com/wp-content/uploads/2022/03/cursobolsa_2-1024x576.jpg',
    name: 'Inversión en Bolsa',
    description: 'Aprende a invertir en el mercado de valores y hacer crecer tu patrimonio.',
  },
  {
    index: 10,
    image: 'https://www.escueladeyoga.com/wp-content/uploads/2021/07/EIY-coemmn-004.jpg',
    name: 'Curso de Yoga y Meditación',
    description: 'Encuentra la paz interior y mejora tu salud a través del yoga y la meditación.',
  }
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Landpage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <AutoStoriesIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Fiudemy
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              <AutoStoriesIcon fontSize={'inherit'} vertical-align={'middle'} sx={{ mr: 2 }} />
              Fiudemy
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Elige entre más de 210.000 cursos de vídeo en línea con nuevo contenido cada mes
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={card.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";

const RatingStars = ({ rate }) => {
  const maxStars = 5;
  const filledStars = Math.min(Math.round(rate), maxStars);

  const starContainerStyle = {
    marginLeft: 'auto', // Alinea las estrellas a la derecha
  };

  const starStyle = {
    fontSize: '20px',
    marginRight: '2px', // Ajusta el espaciado entre las estrellas según sea necesario
  };

  const starIcons = Array(maxStars)
    .fill(null)
    .map((_, index) => (
      <StarIcon key={index} color={index < filledStars ? "primary" : "disabled"} style={starStyle} />
    ));

  return <div style={starContainerStyle}>{starIcons}</div>;
};

RatingStars.propTypes = {
    rate: PropTypes.number.isRequired,
    starSize: PropTypes.number,
};

export default RatingStars;
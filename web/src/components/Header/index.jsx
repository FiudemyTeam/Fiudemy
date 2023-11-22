import AppBar from "@mui/material/AppBar";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutButton from "./components/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher, faUserGraduate } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Link
          to="/home"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AutoStoriesIcon />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{ marginLeft: "10px" }}
          >
            Fiudemy
          </Typography>
        </Link>
        <div style={{ flexGrow: 1 }} />
        <Link
          to="/profesor"
          style={{ textDecoration: "none", color: "white", marginRight: 20 }}
          title="Perfil Profesor"
        >
          <FontAwesomeIcon icon={faChalkboardTeacher} size="lg" />
        </Link>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "white", marginRight: 20 }}
            title="Perfil Alumno"
          >
            <FontAwesomeIcon icon={faUserGraduate} size="lg" />
          </Link>
          <LogoutButton />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

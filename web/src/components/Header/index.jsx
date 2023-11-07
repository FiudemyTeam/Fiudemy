import AppBar from "@mui/material/AppBar";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import SearchBar from "./components/SearchBar";

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
        <SearchBar />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "white", marginRight: 20 }}
          >
            <PersonIcon />
          </Link>
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <ExitToAppIcon />
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

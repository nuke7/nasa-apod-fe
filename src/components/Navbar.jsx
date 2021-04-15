import { Link } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Tab from "@material-ui/core/Tab";

import FavoriteIcon from "@material-ui/icons/Favorite";

import Search from "@material-ui/icons/Search";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: "1280px",
    margin: "auto",
    display: "flex",
    justifyContent: "space-around",
  },
});

export default function Navbar() {
  const classes = useStyles();

  return (
    <Paper square className={classes.root}>
      <Link to="/">
        <Tab icon={<Search />} label="SEARCH" />
      </Link>
      <Link to="/gallery">
        <Tab icon={<FavoriteIcon />} label="GALLERY" />
      </Link>
    </Paper>
  );
}

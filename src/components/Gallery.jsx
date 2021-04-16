/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";

import { NasaContext } from "../Context";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Zoom from "react-reveal/Zoom";
import { Modal } from "./Modal";

const useStyles = makeStyles({
  root: {
    width: 360,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    /* alignContent: "flex-end", */
    margin: "1rem",
    height: "90%",
  },
});

export const Gallery = (props) => {
  const classes = useStyles();
  const { value1, value2 } = useContext(NasaContext);
  const [gallery, setGallery] = value1;
  const [open, setOpen] = useState(false);
  const [stateID, setstateID] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return gallery.lenght !== 0 ? (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",

        width: "100%",
        margin: "auto",
      }}>
      {gallery.map((item, index) => {
        return (
          <Zoom key={index}>
            <Card className={classes.root} variant="outlined">
              <CardActionArea onClick={() => window.open(`${item.hdurl}`, "_blank")}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={item.url}
                  title={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  id={index}
                  size="small"
                  variant="outlined"
                  onClick={(e) => {
                    handleClickOpen();
                    setstateID(e.currentTarget.id);
                  }}>
                  Learn More
                </Button>
                <Button
                  id={index}
                  size="small"
                  color="secondary"
                  variant="outlined"
                  onClick={(e) => {
                    localStorage.setItem(
                      "favs",
                      JSON.stringify(
                        gallery.filter((val) => {
                          return val.date !== gallery[e.currentTarget.id].date;
                        })
                      )
                    );
                    setGallery(() =>
                      gallery.filter((val) => {
                        return val.date !== gallery[e.currentTarget.id].date;
                      })
                    );
                    console.log(gallery);
                  }}>
                  Remove
                </Button>
              </CardActions>
              <Modal open={open} id={stateID} setOpen={() => setOpen(!open)} />
            </Card>
          </Zoom>
        );
      })}
    </div>
  ) : (
    <div>
      <h5>no items in the gallery yet.</h5>{" "}
      <p>search for something and add it to the gallery</p>
    </div>
  );
};

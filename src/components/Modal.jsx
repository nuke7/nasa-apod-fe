import React, { useState, useContext } from "react";
import { NasaContext } from "../Context";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export const Modal = (props) => {
  const [open, setOpen] = useState(props.open);

  const handleClose = () => {
    setOpen(false);
  };

  const { value1, value2 } = useContext(NasaContext);
  const [gallery, setGallery] = value1;

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{gallery[props.id].title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ width: "90%", margin: "1rem auto" }}>
            {gallery[props.id].explanation}
            <p>
              <em>Date taken: {gallery[props.id].date}</em>
            </p>
            {gallery[props.id].copyright && (
              <strong>Copyright: {gallery[props.id].copyright}</strong>
            )}
          </DialogContentText>
          <img
            style={{ width: "100%", height: "auto" }}
            src={gallery[props.id].url}
            alt="nasa search img result is here"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpen()} color="secondary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

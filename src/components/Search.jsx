import { useState, useEffect, useContext } from "react";
import Fade from "react-reveal/Fade";
import { NasaContext } from "../Context";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";

import SendIcon from "@material-ui/icons/Send";
import Loading from "./assets/Loading1.gif";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export const Search = () => {
  const classes = useStyles();
  const { value1, value2 } = useContext(NasaContext);
  const [gallery, setGallery] = value1;
  const [data, setData] = value2;
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useState("");
  /* const [item, setItem] = useState({}); */
  /* let searchParams; */
  /*   let dateNow = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
    parseInt(new Date().getDate()) - 1
  }`; */

  const addToGallery = () => {
    localStorage.setItem("favs", JSON.stringify(gallery));
  };
  useEffect(() => {
    addToGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gallery]);

  const fetchData = async (search) => {
    console.log(search);
    if (search) {
      setLoading(true);
      /*    searchParams = `${parseFloat(year)}-${month}-${day}`;
        console.log(searchParams); */
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=M61W8ZfNGqjP4EzFr49ctgGmgqnjtR5zIf22qVWD&date=${search}`
      );
      console.log(response.status);

      if (response.status === 200) {
        setData(await response.json());
        setLoading(false);
      } else {
        setData(await response.json());
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const firstLoad = async () => {
      const params = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
        parseInt(new Date().getDate()) - 1
      }`;
      setSearchParams(params);
      console.log(params);
      fetchData(params);
    };

    firstLoad();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div style={{ margin: "1rem" }}>
        <TextField
          required
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
          onBlur={(e) => setSearchParams(e.target.value)}
          id="date"
          label="Choose a Date"
          type="date"
          /* defaultValue="1996-05-24" */
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          style={{ margin: "1rem" }}
          onClick={() => {
            if (searchParams !== "%Y-%m-%d") {
              fetchData(searchParams);
              setSearchParams("%Y-%m-%d");
            }
            if (searchParams === "%Y-%m-%d") {
              alert("search date must be completed");
            }
          }}
          variant="outlined"
          endIcon={<SendIcon />}>
          Search
        </Button>
      </div>
      {loading ? (
        <img src={Loading} alt="Loading ..." />
      ) : data.url ? (
        <Fade top>
          <div style={{ margin: "1rem" }}>
            {data.title ? <h3>{data.title}</h3> : <h4>No title</h4>}
            {data.media_type === "image" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <a href={data.hdurl} target="_blank" rel="noreferrer">
                  <img
                    style={{ width: "70vh", height: "auto" }}
                    src={data.url}
                    alt="nasa search img result is here"
                  />
                </a>
                <Button
                  style={{ margin: "1rem auto" }}
                  disabled={
                    gallery.length !== 0 &&
                    gallery.some((item) => item.date === data.date)
                  }
                  onClick={() => {
                    setGallery((prevState) => [...prevState, data]);
                    console.log(data);
                    addToGallery();
                  }}
                  variant="outlined"
                  endIcon={<FavoriteIcon />}>
                  Add to Gallery
                </Button>
              </div>
            ) : data.media_type === "video" ? (
              <iframe
                width="85%"
                height="360px"
                title="NASA video"
                src={data.url}></iframe>
            ) : (
              "we don't know what this is..."
            )}
            <h4>Explanation</h4>
            <p style={{ margin: "1rem auto" }}>{data.explanation}</p>
            <p style={{ margin: "1rem auto 2rem auto" }}>
              <em>Date taken: {data.date}</em>
            </p>
          </div>
        </Fade>
      ) : (
        <p>{data.msg}</p>
      )}
    </div>
  );
};

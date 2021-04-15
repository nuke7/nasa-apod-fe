import React, { useState, createContext } from "react";

export const NasaContext = createContext();

export const NasaProvider = (props) => {
  const loadFromLocalStorage = () => {
    const data = localStorage.getItem("favs");
    if (data === null || data.length === 0) {
      return [];
    } else {
      return JSON.parse(data);
    }
  };

  const [gallery, setGallery] = useState(loadFromLocalStorage());
  const [data, setData] = useState({});
  return (
    <NasaContext.Provider
      value={{
        value1: [gallery, setGallery],
        value2: [data, setData],
      }}>
      {props.children}
    </NasaContext.Provider>
  );
};

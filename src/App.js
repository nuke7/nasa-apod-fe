import "./App.css";
import { Search } from "./components/Search";
import { HashRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { NasaProvider } from "./Context";
import { Gallery } from "./components/Gallery";

function App() {
  return (
    <NasaProvider>
      <HashRouter>
        <div className="App">
          <Route exact path="/">
            <Navbar />
            <Search />
          </Route>
          <Route path="/gallery">
            <Navbar />
            <Gallery />
          </Route>
        </div>
      </HashRouter>
    </NasaProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PlaceDetails from "./pages/PlaceDetails";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places/:id" element={<PlaceDetails />} />
      </Routes>
    </BrowserRouter>
  );
};
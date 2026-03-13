import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PlaceDetails from "./pages/PlaceDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddPlace from "./pages/AddPlace";
import ProtectedRoute from "./components/ProtectedRoute";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes> // Demo For navigation, I used React Router to define different routes in the app.
                 This also connects to my protected route logic, because some pages should 
                 only be visible to logged-in users.
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/places/:id"
          element={
            <ProtectedRoute>
              <PlaceDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-place"
          element={
            <ProtectedRoute>
              <AddPlace />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};
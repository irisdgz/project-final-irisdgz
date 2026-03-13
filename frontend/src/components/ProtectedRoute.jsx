import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const accessToken = useAuthStore((s) => s.accessToken); /*demo This component protects some pages, like add place
                                                                 It checks if the user has an access token.
                                                                 If not, the user is redirected to the login page.*/

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
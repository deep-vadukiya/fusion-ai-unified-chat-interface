//

import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// hooks
import useAuth from "../hooks/useAuth";
// pages
// import SignIn from "../pages/auth/SignIn";
import { PATH_AUTH } from "../routes/paths";

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <p>Loading ...</p>;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={PATH_AUTH.signIn} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}

//

import { Navigate } from "react-router-dom";
// hooks
import useAuth from "../hooks/useAuth";
// routes
import { APP_PATH } from "../routes/paths";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={APP_PATH.chat} />;
  }

  return <>{children}</>;
}

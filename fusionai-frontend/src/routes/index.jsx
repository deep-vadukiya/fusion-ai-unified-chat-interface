//

import { useRoutes } from "react-router-dom";
//
import SignIn from "../pages/auth/SignIn";
// utility page
import NotFound from "../pages/NotFound";

// ------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: "", element: <></> },

    {
      path: "auth",
      children: [
        {
          path: "sign-in",
          element: (
            <GuestGuard>
              <SignIn />
            </GuestGuard>
          ),
        },
        {
          path: "sign-up",
          element: (
            <GuestGuard>
              <SignUp />
            </GuestGuard>
          ),
        },
      ],
    },

    { path: "*", element: <NotFound /> },
  ]);
}

//

import { useRoutes } from "react-router-dom";
// guards
import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";
// auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
// pages
import Chats from "../pages/Chats";
import Prompt from "../pages/Chats/components/Prompt";
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

    {
      path: "chat",
      element: (
        <AuthGuard>
          <Chats />
        </AuthGuard>
      ),
      children: [
        {
          path: "",
          element: <Prompt />,
        },
      ],
    },

    { path: "*", element: <NotFound /> },
  ]);
}
